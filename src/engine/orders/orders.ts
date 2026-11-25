import { Order, OrderStatus } from '@/types/simulation';
import { InventoryManager } from '../inventory/inventory';
import { FinanceManager } from '../finance/finance';
import { DomainEvent } from '@/types/events';

export class OrderManager {
  private orders: Order[] = [];
  private inventoryManager: InventoryManager;
  private financeManager: FinanceManager;

  constructor(
    initialOrders: Order[],
    inventoryManager: InventoryManager,
    financeManager: FinanceManager
  ) {
    this.orders = initialOrders.map(o => ({ ...o }));
    this.inventoryManager = inventoryManager;
    this.financeManager = financeManager;
  }

  public getOrders(): Order[] {
    return this.orders.map(o => ({ ...o }));
  }

  public getOrder(id: string): Order | undefined {
    return this.orders.find(o => o.id === id);
  }

  public addOrder(order: Order): void {
    if (this.orders.some(o => o.id === order.id)) {
      throw new Error(`Order with ID ${order.id} already exists`);
    }
    this.orders.push({ ...order });
  }

  public acceptOrder(orderId: string, tick: number, day: number): { success: boolean; message: string; event?: DomainEvent } {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      return { success: false, message: `Order ${orderId} not found.` };
    }
    if (order.status !== 'PENDING') {
      return { success: false, message: `Order ${orderId} cannot be accepted from status ${order.status}.` };
    }

    order.accepted = true;
    order.status = 'IN_PRODUCTION';

    // Deposit if configured
    if (order.depositReceived && order.depositReceived > 0) {
      this.financeManager.recordRevenue(
        order.depositReceived,
        tick,
        day,
        'REVENUE_ORDER',
        `Advance deposit for order ${order.id} (${order.customer})`
      );
    }

    const event: DomainEvent = {
      id: `EVT-ORD-ACC-${order.id}-${tick}`,
      type: 'ORDER_ACCEPTED',
      tick,
      day,
      hour: tick % 24,
      timestamp: Date.now(),
      title: 'Order Accepted',
      description: `Accepted order ${order.id} from ${order.customer} for ${order.quantity.toLocaleString()} bottles @ $${order.pricePerUnit}/ea. Delivery deadline: Day ${order.deadlineDay}.`,
      severity: 'info',
      payload: { orderId: order.id, quantity: order.quantity, totalValue: order.totalValue },
    };

    return { success: true, message: `Order ${order.id} accepted. Production allocated.`, event };
  }

  public rejectOrder(orderId: string, tick: number, day: number): { success: boolean; message: string; event?: DomainEvent } {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      return { success: false, message: `Order ${orderId} not found.` };
    }
    if (order.status !== 'PENDING') {
      return { success: false, message: `Order ${orderId} cannot be rejected from status ${order.status}.` };
    }

    order.accepted = false;
    order.status = 'REJECTED';

    const event: DomainEvent = {
      id: `EVT-ORD-REJ-${order.id}-${tick}`,
      type: 'ORDER_REJECTED',
      tick,
      day,
      hour: tick % 24,
      timestamp: Date.now(),
      title: 'Order Declined',
      description: `Declined order ${order.id} from ${order.customer}. No delivery obligations incurred.`,
      severity: 'warning',
      payload: { orderId: order.id },
    };

    return { success: true, message: `Order ${order.id} rejected.`, event };
  }

  public checkFulfillmentsAndDeadlines(tick: number, day: number): DomainEvent[] {
    const events: DomainEvent[] = [];

    // 1. Process active orders (sorted by deadline priority)
    const activeOrders = this.orders
      .filter(o => o.status === 'IN_PRODUCTION')
      .sort((a, b) => a.deadlineTick - b.deadlineTick);

    for (const order of activeOrders) {
      const remainingNeeded = order.remainingQuantity;
      const availableFG = this.inventoryManager.getFinishedGoodsQuantity();

      // If we have enough finished goods to fulfill the order completely
      if (availableFG >= remainingNeeded && remainingNeeded > 0) {
        this.inventoryManager.withdrawFinishedGoods(remainingNeeded);
        order.fulfilledQuantity += remainingNeeded;
        order.remainingQuantity = 0;
        order.status = 'FULFILLED';

        const paymentAmount = (order.quantity * order.pricePerUnit) - (order.depositReceived || 0);
        this.financeManager.recordRevenue(
          paymentAmount,
          tick,
          day,
          'REVENUE_ORDER',
          `Order fulfillment payment: ${order.id} (${order.customer}) - ${order.quantity} bottles`
        );

        events.push({
          id: `EVT-ORD-FUL-${order.id}-${tick}`,
          type: 'ORDER_FULFILLED',
          tick,
          day,
          hour: tick % 24,
          timestamp: Date.now(),
          title: 'Order Fulfilled & Dispatched!',
          description: `Dispatched ${order.quantity.toLocaleString()} bottles for ${order.customer}. Revenue of $${paymentAmount.toLocaleString()} credited.`,
          severity: 'success',
          payload: { orderId: order.id, revenue: paymentAmount },
        });
      } else {
        // Earliest Due Date (EDD) rule: Do not allow later deadline orders to poach stock
        // reserved for the imminent delivery contract.
        break;
      }
    }

    // 2. Check expired deadlines
    for (const order of this.orders) {
      if (order.status === 'IN_PRODUCTION' && tick > order.deadlineTick) {
        order.status = 'EXPIRED';
        events.push({
          id: `EVT-ORD-EXP-${order.id}-${tick}`,
          type: 'ORDER_EXPIRED',
          tick,
          day,
          hour: tick % 24,
          timestamp: Date.now(),
          title: 'Order Deadline Missed',
          description: `Failed to fulfill order ${order.id} (${order.customer}) before deadline Day ${order.deadlineDay}. Contract defaulted.`,
          severity: 'danger',
          payload: { orderId: order.id, remaining: order.remainingQuantity },
        });
      }
    }

    return events;
  }

  public manualDispatch(orderId: string, tick: number, day: number): { success: boolean; message: string; revenue?: number; event?: DomainEvent } {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      return { success: false, message: `Order ${orderId} not found.` };
    }
    if (order.status !== 'IN_PRODUCTION') {
      return { success: false, message: `Order ${orderId} cannot be dispatched from status ${order.status}.` };
    }

    const remainingNeeded = order.remainingQuantity;
    const availableFG = this.inventoryManager.getFinishedGoodsQuantity();

    if (availableFG < remainingNeeded) {
      return {
        success: false,
        message: `Insufficient finished goods in warehouse (${availableFG.toLocaleString()} available, ${remainingNeeded.toLocaleString()} required).`,
      };
    }

    this.inventoryManager.withdrawFinishedGoods(remainingNeeded);
    order.fulfilledQuantity += remainingNeeded;
    order.remainingQuantity = 0;
    order.status = 'FULFILLED';

    const paymentAmount = (order.quantity * order.pricePerUnit) - (order.depositReceived || 0);
    this.financeManager.recordRevenue(
      paymentAmount,
      tick,
      day,
      'REVENUE_ORDER',
      `Manual shipment dispatch: ${order.id} (${order.customer}) - ${order.quantity} bottles`
    );

    const event: DomainEvent = {
      id: `EVT-ORD-FUL-MANUAL-${order.id}-${tick}`,
      type: 'ORDER_FULFILLED',
      tick,
      day,
      hour: tick % 24,
      timestamp: Date.now(),
      title: 'Order Dispatched from Freight Bay!',
      description: `Dispatched ${order.quantity.toLocaleString()} bottles to ${order.customer}. Revenue of $${paymentAmount.toLocaleString()} credited.`,
      severity: 'success',
      payload: { orderId: order.id, revenue: paymentAmount },
    };

    return {
      success: true,
      message: `Successfully loaded and dispatched ${order.quantity.toLocaleString()} bottles to ${order.customer}. Treasury credited +$${paymentAmount.toLocaleString()}.`,
      revenue: paymentAmount,
      event,
    };
  }
}

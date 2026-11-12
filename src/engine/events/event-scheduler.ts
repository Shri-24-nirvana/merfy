import { ScheduledEvent } from '@/types/scenario';
import { DomainEvent } from '@/types/events';
import { OrderManager } from '../orders/orders';

export class EventScheduler {
  private scheduledEvents: ScheduledEvent[];
  private triggeredEventIds: Set<string> = new Set();

  constructor(events: ScheduledEvent[]) {
    this.scheduledEvents = events.map(e => ({ ...e }));
  }

  public checkEvents(
    tick: number,
    day: number,
    hour: number,
    orderManager: OrderManager
  ): DomainEvent[] {
    const emittedEvents: DomainEvent[] = [];

    for (const event of this.scheduledEvents) {
      if (this.triggeredEventIds.has(event.id)) continue;

      const targetHour = event.hour ?? 9;
      if (day === event.day && hour === targetHour) {
        this.triggeredEventIds.add(event.id);

        if (event.type === 'NEW_ORDER' && event.payload) {
          const orderPayload = event.payload;
          const deadlineDay = orderPayload.delivery_period
            ? day + parseInt(orderPayload.delivery_period.replace(/[^0-9]/g, '') || '4', 10)
            : (orderPayload.deadlineDay || (day + 4));

          orderManager.addOrder({
            id: orderPayload.id || `ORDER-00${day}`,
            customer: orderPayload.customer || 'Metro Retailers Inc.',
            quantity: orderPayload.quantity || 3200,
            pricePerUnit: orderPayload.selling_price_per_bottle || 16,
            totalValue: (orderPayload.quantity || 3200) * (orderPayload.selling_price_per_bottle || 16),
            accepted: false,
            fulfilledQuantity: 0,
            remainingQuantity: orderPayload.quantity || 3200,
            availableAtTick: tick,
            deadlineTick: deadlineDay * 24,
            deadlineDay,
            status: 'PENDING',
          });
        }

        emittedEvents.push({
          id: `EVT-SCHED-${event.id}-${tick}`,
          type: 'SCHEDULED_EVENT_TRIGGERED',
          tick,
          day,
          hour,
          timestamp: Date.now(),
          title: event.title,
          description: event.description,
          severity: 'info',
          payload: event.payload,
        });
      }
    }

    return emittedEvents;
  }
}

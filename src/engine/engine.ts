import {
  SimulationState,
  SimulationStatus,
  SimulationResult,
  DecisionRecord,
} from '@/types/simulation';
import { ScenarioConfig } from '@/types/scenario';
import { DomainEvent } from '@/types/events';
import { PlayerCommand, CommandExecutionResult } from '@/types/commands';
import { CommandProcessor } from './commands/command-processor';
import { SimulationClock } from './clock/clock';
import { FinanceManager } from './finance/finance';
import { InventoryManager } from './inventory/inventory';
import { MachineManager } from './production/machine-manager';
import { ProductionEngine } from './production/production';
import { OrderManager } from './orders/orders';
import { EventScheduler } from './events/event-scheduler';
import { AssessmentEngine } from './assessment/assessment';

export class SimulationEngine {
  private scenario!: ScenarioConfig;
  private simulationId!: string;
  private status: SimulationStatus = 'NOT_STARTED';
  private speed: number = 1;

  private clock!: SimulationClock;
  private financeManager!: FinanceManager;
  private inventoryManager!: InventoryManager;
  private machineManager!: MachineManager;
  private productionEngine!: ProductionEngine;
  private orderManager!: OrderManager;
  private eventScheduler!: EventScheduler;

  private domainEvents: DomainEvent[] = [];
  private decisionHistory: DecisionRecord[] = [];
  private snapshots: SimulationState['snapshots'] = [];
  private activeAlerts: SimulationState['activeAlerts'] = [];

  constructor(scenario?: ScenarioConfig) {
    if (scenario) {
      this.initialize(scenario);
    }
  }

  public initialize(scenario: ScenarioConfig): void {
    this.scenario = scenario;
    this.simulationId = `SIM-${scenario.id}-${Date.now()}`;
    this.status = 'NOT_STARTED';
    this.speed = 1;
    this.domainEvents = [];
    this.decisionHistory = [];
    this.snapshots = [];
    this.activeAlerts = [];

    // Initialize clock
    this.clock = new SimulationClock(
      scenario.ticksPerHour || 1,
      scenario.hoursPerDay || 24,
      0
    );

    // Initialize finance
    this.financeManager = new FinanceManager(
      scenario.initialBusiness.startingCash,
      scenario.initialBusiness.fixedDailyOverhead,
      scenario.hoursPerDay || 24
    );

    // Initialize inventory
    this.inventoryManager = new InventoryManager(
      scenario.inventoryParams.initialRawMaterials,
      scenario.inventoryParams.rawMaterialUnitCost,
      scenario.inventoryParams.rawMaterialReorderThreshold,
      scenario.inventoryParams.initialFinishedGoods
    );

    // Initialize machines
    const initialMachines = scenario.machines.map(m => ({
      id: m.id,
      name: m.name,
      purchaseCost: m.purchaseCost,
      productionCapacity: m.productionCapacity,
      status: m.operating ? ('RUNNING' as const) : ('IDLE' as const),
      operating: m.operating,
      maintenanceCostPerDay: m.maintenanceCostPerDay,
      efficiency: 1.0,
      totalProduced: 0,
      installedAtTick: 0,
    }));

    this.machineManager = new MachineManager(
      initialMachines,
      scenario.productionParams.additionalMachineCapacity,
      scenario.productionParams.additionalMachineCost,
      scenario.productionParams.maxMachineCount
    );

    // Initialize production
    this.productionEngine = new ProductionEngine(
      this.machineManager,
      this.inventoryManager,
      this.financeManager
    );

    // Initialize orders
    const initialOrders = scenario.initialOrders.map(o => ({
      id: o.id,
      customer: o.customer,
      quantity: o.quantity,
      pricePerUnit: o.pricePerUnit,
      totalValue: o.quantity * o.pricePerUnit,
      accepted: false,
      fulfilledQuantity: 0,
      remainingQuantity: o.quantity,
      availableAtTick: 0,
      deadlineTick: o.deadlineDay * (scenario.hoursPerDay || 24),
      deadlineDay: o.deadlineDay,
      status: 'PENDING' as const,
      depositReceived: o.depositPercent > 0 ? (o.quantity * o.pricePerUnit * (o.depositPercent / 100)) : 0,
    }));

    this.orderManager = new OrderManager(
      initialOrders,
      this.inventoryManager,
      this.financeManager
    );

    // Initialize scheduler
    this.eventScheduler = new EventScheduler(scenario.scheduledEvents);

    // Take initial snapshot
    this.recordSnapshot();

    // Emit initial event
    this.domainEvents.push({
      id: `EVT-INIT-${Date.now()}`,
      type: 'SIMULATION_STARTED',
      tick: 0,
      day: 1,
      hour: 0,
      timestamp: Date.now(),
      title: 'Simulation Initialized',
      description: `Factory floor ready for ${scenario.name}. Initial capital: $${scenario.initialBusiness.startingCash.toLocaleString()}.`,
      severity: 'info',
    });
  }

  public start(): void {
    if (this.status === 'NOT_STARTED' || this.status === 'PAUSED') {
      this.status = 'RUNNING';
    }
  }

  public pause(): void {
    if (this.status === 'RUNNING') {
      this.status = 'PAUSED';
    }
  }

  public resume(): void {
    if (this.status === 'PAUSED') {
      this.status = 'RUNNING';
    }
  }

  public setSpeed(speed: number): void {
    this.speed = Math.max(1, Math.min(10, speed));
  }

  public dispatch(command: PlayerCommand): CommandExecutionResult {
    const currentState = this.getState();
    const { result, decisionRecord, events } = CommandProcessor.execute(
      command,
      currentState,
      this.machineManager,
      this.inventoryManager,
      this.financeManager,
      this.orderManager
    );

    this.decisionHistory.push(decisionRecord);

    if (events.length > 0) {
      this.domainEvents.push(...events);
      events.forEach(evt => {
        if (evt.severity === 'warning' || evt.severity === 'danger') {
          this.activeAlerts.push({
            id: evt.id,
            type: evt.severity === 'danger' ? 'DANGER' : 'WARNING',
            message: evt.description,
            tick: evt.tick,
          });
        }
      });
    }

    // Update asset valuation
    this.financeManager.updateTotalAssets(
      this.inventoryManager.getRawMaterialsValue(),
      this.inventoryManager.getFinishedGoodsValue(),
      this.machineManager.getMachinesBookValue()
    );

    return result;
  }

  public tick(): { state: SimulationState; events: DomainEvent[] } {
    if (this.status !== 'RUNNING') {
      return { state: this.getState(), events: [] };
    }

    // 1. Advance clock
    const currentTick = this.clock.advance();
    const time = this.clock.getTime();
    const tickEvents: DomainEvent[] = [];

    // 2. Day rollover check
    if (time.hour === 0) {
      this.financeManager.resetDailyCounters();
      tickEvents.push({
        id: `EVT-DAY-${time.day}-${currentTick}`,
        type: 'DAY_COMPLETED',
        tick: currentTick,
        day: time.day,
        hour: time.hour,
        timestamp: Date.now(),
        title: `Day ${time.day} Commenced`,
        description: `Factory operations start for Day ${time.day}.`,
        severity: 'info',
      });
    }

    // 3. Process Scheduled Events
    const scheduledEvts = this.eventScheduler.checkEvents(
      currentTick,
      time.day,
      time.hour,
      this.orderManager
    );
    tickEvents.push(...scheduledEvts);

    // 4. Fixed hourly operational expenses
    this.financeManager.applyHourlyFixedCosts(
      currentTick,
      time.day,
      this.machineManager.getActiveMachines().length,
      50 // daily maintenance per machine
    );

    // 5. Hourly Production
    const prodResult = this.productionEngine.tickProduction(
      this.scenario.hoursPerDay || 24,
      this.scenario.productionParams.rawMaterialUnitsPerBottle,
      this.scenario.productionParams.productionCostPerUnit,
      currentTick,
      time.day
    );

    // 6. Check Order Fulfillment & Expiry
    const orderEvts = this.orderManager.checkFulfillmentsAndDeadlines(currentTick, time.day);
    tickEvents.push(...orderEvts);

    // 7. Inventory threshold alerts
    if (this.inventoryManager.isRawMaterialsLow()) {
      if (!this.activeAlerts.some(a => a.id.includes('LOW_RAW_ALERT'))) {
        this.activeAlerts.push({
          id: `LOW_RAW_ALERT_${currentTick}`,
          type: 'WARNING',
          message: 'Raw material inventory is below safety threshold! Reorder immediately.',
          tick: currentTick,
        });
      }
    } else {
      // Clear low raw alert if replenished
      this.activeAlerts = this.activeAlerts.filter(a => !a.id.includes('LOW_RAW_ALERT'));
    }

    // 8. Financial solvency check
    const currentCash = this.financeManager.getState().cash;
    if (currentCash < this.scenario.initialBusiness.bankruptcyCashThreshold) {
      this.status = 'FAILED';
      tickEvents.push({
        id: `EVT-FAIL-BANKRUPT-${currentTick}`,
        type: 'SIMULATION_FAILED',
        tick: currentTick,
        day: time.day,
        hour: time.hour,
        timestamp: Date.now(),
        title: 'Business Insolvent',
        description: `Cash balance ($${Math.round(currentCash).toLocaleString()}) exceeded credit limit. Factory liquidation triggered.`,
        severity: 'danger',
      });
    }

    // 9. Duration / Completion check
    const maxTicks = (this.scenario.durationDays || 7) * (this.scenario.hoursPerDay || 24);
    if (this.status === 'RUNNING' && currentTick >= maxTicks) {
      this.status = 'COMPLETED';
      tickEvents.push({
        id: `EVT-COMPLETED-${currentTick}`,
        type: 'SIMULATION_COMPLETED',
        tick: currentTick,
        day: time.day,
        hour: time.hour,
        timestamp: Date.now(),
        title: 'Operating Period Concluded',
        description: `Target scenario period (${this.scenario.durationDays} days) successfully completed. Final performance assessment ready.`,
        severity: 'success',
      });
    }

    // Update total asset valuation
    this.financeManager.updateTotalAssets(
      this.inventoryManager.getRawMaterialsValue(),
      this.inventoryManager.getFinishedGoodsValue(),
      this.machineManager.getMachinesBookValue()
    );

    // Store domain events
    if (tickEvents.length > 0) {
      this.domainEvents.push(...tickEvents);
    }

    // Record periodic snapshot (every 2 ticks for fine-grained charts)
    if (currentTick % 2 === 0 || this.status === 'COMPLETED' || this.status === 'FAILED') {
      this.recordSnapshot();
    }

    return {
      state: this.getState(),
      events: tickEvents,
    };
  }

  private recordSnapshot(): void {
    const time = this.clock ? this.clock.getTime() : { tick: 0, day: 1, hour: 0 };
    const fin = this.financeManager ? this.financeManager.getState() : { cash: 100000, revenue: 0, expenses: 0, profit: 0 };
    const prod = this.productionEngine ? this.productionEngine.getState() : { currentHourlyRate: 0 };
    const inv = this.inventoryManager ? this.inventoryManager.getState() : {
      rawMaterials: { quantity: 0 },
      finishedGoods: { quantity: 0 },
    };

    this.snapshots.push({
      tick: time.tick,
      day: time.day,
      cash: Math.round(fin.cash),
      revenue: Math.round(fin.revenue),
      expenses: Math.round(fin.expenses),
      profit: Math.round(fin.profit),
      productionRate: prod.currentHourlyRate,
      inventoryRaw: Math.round(inv.rawMaterials.quantity),
      inventoryFinished: Math.round(inv.finishedGoods.quantity),
    });
  }

  public getState(): SimulationState {
    const time = this.clock.getTime();
    const hoursPerDay = this.scenario.hoursPerDay || 24;
    const maxTicks = (this.scenario.durationDays || 7) * hoursPerDay;

    return {
      simulationId: this.simulationId,
      scenarioId: this.scenario.id,
      scenarioVersion: this.scenario.version,
      scenarioName: this.scenario.name,
      currentTick: time.tick,
      currentDay: time.day,
      currentHour: time.hour,
      ticksPerDay: hoursPerDay,
      speed: this.speed,
      status: this.status,
      business: this.financeManager.getState(),
      machines: this.machineManager.getMachines(),
      production: this.productionEngine.getState(hoursPerDay),
      inventory: this.inventoryManager.getState(),
      orders: this.orderManager.getOrders(),
      events: this.domainEvents.slice(-20).map(e => ({
        id: e.id,
        type: e.type,
        tick: e.tick,
        day: e.day,
        description: e.description,
      })),
      objectives: {
        primary: {
          description: this.scenario.learningObjectives[0] || 'Deliver customer orders and maximize net profit.',
          achieved: this.status === 'COMPLETED' && this.financeManager.getState().profit > 0,
        },
        bankruptcyCashThreshold: this.scenario.initialBusiness.bankruptcyCashThreshold,
        maxTicks,
        maxDays: this.scenario.durationDays,
      },
      history: [...this.decisionHistory],
      snapshots: [...this.snapshots],
      activeAlerts: [...this.activeAlerts],
    };
  }

  public getEvents(): DomainEvent[] {
    return [...this.domainEvents];
  }

  public getHistory(): DecisionRecord[] {
    return [...this.decisionHistory];
  }

  public isCompleted(): boolean {
    return this.status === 'COMPLETED';
  }

  public isFailed(): boolean {
    return this.status === 'FAILED';
  }

  public getResults(): SimulationResult {
    const state = this.getState();
    const assessment = AssessmentEngine.evaluate(state);
    const completedOrders = state.orders.filter(o => o.status === 'FULFILLED');
    const failedOrders = state.orders.filter(o => o.status === 'EXPIRED');

    return {
      simulationId: state.simulationId,
      scenarioId: state.scenarioId,
      scenarioName: state.scenarioName,
      finalStatus: state.status,
      completionReason: state.status === 'FAILED'
        ? 'Business liquidated due to negative cash credit threshold.'
        : `Successfully finished all ${state.currentDay} simulation days.`,
      totalTicks: state.currentTick,
      totalDays: state.currentDay,
      finalCash: Math.round(state.business.cash),
      revenue: Math.round(state.business.revenue),
      expenses: Math.round(state.business.expenses),
      profit: Math.round(state.business.profit),
      completedOrdersCount: completedOrders.length,
      totalOrdersCount: state.orders.length,
      failedOrdersCount: failedOrders.length,
      fulfilledBottlesCount: completedOrders.reduce((sum, o) => sum + o.quantity, 0),
      totalBottlesProduced: state.production.totalUnitsProduced,
      remainingRawMaterial: Math.round(state.inventory.rawMaterials.quantity),
      remainingFinishedGoods: Math.round(state.inventory.finishedGoods.quantity),
      finalProductionCapacity: state.production.currentDailyCapacity,
      machinesCount: state.machines.length,
      performanceAssessment: assessment,
      decisionHistory: [...state.history],
      historySnapshots: [...state.snapshots],
    };
  }
}

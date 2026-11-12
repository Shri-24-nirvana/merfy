export type SimulationStatus = 'NOT_STARTED' | 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'FAILED';

export type MachineStatus = 'IDLE' | 'RUNNING' | 'MAINTENANCE' | 'OFFLINE';

export interface Machine {
  id: string;
  name: string;
  purchaseCost: number;
  productionCapacity: number; // units per day
  status: MachineStatus;
  operating: boolean;
  maintenanceCostPerDay: number;
  efficiency: number; // 0.0 to 1.0 (e.g. 1.0 = 100%)
  totalProduced: number;
  installedAtTick: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitCost: number;
  reorderThreshold: number;
}

export type OrderStatus = 'PENDING' | 'ACCEPTED' | 'IN_PRODUCTION' | 'FULFILLED' | 'REJECTED' | 'EXPIRED' | 'CANCELLED';

export interface Order {
  id: string;
  customer: string;
  quantity: number;
  pricePerUnit: number;
  totalValue: number;
  accepted: boolean;
  fulfilledQuantity: number;
  remainingQuantity: number;
  availableAtTick: number;
  deadlineTick: number;
  deadlineDay: number;
  status: OrderStatus;
  penaltyPerDayLate?: number;
  depositReceived?: number;
}

export interface BusinessState {
  cash: number;
  revenue: number;
  expenses: number;
  profit: number;
  totalAssets: number;
  dailyRevenue: number;
  dailyExpenses: number;
  burnRatePerHour: number;
}

export interface ProductionState {
  currentHourlyRate: number;
  currentDailyCapacity: number;
  activeMachinesCount: number;
  totalMachinesCount: number;
  totalUnitsProduced: number;
  utilizationRate: number; // 0 to 100%
  bottleneckReason?: string;
  targetHourlyProduction: number;
}

export interface InventoryState {
  rawMaterials: InventoryItem;
  finishedGoods: InventoryItem;
}

export interface SimulationObjectives {
  primary: {
    description: string;
    targetProfit?: number;
    targetOrdersFulfilled?: number;
    achieved: boolean;
  };
  bankruptcyCashThreshold: number;
  maxTicks: number;
  maxDays: number;
}

export interface DecisionRecord {
  id: string;
  commandType: string;
  tick: number;
  day: number;
  hour: number;
  timestamp: number;
  parameters: Record<string, unknown>;
  result: 'SUCCESS' | 'REJECTED';
  message: string;
  financialImpact?: number;
}

export interface PerformanceAssessment {
  overallScore: number; // 0 - 100 provisional score
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  strategicRating: string;
  strengths: string[];
  areasForImprovement: string[];
  metrics: {
    finalCash: number;
    netProfit: number;
    profitMargin: number;
    orderFulfillmentRate: number;
    capitalEfficiency: number;
    machineUtilizationAvg: number;
    inventoryTurnoverEstimate: number;
  };
  feedback: string;
  provisionalNote: string;
}

export interface SimulationResult {
  simulationId: string;
  scenarioId: string;
  scenarioName: string;
  finalStatus: SimulationStatus;
  completionReason: string;
  totalTicks: number;
  totalDays: number;
  finalCash: number;
  revenue: number;
  expenses: number;
  profit: number;
  completedOrdersCount: number;
  totalOrdersCount: number;
  failedOrdersCount: number;
  fulfilledBottlesCount: number;
  totalBottlesProduced: number;
  remainingRawMaterial: number;
  remainingFinishedGoods: number;
  finalProductionCapacity: number;
  machinesCount: number;
  performanceAssessment: PerformanceAssessment;
  decisionHistory: DecisionRecord[];
  historySnapshots: Array<{
    tick: number;
    day: number;
    cash: number;
    revenue: number;
    expenses: number;
    profit: number;
    productionRate: number;
    inventoryRaw: number;
    inventoryFinished: number;
  }>;
}

export interface SimulationState {
  simulationId: string;
  scenarioId: string;
  scenarioVersion: string;
  scenarioName: string;
  currentTick: number;
  currentDay: number;
  currentHour: number;
  ticksPerDay: number;
  speed: number; // 1x, 2x, 5x
  status: SimulationStatus;
  business: BusinessState;
  machines: Machine[];
  production: ProductionState;
  inventory: InventoryState;
  orders: Order[];
  events: Array<{
    id: string;
    type: string;
    tick: number;
    day: number;
    description: string;
    isRead?: boolean;
  }>;
  objectives: SimulationObjectives;
  history: DecisionRecord[];
  snapshots: Array<{
    tick: number;
    day: number;
    cash: number;
    revenue: number;
    expenses: number;
    profit: number;
    productionRate: number;
    inventoryRaw: number;
    inventoryFinished: number;
  }>;
  activeAlerts: Array<{
    id: string;
    type: 'INFO' | 'WARNING' | 'DANGER' | 'SUCCESS';
    message: string;
    tick: number;
  }>;
}


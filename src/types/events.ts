export type SimulationEventType =
  | 'SIMULATION_STARTED'
  | 'TICK_ADVANCED'
  | 'DAY_COMPLETED'
  | 'MACHINE_PURCHASED'
  | 'MACHINE_STATUS_CHANGED'
  | 'MACHINE_MAINTAINED'
  | 'ORDER_ARRIVED'
  | 'ORDER_ACCEPTED'
  | 'ORDER_REJECTED'
  | 'ORDER_FULFILLED'
  | 'ORDER_EXPIRED'
  | 'RAW_MATERIALS_PURCHASED'
  | 'RAW_MATERIALS_LOW'
  | 'RAW_MATERIALS_DEPLETED'
  | 'DAILY_FINANCES_SETTLED'
  | 'SCHEDULED_EVENT_TRIGGERED'
  | 'BANKRUPTCY_WARNING'
  | 'SIMULATION_COMPLETED'
  | 'SIMULATION_FAILED';

export interface DomainEvent {
  id: string;
  type: SimulationEventType;
  tick: number;
  day: number;
  hour: number;
  timestamp: number;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'danger' | 'success';
  payload?: Record<string, unknown>;
}


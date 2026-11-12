export type CommandType =
  | 'PURCHASE_MACHINE'
  | 'TOGGLE_MACHINE_OPERATION'
  | 'SET_MACHINE_OPERATING_COUNT'
  | 'ACCEPT_ORDER'
  | 'REJECT_ORDER'
  | 'MANAGE_INVENTORY'
  | 'ORDER_RAW_MATERIALS'
  | 'SET_PRODUCTION_RATE'
  | 'DISPATCH_ORDER'
  | 'SERVICE_MACHINE';

export interface BaseCommand {
  type: CommandType;
}

export interface PurchaseMachineCommand extends BaseCommand {
  type: 'PURCHASE_MACHINE';
  machineName?: string;
}

export interface ToggleMachineOperationCommand extends BaseCommand {
  type: 'TOGGLE_MACHINE_OPERATION';
  machineId: string;
  operating: boolean;
}

export interface SetMachineOperatingCountCommand extends BaseCommand {
  type: 'SET_MACHINE_OPERATING_COUNT';
  count: number;
}

export interface AcceptOrderCommand extends BaseCommand {
  type: 'ACCEPT_ORDER';
  orderId: string;
}

export interface RejectOrderCommand extends BaseCommand {
  type: 'REJECT_ORDER';
  orderId: string;
}

export interface OrderRawMaterialsCommand extends BaseCommand {
  type: 'ORDER_RAW_MATERIALS';
  quantity: number;
}

export interface ManageInventoryCommand extends BaseCommand {
  type: 'MANAGE_INVENTORY';
  action: 'PURCHASE_RAW' | 'DISPOSE_DEFECTS';
  quantity: number;
}

export interface ServiceMachineCommand extends BaseCommand {
  type: 'SERVICE_MACHINE';
  machineId: string;
}

export interface DispatchOrderCommand extends BaseCommand {
  type: 'DISPATCH_ORDER';
  orderId: string;
}

export type PlayerCommand =
  | PurchaseMachineCommand
  | ToggleMachineOperationCommand
  | SetMachineOperatingCountCommand
  | AcceptOrderCommand
  | RejectOrderCommand
  | OrderRawMaterialsCommand
  | ManageInventoryCommand
  | ServiceMachineCommand
  | DispatchOrderCommand;

export interface CommandValidationResult {
  isValid: boolean;
  error?: string;
}

export interface CommandExecutionResult {
  success: boolean;
  message: string;
  commandType: CommandType;
  financialImpact?: number;
  error?: string;
}

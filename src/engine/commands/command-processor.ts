import { PlayerCommand, CommandExecutionResult } from '@/types/commands';
import { SimulationState, DecisionRecord } from '@/types/simulation';
import { MachineManager } from '../production/machine-manager';
import { InventoryManager } from '../inventory/inventory';
import { FinanceManager } from '../finance/finance';
import { OrderManager } from '../orders/orders';
import { DomainEvent } from '@/types/events';

export class CommandProcessor {
  public static execute(
    command: PlayerCommand,
    state: SimulationState,
    machineManager: MachineManager,
    inventoryManager: InventoryManager,
    financeManager: FinanceManager,
    orderManager: OrderManager
  ): {
    result: CommandExecutionResult;
    decisionRecord: DecisionRecord;
    events: DomainEvent[];
  } {
    const { currentTick, currentDay, currentHour } = state;
    const events: DomainEvent[] = [];

    // Global guard: If simulation is completed or failed, reject all gameplay commands
    if (state.status === 'COMPLETED' || state.status === 'FAILED') {
      const result: CommandExecutionResult = {
        success: false,
        commandType: command.type,
        error: `Cannot execute command ${command.type}: simulation is already ${state.status}.`,
        message: `Simulation is already ${state.status}.`,
      };
      return {
        result,
        decisionRecord: {
          id: `DEC-${currentTick}-${Date.now()}`,
          commandType: command.type,
          tick: currentTick,
          day: currentDay,
          hour: currentHour,
          timestamp: Date.now(),
          parameters: { ...command },
          result: 'REJECTED',
          message: result.error || 'Simulation terminated',
        },
        events,
      };
    }

    let result: CommandExecutionResult;
    let financialImpact: number | undefined = undefined;

    switch (command.type) {
      case 'PURCHASE_MACHINE': {
        const cost = 20000;
        if (!machineManager.canAddMachine()) {
          result = {
            success: false,
            commandType: command.type,
            error: 'Maximum production line capacity reached (5 machines limit).',
            message: 'Factory floor cannot fit additional machinery.',
          };
          break;
        }

        if (financeManager.getState().cash < cost) {
          result = {
            success: false,
            commandType: command.type,
            error: `Insufficient capital. Machine requires $${cost.toLocaleString()} (Available: $${Math.round(financeManager.getState().cash).toLocaleString()}).`,
            message: 'Insufficient cash to procure machinery.',
          };
          break;
        }

        financeManager.recordExpense(
          cost,
          currentTick,
          currentDay,
          'CAPEX_MACHINE',
          `Procured new manufacturing line`,
          true
        );
        financialImpact = -cost;

        const newMachine = machineManager.addMachine(currentTick, command.machineName);

        events.push({
          id: `EVT-MACH-PUR-${newMachine.id}-${currentTick}`,
          type: 'MACHINE_PURCHASED',
          tick: currentTick,
          day: currentDay,
          hour: currentHour,
          timestamp: Date.now(),
          title: 'New Machine Installed',
          description: `Installed ${newMachine.name}. Added +${newMachine.productionCapacity} bottles/day manufacturing capacity.`,
          severity: 'success',
          payload: { machineId: newMachine.id, cost },
        });

        result = {
          success: true,
          commandType: command.type,
          message: `Successfully installed ${newMachine.name} (+${newMachine.productionCapacity} bottles/day).`,
          financialImpact: -cost,
        };
        break;
      }

      case 'TOGGLE_MACHINE_OPERATION': {
        const machine = machineManager.getMachine(command.machineId);
        if (!machine) {
          result = {
            success: false,
            commandType: command.type,
            error: `Machine ${command.machineId} not found on the factory floor.`,
            message: 'Machine ID invalid.',
          };
          break;
        }

        machineManager.setMachineOperating(command.machineId, command.operating);

        events.push({
          id: `EVT-MACH-TOG-${command.machineId}-${currentTick}`,
          type: 'MACHINE_STATUS_CHANGED',
          tick: currentTick,
          day: currentDay,
          hour: currentHour,
          timestamp: Date.now(),
          title: 'Machine Status Changed',
          description: `${machine.name} switched to ${command.operating ? 'OPERATIONAL' : 'IDLE'}.`,
          severity: 'info',
          payload: { machineId: command.machineId, operating: command.operating },
        });

        result = {
          success: true,
          commandType: command.type,
          message: `${machine.name} is now ${command.operating ? 'operating' : 'standby'}.`,
        };
        break;
      }

      case 'SET_MACHINE_OPERATING_COUNT': {
        const updatedCount = machineManager.setOperatingCount(command.count);
        result = {
          success: true,
          commandType: command.type,
          message: `Set ${updatedCount} production line(s) to active operation.`,
        };
        break;
      }

      case 'ACCEPT_ORDER': {
        const acceptRes = orderManager.acceptOrder(command.orderId, currentTick, currentDay);
        if (!acceptRes.success) {
          result = {
            success: false,
            commandType: command.type,
            error: acceptRes.message,
            message: acceptRes.message,
          };
          break;
        }

        if (acceptRes.event) {
          events.push(acceptRes.event);
        }

        result = {
          success: true,
          commandType: command.type,
          message: acceptRes.message,
        };
        break;
      }

      case 'REJECT_ORDER': {
        const rejectRes = orderManager.rejectOrder(command.orderId, currentTick, currentDay);
        if (!rejectRes.success) {
          result = {
            success: false,
            commandType: command.type,
            error: rejectRes.message,
            message: rejectRes.message,
          };
          break;
        }

        if (rejectRes.event) {
          events.push(rejectRes.event);
        }

        result = {
          success: true,
          commandType: command.type,
          message: rejectRes.message,
        };
        break;
      }

      case 'ORDER_RAW_MATERIALS': {
        const quantity = command.quantity;
        if (quantity <= 0) {
          result = {
            success: false,
            commandType: command.type,
            error: 'Quantity must be greater than zero.',
            message: 'Invalid purchase batch size.',
          };
          break;
        }

        const unitCost = 2.0; // $2.00 per unit
        const totalCost = quantity * unitCost;

        if (financeManager.getState().cash < totalCost) {
          result = {
            success: false,
            commandType: command.type,
            error: `Insufficient funds. Purchase requires $${totalCost.toLocaleString()}, but available cash is $${Math.round(financeManager.getState().cash).toLocaleString()}.`,
            message: 'Insufficient cash for raw material procurement.',
          };
          break;
        }

        financeManager.recordExpense(
          totalCost,
          currentTick,
          currentDay,
          'RAW_MATERIAL',
          `Procured ${quantity.toLocaleString()} units of raw syrup & preforms @ $${unitCost}/ea`
        );
        inventoryManager.addRawMaterials(quantity);
        financialImpact = -totalCost;

        events.push({
          id: `EVT-INV-BUY-${currentTick}`,
          type: 'RAW_MATERIALS_PURCHASED',
          tick: currentTick,
          day: currentDay,
          hour: currentHour,
          timestamp: Date.now(),
          title: 'Raw Materials Replenished',
          description: `Received ${quantity.toLocaleString()} units into Raw Storage. Cash debited $${totalCost.toLocaleString()}.`,
          severity: 'info',
          payload: { quantity, totalCost },
        });

        result = {
          success: true,
          commandType: command.type,
          message: `Procured ${quantity.toLocaleString()} raw material units for $${totalCost.toLocaleString()}.`,
          financialImpact: -totalCost,
        };
        break;
      }

      case 'MANAGE_INVENTORY': {
        if (command.action === 'PURCHASE_RAW') {
          return CommandProcessor.execute(
            { type: 'ORDER_RAW_MATERIALS', quantity: command.quantity },
            state,
            machineManager,
            inventoryManager,
            financeManager,
            orderManager
          );
        }
        result = {
          success: true,
          commandType: command.type,
          message: 'Inventory managed.',
        };
        break;
      }

      case 'SERVICE_MACHINE': {
        const serviceCost = 1000;
        const machine = machineManager.getMachine(command.machineId);
        if (!machine) {
          result = {
            success: false,
            commandType: command.type,
            error: `Machine ${command.machineId} not found.`,
            message: 'Invalid machine ID.',
          };
          break;
        }

        if (financeManager.getState().cash < serviceCost) {
          result = {
            success: false,
            commandType: command.type,
            error: `Insufficient cash for maintenance service ($${serviceCost} required).`,
            message: 'Maintenance funding unavailable.',
          };
          break;
        }

        financeManager.recordExpense(
          serviceCost,
          currentTick,
          currentDay,
          'MACHINE_MAINTENANCE',
          `Preventative overhaul for ${machine.name}`
        );
        machineManager.serviceMachine(command.machineId);
        financialImpact = -serviceCost;

        events.push({
          id: `EVT-MACH-SVC-${command.machineId}-${currentTick}`,
          type: 'MACHINE_MAINTENANCED' as any,
          tick: currentTick,
          day: currentDay,
          hour: currentHour,
          timestamp: Date.now(),
          title: 'Machine Calibrated',
          description: `${machine.name} completed precision maintenance. Factory reliability restored to 100%.`,
          severity: 'success',
          payload: { machineId: command.machineId },
        });

        result = {
          success: true,
          commandType: command.type,
          message: `Machine ${machine.name} serviced and restored to peak efficiency.`,
          financialImpact: -serviceCost,
        };
        break;
      }

      default:
        result = {
          success: false,
          commandType: (command as any).type,
          error: `Unknown command type: ${(command as any).type}`,
          message: 'Unsupported command.',
        };
    }

    const decisionRecord: DecisionRecord = {
      id: `DEC-${currentTick}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      commandType: command.type,
      tick: currentTick,
      day: currentDay,
      hour: currentHour,
      timestamp: Date.now(),
      parameters: { ...command },
      result: result.success ? 'SUCCESS' : 'REJECTED',
      message: result.success ? result.message : (result.error || result.message),
      financialImpact,
    };

    return { result, decisionRecord, events };
  }
}


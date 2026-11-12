import { ProductionState } from '@/types/simulation';
import { MachineManager } from './machine-manager';
import { InventoryManager } from '../inventory/inventory';
import { FinanceManager } from '../finance/finance';

export class ProductionEngine {
  private machineManager: MachineManager;
  private inventoryManager: InventoryManager;
  private financeManager: FinanceManager;
  private totalUnitsProduced: number = 0;
  private lastHourlyRate: number = 0;
  private lastBottleneckReason?: string;
  private fractionalUnitsAccumulator: number = 0;

  constructor(
    machineManager: MachineManager,
    inventoryManager: InventoryManager,
    financeManager: FinanceManager
  ) {
    this.machineManager = machineManager;
    this.inventoryManager = inventoryManager;
    this.financeManager = financeManager;
  }

  public getState(hoursPerDay: number = 24): ProductionState {
    const activeMachines = this.machineManager.getActiveMachines();
    const activeDailyCapacity = this.machineManager.getActiveDailyCapacity();
    const potentialHourlyRate = activeDailyCapacity / hoursPerDay;

    const utilization = potentialHourlyRate > 0
      ? Math.min(100, Math.round((this.lastHourlyRate / potentialHourlyRate) * 100))
      : 0;

    return {
      currentHourlyRate: Math.round(this.lastHourlyRate * 10) / 10,
      currentDailyCapacity: Math.round(activeDailyCapacity),
      activeMachinesCount: activeMachines.length,
      totalMachinesCount: this.machineManager.getMachines().length,
      totalUnitsProduced: Math.round(this.totalUnitsProduced),
      utilizationRate: utilization,
      bottleneckReason: this.lastBottleneckReason,
      targetHourlyProduction: Math.round((activeDailyCapacity / hoursPerDay) * 10) / 10,
    };
  }

  public tickProduction(
    hoursPerDay: number,
    rawMaterialUnitsPerBottle: number,
    productionCostPerUnit: number,
    tick: number,
    day: number
  ): { unitsProduced: number; bottleneck?: string } {
    const activeDailyCapacity = this.machineManager.getActiveDailyCapacity();
    const potentialUnits = activeDailyCapacity / hoursPerDay;

    if (potentialUnits <= 0) {
      this.lastHourlyRate = 0;
      this.lastBottleneckReason = 'No active machines running';
      return { unitsProduced: 0, bottleneck: this.lastBottleneckReason };
    }

    // Check raw material availability
    const availableRaw = this.inventoryManager.getRawMaterialsQuantity();
    const maxBottlesPossible = availableRaw / rawMaterialUnitsPerBottle;

    let bottleneck: string | undefined = undefined;
    let desiredUnits = potentialUnits + this.fractionalUnitsAccumulator;

    if (maxBottlesPossible < desiredUnits) {
      desiredUnits = Math.max(0, maxBottlesPossible);
      bottleneck = availableRaw <= 0
        ? 'Raw materials exhausted - production halted'
        : 'Raw material shortage throttling output';
    }

    // Calculate integer units to actually bottle this tick
    const integerUnitsToProduce = Math.floor(desiredUnits);
    this.fractionalUnitsAccumulator = desiredUnits - integerUnitsToProduce;

    if (integerUnitsToProduce > 0) {
      // Consume raw materials
      const rawNeeded = integerUnitsToProduce * rawMaterialUnitsPerBottle;
      this.inventoryManager.consumeRawMaterials(rawNeeded);

      // Add to finished goods
      this.inventoryManager.addFinishedGoods(integerUnitsToProduce);

      // Incur direct production variable cost (electricity, syrup processing, labor)
      const directCost = integerUnitsToProduce * productionCostPerUnit;
      this.financeManager.recordExpense(
        directCost,
        tick,
        day,
        'DIRECT_PRODUCTION_COST',
        `Production run: ${integerUnitsToProduce} bottles @ $${productionCostPerUnit}/unit`
      );

      // Record in machines
      this.machineManager.recordProduction(integerUnitsToProduce);
      this.totalUnitsProduced += integerUnitsToProduce;
    }

    this.lastHourlyRate = integerUnitsToProduce;
    this.lastBottleneckReason = bottleneck;

    return {
      unitsProduced: integerUnitsToProduce,
      bottleneck,
    };
  }
}


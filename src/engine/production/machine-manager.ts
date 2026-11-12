import { Machine } from '@/types/simulation';

export class MachineManager {
  private machines: Machine[] = [];
  private readonly defaultAdditionalCapacity: number;
  private readonly defaultAdditionalCost: number;
  private readonly maxMachines: number;

  constructor(
    initialMachines: Machine[],
    additionalCapacity: number = 200,
    additionalCost: number = 20000,
    maxMachines: number = 5
  ) {
    this.machines = initialMachines.map(m => ({ ...m }));
    this.defaultAdditionalCapacity = additionalCapacity;
    this.defaultAdditionalCost = additionalCost;
    this.maxMachines = maxMachines;
  }

  public getMachines(): Machine[] {
    return this.machines.map(m => ({ ...m }));
  }

  public getMachine(id: string): Machine | undefined {
    return this.machines.find(m => m.id === id);
  }

  public getActiveMachines(): Machine[] {
    return this.machines.filter(m => m.operating && m.status === 'RUNNING');
  }

  public getTotalCapacity(): number {
    return this.machines.reduce((sum, m) => sum + m.productionCapacity, 0);
  }

  public getActiveDailyCapacity(): number {
    return this.getActiveMachines().reduce((sum, m) => sum + (m.productionCapacity * m.efficiency), 0);
  }

  public getMachinesBookValue(): number {
    return this.machines.reduce((sum, m) => sum + (m.purchaseCost * 0.9), 0); // book value
  }

  public canAddMachine(): boolean {
    return this.machines.length < this.maxMachines;
  }

  public addMachine(currentTick: number, name?: string): Machine {
    if (!this.canAddMachine()) {
      throw new Error(`Maximum machine limit (${this.maxMachines}) reached.`);
    }

    const nextIndex = this.machines.length + 1;
    const newMachine: Machine = {
      id: `M-0${nextIndex}`,
      name: name || `Apex Bottler Line 0${nextIndex}`,
      purchaseCost: this.defaultAdditionalCost,
      productionCapacity: this.defaultAdditionalCapacity,
      status: 'RUNNING',
      operating: true,
      maintenanceCostPerDay: 50,
      efficiency: 1.0,
      totalProduced: 0,
      installedAtTick: currentTick,
    };

    this.machines.push(newMachine);
    return newMachine;
  }

  public setMachineOperating(id: string, operating: boolean): boolean {
    const machine = this.machines.find(m => m.id === id);
    if (!machine) return false;
    machine.operating = operating;
    machine.status = operating ? 'RUNNING' : 'IDLE';
    return true;
  }

  public setOperatingCount(count: number): number {
    const validCount = Math.max(0, Math.min(count, this.machines.length));
    this.machines.forEach((m, idx) => {
      const shouldOperate = idx < validCount;
      m.operating = shouldOperate;
      m.status = shouldOperate ? 'RUNNING' : 'IDLE';
    });
    return validCount;
  }

  public serviceMachine(id: string): boolean {
    const machine = this.machines.find(m => m.id === id);
    if (!machine) return false;
    machine.efficiency = 1.0;
    if (machine.operating) {
      machine.status = 'RUNNING';
    }
    return true;
  }

  public recordProduction(unitsProduced: number): void {
    const active = this.getActiveMachines();
    if (active.length === 0 || unitsProduced <= 0) return;
    const perMachine = unitsProduced / active.length;
    active.forEach(m => {
      m.totalProduced += perMachine;
    });
  }
}


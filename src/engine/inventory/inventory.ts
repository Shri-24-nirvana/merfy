import { InventoryState, InventoryItem } from '@/types/simulation';

export class InventoryManager {
  private rawMaterials: InventoryItem;
  private finishedGoods: InventoryItem;

  constructor(
    initialRawMaterials: number = 6000,
    rawMaterialUnitCost: number = 2.0,
    reorderThreshold: number = 1000,
    initialFinishedGoods: number = 0
  ) {
    this.rawMaterials = {
      id: 'INV-RAW-01',
      name: 'Preforms & Syrup Base',
      quantity: initialRawMaterials,
      unit: 'units',
      unitCost: rawMaterialUnitCost,
      reorderThreshold,
    };

    this.finishedGoods = {
      id: 'INV-FG-01',
      name: 'Packaged Apex Beverages',
      quantity: initialFinishedGoods,
      unit: 'bottles',
      unitCost: rawMaterialUnitCost + 1.5, // approximate cost basis
      reorderThreshold: 0,
    };
  }

  public getState(): InventoryState {
    return {
      rawMaterials: { ...this.rawMaterials },
      finishedGoods: { ...this.finishedGoods },
    };
  }

  public getRawMaterialsQuantity(): number {
    return this.rawMaterials.quantity;
  }

  public getFinishedGoodsQuantity(): number {
    return this.finishedGoods.quantity;
  }

  public consumeRawMaterials(amount: number): number {
    if (amount <= 0) return 0;
    const consumed = Math.min(this.rawMaterials.quantity, amount);
    this.rawMaterials.quantity -= consumed;
    return consumed;
  }

  public addFinishedGoods(amount: number): void {
    if (amount <= 0) return;
    this.finishedGoods.quantity += amount;
  }

  public withdrawFinishedGoods(amount: number): number {
    if (amount <= 0) return 0;
    const withdrawn = Math.min(this.finishedGoods.quantity, amount);
    this.finishedGoods.quantity -= withdrawn;
    return withdrawn;
  }

  public addRawMaterials(amount: number): void {
    if (amount <= 0) return;
    this.rawMaterials.quantity += amount;
  }

  public getRawMaterialsValue(): number {
    return this.rawMaterials.quantity * this.rawMaterials.unitCost;
  }

  public getFinishedGoodsValue(): number {
    return this.finishedGoods.quantity * this.finishedGoods.unitCost;
  }

  public isRawMaterialsLow(): boolean {
    return this.rawMaterials.quantity <= this.rawMaterials.reorderThreshold;
  }

  public isRawMaterialsDepleted(): boolean {
    return this.rawMaterials.quantity <= 0;
  }
}

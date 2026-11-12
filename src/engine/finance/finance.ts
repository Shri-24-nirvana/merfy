import { BusinessState } from '@/types/simulation';
import { FinancialTransaction } from '@/types/business';

export class FinanceManager {
  private state: BusinessState;
  private transactions: FinancialTransaction[] = [];
  private readonly fixedDailyOverhead: number;
  private readonly hoursPerDay: number;

  constructor(startingCash: number, fixedDailyOverhead: number = 200, hoursPerDay: number = 24) {
    this.state = {
      cash: startingCash,
      revenue: 0,
      expenses: 0,
      profit: 0,
      totalAssets: startingCash,
      dailyRevenue: 0,
      dailyExpenses: 0,
      burnRatePerHour: fixedDailyOverhead / hoursPerDay,
    };
    this.fixedDailyOverhead = fixedDailyOverhead;
    this.hoursPerDay = hoursPerDay;
  }

  public getState(): BusinessState {
    return { ...this.state };
  }

  public getTransactions(): FinancialTransaction[] {
    return [...this.transactions];
  }

  public recordRevenue(
    amount: number,
    tick: number,
    day: number,
    category: FinancialTransaction['category'],
    description: string
  ): void {
    if (amount <= 0) return;
    this.state.cash += amount;
    this.state.revenue += amount;
    this.state.dailyRevenue += amount;
    this.state.profit = this.state.revenue - this.state.expenses;

    this.transactions.push({
      id: `TX-REV-${tick}-${this.transactions.length + 1}`,
      tick,
      day,
      type: 'INCOME',
      category,
      amount,
      description,
      resultingCash: this.state.cash,
    });
  }

  public recordExpense(
    amount: number,
    tick: number,
    day: number,
    category: FinancialTransaction['category'],
    description: string,
    isCapex: boolean = false
  ): void {
    if (amount <= 0) return;
    this.state.cash -= amount;
    if (!isCapex) {
      this.state.expenses += amount;
      this.state.dailyExpenses += amount;
      this.state.profit = this.state.revenue - this.state.expenses;
    }

    this.transactions.push({
      id: `TX-EXP-${tick}-${this.transactions.length + 1}`,
      tick,
      day,
      type: isCapex ? 'CAPEX' : 'EXPENSE',
      category,
      amount,
      description,
      resultingCash: this.state.cash,
    });
  }

  public applyHourlyFixedCosts(
    tick: number,
    day: number,
    activeMachinesCount: number,
    machineDailyMaintenance: number = 50
  ): number {
    const hourlyOverhead = this.fixedDailyOverhead / this.hoursPerDay;
    const hourlyMaintenance = (activeMachinesCount * machineDailyMaintenance) / this.hoursPerDay;
    const totalHourlyFixedCost = hourlyOverhead + hourlyMaintenance;

    this.state.cash -= totalHourlyFixedCost;
    this.state.expenses += totalHourlyFixedCost;
    this.state.dailyExpenses += totalHourlyFixedCost;
    this.state.profit = this.state.revenue - this.state.expenses;
    this.state.burnRatePerHour = totalHourlyFixedCost;

    return totalHourlyFixedCost;
  }

  public resetDailyCounters(): void {
    this.state.dailyRevenue = 0;
    this.state.dailyExpenses = 0;
  }

  public updateTotalAssets(
    rawMaterialValue: number,
    finishedGoodsValue: number,
    machinesBookValue: number
  ): void {
    this.state.totalAssets = Math.round((this.state.cash + rawMaterialValue + finishedGoodsValue + machinesBookValue) * 100) / 100;
  }
}


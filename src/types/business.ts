export interface FinancialTransaction {
  id: string;
  tick: number;
  day: number;
  type: 'INCOME' | 'EXPENSE' | 'CAPEX';
  category: 'REVENUE_ORDER' | 'RAW_MATERIAL' | 'CAPEX_MACHINE' | 'MACHINE_MAINTENANCE' | 'FACILITY_OVERHEAD' | 'DIRECT_PRODUCTION_COST';
  amount: number;
  description: string;
  resultingCash: number;
}

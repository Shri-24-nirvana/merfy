import { ScenarioConfig } from '@/types/scenario';

export const FinCorpScenario: ScenarioConfig = {
  id: 'fincorp-treasury',
  version: '1.0.0',
  name: 'FinCorp Capital',
  domain: 'Finance',
  difficulty: 'Hard',
  role: 'Treasury Director',
  tagline: 'Navigate a liquidity crunch, interest rate shocks, and debt covenant breaches.',
  description:
    'As Treasury Director at FinCorp Capital, manage $5M in short-term working capital through 30 days of interest rate volatility, supplier payment demands, and tightening credit lines. Keep the Quick Ratio above 1.2 or face covenant breach.',
  overview:
    'FinCorp Capital has $2M cash, $4M in short-term receivables, and $3M in AP due within 30 days. The Fed just hiked rates by 75bps — your revolving credit cost jumped. On Day 8, a major client requests 60-day payment extension. On Day 15, your largest supplier demands early payment or threatens supply disruption. On Day 22, a hedge fund acquires 15% of your equity and demands a dividend — just as your Q3 revolver draw hits its covenant limit.',
  learningObjectives: [
    'Master cash flow forecasting and liquidity management.',
    'Understand debt covenants and quick ratio monitoring.',
    'Experience interest rate sensitivity in working capital.',
    'Balance short-term financing decisions against long-term covenant obligations.',
  ],
  strategicPaths: [
    { name: 'Cash Conservation', description: 'Delay AP, accelerate AR collection, avoid new credit drawdowns.', focus: 'Liquidity First, Relationship Risk' },
    { name: 'Credit Line Utilization', description: 'Draw on revolvers strategically to smooth cash gaps.', focus: 'Smooth Operations, Interest Cost' },
    { name: 'Factoring & AR Acceleration', description: 'Factor receivables at a discount to generate immediate cash.', focus: 'Speed over Cost Efficiency' },
  ],
  durationDays: 30,
  ticksPerHour: 1,
  hoursPerDay: 24,
  initialBusiness: { startingCash: 2000000, fixedDailyOverhead: 15000, bankruptcyCashThreshold: -200000 },
  productionParams: {
    capacityUnit: 'transactions_per_day',
    baseProductionCapacity: 100,
    additionalMachineCost: 100000,
    additionalMachineCapacity: 50,
    maxMachineCount: 5,
    productionCostPerUnit: 500.0,
    rawMaterialUnitsPerBottle: 1,
  },
  inventoryParams: {
    initialRawMaterials: 500,
    rawMaterialUnitCost: 500,
    reorderBatchSize: 100,
    initialFinishedGoods: 200,
    rawMaterialReorderThreshold: 80,
  },
  machines: [
    { id: 'DESK-IB', name: 'Institutional Banking Desk', purchaseCost: 100000, productionCapacity: 50, operating: true, maintenanceCostPerDay: 2000 },
    { id: 'DESK-TM', name: 'Treasury Management Desk', purchaseCost: 80000, productionCapacity: 50, operating: true, maintenanceCostPerDay: 1500 },
  ],
  initialOrders: [
    { id: 'ORDER-FC-001', customer: 'AP Obligation — Supplier Payments Due D10', quantity: 60, pricePerUnit: 25000, deadlineDay: 10, depositPercent: 0 },
    { id: 'ORDER-FC-002', customer: 'Revolving Credit Repayment Window', quantity: 40, pricePerUnit: 30000, deadlineDay: 20, depositPercent: 0 },
    { id: 'ORDER-FC-003', customer: 'Q3 Covenant Compliance — Quick Ratio 1.2+', quantity: 30, pricePerUnit: 10000, deadlineDay: 30, depositPercent: 0 },
  ],
  scheduledEvents: [
    {
      id: 'EVT-FC-001', day: 8, hour: 10, type: 'EQUIPMENT_ALERT',
      title: 'Key Client Requests 60-Day Payment Extension',
      description: 'Your largest receivable ($800k) customer requests a 60-day extension due to their own liquidity crunch. Accept or pursue collection?',
      payload: { alert_type: 'ar_extension_request', client: 'TechCorp Inc', amount: 800000, extension_days: 60 },
    },
    {
      id: 'EVT-FC-002', day: 15, hour: 9, type: 'EQUIPMENT_ALERT',
      title: 'Supplier Demands Early Payment — Supply Threat',
      description: 'Primary data supplier demands $500k early payment or threatens 30-day supply stoppage. You have 72 hours to decide.',
      payload: { alert_type: 'early_payment_demand', supplier: 'DataStream Corp', amount: 500000, deadline_hours: 72 },
    },
    {
      id: 'EVT-FC-003', day: 22, hour: 11, type: 'NEW_ORDER',
      title: 'Activist Shareholder Demands Dividend',
      description: 'Hedge fund (15% stake) demands a $300k special dividend — just as covenant limits approach. Distribute or negotiate?',
      payload: { id: 'ORDER-FC-004', customer: 'Activist Dividend Obligation', quantity: 10, selling_price_per_bottle: 30000, deadlineDay: 28 },
    },
  ],
  supportedActions: ['ACCEPT_ORDER', 'REJECT_ORDER', 'ORDER_RAW_MATERIALS', 'SERVICE_MACHINE', 'TOGGLE_MACHINE_OPERATION'],
};

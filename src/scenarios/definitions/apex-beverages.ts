import { ScenarioConfig } from '@/types/scenario';

export const ApexBeveragesScenario: ScenarioConfig = {
  id: 'apex-beverages',
  version: '1.0.0',
  name: 'Apex Beverages',
  domain: 'Manufacturing',
  difficulty: 'Easy',
  role: 'Operations Manager',
  tagline: 'Scale bottling capacity, coordinate raw inventory, and fulfill high-value retailer contracts.',
  description:
    'Manage an automated beverage manufacturing plant. Balance production capacity, inventory buffering, capital investments in machinery, and fulfillment deadlines to build a profitable enterprise.',
  overview:
    'As Operations Manager at Apex Beverages, you have inherited a clean manufacturing facility with $100,000 in treasury and 1 operational bottling line (800 bottles/day capacity). Your immediate anchor client (Global Supermarkets) has placed a 5,000-bottle purchase order due by Day 5. On Day 3, regional distributors will arrive with premium spot contracts. Will you aggressively expand with new machinery, run lean on single-shift operations, or pivot as market conditions unfold?',
  learningObjectives: [
    'Master production planning against strict delivery deadlines.',
    'Evaluate return on capital investments (CapEx vs OpEx in machine expansion).',
    'Manage supply chain buffer stocks to avoid costly bottling plant idle time.',
    'Experience cash flow volatility in high-volume, thin-margin manufacturing.',
  ],
  strategicPaths: [
    {
      name: 'Expansion Strategy',
      description: 'Invest $20,000 to add additional bottling lines early, expanding capacity to 1,000-1,200 bottles/day to fulfill both orders with ease.',
      focus: 'High CapEx, High Volume Throughput',
    },
    {
      name: 'Conservative Strategy',
      description: 'Preserve cash with the single base line. Carefully monitor whether to take the Day 3 order or prioritize safety margins.',
      focus: 'Low Risk, High Cash Reserves',
    },
    {
      name: 'Flexible Strategy',
      description: 'Run machine 1 at 100% capacity, evaluate the incoming Day 3 premium order ($16/bottle), and procure equipment only when orders are locked.',
      focus: 'Adaptive Investment & Margin Maximization',
    },
  ],
  durationDays: 7,
  ticksPerHour: 1,
  hoursPerDay: 24,
  initialBusiness: {
    startingCash: 100000,
    fixedDailyOverhead: 200, // $200/day facility overhead
    bankruptcyCashThreshold: -10000, // Credit limit allows minor overdraft but fails past -$10k
  },
  productionParams: {
    capacityUnit: 'bottles_per_day',
    baseProductionCapacity: 800,
    additionalMachineCost: 20000,
    additionalMachineCapacity: 200,
    maxMachineCount: 5,
    productionCostPerUnit: 1.5, // $1.50 per bottle variable operating cost
    rawMaterialUnitsPerBottle: 1, // 1 unit raw syrup/preform per bottle
  },
  inventoryParams: {
    initialRawMaterials: 6000, // 6,000 units on hand
    rawMaterialUnitCost: 2.0, // $2.00 per unit
    reorderBatchSize: 2000,
    initialFinishedGoods: 0,
    rawMaterialReorderThreshold: 1200,
  },
  machines: [
    {
      id: 'M-01',
      name: 'Apex Bottling Line 01',
      purchaseCost: 20000,
      productionCapacity: 800,
      operating: true,
      maintenanceCostPerDay: 50,
    },
  ],
  initialOrders: [
    {
      id: 'ORDER-001',
      customer: 'Global Supermarket Corp',
      quantity: 5000,
      pricePerUnit: 12,
      deadlineDay: 5,
      depositPercent: 0,
    },
  ],
  scheduledEvents: [
    {
      id: 'EVENT-001',
      day: 3,
      hour: 9,
      type: 'NEW_ORDER',
      title: 'Incoming Spot Demand: Metro Retailers',
      description: 'Metro Retailers Inc. has issued an urgent purchase order for 3,200 bottles at an attractive price of $16/bottle, delivery within 4 days (Day 7).',
      payload: {
        id: 'ORDER-002',
        customer: 'Metro Retailers Inc.',
        quantity: 3200,
        selling_price_per_bottle: 16,
        delivery_period: '4 days',
        deadlineDay: 7,
      },
    },
  ],
  supportedActions: [
    'PURCHASE_MACHINE',
    'ACCEPT_ORDER',
    'REJECT_ORDER',
    'SET_MACHINE_OPERATING_COUNT',
    'MANAGE_INVENTORY',
    'ORDER_RAW_MATERIALS',
    'SERVICE_MACHINE',
  ],
};


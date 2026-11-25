import { ScenarioConfig } from '@/types/scenario';

export const OmniMartScenario: ScenarioConfig = {
  id: 'omnimart-retail',
  version: '1.0.0',
  name: 'OmniMart Express',
  domain: 'Retail',
  difficulty: 'Medium',
  role: 'Category Merchandiser',
  tagline: 'Optimize shelf space, clearance pricing, and omnichannel inventory to maximize GMROI.',
  description:
    'You manage the beverages category for OmniMart Express — a 500-store retail chain. Balance inventory across online and offline channels, trigger clearance markdowns to prevent stockouts, and hit GMROI targets.',
  overview:
    'As Category Merchandiser, you have $200,000 in open-to-buy budget and 3 distribution centers. 14 virtual days simulate a peak seasonal promotion window. Day 1 starts with a stockout in your flagship energy drink SKU. On Day 5, a competitor launches a competing product. On Day 10, your biggest store cluster requests a 20% markdown on slow-moving SKUs. Your goal: hit 2.5 GMROI while keeping stockout rate below 8%.',
  learningObjectives: [
    'Master category-level inventory management across channels.',
    'Understand GMROI drivers and markdown economics.',
    'Balance promotional uplift against stockout risk.',
    'Manage supplier lead times and reorder cycles.',
  ],
  strategicPaths: [
    { name: 'Push Strategy', description: 'Pre-build inventory to meet promotional peak demand.', focus: 'High Stock, High Sales Volume' },
    { name: 'Pull Strategy', description: 'Reorder reactively based on actual sell-through signals.', focus: 'Low Waste, Responsive Replenishment' },
    { name: 'Markdown Velocity', description: 'Use clearance pricing aggressively to free shelf space for premium SKUs.', focus: 'Space Productivity & Margin Mix' },
  ],
  durationDays: 14,
  ticksPerHour: 1,
  hoursPerDay: 24,
  initialBusiness: { startingCash: 200000, fixedDailyOverhead: 1200, bankruptcyCashThreshold: -20000 },
  productionParams: {
    capacityUnit: 'units_per_day',
    baseProductionCapacity: 2000,
    additionalMachineCost: 30000,
    additionalMachineCapacity: 500,
    maxMachineCount: 5,
    productionCostPerUnit: 2.5,
    rawMaterialUnitsPerBottle: 1,
  },
  inventoryParams: {
    initialRawMaterials: 10000,
    rawMaterialUnitCost: 3.0,
    reorderBatchSize: 3000,
    initialFinishedGoods: 500,
    rawMaterialReorderThreshold: 2000,
  },
  machines: [
    { id: 'DC-01', name: 'Distribution Center East', purchaseCost: 30000, productionCapacity: 2000, operating: true, maintenanceCostPerDay: 120 },
    { id: 'DC-02', name: 'Distribution Center West', purchaseCost: 30000, productionCapacity: 2000, operating: true, maintenanceCostPerDay: 120 },
  ],
  initialOrders: [
    { id: 'ORDER-OM-001', customer: 'Metro Cluster A (200 Stores)', quantity: 8000, pricePerUnit: 8.5, deadlineDay: 7, depositPercent: 15 },
    { id: 'ORDER-OM-002', customer: 'OmniMart Online Flash Sale', quantity: 3000, pricePerUnit: 9.0, deadlineDay: 4, depositPercent: 0 },
  ],
  scheduledEvents: [
    {
      id: 'EVT-OM-001', day: 5, hour: 10, type: 'NEW_ORDER',
      title: 'Competitor Launch — Defensive Reorder Needed',
      description: 'Rival brand launched in 150 stores. Marketing demands a defensive 10% price cut on flagship SKU. Additional retailer demand incoming.',
      payload: { id: 'ORDER-OM-003', customer: 'Defensive Replenishment — 150 Stores', quantity: 4000, selling_price_per_bottle: 7.8, deadlineDay: 10 },
    },
    {
      id: 'EVT-OM-002', day: 10, hour: 9, type: 'NEW_ORDER',
      title: 'Clearance Window — Premium Shelf Opportunity',
      description: 'Premium shelf slot opened in 300 stores. High-volume premium order available at $11/unit. Must have stock to commit.',
      payload: { id: 'ORDER-OM-004', customer: 'Premium Shelf Cluster (300 Stores)', quantity: 5000, selling_price_per_bottle: 11.0, deadlineDay: 14 },
    },
  ],
  supportedActions: ['ACCEPT_ORDER', 'REJECT_ORDER', 'ORDER_RAW_MATERIALS', 'MANAGE_INVENTORY', 'SERVICE_MACHINE', 'TOGGLE_MACHINE_OPERATION'],
};

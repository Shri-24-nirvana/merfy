import { ScenarioConfig } from '@/types/scenario';

export const SwiftCargoScenario: ScenarioConfig = {
  id: 'swiftcargo-logistics',
  version: '1.0.0',
  name: 'SwiftCargo Fleet',
  domain: 'Logistics',
  difficulty: 'Medium',
  role: 'Dispatch & Fleet Director',
  tagline: 'Route electric delivery trucks, mitigate fuel cost surges, and hit on-time delivery across 4 hubs.',
  description:
    'As Dispatch & Fleet Director at SwiftCargo, manage a 40-truck electric fleet across 4 fulfillment hubs. Optimize route assignments, manage driver shift costs, and prevent delivery delay penalties while keeping fuel/charge costs within budget.',
  overview:
    'SwiftCargo operates 4 hubs (North, South, East, West) serving 300 delivery zones across the metro region. You have 40 trucks and $150,000 in operating budget for 10 days. Day 2: a storm grounds 8 trucks in the North hub. Day 5: a surge in e-commerce orders triples the South hub demand. Day 8: a city road closure forces rererouting of 25% of your Eastern routes. Keep on-time delivery rate above 90% and fuel cost below $3.20/ton-mile.',
  learningObjectives: [
    'Master last-mile delivery optimization and hub rebalancing.',
    'Experience the operational impact of fleet disruptions.',
    'Understand fuel/energy cost management in electric fleets.',
    'Balance driver shift costs against service level commitments.',
  ],
  strategicPaths: [
    { name: 'Hub Specialization', description: 'Assign trucks permanently to hubs for efficiency.', focus: 'Low Rebalancing Cost, Low Flexibility' },
    { name: 'Dynamic Routing', description: 'Dynamically reassign trucks cross-hub based on demand signals.', focus: 'High Flexibility, Rebalancing Cost' },
    { name: 'Buffer Fleet', description: 'Keep 20% of trucks as a flex reserve for surge absorbing.', focus: 'High Reliability, Lower Utilization' },
  ],
  durationDays: 10,
  ticksPerHour: 1,
  hoursPerDay: 24,
  initialBusiness: { startingCash: 150000, fixedDailyOverhead: 3500, bankruptcyCashThreshold: -20000 },
  productionParams: {
    capacityUnit: 'deliveries_per_day',
    baseProductionCapacity: 800,
    additionalMachineCost: 45000,
    additionalMachineCapacity: 200,
    maxMachineCount: 6,
    productionCostPerUnit: 8.5,
    rawMaterialUnitsPerBottle: 1,
  },
  inventoryParams: {
    initialRawMaterials: 4000,
    rawMaterialUnitCost: 2.5,
    reorderBatchSize: 1000,
    initialFinishedGoods: 0,
    rawMaterialReorderThreshold: 500,
  },
  machines: [
    { id: 'HUB-N', name: 'North Hub Fleet (12 Trucks)', purchaseCost: 0, productionCapacity: 240, operating: true, maintenanceCostPerDay: 600 },
    { id: 'HUB-S', name: 'South Hub Fleet (10 Trucks)', purchaseCost: 0, productionCapacity: 200, operating: true, maintenanceCostPerDay: 500 },
    { id: 'HUB-E', name: 'East Hub Fleet (10 Trucks)', purchaseCost: 0, productionCapacity: 200, operating: true, maintenanceCostPerDay: 500 },
    { id: 'HUB-W', name: 'West Hub Fleet (8 Trucks)', purchaseCost: 0, productionCapacity: 160, operating: true, maintenanceCostPerDay: 400 },
  ],
  initialOrders: [
    { id: 'ORDER-SC-001', customer: 'Metro Retail Chain — Daily Fulfillment', quantity: 3000, pricePerUnit: 12, deadlineDay: 5, depositPercent: 10 },
    { id: 'ORDER-SC-002', customer: 'E-Commerce 10-Day SLA Commitment', quantity: 7000, pricePerUnit: 11, deadlineDay: 10, depositPercent: 5 },
  ],
  scheduledEvents: [
    {
      id: 'EVT-SC-001', day: 2, hour: 6, type: 'EQUIPMENT_ALERT',
      title: 'Storm Grounds 8 North Hub Trucks',
      description: 'Severe weather grounds 8 trucks in North Hub. You must redistribute routes or face delivery failures on 200+ orders today.',
      payload: { alert_type: 'fleet_outage', hub: 'HUB-N', trucks_grounded: 8, duration_hours: 36 },
    },
    {
      id: 'EVT-SC-002', day: 5, hour: 8, type: 'NEW_ORDER',
      title: 'E-Commerce Surge — South Hub 3x Demand',
      description: 'Major online sale event tripled South Hub order volume. Additional capacity commitment opportunity at premium per-delivery rate.',
      payload: { id: 'ORDER-SC-003', customer: 'Flash Sale Surge — South Hub', quantity: 2000, selling_price_per_bottle: 14, deadlineDay: 7 },
    },
    {
      id: 'EVT-SC-003', day: 8, hour: 7, type: 'EQUIPMENT_ALERT',
      title: 'Road Closure — 25% East Routes Blocked',
      description: 'City road closure blocks 25% of Eastern delivery zones. You must reroute 500 deliveries or negotiate SLA extensions.',
      payload: { alert_type: 'route_disruption', hub: 'HUB-E', routes_affected_pct: 25, closure_days: 2 },
    },
  ],
  supportedActions: ['ACCEPT_ORDER', 'REJECT_ORDER', 'ORDER_RAW_MATERIALS', 'TOGGLE_MACHINE_OPERATION', 'SERVICE_MACHINE', 'PURCHASE_MACHINE'],
};

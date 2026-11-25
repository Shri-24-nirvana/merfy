import { ScenarioConfig } from '@/types/scenario';

export const GrandAzureScenario: ScenarioConfig = {
  id: 'grandazure-hospitality',
  version: '1.0.0',
  name: 'Grand Azure Resort',
  domain: 'Hospitality',
  difficulty: 'Easy',
  role: 'General Manager',
  tagline: 'Optimize RevPAR, manage peak weekend staffing, and maximize banquet yield across 30 days.',
  description:
    'As General Manager of the Grand Azure Resort, a 220-room luxury property, optimize room rates dynamically, manage staffing across peak weekends, and maximize banquet event revenue while keeping Guest NPS above 72.',
  overview:
    'Grand Azure is a 220-room luxury resort with 3 banquet halls and a full-service spa. You start with 60% occupancy and $180,000 in monthly revenue target. Weekends command premium rates but require surge staffing. Day 7 is a major conference arrival (200 delegates). Day 15 brings a negative TripAdvisor review crisis. Day 22 offers a banquet bid for a high-value wedding. Guest NPS target: 72+. RevPAR target: $185+.',
  learningObjectives: [
    'Understand RevPAR optimization and dynamic pricing.',
    'Experience peak staffing trade-offs and labor cost management.',
    'Manage guest satisfaction vs revenue maximization.',
    'Practice banquet yield management and event pricing.',
  ],
  strategicPaths: [
    { name: 'Revenue Maximization', description: 'Push room rates and banquet prices aggressively during peak periods.', focus: 'High RevPAR, NPS Risk' },
    { name: 'Guest-First', description: 'Prioritize NPS and guest experience over yield optimization.', focus: 'High NPS, Moderate Revenue' },
    { name: 'Events & Banquets', description: 'Focus on banquet yield and conference hosting as the primary revenue driver.', focus: 'Event Revenue, Low Occupancy Focus' },
  ],
  durationDays: 30,
  ticksPerHour: 1,
  hoursPerDay: 24,
  initialBusiness: { startingCash: 180000, fixedDailyOverhead: 4800, bankruptcyCashThreshold: -30000 },
  productionParams: {
    capacityUnit: 'room_nights_per_day',
    baseProductionCapacity: 132,
    additionalMachineCost: 20000,
    additionalMachineCapacity: 30,
    maxMachineCount: 5,
    productionCostPerUnit: 85.0,
    rawMaterialUnitsPerBottle: 1,
  },
  inventoryParams: {
    initialRawMaterials: 1000,
    rawMaterialUnitCost: 45.0,
    reorderBatchSize: 300,
    initialFinishedGoods: 60,
    rawMaterialReorderThreshold: 150,
  },
  machines: [
    { id: 'WING-A', name: 'Oceanview Wing (80 Rooms)', purchaseCost: 0, productionCapacity: 72, operating: true, maintenanceCostPerDay: 1800 },
    { id: 'WING-B', name: 'Garden Wing (80 Rooms)', purchaseCost: 0, productionCapacity: 60, operating: true, maintenanceCostPerDay: 1400 },
    { id: 'BQHT', name: 'Banquet Halls (3 Halls)', purchaseCost: 0, productionCapacity: 30, operating: true, maintenanceCostPerDay: 600 },
  ],
  initialOrders: [
    { id: 'ORDER-GA-001', customer: 'Monthly Occupancy Target — 70% Avg', quantity: 4620, pricePerUnit: 185, deadlineDay: 30, depositPercent: 0 },
    { id: 'ORDER-GA-002', customer: 'Business Conference Block (Day 7)', quantity: 200, pricePerUnit: 220, deadlineDay: 10, depositPercent: 20 },
  ],
  scheduledEvents: [
    {
      id: 'EVT-GA-001', day: 7, hour: 14, type: 'NEW_ORDER',
      title: 'Corporate Conference Arrives — 200 Delegates',
      description: 'The annual TechVenture Summit arrives with 200 delegates. Full board occupancy for 3 nights. Banquet dinner bid opportunity.',
      payload: { id: 'ORDER-GA-003', customer: 'TechVenture Summit Banquet', quantity: 600, selling_price_per_bottle: 250, deadlineDay: 10 },
    },
    {
      id: 'EVT-GA-002', day: 15, hour: 10, type: 'EQUIPMENT_ALERT',
      title: 'TripAdvisor Negative Review Crisis',
      description: 'A series of 1-star reviews went viral citing housekeeping issues. NPS at risk. Emergency service recovery investment needed.',
      payload: { alert_type: 'nps_crisis', reviews_negative: 12, nps_impact: -15, recovery_cost: 8000 },
    },
    {
      id: 'EVT-GA-003', day: 22, hour: 11, type: 'NEW_ORDER',
      title: 'High-Value Wedding Bid Opportunity',
      description: 'An elite wedding party requests exclusive use of the Oceanview Wing + all 3 banquet halls for 2 days. Premium rates negotiable.',
      payload: { id: 'ORDER-GA-004', customer: 'Exclusive Wedding — 2-Day Resort Buyout', quantity: 160, selling_price_per_bottle: 380, deadlineDay: 24 },
    },
  ],
  supportedActions: ['ACCEPT_ORDER', 'REJECT_ORDER', 'ORDER_RAW_MATERIALS', 'TOGGLE_MACHINE_OPERATION', 'SERVICE_MACHINE', 'PURCHASE_MACHINE'],
};

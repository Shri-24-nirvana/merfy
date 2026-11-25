import { ScenarioConfig } from '@/types/scenario';

export const VulcanSteelScenario: ScenarioConfig = {
  id: 'steelmill-operations',
  version: '1.0.0',
  name: 'Vulcan Steelworks',
  domain: 'Operations',
  difficulty: 'Advanced',
  role: 'Plant Superintendent',
  tagline: 'Schedule blast furnaces, optimize thermal efficiency, and hit OEE targets in a live steelworks.',
  description:
    'As Plant Superintendent at Vulcan Steelworks, manage 3 blast furnaces over 14 days. Balance thermal heat efficiency, schedule mandatory kiln shutdowns, enforce high-temperature safety compliance, and hit OEE targets above 82% while keeping scrap rate below 4%.',
  overview:
    'Vulcan Steelworks operates 3 blast furnaces with a combined capacity of 1,200 tons/day. You start with Furnace 3 showing thermal degradation. On Day 4, a refractory lining inspection is mandatory — taking one furnace offline for 48 hours. On Day 7, a major steel order arrives from an infrastructure client requiring 8,000 tons in 7 days. On Day 10, a safety compliance audit threatens to halt operations if any temperature deviations are found. OEE target: 82%+. Scrap rate target: <4%.',
  learningObjectives: [
    'Master OEE (Availability × Performance × Quality) in heavy industry.',
    'Experience thermal efficiency management and planned downtime scheduling.',
    'Balance production commitments against safety compliance obligations.',
    'Understand capital maintenance trade-offs in continuous-process industries.',
  ],
  strategicPaths: [
    { name: 'Maximum Throughput', description: 'Run all furnaces at 95%+ utilization, accept higher maintenance risk.', focus: 'High OEE, High Scrap Risk' },
    { name: 'Planned Maintenance', description: 'Schedule proactive kiln shutdowns to prevent catastrophic failures.', focus: 'Moderate OEE, Low Scrap, High Reliability' },
    { name: 'Safety-First Compliance', description: 'Prioritize temperature compliance and audit readiness over throughput.', focus: 'Zero Safety Incidents, Moderate OEE' },
  ],
  durationDays: 14,
  ticksPerHour: 1,
  hoursPerDay: 24,
  initialBusiness: { startingCash: 500000, fixedDailyOverhead: 18000, bankruptcyCashThreshold: -100000 },
  productionParams: {
    capacityUnit: 'tons_per_day',
    baseProductionCapacity: 1200,
    additionalMachineCost: 200000,
    additionalMachineCapacity: 400,
    maxMachineCount: 5,
    productionCostPerUnit: 320.0,
    rawMaterialUnitsPerBottle: 1,
  },
  inventoryParams: {
    initialRawMaterials: 15000,
    rawMaterialUnitCost: 180.0,
    reorderBatchSize: 5000,
    initialFinishedGoods: 0,
    rawMaterialReorderThreshold: 3000,
  },
  machines: [
    { id: 'BF-01', name: 'Blast Furnace #1 (450t/d)', purchaseCost: 200000, productionCapacity: 450, operating: true, maintenanceCostPerDay: 6000 },
    { id: 'BF-02', name: 'Blast Furnace #2 (450t/d)', purchaseCost: 200000, productionCapacity: 450, operating: true, maintenanceCostPerDay: 6000 },
    { id: 'BF-03', name: 'Blast Furnace #3 (300t/d — Degraded)', purchaseCost: 150000, productionCapacity: 300, operating: true, maintenanceCostPerDay: 4500 },
  ],
  initialOrders: [
    { id: 'ORDER-VS-001', customer: 'SteelBridge Corp — Week 1 Delivery', quantity: 6000, pricePerUnit: 580, deadlineDay: 7, depositPercent: 15 },
  ],
  scheduledEvents: [
    {
      id: 'EVT-VS-001', day: 4, hour: 6, type: 'EQUIPMENT_ALERT',
      title: 'Mandatory Refractory Inspection — BF-03 Offline 48h',
      description: 'Regulatory mandate requires refractory lining inspection on BF-03. Must be taken offline for 48 hours starting today. Non-compliance risks plant shutdown.',
      payload: { alert_type: 'mandatory_maintenance', furnace: 'BF-03', downtime_hours: 48, penalty_if_skipped: 150000 },
    },
    {
      id: 'EVT-VS-002', day: 7, hour: 9, type: 'NEW_ORDER',
      title: 'Infrastructure Client — 8,000 Ton Rush Order',
      description: 'National infrastructure project requires 8,000 tons of structural steel in 7 days at premium pricing ($620/ton). High-value but demanding.',
      payload: { id: 'ORDER-VS-002', customer: 'NationalBuild Infrastructure', quantity: 8000, selling_price_per_bottle: 620, deadlineDay: 14 },
    },
    {
      id: 'EVT-VS-003', day: 10, hour: 8, type: 'EQUIPMENT_ALERT',
      title: 'Safety Compliance Audit — Temperature Deviation Alert',
      description: 'Government safety auditors arrive. Any temperature deviation on record may result in a 24-hour mandatory shutdown. Review operating parameters now.',
      payload: { alert_type: 'safety_audit', audit_duration_hours: 8, shutdown_risk: 'HIGH', compliance_cost: 25000 },
    },
  ],
  supportedActions: ['ACCEPT_ORDER', 'REJECT_ORDER', 'ORDER_RAW_MATERIALS', 'TOGGLE_MACHINE_OPERATION', 'SERVICE_MACHINE', 'PURCHASE_MACHINE'],
};

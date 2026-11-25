import { ScenarioConfig } from '@/types/scenario';

export const CloudScaleSaaSScenario: ScenarioConfig = {
  id: 'saas-pipeline',
  version: '1.0.0',
  name: 'CloudScale SaaS',
  domain: 'Sales',
  difficulty: 'Medium',
  role: 'VP of Enterprise Sales',
  tagline: 'Manage pipeline hygiene, quota allocation, and win rates across a $5M enterprise sales quarter.',
  description:
    'As VP of Enterprise Sales at CloudScale SaaS, lead a 12-person sales team through Q4. Allocate quotas, manage pipeline hygiene, control discount approvals, and pair solutions engineers to maximize win rate and quota attainment.',
  overview:
    'CloudScale has a $5M Q4 quota across 12 AEs in 3 segments (SMB, Mid-Market, Enterprise). You start with 65% pipeline coverage and $3.2M in qualified deals. Week 2: your top AE goes on sick leave. Week 5: a competitor is running aggressive discounting in your Enterprise segment. Week 10: a $900k deal requires executive business review and 25% discount approval. Hit 85%+ quota attainment and <18% average discount rate.',
  learningObjectives: [
    'Understand sales funnel management and pipeline coverage ratios.',
    'Experience quota allocation and territory management.',
    'Balance discount approvals against win rate optimization.',
    'Manage sales team capacity and deal prioritization.',
  ],
  strategicPaths: [
    { name: 'Enterprise Focus', description: 'Push large enterprise deals — higher ACV but longer sales cycles.', focus: 'High ACV, Low Velocity, High Win Risk' },
    { name: 'SMB Volume', description: 'Go after high-velocity SMB deals to build coverage quickly.', focus: 'High Volume, Lower ACV, Faster Close' },
    { name: 'Balanced Pipeline', description: 'Maintain balance across segments with tight pipeline hygiene standards.', focus: 'Predictable Revenue, Moderate Risk' },
  ],
  durationDays: 90,
  ticksPerHour: 1,
  hoursPerDay: 24,
  initialBusiness: { startingCash: 800000, fixedDailyOverhead: 4000, bankruptcyCashThreshold: -100000 },
  productionParams: {
    capacityUnit: 'closed_deals_per_month',
    baseProductionCapacity: 24,
    additionalMachineCost: 60000,
    additionalMachineCapacity: 8,
    maxMachineCount: 5,
    productionCostPerUnit: 15000.0,
    rawMaterialUnitsPerBottle: 1,
  },
  inventoryParams: {
    initialRawMaterials: 50,
    rawMaterialUnitCost: 15000,
    reorderBatchSize: 15,
    initialFinishedGoods: 8,
    rawMaterialReorderThreshold: 10,
  },
  machines: [
    { id: 'SEG-SMB', name: 'SMB Segment (4 AEs)', purchaseCost: 0, productionCapacity: 8, operating: true, maintenanceCostPerDay: 1200 },
    { id: 'SEG-MM', name: 'Mid-Market Segment (5 AEs)', purchaseCost: 0, productionCapacity: 10, operating: true, maintenanceCostPerDay: 1500 },
    { id: 'SEG-ENT', name: 'Enterprise Segment (3 AEs)', purchaseCost: 0, productionCapacity: 6, operating: true, maintenanceCostPerDay: 1800 },
  ],
  initialOrders: [
    { id: 'ORDER-CS-001', customer: 'Q4 Mid-Quarter Checkpoint — $2.5M', quantity: 25, pricePerUnit: 100000, deadlineDay: 45, depositPercent: 0 },
    { id: 'ORDER-CS-002', customer: 'Q4 Full Quota — $5M Attainment', quantity: 50, pricePerUnit: 100000, deadlineDay: 90, depositPercent: 0 },
  ],
  scheduledEvents: [
    {
      id: 'EVT-CS-001', day: 14, hour: 9, type: 'EQUIPMENT_ALERT',
      title: 'Top AE on Medical Leave — Pipeline at Risk',
      description: 'Your highest-performing AE (carrying $800k in pipeline) is on unexpected medical leave for 3 weeks. Reassign deals or risk pipeline stall.',
      payload: { alert_type: 'ae_outage', pipeline_at_risk: 800000, leave_days: 21 },
    },
    {
      id: 'EVT-CS-002', day: 35, hour: 10, type: 'EQUIPMENT_ALERT',
      title: 'Competitor Running 40% Discounts in Enterprise',
      description: 'Rival SaaS vendor is offering 40% discounts to your enterprise prospects. 3 of your top deals are now at risk of going dark.',
      payload: { alert_type: 'competitive_discount', deals_at_risk: 3, deal_value: 1200000, competitor_discount: 40 },
    },
    {
      id: 'EVT-CS-003', day: 70, hour: 11, type: 'NEW_ORDER',
      title: '$900k Enterprise Deal — EBR + 25% Discount Needed',
      description: 'A major bank wants to sign a $900k deal but needs an executive business review and 25% discount approval. High value but needs CEO time.',
      payload: { id: 'ORDER-CS-003', customer: 'GlobalBank Enterprise Deal', quantity: 9, selling_price_per_bottle: 100000, deadlineDay: 85 },
    },
  ],
  supportedActions: ['ACCEPT_ORDER', 'REJECT_ORDER', 'ORDER_RAW_MATERIALS', 'TOGGLE_MACHINE_OPERATION', 'SERVICE_MACHINE', 'PURCHASE_MACHINE'],
};

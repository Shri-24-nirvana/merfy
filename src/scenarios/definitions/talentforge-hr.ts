import { ScenarioConfig } from '@/types/scenario';

export const TalentForgeScenario: ScenarioConfig = {
  id: 'talentforge-hr',
  version: '1.0.0',
  name: 'TalentForge Tech',
  domain: 'Human Resources',
  difficulty: 'Hard',
  role: 'VP of People Operations',
  tagline: 'Scale headcount, control attrition, and engineer onboarding throughput during a Series B scaleup.',
  description:
    'As VP of People Ops at TalentForge Tech, navigate a 6-month hiring sprint. Manage competitive salary bands, reduce attrition risk, accelerate new engineer time-to-productivity, and keep headcount costs within board-approved budget.',
  overview:
    'TalentForge just closed its Series B and needs to grow from 80 to 160 engineers in 6 months. You have $3.2M in annual salary budget and $400k in recruiting/HR ops budget. Month 1 reveals 3 critical IC resignations. Month 3 brings a competing offer crisis when a hyperscaler poaches 5 senior engineers. Month 5: board demands engineering headcount doubled or they may claw back milestone funding.',
  learningObjectives: [
    'Understand workforce planning and headcount modeling.',
    'Experience the financial impact of attrition and replacement costs.',
    'Balance salary bands against talent market rates.',
    'Manage recruiting pipeline velocity and time-to-hire.',
  ],
  strategicPaths: [
    { name: 'Aggressive Hiring', description: 'Prioritize speed — accept longer time-to-productivity to hit headcount goals.', focus: 'Growth Velocity, High Attrition Risk' },
    { name: 'Quality over Quantity', description: 'Hire slower but invest in onboarding to reduce churn and ramp time.', focus: 'High Retention, Lower Velocity' },
    { name: 'Retention-First', description: 'Invest heavily in retention packages and culture before scaling headcount.', focus: 'Zero Attrition, Moderate Growth' },
  ],
  durationDays: 180,
  ticksPerHour: 1,
  hoursPerDay: 24,
  initialBusiness: { startingCash: 400000, fixedDailyOverhead: 2200, bankruptcyCashThreshold: -50000 },
  productionParams: {
    capacityUnit: 'productive_engineers',
    baseProductionCapacity: 80,
    additionalMachineCost: 15000,
    additionalMachineCapacity: 10,
    maxMachineCount: 8,
    productionCostPerUnit: 150.0,
    rawMaterialUnitsPerBottle: 1,
  },
  inventoryParams: {
    initialRawMaterials: 200,
    rawMaterialUnitCost: 8000,
    reorderBatchSize: 20,
    initialFinishedGoods: 80,
    rawMaterialReorderThreshold: 30,
  },
  machines: [
    { id: 'TEAM-ENG', name: 'Engineering Pod A', purchaseCost: 50000, productionCapacity: 40, operating: true, maintenanceCostPerDay: 800 },
    { id: 'TEAM-PROD', name: 'Product & Design Pod', purchaseCost: 40000, productionCapacity: 20, operating: true, maintenanceCostPerDay: 600 },
    { id: 'TEAM-DATA', name: 'Data & ML Pod', purchaseCost: 45000, productionCapacity: 20, operating: true, maintenanceCostPerDay: 700 },
  ],
  initialOrders: [
    { id: 'ORDER-TF-001', customer: 'Board Milestone — 120 Engineers by Month 3', quantity: 120, pricePerUnit: 10000, deadlineDay: 90, depositPercent: 0 },
    { id: 'ORDER-TF-002', customer: 'Series B Commitment — 160 Engineers by Month 6', quantity: 160, pricePerUnit: 10000, deadlineDay: 180, depositPercent: 0 },
  ],
  scheduledEvents: [
    {
      id: 'EVT-TF-001', day: 30, hour: 9, type: 'EQUIPMENT_ALERT',
      title: '3 Senior ICs Resign — Counter-Offer Window',
      description: '3 key engineers resigned citing below-market compensation. You have 7 days to issue counter-offers or begin emergency backfill recruiting.',
      payload: { alert_type: 'attrition', headcount_lost: 3, role: 'Senior Engineer', backfill_cost: 45000 },
    },
    {
      id: 'EVT-TF-002', day: 90, hour: 10, type: 'EQUIPMENT_ALERT',
      title: 'Hyperscaler Poaching — 5 Senior Engineers Targeted',
      description: 'AWS is running targeted recruitment against your senior stack. 5 engineers received offers 30% above current salary.',
      payload: { alert_type: 'competitive_poach', headcount_at_risk: 5, salary_premium: 30 },
    },
    {
      id: 'EVT-TF-003', day: 150, hour: 9, type: 'NEW_ORDER',
      title: 'Board Demands Accelerated Hiring Plan',
      description: 'Board meeting outcome: hiring must reach 160 by Day 180. Additional $100k approved for recruiting if commitment is made now.',
      payload: { id: 'ORDER-TF-003', customer: 'Board Accelerated Mandate — 160 HC', quantity: 160, selling_price_per_bottle: 10000, deadlineDay: 180 },
    },
  ],
  supportedActions: ['ACCEPT_ORDER', 'REJECT_ORDER', 'ORDER_RAW_MATERIALS', 'SERVICE_MACHINE', 'TOGGLE_MACHINE_OPERATION', 'PURCHASE_MACHINE'],
};

import { ScenarioConfig } from '@/types/scenario';

export const ViralWaveScenario: ScenarioConfig = {
  id: 'viralwave-marketing',
  version: '1.0.0',
  name: 'ViralWave Energy',
  domain: 'Marketing',
  difficulty: 'Medium',
  role: 'Chief Marketing Officer',
  tagline: 'Allocate $250k across digital channels. Maximize blended ROAS and conversion velocity.',
  description:
    'As CMO of ViralWave Energy, you control a $250,000 digital acquisition budget across 30 virtual days. Balance paid search, social, influencer, and display channels. Fight ad fatigue, optimize CAC-to-LTV ratios, and hit quarterly MQL targets.',
  overview:
    'ViralWave Energy is launching in 3 new markets. You have a $250k marketing budget and 30 days to generate 5,000 qualified leads with a CAC under $40. Your channels: Google Ads, Meta Social, TikTok Influencers, and Display Networks. Each channel has a different saturation curve. On Day 7, a viral moment on TikTok creates a 72-hour spend window. On Day 20, your competitor doubles their Google Ads spend.',
  learningObjectives: [
    'Understand multi-channel budget allocation and attribution.',
    'Experience CAC-LTV trade-offs in growth marketing.',
    'Manage ad fatigue and creative rotation cycles.',
    'React to competitive spend changes in paid search.',
  ],
  strategicPaths: [
    { name: 'Performance Marketing', description: 'Go all-in on Google Ads and Meta for measurable direct response.', focus: 'High CAC Efficiency, Low Brand Awareness' },
    { name: 'Brand + Performance', description: 'Split budget across brand and performance to build sustainable growth.', focus: 'Balanced CAC & LTV' },
    { name: 'Viral Influencer', description: 'Concentrate spend on TikTok influencers to generate organic reach multiplier.', focus: 'Low CAC if viral, High risk' },
  ],
  durationDays: 30,
  ticksPerHour: 1,
  hoursPerDay: 24,
  initialBusiness: { startingCash: 250000, fixedDailyOverhead: 500, bankruptcyCashThreshold: -5000 },
  productionParams: {
    capacityUnit: 'leads_per_day',
    baseProductionCapacity: 150,
    additionalMachineCost: 25000,
    additionalMachineCapacity: 100,
    maxMachineCount: 5,
    productionCostPerUnit: 35.0,
    rawMaterialUnitsPerBottle: 1,
  },
  inventoryParams: {
    initialRawMaterials: 5000,
    rawMaterialUnitCost: 10.0,
    reorderBatchSize: 1000,
    initialFinishedGoods: 0,
    rawMaterialReorderThreshold: 500,
  },
  machines: [
    { id: 'CH-GA', name: 'Google Ads (Search)', purchaseCost: 0, productionCapacity: 80, operating: true, maintenanceCostPerDay: 200 },
    { id: 'CH-META', name: 'Meta Social Ads', purchaseCost: 0, productionCapacity: 70, operating: true, maintenanceCostPerDay: 180 },
  ],
  initialOrders: [
    { id: 'ORDER-VW-001', customer: 'Q4 MQL Target — Sales Team', quantity: 2000, pricePerUnit: 55, deadlineDay: 15, depositPercent: 0 },
    { id: 'ORDER-VW-002', customer: 'Full Quarter MQL Goal', quantity: 5000, pricePerUnit: 55, deadlineDay: 30, depositPercent: 0 },
  ],
  scheduledEvents: [
    {
      id: 'EVT-VW-001', day: 7, hour: 14, type: 'MARKET_OPPORTUNITY',
      title: 'TikTok Viral Moment — 72h Spend Window',
      description: 'An influencer mention of ViralWave went viral. 72-hour window to capitalize with accelerated TikTok spend before saturation.',
      payload: { id: 'ORDER-VW-003', customer: 'TikTok Viral Burst — 1,500 Extra Leads', quantity: 1500, selling_price_per_bottle: 55, deadlineDay: 10 },
    },
    {
      id: 'EVT-VW-002', day: 20, hour: 9, type: 'EQUIPMENT_ALERT',
      title: 'Competitor Doubles Google Ads Spend',
      description: 'Competitor just doubled their Google Ads budget, pushing up CPCs. Consider shifting budget to Meta or TikTok temporarily.',
      payload: { alert_type: 'cpc_spike', channel: 'google_ads', cpc_increase_pct: 45 },
    },
  ],
  supportedActions: ['ACCEPT_ORDER', 'REJECT_ORDER', 'ORDER_RAW_MATERIALS', 'MANAGE_INVENTORY', 'TOGGLE_MACHINE_OPERATION', 'SERVICE_MACHINE'],
};

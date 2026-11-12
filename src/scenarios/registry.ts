import { ScenarioConfig } from '@/types/scenario';
import { ApexBeveragesScenario } from './definitions/apex-beverages';

export interface ScenarioMeta {
  id: string;
  name: string;
  domain: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Advanced';
  status: 'PLAYABLE' | 'COMING_SOON';
  role: string;
  duration: string;
  description: string;
  keyMetric: string;
  imageAccent: string;
  config?: ScenarioConfig;
}

export const SCENARIO_CATALOG: ScenarioMeta[] = [
  {
    id: 'apex-beverages',
    name: 'Apex Beverages',
    domain: 'Manufacturing',
    difficulty: 'Easy',
    status: 'PLAYABLE',
    role: 'Operations Manager',
    duration: '15-20 min (7 Sim Days)',
    description: 'Balance bottling machine capacity, inventory reorders, and customer delivery commitments in an operating factory.',
    keyMetric: '800-1,200 bottles/day',
    imageAccent: '#38BDF8',
    config: ApexBeveragesScenario,
  },
  {
    id: 'omnimart-retail',
    name: 'OmniMart Express',
    domain: 'Retail',
    difficulty: 'Medium',
    status: 'COMING_SOON',
    role: 'Category Merchandiser',
    duration: '20 min (14 Sim Days)',
    description: 'Optimize shelf space allocation, dynamic clearance pricing, and omnichannel inventory fulfillment.',
    keyMetric: 'Inventory GMROI & Stockout Rate',
    imageAccent: '#22C55E',
  },
  {
    id: 'viralwave-marketing',
    name: 'ViralWave Energy',
    domain: 'Marketing',
    difficulty: 'Medium',
    status: 'COMING_SOON',
    role: 'Chief Marketing Officer',
    duration: '20 min (30 Sim Days)',
    description: 'Allocate a $250k budget across digital acquisition channels, manage CAC to LTV ratios, and combat ad fatigue.',
    keyMetric: 'Blended ROAS & Conversion Velocity',
    imageAccent: '#EC4899',
  },
  {
    id: 'talentforge-hr',
    name: 'TalentForge Tech',
    domain: 'Human Resources',
    difficulty: 'Hard',
    status: 'COMING_SOON',
    role: 'VP of People Operations',
    duration: '25 min (6 Sim Months)',
    description: 'Manage headcounts, attrition risks, competitive salary bands, and engineer onboarding throughput during a Series B scaleup.',
    keyMetric: 'Employee Retention & Time-to-Productivity',
    imageAccent: '#A855F7',
  },
  {
    id: 'fincorp-treasury',
    name: 'FinCorp Capital',
    domain: 'Finance',
    difficulty: 'Hard',
    status: 'COMING_SOON',
    role: 'Treasury Director',
    duration: '25 min (30 Sim Days)',
    description: 'Navigate liquidity crunches, interest rate swings, debt covenants, and short-term working capital financing.',
    keyMetric: 'Cash Runway & Quick Ratio',
    imageAccent: '#F59E0B',
  },
  {
    id: 'swiftcargo-logistics',
    name: 'SwiftCargo Fleet',
    domain: 'Logistics',
    difficulty: 'Medium',
    status: 'COMING_SOON',
    role: 'Dispatch & Fleet Director',
    duration: '20 min (10 Sim Days)',
    description: 'Route electric delivery trucks, mitigate fuel cost surges, and prevent freight delay penalties across 4 fulfillment hubs.',
    keyMetric: 'On-Time Delivery & Fuel Cost / Ton-Mile',
    imageAccent: '#06B6D4',
  },
  {
    id: 'grandazure-hospitality',
    name: 'Grand Azure Resort',
    domain: 'Hospitality',
    difficulty: 'Easy',
    status: 'COMING_SOON',
    role: 'General Manager',
    duration: '15 min (30 Sim Days)',
    description: 'Dynamic RevPAR optimization, peak weekend staffing, guest satisfaction scoring, and banquet yield management.',
    keyMetric: 'RevPAR & Guest NPS',
    imageAccent: '#14B8A6',
  },
  {
    id: 'steelmill-operations',
    name: 'Vulcan Steelworks',
    domain: 'Operations',
    difficulty: 'Advanced',
    status: 'COMING_SOON',
    role: 'Plant Superintendent',
    duration: '30 min (14 Sim Days)',
    description: 'Continuous blast furnace scheduling, thermal heat efficiency, scheduled kiln shutdowns, and high-temperature safety compliance.',
    keyMetric: 'OEE & Yield Efficiency',
    imageAccent: '#F97316',
  },
  {
    id: 'saas-pipeline',
    name: 'CloudScale SaaS',
    domain: 'Sales',
    difficulty: 'Medium',
    status: 'COMING_SOON',
    role: 'VP of Enterprise Sales',
    duration: '20 min (1 Quarter)',
    description: 'Sales quota allocation, stage-by-stage pipeline hygiene, discounting controls, and sales engineer pairing.',
    keyMetric: 'Win Rate & Quota Attainment',
    imageAccent: '#6366F1',
  },
];

export function getScenarioById(id: string): ScenarioMeta | undefined {
  return SCENARIO_CATALOG.find(s => s.id === id);
}

export function getScenarioConfig(id: string): ScenarioConfig | undefined {
  const meta = getScenarioById(id);
  return meta?.config;
}


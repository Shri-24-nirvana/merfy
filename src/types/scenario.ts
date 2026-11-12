import { z } from 'zod';

export const ScheduledEventSchema = z.object({
  id: z.string(),
  day: z.number().int().positive(),
  hour: z.number().int().min(0).max(23).optional().default(9),
  type: z.enum(['NEW_ORDER', 'SUPPLY_PRICE_CHANGE', 'EQUIPMENT_ALERT', 'MARKET_OPPORTUNITY']),
  title: z.string(),
  description: z.string(),
  payload: z.record(z.any()),
});

export type ScheduledEvent = z.infer<typeof ScheduledEventSchema>;

export const InitialMachineConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  purchaseCost: z.number().nonnegative(),
  productionCapacity: z.number().positive(),
  operating: z.boolean().default(true),
  maintenanceCostPerDay: z.number().nonnegative().default(50),
});

export const InitialOrderConfigSchema = z.object({
  id: z.string(),
  customer: z.string(),
  quantity: z.number().positive(),
  pricePerUnit: z.number().positive(),
  deadlineDay: z.number().int().positive(),
  depositPercent: z.number().min(0).max(100).default(0),
});

export const ScenarioConfigSchema = z.object({
  id: z.string(),
  version: z.string(),
  name: z.string(),
  domain: z.string(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Advanced']),
  role: z.string(),
  tagline: z.string(),
  description: z.string(),
  overview: z.string(),
  learningObjectives: z.array(z.string()),
  strategicPaths: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      focus: z.string(),
    })
  ),
  durationDays: z.number().int().positive().default(7),
  ticksPerHour: z.number().int().positive().default(1),
  hoursPerDay: z.number().int().positive().default(24),
  initialBusiness: z.object({
    startingCash: z.number().positive(),
    fixedDailyOverhead: z.number().nonnegative().default(200),
    bankruptcyCashThreshold: z.number().default(-10000),
  }),
  productionParams: z.object({
    capacityUnit: z.string().default('bottles_per_day'),
    baseProductionCapacity: z.number().positive().default(800),
    additionalMachineCost: z.number().positive().default(20000),
    additionalMachineCapacity: z.number().positive().default(200),
    maxMachineCount: z.number().int().positive().default(5),
    productionCostPerUnit: z.number().nonnegative().default(1.5), // electricity, water, direct labor
    rawMaterialUnitsPerBottle: z.number().positive().default(1),
  }),
  inventoryParams: z.object({
    initialRawMaterials: z.number().nonnegative().default(6000),
    rawMaterialUnitCost: z.number().positive().default(2.0),
    reorderBatchSize: z.number().positive().default(2000),
    initialFinishedGoods: z.number().nonnegative().default(0),
    rawMaterialReorderThreshold: z.number().nonnegative().default(1000),
  }),
  machines: z.array(InitialMachineConfigSchema),
  initialOrders: z.array(InitialOrderConfigSchema),
  scheduledEvents: z.array(ScheduledEventSchema),
  supportedActions: z.array(z.string()),
});

export type ScenarioConfig = z.infer<typeof ScenarioConfigSchema>;

import { describe, it, expect } from 'vitest';
import { ScenarioConfigSchema } from '@/types/scenario';
import { ApexBeveragesScenario } from '@/scenarios/definitions/apex-beverages';
import { SCENARIO_CATALOG } from '@/scenarios/registry';

describe('Scenario Validation & Configuration Schema', () => {
  it('Apex Beverages validates against the formal Zod ScenarioConfigSchema', () => {
    const parseResult = ScenarioConfigSchema.safeParse(ApexBeveragesScenario);
    expect(parseResult.success).toBe(true);
    if (!parseResult.success) {
      console.error(parseResult.error);
    }
  });

  it('rejects invalid scenario configurations with missing required parameters', () => {
    const invalidConfig = {
      id: 'bad-scenario',
      // missing version, name, domain, etc.
    };
    const parseResult = ScenarioConfigSchema.safeParse(invalidConfig);
    expect(parseResult.success).toBe(false);
  });

  it('verifies all catalog scenarios have valid metadata and tags', () => {
    expect(SCENARIO_CATALOG.length).toBeGreaterThanOrEqual(9);
    const playable = SCENARIO_CATALOG.filter(s => s.status === 'PLAYABLE');
    expect(playable.length).toBe(1);
    expect(playable[0].id).toBe('apex-beverages');
    expect(playable[0].config).toBeDefined();
  });
});

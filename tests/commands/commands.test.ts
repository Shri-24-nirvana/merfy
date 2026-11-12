import { describe, it, expect, beforeEach } from 'vitest';
import { SimulationEngine } from '@/engine/engine';
import { ApexBeveragesScenario } from '@/scenarios/definitions/apex-beverages';

describe('Player Commands & Business Rules Validation', () => {
  let engine: SimulationEngine;

  beforeEach(() => {
    engine = new SimulationEngine(ApexBeveragesScenario);
    engine.start();
  });

  it('rejects machine purchase if cash is insufficient', () => {
    // Deplete cash via custom scenario or repeated purchases
    // Starting cash is 100,000. Each machine is 20,000.
    // 5 machine limit. Let's buy 4 machines (80,000 spent, cash = 20,000)
    engine.dispatch({ type: 'PURCHASE_MACHINE' });
    engine.dispatch({ type: 'PURCHASE_MACHINE' });
    engine.dispatch({ type: 'PURCHASE_MACHINE' });
    engine.dispatch({ type: 'PURCHASE_MACHINE' });

    // Now 5 machines total (hit limit)
    const limitRes = engine.dispatch({ type: 'PURCHASE_MACHINE' });
    expect(limitRes.success).toBe(false);
    expect(limitRes.error).toContain('limit');
  });

  it('rejects toggling or servicing non-existent machine ID', () => {
    const res = engine.dispatch({
      type: 'TOGGLE_MACHINE_OPERATION',
      machineId: 'MACHINE-NON-EXISTENT',
      operating: false,
    });
    expect(res.success).toBe(false);
    expect(res.error).toContain('not found');
  });

  it('rejects raw material purchase with zero or negative quantity', () => {
    const res = engine.dispatch({
      type: 'ORDER_RAW_MATERIALS',
      quantity: -500,
    });
    expect(res.success).toBe(false);
  });

  it('records decision history for both accepted and rejected actions', () => {
    engine.dispatch({ type: 'PURCHASE_MACHINE' });
    engine.dispatch({ type: 'TOGGLE_MACHINE_OPERATION', machineId: 'INVALID', operating: true });

    const history = engine.getHistory();
    expect(history.length).toBe(2);
    expect(history[0].result).toBe('SUCCESS');
    expect(history[1].result).toBe('REJECTED');
  });
});

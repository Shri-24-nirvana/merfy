import { describe, it, expect } from 'vitest';
import { SimulationEngine } from '@/engine/engine';
import { ApexBeveragesScenario } from '@/scenarios/definitions/apex-beverages';

describe('Deterministic Simulation Execution', () => {
  it('identical scenario and command sequence yields exact identical results', () => {
    const runSimulation = () => {
      const engine = new SimulationEngine(ApexBeveragesScenario);
      engine.start();

      // Dispatch exact sequence of commands at specific ticks
      for (let tick = 0; tick < 100; tick++) {
        if (tick === 5) {
          engine.dispatch({ type: 'ACCEPT_ORDER', orderId: 'ORDER-001' });
        }
        if (tick === 10) {
          engine.dispatch({ type: 'PURCHASE_MACHINE' });
        }
        if (tick === 20) {
          engine.dispatch({ type: 'ORDER_RAW_MATERIALS', quantity: 2000 });
        }
        if (tick === 60) {
          // If Day 3 order arrived
          engine.dispatch({ type: 'ACCEPT_ORDER', orderId: 'ORDER-002' });
        }
        engine.tick();
      }

      return engine.getState();
    };

    const run1 = runSimulation();
    const run2 = runSimulation();

    expect(run1.business.cash).toBe(run2.business.cash);
    expect(run1.business.revenue).toBe(run2.business.revenue);
    expect(run1.business.expenses).toBe(run2.business.expenses);
    expect(run1.business.profit).toBe(run2.business.profit);
    expect(run1.inventory.rawMaterials.quantity).toBe(run2.inventory.rawMaterials.quantity);
    expect(run1.inventory.finishedGoods.quantity).toBe(run2.inventory.finishedGoods.quantity);
    expect(run1.production.totalUnitsProduced).toBe(run2.production.totalUnitsProduced);
    expect(run1.machines.length).toBe(run2.machines.length);
  });
});

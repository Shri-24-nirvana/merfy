import { describe, it, expect } from 'vitest';
import { SimulationEngine } from '@/engine/engine';
import { ApexBeveragesScenario } from '@/scenarios/definitions/apex-beverages';

describe('End-to-End Simulation Playthrough & Assessment Verification', () => {
  it('successfully operates factory, scales capacity, fulfills surge demand, and generates provisional assessment', () => {
    const engine = new SimulationEngine(ApexBeveragesScenario);
    engine.start();

    // 1. Initial State Check
    let state = engine.getState();
    expect(state.currentDay).toBe(1);
    expect(state.business.cash).toBe(100000);
    expect(state.machines.length).toBe(1);

    // 2. Day 1: Accept Initial Order (ORDER-001)
    const acceptRes = engine.dispatch({ type: 'ACCEPT_ORDER', orderId: 'ORDER-001' });
    expect(acceptRes.success).toBe(true);

    // 3. Expansion Strategy: Procure Line 02 & Line 03 early to increase throughput from 800 to 1,200 bottles/day
    const purchaseRes1 = engine.dispatch({ type: 'PURCHASE_MACHINE' });
    const purchaseRes2 = engine.dispatch({ type: 'PURCHASE_MACHINE' });
    expect(purchaseRes1.success).toBe(true);
    expect(purchaseRes2.success).toBe(true);
    expect(engine.getState().machines.length).toBe(3);
    expect(engine.getState().production.currentDailyCapacity).toBe(1200);

    // Order raw materials early to support 8,200+ bottles demand
    engine.dispatch({ type: 'ORDER_RAW_MATERIALS', quantity: 4000 });

    // 4. Run through Day 1 and Day 2 (48 ticks)
    for (let i = 0; i < 48; i++) {
      engine.tick();
    }

    state = engine.getState();
    expect(state.currentDay).toBe(3);

    // 5. Advance to Day 3, 09:00 (tick 57) to trigger scheduled surge order
    for (let i = 0; i < 9; i++) {
      engine.tick();
    }

    state = engine.getState();
    const surgeOrder = state.orders.find(o => o.id === 'ORDER-002');
    expect(surgeOrder).toBeDefined();
    expect(surgeOrder?.quantity).toBe(3200);
    expect(surgeOrder?.pricePerUnit).toBe(16);

    // Accept Day 3 spot surge order
    const acceptSurge = engine.dispatch({ type: 'ACCEPT_ORDER', orderId: 'ORDER-002' });
    expect(acceptSurge.success).toBe(true);

    // 6. Run remaining ticks through Day 7 (168 ticks total)
    const remainingTicks = (7 * 24) - engine.getState().currentTick;
    for (let i = 0; i <= remainingTicks; i++) {
      engine.tick();
    }

    // 7. Verify Scenario Completion
    expect(engine.isCompleted()).toBe(true);
    const finalState = engine.getState();
    expect(finalState.status).toBe('COMPLETED');

    // Both orders should be fulfilled!
    const fulfilledOrders = finalState.orders.filter(o => o.status === 'FULFILLED');
    expect(fulfilledOrders.length).toBe(2);

    // Revenue collected: 5000 * 12 + 3200 * 16 = 60000 + 51200 = 111,200
    expect(finalState.business.revenue).toBe(111200);
    expect(finalState.business.profit).toBeGreaterThan(0);

    // 8. Generate & Validate Results
    const results = engine.getResults();
    expect(results.finalStatus).toBe('COMPLETED');
    expect(results.completedOrdersCount).toBe(2);
    expect(results.failedOrdersCount).toBe(0);
    expect(results.performanceAssessment.grade).toMatch(/A\+?|A/);
    expect(results.performanceAssessment.overallScore).toBeGreaterThanOrEqual(80);
    expect(results.performanceAssessment.strengths.length).toBeGreaterThan(0);
    expect(results.performanceAssessment.provisionalNote).toBeDefined();
    expect(results.decisionHistory.length).toBeGreaterThanOrEqual(4);
  });
});

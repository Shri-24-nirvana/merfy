import { describe, it, expect, beforeEach } from 'vitest';
import { SimulationEngine } from '@/engine/engine';
import { ApexBeveragesScenario } from '@/scenarios/definitions/apex-beverages';

describe('Core Simulation Engine', () => {
  let engine: SimulationEngine;

  beforeEach(() => {
    engine = new SimulationEngine(ApexBeveragesScenario);
  });

  it('initializes with correct authoritative starting state', () => {
    const state = engine.getState();
    expect(state.business.cash).toBe(100000);
    expect(state.business.revenue).toBe(0);
    expect(state.business.profit).toBe(0);
    expect(state.machines.length).toBe(1);
    expect(state.machines[0].productionCapacity).toBe(800);
    expect(state.inventory.rawMaterials.quantity).toBe(6000);
    expect(state.inventory.finishedGoods.quantity).toBe(0);
    expect(state.orders.length).toBe(1);
    expect(state.orders[0].id).toBe('ORDER-001');
    expect(state.orders[0].status).toBe('PENDING');
  });

  it('paused or not started simulations do not advance ticks', () => {
    const initialTick = engine.getState().currentTick;
    engine.tick();
    expect(engine.getState().currentTick).toBe(initialTick);

    engine.start();
    engine.tick();
    expect(engine.getState().currentTick).toBe(initialTick + 1);

    engine.pause();
    engine.tick();
    expect(engine.getState().currentTick).toBe(initialTick + 1);
  });

  it('production increases finished goods inventory and consumes raw materials', () => {
    engine.start();
    const initialRaw = engine.getState().inventory.rawMaterials.quantity;
    const initialFG = engine.getState().inventory.finishedGoods.quantity;

    // Run for 24 ticks (1 full day)
    for (let i = 0; i < 24; i++) {
      engine.tick();
    }

    const state = engine.getState();
    expect(state.inventory.finishedGoods.quantity).toBeGreaterThan(initialFG);
    expect(state.inventory.rawMaterials.quantity).toBeLessThan(initialRaw);
    // At 800 bottles/day, finished goods should be ~800
    expect(state.inventory.finishedGoods.quantity).toBe(800);
    expect(state.inventory.rawMaterials.quantity).toBe(initialRaw - 800);
  });

  it('production stops or throttles when raw materials run out', () => {
    // Custom scenario with minimal raw materials
    const lowRawScenario = {
      ...ApexBeveragesScenario,
      inventoryParams: {
        ...ApexBeveragesScenario.inventoryParams,
        initialRawMaterials: 50,
      },
    };
    const customEngine = new SimulationEngine(lowRawScenario);
    customEngine.start();

    // Advance 1 day
    for (let i = 0; i < 24; i++) {
      customEngine.tick();
    }

    const state = customEngine.getState();
    expect(state.inventory.rawMaterials.quantity).toBe(0);
    expect(state.inventory.finishedGoods.quantity).toBe(50); // Capped at available raw
    expect(state.production.bottleneckReason).toBeDefined();
  });

  it('purchasing a machine reduces cash and increases production capacity', () => {
    engine.start();
    const initialCash = engine.getState().business.cash;
    const initialCapacity = engine.getState().production.currentDailyCapacity;

    const res = engine.dispatch({ type: 'PURCHASE_MACHINE' });
    expect(res.success).toBe(true);

    const state = engine.getState();
    expect(state.business.cash).toBe(initialCash - 20000);
    expect(state.machines.length).toBe(2);
    expect(state.production.currentDailyCapacity).toBe(initialCapacity + 200);
  });

  it('accepting an order creates delivery commitment; rejecting does not', () => {
    engine.start();
    const acceptRes = engine.dispatch({ type: 'ACCEPT_ORDER', orderId: 'ORDER-001' });
    expect(acceptRes.success).toBe(true);
    expect(engine.getState().orders[0].status).toBe('IN_PRODUCTION');

    // Rejecting already accepted should fail
    const rejectAgain = engine.dispatch({ type: 'REJECT_ORDER', orderId: 'ORDER-001' });
    expect(rejectAgain.success).toBe(false);
  });

  it('fulfills order and credits revenue when sufficient finished goods are produced', () => {
    engine.start();
    engine.dispatch({ type: 'ACCEPT_ORDER', orderId: 'ORDER-001' });

    // ORDER-001 requires 5,000 bottles @ $12.
    // Machine 1 produces 800/day. With 1 machine it would take 5000/800 = 6.25 days.
    // Buy 2 machines to have 800 + 200 + 200 = 1,200 bottles/day!
    engine.dispatch({ type: 'PURCHASE_MACHINE' });
    engine.dispatch({ type: 'PURCHASE_MACHINE' });

    // Buy extra raw materials so we don't run out
    engine.dispatch({ type: 'ORDER_RAW_MATERIALS', quantity: 4000 });

    // Day 5 = 120 ticks. At 1,200 bottles/day, in 5 days = 6,000 bottles!
    for (let i = 0; i < 115; i++) {
      engine.tick();
    }

    const state = engine.getState();
    const order = state.orders.find(o => o.id === 'ORDER-001');
    expect(order?.status).toBe('FULFILLED');
    expect(state.business.revenue).toBe(60000); // 5,000 * $12
  });

  it('triggers scheduled events at configured day and hour', () => {
    engine.start();

    // Advance to Day 3, 09:00 (tick = 2 * 24 + 9 = 57)
    for (let i = 0; i < 57; i++) {
      engine.tick();
    }

    const state = engine.getState();
    expect(state.currentDay).toBe(3);
    expect(state.currentHour).toBe(9);
    // Scheduled order ORDER-002 should have arrived!
    const order2 = state.orders.find(o => o.id === 'ORDER-002');
    expect(order2).toBeDefined();
    expect(order2?.quantity).toBe(3200);
    expect(order2?.pricePerUnit).toBe(16);
  });

  it('scenario duration triggers completion and rejects further commands', () => {
    engine.start();
    const totalTicks = 7 * 24; // 168 ticks

    for (let i = 0; i <= totalTicks; i++) {
      engine.tick();
    }

    expect(engine.isCompleted()).toBe(true);
    expect(engine.getState().status).toBe('COMPLETED');

    // Any command dispatched after completion must be rejected
    const cmdRes = engine.dispatch({ type: 'PURCHASE_MACHINE' });
    expect(cmdRes.success).toBe(false);
    expect(cmdRes.error).toContain('COMPLETED');
  });
});

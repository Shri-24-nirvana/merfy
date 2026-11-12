import { create } from 'zustand';
import { SimulationEngine } from '@/engine/engine';
import { SimulationState, SimulationResult } from '@/types/simulation';
import { PlayerCommand, CommandExecutionResult } from '@/types/commands';
import { DomainEvent } from '@/types/events';
import { getScenarioConfig } from '@/scenarios/registry';
import { ApexBeveragesScenario } from '@/scenarios/definitions/apex-beverages';

interface SimulationStore {
  engine: SimulationEngine | null;
  state: SimulationState | null;
  lastResult: SimulationResult | null;
  selectedMachineId: string | null;
  activeToast: DomainEvent | null;
  toastQueue: DomainEvent[];
  intervalId: NodeJS.Timeout | null;

  // Actions
  initSimulation: (scenarioId: string) => void;
  startSimulation: () => void;
  pauseSimulation: () => void;
  resumeSimulation: () => void;
  setSpeed: (speed: number) => void;
  tickManual: () => void;
  dispatchCommand: (command: PlayerCommand) => CommandExecutionResult;
  setSelectedMachineId: (id: string | null) => void;
  dismissToast: () => void;
  restartSimulation: () => void;
  getResults: () => SimulationResult | null;
}

export const useSimulationStore = create<SimulationStore>((set, get) => ({
  engine: null,
  state: null,
  lastResult: null,
  selectedMachineId: null,
  activeToast: null,
  toastQueue: [],
  intervalId: null,

  initSimulation: (scenarioId: string) => {
    // Clear any existing ticker
    const currentInterval = get().intervalId;
    if (currentInterval) {
      clearInterval(currentInterval);
    }

    const config = getScenarioConfig(scenarioId) || ApexBeveragesScenario;
    const engine = new SimulationEngine(config);
    const state = engine.getState();

    set({
      engine,
      state,
      lastResult: null,
      selectedMachineId: state.machines[0]?.id || null,
      activeToast: null,
      toastQueue: [],
      intervalId: null,
    });
  },

  startSimulation: () => {
    const { engine, intervalId } = get();
    if (!engine) return;

    if (intervalId) clearInterval(intervalId);

    engine.start();
    const updatedState = engine.getState();

    const speed = updatedState.speed || 1;
    const intervalMs = Math.max(150, Math.round(1000 / speed));

    const newInterval = setInterval(() => {
      get().tickManual();
    }, intervalMs);

    set({
      state: updatedState,
      intervalId: newInterval,
    });
  },

  pauseSimulation: () => {
    const { engine, intervalId } = get();
    if (intervalId) {
      clearInterval(intervalId);
    }
    if (engine) {
      engine.pause();
      set({
        state: engine.getState(),
        intervalId: null,
      });
    }
  },

  resumeSimulation: () => {
    get().startSimulation();
  },

  setSpeed: (speed: number) => {
    const { engine, intervalId, state } = get();
    if (!engine) return;

    engine.setSpeed(speed);
    const updatedState = engine.getState();

    if (intervalId && state?.status === 'RUNNING') {
      clearInterval(intervalId);
      const intervalMs = Math.max(150, Math.round(1000 / speed));
      const newInterval = setInterval(() => {
        get().tickManual();
      }, intervalMs);
      set({ state: updatedState, intervalId: newInterval });
    } else {
      set({ state: updatedState });
    }
  },

  tickManual: () => {
    const { engine, intervalId, activeToast, toastQueue } = get();
    if (!engine) return;

    const { state: updatedState, events } = engine.tick();

    // Check for toasts
    let nextActiveToast = activeToast;
    const newQueue = [...toastQueue];

    if (events.length > 0) {
      events.forEach(evt => {
        if (evt.severity === 'warning' || evt.severity === 'danger' || evt.severity === 'success') {
          newQueue.push(evt);
        }
      });
    }

    if (!nextActiveToast && newQueue.length > 0) {
      nextActiveToast = newQueue.shift() || null;
    }

    // Check completion or failure
    if (updatedState.status === 'COMPLETED' || updatedState.status === 'FAILED') {
      if (intervalId) {
        clearInterval(intervalId);
      }
      const finalResult = engine.getResults();
      set({
        state: updatedState,
        lastResult: finalResult,
        intervalId: null,
        activeToast: nextActiveToast,
        toastQueue: newQueue,
      });
      return;
    }

    set({
      state: updatedState,
      activeToast: nextActiveToast,
      toastQueue: newQueue,
    });
  },

  dispatchCommand: (command: PlayerCommand) => {
    const { engine } = get();
    if (!engine) {
      return {
        success: false,
        commandType: command.type,
        message: 'Simulation engine not initialized.',
      };
    }

    const result = engine.dispatch(command);
    const updatedState = engine.getState();

    set({ state: updatedState });
    return result;
  },

  setSelectedMachineId: (id: string | null) => {
    set({ selectedMachineId: id });
  },

  dismissToast: () => {
    const { toastQueue } = get();
    const nextToast = toastQueue.length > 0 ? toastQueue[0] : null;
    const remaining = toastQueue.slice(1);
    set({
      activeToast: nextToast,
      toastQueue: remaining,
    });
  },

  restartSimulation: () => {
    const { state } = get();
    if (!state) return;
    get().initSimulation(state.scenarioId);
  },

  getResults: () => {
    const { engine, lastResult } = get();
    if (lastResult) return lastResult;
    if (engine) return engine.getResults();
    return null;
  },
}));


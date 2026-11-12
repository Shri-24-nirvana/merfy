'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSimulationStore } from '@/application/simulation-session/simulation-store';
import { SimulationControlBar } from '@/components/controls/SimulationControlBar';
import { FactoryWorld } from '@/world/manufacturing/FactoryWorld';
import { ManagementControlsPanel } from '@/components/controls/ManagementControlsPanel';
import { BusinessIntelligencePanel } from '@/components/metrics/BusinessIntelligencePanel';
import { MachineInspectionModal } from '@/components/inspection/MachineInspectionModal';
import { ToastAlert } from '@/components/shared/ToastAlert';
import {
  Maximize2,
  Sliders,
  BarChart3,
  Award,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

export default function LiveSimulationPage() {
  const router = useRouter();

  const {
    state,
    initSimulation,
    startSimulation,
    pauseSimulation,
    resumeSimulation,
    setSpeed,
    tickManual,
    dispatchCommand,
    selectedMachineId,
    setSelectedMachineId,
    activeToast,
    dismissToast,
    restartSimulation,
    lastResult,
  } = useSimulationStore();

  const [activeSidePanel, setActiveSidePanel] = useState<'controls' | 'metrics'>('controls');
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  // Initialize simulation on mount if not already loaded
  useEffect(() => {
    if (!state || state.scenarioId !== 'apex-beverages') {
      initSimulation('apex-beverages');
    }
  }, []);

  if (!state) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-slate-400 space-y-4">
        <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-mono">Initializing Apex Beverages Factory Floor...</p>
      </div>
    );
  }

  const selectedMachine = state.machines.find(m => m.id === selectedMachineId) || null;

  const handleSelectMachine = (machineId: string) => {
    setSelectedMachineId(machineId);
    setIsInspectorOpen(true);
  };

  const isCompleted = state.status === 'COMPLETED';
  const isFailed = state.status === 'FAILED';

  return (
    <div className="min-h-screen h-screen flex flex-col bg-background overflow-hidden text-text-primary">
      {/* Top HUD Control Bar */}
      <SimulationControlBar
        state={state}
        onStart={startSimulation}
        onPause={pauseSimulation}
        onResume={resumeSimulation}
        onSetSpeed={setSpeed}
        onRestart={restartSimulation}
        onManualTick={tickManual}
      />

      {/* Completion or Bankruptcy Alert Banner */}
      {(isCompleted || isFailed) && (
        <div
          className={`w-full py-2.5 px-6 flex items-center justify-between text-xs font-bold z-40 select-none shadow-lg ${
            isCompleted
              ? 'bg-emerald-600 text-slate-950'
              : 'bg-red-600 text-slate-50'
          }`}
        >
          <div className="flex items-center space-x-2">
            {isCompleted ? (
              <Sparkles className="w-4 h-4 fill-current" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
            <span>
              {isCompleted
                ? 'Simulation Run Completed! 7 Virtual Days Fulfilled.'
                : 'Factory Liquidation: Cash balance dropped below bankruptcy credit limit.'}
            </span>
          </div>

          <button
            onClick={() => router.push('/simulation/results')}
            className="py-1 px-4 rounded-lg bg-slate-950 text-slate-100 hover:bg-slate-900 transition-colors flex items-center space-x-1.5 font-bold"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Review Final Assessment</span>
          </button>
        </div>
      )}

      {/* Main Gameplay Screen: Factory Visual occupies the vast majority */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Central Stage: The Living Virtual Factory */}
        <section className="flex-1 h-full p-2 sm:p-4 overflow-hidden flex flex-col justify-between relative">
          <div className="flex-1 w-full h-full relative">
            <FactoryWorld
              state={state}
              onSelectMachine={handleSelectMachine}
              selectedMachineId={selectedMachineId}
              onQuickReorder={() =>
                dispatchCommand({ type: 'ORDER_RAW_MATERIALS', quantity: 2000 })
              }
            />
          </div>

          {/* Quick toggle bar on mobile/desktop to switch between Controls and BI Telemetry */}
          <div className="mt-2 flex items-center justify-between bg-surface/90 border border-slate-800 rounded-xl px-4 py-2 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 font-medium hidden sm:inline">Active Mode:</span>
              <button
                onClick={() => setActiveSidePanel('controls')}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg font-bold transition-all ${
                  activeSidePanel === 'controls'
                    ? 'bg-sky-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Management Controls</span>
              </button>

              <button
                onClick={() => setActiveSidePanel('metrics')}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg font-bold transition-all ${
                  activeSidePanel === 'metrics'
                    ? 'bg-sky-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Financial & BI Telemetry</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
              Click any machine line or inventory silo to inspect
            </div>
          </div>
        </section>

        {/* Right Collapsible Dock: Management Controls or BI Telemetry */}
        <aside className="w-full lg:w-[420px] xl:w-[460px] h-[320px] lg:h-full border-t lg:border-t-0 lg:border-l border-slate-800 flex-shrink-0 bg-surface flex flex-col overflow-hidden">
          {activeSidePanel === 'controls' ? (
            <ManagementControlsPanel
              state={state}
              onDispatch={dispatchCommand}
              onSelectMachine={handleSelectMachine}
            />
          ) : (
            <BusinessIntelligencePanel state={state} />
          )}
        </aside>
      </div>

      {/* Machine Inspection Modal */}
      {isInspectorOpen && selectedMachine && (
        <MachineInspectionModal
          machine={selectedMachine}
          onClose={() => setIsInspectorOpen(false)}
          onToggleOperation={(id, op) =>
            dispatchCommand({ type: 'TOGGLE_MACHINE_OPERATION', machineId: id, operating: op })
          }
          onServiceMachine={id =>
            dispatchCommand({ type: 'SERVICE_MACHINE', machineId: id })
          }
          availableCash={state.business.cash}
        />
      )}

      {/* Real-time Floating Toast Alert */}
      <ToastAlert event={activeToast} onDismiss={dismissToast} />
    </div>
  );
}

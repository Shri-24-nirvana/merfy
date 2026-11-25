'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSimulationStore } from '@/application/simulation-session/simulation-store';
import { SimulationControlBar } from '@/components/controls/SimulationControlBar';
import { FactoryWorld } from '@/world/manufacturing/FactoryWorld';
import { DomainSimulationWorld } from '@/world/domain/DomainSimulationWorld';
import { ManagementControlsPanel } from '@/components/controls/ManagementControlsPanel';
import { BusinessIntelligencePanel } from '@/components/metrics/BusinessIntelligencePanel';
import { MachineInspectionModal } from '@/components/inspection/MachineInspectionModal';
import { ToastAlert } from '@/components/shared/ToastAlert';
import { getScenarioById } from '@/scenarios/registry';
import { Sliders, BarChart3, Award, AlertTriangle, Sparkles } from 'lucide-react';

interface UniversalSimulationPageProps {
  scenarioId: string;
}

export default function UniversalSimulationPage({ scenarioId }: UniversalSimulationPageProps) {
  const router = useRouter();
  const scenario = getScenarioById(scenarioId);

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
  } = useSimulationStore();

  const [activeSidePanel, setActiveSidePanel] = useState<'controls' | 'metrics'>('controls');
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  useEffect(() => {
    if (!state || state.scenarioId !== scenarioId) {
      initSimulation(scenarioId);
    }
  }, [scenarioId]);

  const accentColor = scenario?.imageAccent || '#6366F1';

  if (!state) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-bold text-indigo-700">Loading {scenario?.name || scenarioId} Simulation…</p>
        <p className="text-xs text-slate-400">Initializing simulation engine</p>
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
    <div className="min-h-screen h-screen flex flex-col bg-slate-50 overflow-hidden" style={{ touchAction: 'pan-y' }}>
      <SimulationControlBar
        state={state}
        onStart={startSimulation}
        onPause={pauseSimulation}
        onResume={resumeSimulation}
        onSetSpeed={setSpeed}
        onRestart={restartSimulation}
        onManualTick={tickManual}
      />

      {(isCompleted || isFailed) && (
        <div
          className={`w-full py-3 px-6 flex items-center justify-between text-sm font-bold z-40 select-none shadow-md ${
            isCompleted
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
              : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
          }`}
        >
          <div className="flex items-center space-x-2">
            {isCompleted ? <Sparkles className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span>{isCompleted ? `🎉 Simulation Complete — ${scenario?.name}` : '⚠ Simulation Failed. Cash threshold breached.'}</span>
          </div>
          <button
            onClick={() => router.push('/simulation/results')}
            className="py-1.5 px-4 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors flex items-center space-x-1.5 font-bold border border-white/30"
          >
            <Award className="w-3.5 h-3.5" />
            <span>View Assessment</span>
          </button>
        </div>
      )}

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Simulation World Viewport */}
        <section className="flex-1 h-full p-2 sm:p-3 overflow-y-auto flex flex-col relative">
          <div className="flex-1 w-full relative min-h-[560px]">
            {scenario?.domain === 'Manufacturing' ? (
              <FactoryWorld
                state={state}
                onSelectMachine={handleSelectMachine}
                selectedMachineId={selectedMachineId}
                onQuickReorder={() => dispatchCommand({ type: 'ORDER_RAW_MATERIALS', quantity: 2000 })}
              />
            ) : (
              <DomainSimulationWorld
                domain={scenario?.domain || 'Retail'}
                state={state}
                onSelectMachine={handleSelectMachine}
                selectedMachineId={selectedMachineId}
                onQuickAction={() => dispatchCommand({ type: 'ORDER_RAW_MATERIALS', quantity: 2000 })}
              />
            )}
          </div>

          {/* Panel toggle buttons for mobile / smaller screens */}
          <div className="flex items-center justify-between pt-2 lg:hidden">
            <div className="flex items-center space-x-2 bg-white border-2 border-slate-100 rounded-2xl p-1.5 shadow-sm">
              <button
                onClick={() => setActiveSidePanel('controls')}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl font-bold text-xs transition-all ${
                  activeSidePanel === 'controls'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Controls</span>
              </button>
              <button
                onClick={() => setActiveSidePanel('metrics')}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl font-bold text-xs transition-all ${
                  activeSidePanel === 'metrics'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Analytics</span>
              </button>
            </div>
            <div className="text-[11px] text-slate-400 hidden sm:block">
              Click machines to inspect
            </div>
          </div>
        </section>

        {/* Right Dock */}
        <aside className="w-full lg:w-[400px] xl:w-[440px] h-[320px] lg:h-full border-t-2 lg:border-t-0 lg:border-l-2 border-slate-100 flex-shrink-0 bg-white flex flex-col overflow-hidden">
          <div className="hidden lg:flex items-center space-x-2 px-4 pt-3 pb-0 border-b-2 border-slate-100">
            <button
              onClick={() => setActiveSidePanel('controls')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all mb-2 ${
                activeSidePanel === 'controls'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Management Controls</span>
            </button>
            <button
              onClick={() => setActiveSidePanel('metrics')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all mb-2 ${
                activeSidePanel === 'metrics'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>BI Analytics</span>
            </button>
          </div>

          {activeSidePanel === 'controls' ? (
            <ManagementControlsPanel state={state} onDispatch={dispatchCommand} onSelectMachine={handleSelectMachine} />
          ) : (
            <BusinessIntelligencePanel state={state} />
          )}
        </aside>
      </div>

      {isInspectorOpen && selectedMachine && (
        <MachineInspectionModal
          machine={selectedMachine}
          onClose={() => setIsInspectorOpen(false)}
          onToggleOperation={(id, op) => dispatchCommand({ type: 'TOGGLE_MACHINE_OPERATION', machineId: id, operating: op })}
          onServiceMachine={id => dispatchCommand({ type: 'SERVICE_MACHINE', machineId: id })}
          availableCash={state.business.cash}
        />
      )}

      <ToastAlert event={activeToast} onDismiss={dismissToast} />
    </div>
  );
}

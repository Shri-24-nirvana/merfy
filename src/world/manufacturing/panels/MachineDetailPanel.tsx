'use client';

import React, { useState } from 'react';
import { Wrench, ChevronLeft, Power, Zap, AlertTriangle, CheckCircle2, TrendingUp, DollarSign, Settings } from 'lucide-react';
import { SimulationState, Machine } from '@/types/simulation';

interface MachineDetailPanelProps {
  state: SimulationState;
  machine: Machine | null;
  onDispatch: (cmd: { type: string; [key: string]: unknown }) => void;
  onBack: () => void;
}

export const MachineDetailPanel: React.FC<MachineDetailPanelProps> = ({
  state,
  machine,
  onDispatch,
  onBack,
}) => {
  const { production, business } = state;
  const [confirmService, setConfirmService] = useState(false);
  const SERVICE_COST = 1000;

  if (!machine) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-[#627387] text-sm font-mono">
        <Settings className="w-8 h-8 mb-2 text-[#263447]" />
        <p>No machine selected.</p>
        <button onClick={onBack} className="mt-3 text-[#28D7F2] hover:underline text-xs">
          ← Back to Controls
        </button>
      </div>
    );
  }

  const isRunning = machine.operating && machine.status === 'RUNNING' && production.activeMachinesCount > 0;
  const efficiencyPct = Math.round(machine.efficiency * 100);
  const canAffordService = business.cash >= SERVICE_COST;
  const needsService = machine.status === 'MAINTENANCE' || efficiencyPct < 70;

  const statusConfig: Record<string, { label: string; color: string }> = {
    RUNNING: { label: 'RUNNING', color: '#39E58C' },
    IDLE: { label: 'STANDBY', color: '#FFB547' },
    MAINTENANCE: { label: 'MAINTENANCE REQUIRED', color: '#FF5F6D' },
    OFFLINE: { label: 'OFFLINE', color: '#627387' },
  };
  const statusInfo = statusConfig[machine.status] ?? { label: machine.status, color: '#9AA9BB' };

  return (
    <div className="flex flex-col h-full text-[#F3F7FC] overflow-y-auto">
      {/* Header */}
      <div className="px-4 py-3 bg-[#101722] border-b border-[#263447] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className={`p-2 rounded-lg border ${isRunning ? 'bg-[#39E58C]/15 border-[#39E58C]/30 text-[#39E58C]' : 'bg-[#263447]/50 border-[#263447] text-[#9AA9BB]'}`}>
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#F3F7FC] font-mono tracking-tight">{machine.name}</h3>
            <p className="text-[10px]" style={{ color: statusInfo.color }}>{statusInfo.label} · ID: {machine.id}</p>
          </div>
        </div>
        <button onClick={onBack} className="flex items-center space-x-1 text-[11px] font-mono text-[#9AA9BB] hover:text-[#28D7F2] transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Maintenance Alert */}
        {needsService && (
          <div className="flex items-center space-x-2 px-3 py-2 rounded-lg border bg-[#FF5F6D]/15 border-[#FF5F6D]/50 text-[#FF5F6D] text-xs font-bold font-mono animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Efficiency degraded. Service recommended to restore output.</span>
          </div>
        )}

        {/* Visual Machine Status */}
        <div className="bg-[#0D1420] border border-[#263447] rounded-xl p-4 flex items-center justify-center">
          <div className="relative flex flex-col items-center">
            <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center ${
              isRunning ? 'border-[#39E58C] shadow-glow-green' : machine.operating ? 'border-[#FFB547]' : 'border-[#263447]'
            }`}>
              <div className={`w-12 h-12 rounded-full border-2 border-dashed flex items-center justify-center transition-all ${
                isRunning ? 'border-[#28D7F2] animate-spin text-[#28D7F2]' : 'border-[#627387] text-[#627387]'
              }`} style={{ animationDuration: '2s' }}>
                <Wrench className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-2 flex items-center space-x-1.5">
              <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-[#39E58C] shadow-glow-green animate-pulse' : machine.operating ? 'bg-[#FFB547]' : 'bg-[#627387]'}`} />
              <span className="text-xs font-mono font-bold" style={{ color: statusInfo.color }}>{statusInfo.label}</span>
            </div>
          </div>
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: 'Rated Capacity', value: `${machine.productionCapacity} b/d`, color: '#28D7F2', icon: Zap },
            { label: 'Efficiency', value: `${efficiencyPct}%`, color: efficiencyPct < 60 ? '#FF5F6D' : efficiencyPct < 80 ? '#FFB547' : '#39E58C', icon: TrendingUp },
            { label: 'Total Produced', value: `${machine.totalProduced.toLocaleString()}`, color: '#9875FF', icon: CheckCircle2 },
            { label: 'Maintenance Cost', value: `$${machine.maintenanceCostPerDay}/day`, color: '#FFB547', icon: DollarSign },
          ].map(item => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="bg-[#0D1420] border border-[#263447] rounded-lg p-2.5">
                <div className="flex items-center space-x-1 mb-1">
                  <Icon className="w-3 h-3" style={{ color: item.color }} />
                  <span className="text-[9px] font-mono text-[#627387] uppercase tracking-wider">{item.label}</span>
                </div>
                <div className="text-sm font-black font-mono" style={{ color: item.color }}>{item.value}</div>
              </div>
            );
          })}
        </div>

        {/* Efficiency Bar */}
        <div className="bg-[#0D1420] border border-[#263447] rounded-xl p-3.5">
          <div className="flex justify-between text-[11px] font-mono mb-2">
            <span className="text-[#9AA9BB]">Machine Reliability Score</span>
            <span className="font-bold" style={{ color: efficiencyPct < 60 ? '#FF5F6D' : efficiencyPct < 80 ? '#FFB547' : '#39E58C' }}>{efficiencyPct}%</span>
          </div>
          <div className="w-full bg-[#080B12] rounded-full h-2.5 border border-[#263447] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${efficiencyPct}%`,
                background: efficiencyPct < 60 ? '#FF5F6D' : efficiencyPct < 80 ? '#FFB547' : '#39E58C',
              }}
            />
          </div>
          <div className="flex justify-between text-[9px] font-mono text-[#627387] mt-1">
            <span>Critical</span>
            <span>Optimal</span>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-2.5">
          {/* Toggle Operation */}
          <button
            onClick={() => onDispatch({ type: 'TOGGLE_MACHINE_OPERATION', machineId: machine.id, operating: !machine.operating })}
            className={`w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl border font-bold font-mono text-sm transition-all ${
              machine.operating
                ? 'bg-[#FF5F6D]/15 border-[#FF5F6D]/50 text-[#FF5F6D] hover:bg-[#FF5F6D]/25'
                : 'bg-[#39E58C]/15 border-[#39E58C]/50 text-[#39E58C] hover:bg-[#39E58C]/25'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{machine.operating ? 'Take Offline (Stop)' : 'Bring Online (Start)'}</span>
          </button>

          {/* Service Machine */}
          {confirmService ? (
            <div className="bg-[#FFB547]/10 border border-[#FFB547]/40 rounded-xl p-3.5 space-y-2">
              <p className="text-xs font-mono text-[#FFB547] font-bold">Confirm: Deduct ${SERVICE_COST.toLocaleString()} for service?</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => { onDispatch({ type: 'SERVICE_MACHINE', machineId: machine.id }); setConfirmService(false); }}
                  disabled={!canAffordService}
                  className="flex-1 py-2 rounded-lg bg-[#FFB547] text-[#080B12] font-bold font-mono text-xs hover:bg-[#FFB547]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Service
                </button>
                <button
                  onClick={() => setConfirmService(false)}
                  className="flex-1 py-2 rounded-lg bg-[#1B2838] border border-[#263447] text-[#9AA9BB] font-mono text-xs hover:text-[#F3F7FC]"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setConfirmService(true)}
              disabled={!canAffordService}
              className={`w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl border font-bold font-mono text-sm transition-all ${
                canAffordService
                  ? 'bg-[#FFB547]/10 border-[#FFB547]/40 text-[#FFB547] hover:bg-[#FFB547]/20'
                  : 'bg-[#101722] border-[#263447]/40 text-[#627387] cursor-not-allowed opacity-50'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Service Machine (${SERVICE_COST.toLocaleString()})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


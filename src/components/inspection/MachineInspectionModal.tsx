'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Machine } from '@/types/simulation';
import {
  X,
  Wrench,
  Power,
  Zap,
  Activity,
  AlertCircle,
  Gauge,
  Clock,
  DollarSign,
  ShieldAlert,
} from 'lucide-react';

interface MachineInspectionModalProps {
  machine: Machine | null;
  onClose: () => void;
  onToggleOperation: (machineId: string, operating: boolean) => void;
  onServiceMachine: (machineId: string) => void;
  availableCash: number;
}

export const MachineInspectionModal: React.FC<MachineInspectionModalProps> = ({
  machine,
  onClose,
  onToggleOperation,
  onServiceMachine,
  availableCash,
}) => {
  if (!machine) return null;

  const canAffordService = availableCash >= 1000;
  const efficiencyPct = Math.round(machine.efficiency * 100);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-md bg-white border-2 border-indigo-100 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-indigo-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-white border-2 border-indigo-200 text-indigo-600 shadow-sm">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">{machine.name}</h3>
                <p className="text-xs font-mono text-indigo-600">ID: {machine.id}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white transition-colors border border-transparent hover:border-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            {/* Status badge */}
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-xl border-2 font-bold text-sm ${machine.operating ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${machine.operating ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
              <span>{machine.operating ? '🟢 RUNNING' : '⚫ STANDBY'}</span>
            </div>

            {/* Telemetry grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-indigo-50 border-2 border-indigo-100 rounded-2xl p-3">
                <div className="text-[10px] text-slate-500 flex items-center space-x-1.5 mb-1 font-semibold uppercase">
                  <Gauge className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Throughput</span>
                </div>
                <div className="text-sm font-black text-indigo-700">
                  {machine.productionCapacity.toLocaleString()} b/d
                </div>
              </div>

              <div className={`border-2 rounded-2xl p-3 ${efficiencyPct >= 80 ? 'bg-emerald-50 border-emerald-100' : efficiencyPct >= 50 ? 'bg-amber-50 border-amber-100' : 'bg-red-50 border-red-100'}`}>
                <div className="text-[10px] text-slate-500 flex items-center space-x-1.5 mb-1 font-semibold uppercase">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Health</span>
                </div>
                <div className={`text-sm font-black ${efficiencyPct >= 80 ? 'text-emerald-700' : efficiencyPct >= 50 ? 'text-amber-700' : 'text-red-700'}`}>
                  {efficiencyPct}%
                </div>
                <div className="w-full bg-white/60 rounded-full h-1.5 mt-1 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${efficiencyPct >= 80 ? 'bg-emerald-500' : efficiencyPct >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${efficiencyPct}%` }}
                  />
                </div>
              </div>

              <div className="bg-purple-50 border-2 border-purple-100 rounded-2xl p-3">
                <div className="text-[10px] text-slate-500 flex items-center space-x-1.5 mb-1 font-semibold uppercase">
                  <Clock className="w-3.5 h-3.5 text-purple-500" />
                  <span>Total Output</span>
                </div>
                <div className="text-sm font-bold text-purple-700">
                  {Math.round(machine.totalProduced).toLocaleString()}
                </div>
              </div>

              <div className="bg-amber-50 border-2 border-amber-100 rounded-2xl p-3">
                <div className="text-[10px] text-slate-500 flex items-center space-x-1.5 mb-1 font-semibold uppercase">
                  <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                  <span>Maint Cost</span>
                </div>
                <div className="text-sm font-bold text-amber-700">
                  ${machine.maintenanceCostPerDay}/day
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => onToggleOperation(machine.id, !machine.operating)}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all border-2 ${
                  machine.operating
                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                }`}
              >
                <Power className="w-4 h-4" />
                <span>
                  {machine.operating ? '⏸ Halt Line (Switch to Standby)' : '▶ Start Line (Resume Operation)'}
                </span>
              </button>

              <button
                onClick={() => onServiceMachine(machine.id)}
                disabled={!canAffordService}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-2 border-indigo-200 disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                <Wrench className="w-4 h-4" />
                <span>🔧 Precision Calibration ($1,000)</span>
              </button>

              {!canAffordService && (
                <p className="text-[10px] text-center text-red-500 font-semibold">
                  ⚠ Insufficient funds for maintenance
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

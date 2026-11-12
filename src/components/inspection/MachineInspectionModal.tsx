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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-md bg-surface border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-surface-secondary/80 border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">{machine.name}</h3>
                <p className="text-xs font-mono text-slate-400">Unit ID: {machine.id}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Machine Telemetry Grid */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] text-slate-400 flex items-center space-x-1.5 mb-1">
                  <Power className="w-3.5 h-3.5 text-slate-400" />
                  <span>Operating Status</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      machine.operating ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                    }`}
                  />
                  <span className="text-sm font-bold text-slate-100">
                    {machine.operating ? 'RUNNING' : 'STANDBY'}
                  </span>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] text-slate-400 flex items-center space-x-1.5 mb-1">
                  <Gauge className="w-3.5 h-3.5 text-slate-400" />
                  <span>Daily Capacity</span>
                </div>
                <div className="text-sm font-bold font-mono text-sky-400">
                  {machine.productionCapacity.toLocaleString()} bottles/day
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] text-slate-400 flex items-center space-x-1.5 mb-1">
                  <Activity className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mechanical Health</span>
                </div>
                <div className="text-sm font-bold font-mono text-emerald-400">
                  {Math.round(machine.efficiency * 100)}% Peak
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] text-slate-400 flex items-center space-x-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Total Produced</span>
                </div>
                <div className="text-sm font-bold font-mono text-slate-200">
                  {Math.round(machine.totalProduced).toLocaleString()} bottles
                </div>
              </div>
            </div>

            {/* Financial Overhead Info */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 text-xs text-slate-400 flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>Operating Maintenance:</span>
              </span>
              <span className="font-mono text-slate-200 font-semibold">
                ${machine.maintenanceCostPerDay}/day
              </span>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => onToggleOperation(machine.id, !machine.operating)}
                className={`w-full py-2.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 transition-all ${
                  machine.operating
                    ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                <Power className="w-4 h-4" />
                <span>
                  {machine.operating ? 'Halt Line (Switch to Standby)' : 'Start Line (Resume Production)'}
                </span>
              </button>

              <button
                onClick={() => onServiceMachine(machine.id)}
                disabled={!canAffordService}
                className="w-full py-2.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                <Wrench className="w-4 h-4" />
                <span>Precision Calibration Overhaul ($1,000)</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

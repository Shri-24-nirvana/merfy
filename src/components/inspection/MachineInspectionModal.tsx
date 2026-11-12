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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-md bg-[#151F2D] border border-[#28D7F2]/40 rounded-2xl shadow-glow-cyan overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-[#101722] border-b border-[#263447] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-[#28D7F2]/10 border border-[#28D7F2]/30 text-[#28D7F2]">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F3F7FC]">{machine.name}</h3>
                <p className="text-xs font-mono text-[#28D7F2]">SCADA UNIT ID: {machine.id}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#9AA9BB] hover:text-[#F3F7FC] hover:bg-[#1B2838] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Machine Telemetry Grid */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#080B12] border border-[#263447] rounded-xl p-3 shadow-card-industrial">
                <div className="text-[10px] text-[#9AA9BB] flex items-center space-x-1.5 mb-1 font-mono uppercase">
                  <Power className="w-3.5 h-3.5 text-[#9AA9BB]" />
                  <span>Operating Mode</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      machine.operating ? 'bg-[#39E58C] shadow-glow-green animate-pulse' : 'bg-[#627387]'
                    }`}
                  />
                  <span className="text-sm font-bold font-mono text-[#F3F7FC]">
                    {machine.operating ? 'RUNNING' : 'STANDBY'}
                  </span>
                </div>
              </div>

              <div className="bg-[#080B12] border border-[#263447] rounded-xl p-3 shadow-card-industrial">
                <div className="text-[10px] text-[#9AA9BB] flex items-center space-x-1.5 mb-1 font-mono uppercase">
                  <Gauge className="w-3.5 h-3.5 text-[#28D7F2]" />
                  <span>Throughput Rating</span>
                </div>
                <div className="text-sm font-black font-mono text-[#28D7F2]">
                  {machine.productionCapacity.toLocaleString()} b/d
                </div>
              </div>

              <div className="bg-[#080B12] border border-[#263447] rounded-xl p-3 shadow-card-industrial">
                <div className="text-[10px] text-[#9AA9BB] flex items-center space-x-1.5 mb-1 font-mono uppercase">
                  <Activity className="w-3.5 h-3.5 text-[#39E58C]" />
                  <span>Mechanical Health</span>
                </div>
                <div className="text-sm font-black font-mono text-[#39E58C]">
                  {Math.round(machine.efficiency * 100)}% Peak
                </div>
              </div>

              <div className="bg-[#080B12] border border-[#263447] rounded-xl p-3 shadow-card-industrial">
                <div className="text-[10px] text-[#9AA9BB] flex items-center space-x-1.5 mb-1 font-mono uppercase">
                  <Clock className="w-3.5 h-3.5 text-[#9875FF]" />
                  <span>Lifetime Bottles</span>
                </div>
                <div className="text-sm font-bold font-mono text-[#F3F7FC]">
                  {Math.round(machine.totalProduced).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Financial Overhead Info */}
            <div className="bg-[#080B12] border border-[#263447] rounded-xl p-3 text-xs text-[#9AA9BB] flex items-center justify-between font-mono">
              <span className="flex items-center space-x-1.5">
                <DollarSign className="w-4 h-4 text-[#FFB547]" />
                <span>Operating Line Maintenance:</span>
              </span>
              <span className="text-[#F3F7FC] font-bold">
                ${machine.maintenanceCostPerDay}/day
              </span>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => onToggleOperation(machine.id, !machine.operating)}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
                  machine.operating
                    ? 'bg-[#FFB547]/15 hover:bg-[#FFB547]/25 text-[#FFB547] border border-[#FFB547]/40 shadow-sm'
                    : 'bg-[#39E58C]/15 hover:bg-[#39E58C]/25 text-[#39E58C] border border-[#39E58C]/40 shadow-sm'
                }`}
              >
                <Power className="w-4 h-4" />
                <span>
                  {machine.operating ? 'Halt Line (Switch to Standby)' : 'Start Line (Resume Operation)'}
                </span>
              </button>

              <button
                onClick={() => onServiceMachine(machine.id)}
                disabled={!canAffordService}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 bg-[#28D7F2]/15 hover:bg-[#28D7F2]/25 text-[#28D7F2] border border-[#28D7F2]/40 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm"
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

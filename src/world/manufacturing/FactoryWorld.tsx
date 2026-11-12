'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SimulationState,
  Machine,
} from '@/types/simulation';
import {
  Zap,
  Package,
  Truck,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Sparkles,
  Info,
} from 'lucide-react';

interface FactoryWorldProps {
  state: SimulationState;
  onSelectMachine: (machineId: string) => void;
  selectedMachineId: string | null;
  onQuickReorder?: () => void;
  onQuickOrderDispatch?: (orderId: string) => void;
}

export const FactoryWorld: React.FC<FactoryWorldProps> = ({
  state,
  onSelectMachine,
  selectedMachineId,
  onQuickReorder,
  onQuickOrderDispatch,
}) => {
  const { machines, inventory, production, orders, status } = state;

  const isRunning = status === 'RUNNING';
  const hasActiveProduction = production.activeMachinesCount > 0 && production.currentHourlyRate > 0;

  // Raw material fill percentage (capped at 100%)
  const rawMax = 8000;
  const rawPercent = Math.min(100, Math.round((inventory.rawMaterials.quantity / rawMax) * 100));

  // Finished goods fill percentage
  const fgMax = 6000;
  const fgPercent = Math.min(100, Math.round((inventory.finishedGoods.quantity / fgMax) * 100));

  const activeOrders = orders.filter(o => o.status === 'IN_PRODUCTION');

  return (
    <div className="relative w-full h-full min-h-[580px] bg-[#090D12] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col select-none">
      {/* Factory Grid Background & Atmospheric Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Factory Status Banner */}
      <div className="relative z-10 px-6 py-3.5 bg-surface/80 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              {isRunning && hasActiveProduction && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${
                  hasActiveProduction
                    ? 'bg-emerald-500'
                    : isRunning
                    ? 'bg-amber-500'
                    : 'bg-slate-500'
                }`}
              />
            </span>
            <span className="font-semibold text-slate-200 tracking-wide uppercase text-[11px]">
              {hasActiveProduction
                ? 'Bottling Line Operational'
                : isRunning
                ? 'Plant Standby / Bottlenecked'
                : 'Plant Offline'}
            </span>
          </div>

          <div className="h-4 w-px bg-slate-700/60" />

          <div className="text-slate-400">
            Active Lines:{' '}
            <span className="text-sky-400 font-bold">
              {production.activeMachinesCount} / {production.totalMachinesCount}
            </span>
          </div>

          <div className="text-slate-400 hidden sm:block">
            Throughput:{' '}
            <span className="text-emerald-400 font-mono font-bold">
              {production.currentHourlyRate} bottles/hr
            </span>{' '}
            <span className="text-slate-500">({production.currentDailyCapacity} / day)</span>
          </div>
        </div>

        {production.bottleneckReason && (
          <div className="flex items-center space-x-2 bg-amber-950/40 border border-amber-600/30 px-3 py-1 rounded-full text-amber-300 animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium text-[11px] truncate max-w-xs">{production.bottleneckReason}</span>
          </div>
        )}
      </div>

      {/* Main Factory Interactive World Floor */}
      <div className="relative flex-1 p-4 lg:p-6 overflow-x-auto overflow-y-hidden flex items-center justify-center">
        <div className="w-full max-w-6xl min-w-[900px] h-full flex flex-col justify-between py-2">
          
          {/* Top Row: Raw Storage & Incoming Deliveries */}
          <div className="grid grid-cols-12 gap-4 items-stretch h-36">
            
            {/* Zone 1: Raw Material Silos & Preform Storage */}
            <div className="col-span-4 bg-surface-secondary/70 border border-slate-700/60 rounded-xl p-3.5 flex flex-col justify-between relative overflow-hidden group hover:border-sky-500/50 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Raw Material Silo</h4>
                    <p className="text-[10px] text-slate-400">Preforms, Syrup & Caps</p>
                  </div>
                </div>

                {onQuickReorder && (
                  <button
                    onClick={onQuickReorder}
                    className="text-[10px] px-2 py-1 bg-sky-600/20 hover:bg-sky-600/40 text-sky-300 border border-sky-500/30 rounded font-medium transition-all"
                  >
                    + Reorder
                  </button>
                )}
              </div>

              {/* Silo Tank Visuals */}
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex-1 bg-slate-900/80 rounded-lg p-2 border border-slate-800">
                  <div className="flex justify-between text-[11px] mb-1 font-mono">
                    <span className="text-slate-400">Inventory:</span>
                    <span
                      className={`font-bold ${
                        rawPercent < 20 ? 'text-red-400 animate-pulse' : 'text-sky-300'
                      }`}
                    >
                      {inventory.rawMaterials.quantity.toLocaleString()} {inventory.rawMaterials.unit}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5">
                    <motion.div
                      className={`h-full rounded-full ${
                        rawPercent < 20 ? 'bg-red-500' : rawPercent < 40 ? 'bg-amber-500' : 'bg-sky-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${rawPercent}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Animated Liquid Vat */}
                <div className="w-14 h-14 relative bg-slate-900 border-2 border-slate-700 rounded-lg overflow-hidden flex flex-col justify-end p-0.5">
                  <motion.div
                    className="w-full bg-sky-500/60 rounded-sm relative"
                    animate={{ height: `${rawPercent}%` }}
                    transition={{ duration: 0.5 }}
                  >
                    {hasActiveProduction && (
                      <div className="absolute inset-0 bg-sky-400/30 animate-pulse" />
                    )}
                  </motion.div>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-slate-200">
                    {rawPercent}%
                  </span>
                </div>
              </div>

              {/* Connection Feed to Bottling Line */}
              <div className="text-[10px] text-slate-500 flex items-center justify-between mt-1">
                <span>Unit Cost: ${inventory.rawMaterials.unitCost.toFixed(2)}</span>
                <span className="flex items-center text-emerald-400">
                  <Zap className="w-3 h-3 mr-1" /> Auto-feeds line
                </span>
              </div>
            </div>

            {/* Zone 2: Raw Material Pipe & Valve Bridge */}
            <div className="col-span-4 flex items-center justify-center relative">
              <div className="w-full h-8 bg-slate-800 border-y-2 border-slate-700 flex items-center justify-around relative overflow-hidden rounded-md">
                {/* Flowing liquid pipe animation */}
                {hasActiveProduction && (
                  <motion.div
                    className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_15px,#0284c7_15px,#0284c7_30px)] opacity-60"
                    animate={{ x: [0, 30] }}
                    transition={{ repeat: Infinity, ease: 'linear', duration: 0.8 }}
                  />
                )}
                <div className="relative z-10 text-[10px] font-mono text-slate-300 font-bold px-2 py-0.5 bg-slate-900/80 rounded border border-slate-700">
                  Syrup & Preform Feed Line
                </div>
              </div>
            </div>

            {/* Zone 3: Automated Quality & Batch Inspector */}
            <div className="col-span-4 bg-surface-secondary/70 border border-slate-700/60 rounded-xl p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Quality Inspection Unit</h4>
                    <p className="text-[10px] text-slate-400">ISO 22000 Sterilization</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 rounded font-medium">
                  Grade A
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-slate-900/80 border border-slate-800 rounded p-1.5 text-center">
                  <div className="text-[9px] text-slate-400 uppercase">Batch Efficiency</div>
                  <div className="text-xs font-mono font-bold text-emerald-400">99.8%</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded p-1.5 text-center">
                  <div className="text-[9px] text-slate-400 uppercase">Sterility Index</div>
                  <div className="text-xs font-mono font-bold text-sky-400">Optimal</div>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 flex items-center justify-between mt-1">
                <span>Total Output:</span>
                <span className="text-slate-200 font-mono font-bold">
                  {production.totalUnitsProduced.toLocaleString()} bottles
                </span>
              </div>
            </div>

          </div>

          {/* Middle Row: Conveyor System & Active Bottling Machines */}
          <div className="my-4 relative">
            {/* Main Conveyor Belt Track */}
            <div className="relative w-full h-12 bg-slate-900 border-y-2 border-slate-700/80 rounded-lg flex items-center overflow-hidden shadow-inner">
              {/* Conveyor track treads */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#1E293B,#1E293B_12px,#0F172A_12px,#0F172A_24px)] opacity-50" />

              {/* Animated Moving Bottles on Conveyor */}
              {hasActiveProduction && (
                <div className="absolute inset-0 flex items-center justify-between px-4 overflow-hidden pointer-events-none">
                  {[...Array(14)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-5 h-8 flex flex-col items-center justify-end"
                      animate={{
                        x: ['-20px', '40px'],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        ease: 'linear',
                        delay: i * 0.1,
                      }}
                    >
                      {/* Bottle cap */}
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-t-sm" />
                      {/* Bottle body */}
                      <div className="w-3.5 h-6 bg-sky-400/80 rounded-sm border border-sky-300 shadow-sm flex items-center justify-center">
                        <div className="w-2 h-3 bg-sky-200/50 rounded-sm" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="relative z-10 w-full flex items-center justify-between px-6 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                <span>Bottling Line Inflow</span>
                <span className="flex items-center text-sky-400">
                  <Activity className="w-3 h-3 mr-1 animate-spin" /> High-Speed Rotary Bottler
                </span>
                <span>To Automated Packaging</span>
              </div>
            </div>

            {/* Production Machinery Dock */}
            <div className="grid grid-cols-5 gap-3 mt-4">
              {machines.map((machine, index) => {
                const isSelected = selectedMachineId === machine.id;
                const isMachineRunning = machine.operating && machine.status === 'RUNNING' && hasActiveProduction;

                return (
                  <motion.div
                    key={machine.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectMachine(machine.id)}
                    className={`cursor-pointer rounded-xl p-3 border transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-sky-950/40 border-sky-400 shadow-lg shadow-sky-500/10'
                        : machine.operating
                        ? 'bg-surface border-slate-700 hover:border-slate-500'
                        : 'bg-slate-900/60 border-slate-800 opacity-70'
                    }`}
                  >
                    {/* Machine Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isMachineRunning
                              ? 'bg-emerald-400 animate-pulse'
                              : machine.operating
                              ? 'bg-amber-400'
                              : 'bg-slate-600'
                          }`}
                        />
                        <span className="text-[11px] font-bold text-slate-200 truncate">{machine.name}</span>
                      </div>
                      <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {machine.id}
                      </span>
                    </div>

                    {/* Machine Isometric Graphic */}
                    <div className="h-20 bg-slate-950/80 rounded-lg border border-slate-800 relative flex items-center justify-center overflow-hidden my-1">
                      {/* Piston & Gear Animation */}
                      <div className="relative flex items-center justify-center">
                        <motion.div
                          animate={isMachineRunning ? { rotate: 360 } : { rotate: 0 }}
                          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                          className={`w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center ${
                            isMachineRunning ? 'border-sky-400 text-sky-400' : 'border-slate-600 text-slate-600'
                          }`}
                        >
                          <Wrench className="w-5 h-5" />
                        </motion.div>

                        {/* Liquid Injection Effect */}
                        {isMachineRunning && (
                          <motion.div
                            animate={{ scale: [0.8, 1.2, 0.8] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="absolute -top-1 w-3 h-3 bg-sky-400 rounded-full blur-[2px]"
                          />
                        )}
                      </div>

                      {/* Status Tag Overlay */}
                      <div className="absolute bottom-1 right-1">
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase ${
                            isMachineRunning
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                              : machine.operating
                              ? 'bg-amber-950/80 text-amber-400 border border-amber-800'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {machine.operating ? 'ACTIVE' : 'STANDBY'}
                        </span>
                      </div>
                    </div>

                    {/* Machine Metrics Footer */}
                    <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
                      <span>Capacity:</span>
                      <span className="font-mono font-bold text-sky-300">
                        {machine.productionCapacity} / day
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center justify-between">
                      <span>Efficiency:</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {Math.round(machine.efficiency * 100)}%
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Empty Machine Slots (up to 5 max) */}
              {[...Array(Math.max(0, 5 - machines.length))].map((_, idx) => (
                <div
                  key={`empty-${idx}`}
                  className="rounded-xl p-3 border-2 border-dashed border-slate-800/80 bg-slate-950/30 flex flex-col items-center justify-center text-center text-slate-600"
                >
                  <Sparkles className="w-5 h-5 mb-1.5 text-slate-600" />
                  <span className="text-[11px] font-medium">Empty Bay 0{machines.length + idx + 1}</span>
                  <span className="text-[9px] text-slate-500 mt-1">Available for Expansion</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: Packaging Unit, Finished Goods Warehouse & Dispatch Dock */}
          <div className="grid grid-cols-12 gap-4 items-stretch h-36">
            
            {/* Packaging Station */}
            <div className="col-span-3 bg-surface-secondary/70 border border-slate-700/60 rounded-xl p-3.5 flex flex-col justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Packaging Station</h4>
                  <p className="text-[10px] text-slate-400">Robotic 24-Pack Boxer</p>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2 flex items-center justify-around">
                <div className="text-center">
                  <div className="text-[9px] text-slate-400 uppercase">Box Format</div>
                  <div className="text-xs font-mono font-bold text-slate-200">24 x 500ml</div>
                </div>
                <div className="h-6 w-px bg-slate-800" />
                <div className="text-center">
                  <div className="text-[9px] text-slate-400 uppercase">Palletizer</div>
                  <div className="text-xs font-mono font-bold text-emerald-400">Synced</div>
                </div>
              </div>

              <div className="text-[10px] text-slate-500">
                Direct feed into finished warehouse
              </div>
            </div>

            {/* Finished Goods Warehouse Rack */}
            <div className="col-span-4 bg-surface-secondary/70 border border-slate-700/60 rounded-xl p-3.5 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/50 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Finished Goods Warehouse</h4>
                    <p className="text-[10px] text-slate-400">Climate-Controlled Racking</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 rounded font-bold font-mono">
                  {inventory.finishedGoods.quantity.toLocaleString()} bottles
                </span>
              </div>

              {/* Warehouse Pallet Stacks Visual */}
              <div className="bg-slate-900/80 rounded-lg p-2 border border-slate-800">
                <div className="flex justify-between text-[11px] mb-1 font-mono">
                  <span className="text-slate-400">Storage Utilization:</span>
                  <span className="text-emerald-400 font-bold">{fgPercent}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5">
                  <motion.div
                    className="h-full rounded-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${fgPercent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="text-[10px] text-slate-400 flex items-center justify-between">
                <span>Inventory Asset Value:</span>
                <span className="font-mono font-bold text-emerald-300">
                  ${Math.round(inventory.finishedGoods.quantity * inventory.finishedGoods.unitCost).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Outbound Dispatch Dock & Freight Trucks */}
            <div className="col-span-5 bg-surface-secondary/70 border border-slate-700/60 rounded-xl p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Dispatch Freight Bay</h4>
                    <p className="text-[10px] text-slate-400">Customer Logistics & Loading</p>
                  </div>
                </div>

                <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-mono">
                  Bay 01 Active
                </span>
              </div>

              {/* Active Delivery Commitment Status */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2">
                {activeOrders.length > 0 ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-200 truncate max-w-[140px]">
                        {activeOrders[0].customer}
                      </span>
                      <span className="text-amber-400 font-mono font-bold">
                        Due: Day {activeOrders[0].deadlineDay}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>
                        Order Progress: {inventory.finishedGoods.quantity} / {activeOrders[0].quantity}
                      </span>
                      <span className="text-sky-300 font-bold font-mono">
                        ${(activeOrders[0].quantity * activeOrders[0].pricePerUnit).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-500 text-center py-1 flex items-center justify-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
                    <span>No pending dispatch commitments. Review Orders panel.</span>
                  </div>
                )}
              </div>

              <div className="text-[10px] text-slate-400 flex items-center justify-between">
                <span>Dock Status:</span>
                <span className="text-emerald-400 font-medium">Clear for Loading</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

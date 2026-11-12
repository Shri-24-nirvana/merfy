'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SimulationState, Machine } from '@/types/simulation';
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
  Power,
  Gauge,
  Clock,
  ArrowRight,
  ShieldAlert,
  Flame,
  Droplets,
  Box,
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
  const { machines, inventory, production, orders, status, speed } = state;

  const isRunning = status === 'RUNNING';
  const hasActiveProduction = isRunning && production.activeMachinesCount > 0 && production.currentHourlyRate > 0;

  // Station inspection state (clicking on stations opens info drawer)
  const [inspectedStation, setInspectedStation] = useState<string | null>(null);

  // Raw material fill percentage (max reference 8,000 units)
  const rawMax = 8000;
  const rawPercent = Math.min(100, Math.max(0, Math.round((inventory.rawMaterials.quantity / rawMax) * 100)));

  // Finished goods fill percentage (max reference 6,000 units)
  const fgMax = 6000;
  const fgPercent = Math.min(100, Math.max(0, Math.round((inventory.finishedGoods.quantity / fgMax) * 100)));

  const activeOrders = orders.filter(o => o.status === 'IN_PRODUCTION');

  // Animation speed multipliers based on simulation speed
  const conveyorDuration = isRunning ? (hasActiveProduction ? Math.max(0.4, 1.4 / speed) : 0) : 0;
  const pistonDuration = isRunning ? (hasActiveProduction ? Math.max(0.3, 1.0 / speed) : 0) : 0;

  const stations = [
    { id: 'raw', name: 'Raw Silo', icon: Droplets, color: '#28D7F2' },
    { id: 'filler', name: 'Bottle Filling', icon: Zap, color: '#39E58C' },
    { id: 'capper', name: 'Precision Capping', icon: Wrench, color: '#FFB547' },
    { id: 'labeler', name: 'Rotary Labelling', icon: Layers, color: '#9875FF' },
    { id: 'packer', name: 'Case Packaging', icon: Box, color: '#28D7F2' },
    { id: 'warehouse', name: 'Finished Storage', icon: Package, color: '#39E58C' },
    { id: 'dispatch', name: 'Logistics Bay', icon: Truck, color: '#FFB547' },
  ];

  return (
    <div className="relative w-full h-full min-h-[620px] bg-[#080B12] rounded-2xl overflow-hidden border border-[#263447] shadow-2xl flex flex-col select-none">
      {/* Background Industrial Grid & Cyan Atmosphere Ambient Lighting */}
      <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[480px] h-[360px] bg-[#28D7F2]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[480px] h-[360px] bg-[#9875FF]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 scanline-overlay opacity-20 pointer-events-none" />

      {/* Top Industrial Control Room HUD Bar */}
      <div className="relative z-20 px-5 py-3 bg-[#101722]/90 backdrop-blur-md border-b border-[#263447] flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Operational Beacon & Plant Mode */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2.5">
            <span className="relative flex h-3 w-3">
              {hasActiveProduction && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39E58C] opacity-75" />
              )}
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${
                  hasActiveProduction
                    ? 'bg-[#39E58C] shadow-glow-green'
                    : isRunning
                    ? 'bg-[#FFB547]'
                    : 'bg-[#627387]'
                }`}
              />
            </span>
            <div className="flex flex-col">
              <span className="font-extrabold text-[#F3F7FC] tracking-wider uppercase text-[11px] font-mono">
                {hasActiveProduction
                  ? 'AUTOMATED BOTTLING SUITE ACTIVE'
                  : isRunning
                  ? 'PLANT STANDBY / BOTTLENECKED'
                  : 'PLANT SHUTDOWN / OFFLINE'}
              </span>
              <span className="text-[10px] text-[#9AA9BB]">
                ISO 22000 Cleanroom Level 4 • SCADA Telemetry Stream
              </span>
            </div>
          </div>

          <div className="h-6 w-px bg-[#263447] hidden sm:block" />

          {/* Lines & Capacity */}
          <div className="hidden md:flex items-center space-x-4 text-xs font-mono">
            <span className="text-[#9AA9BB]">
              Active Lines:{' '}
              <strong className="text-[#28D7F2]">
                {production.activeMachinesCount} / {production.totalMachinesCount}
              </strong>
            </span>
            <span className="text-[#9AA9BB]">
              Output:{' '}
              <strong className="text-[#39E58C]">
                {production.currentHourlyRate} b/h
              </strong>{' '}
              <span className="text-[#627387]">({production.currentDailyCapacity} / day)</span>
            </span>
            <span className="text-[#9AA9BB]">
              Utilization:{' '}
              <strong className="text-[#9875FF]">
                {production.utilizationRate}%
              </strong>
            </span>
          </div>
        </div>

        {/* Right: Bottleneck Diagnostic Pill */}
        {production.bottleneckReason ? (
          <div className="flex items-center space-x-2 bg-[#FF5F6D]/15 border border-[#FF5F6D]/40 px-3 py-1.5 rounded-full text-[#FF5F6D] animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5 text-[#FF5F6D]" />
            <span className="font-bold text-[11px] font-mono tracking-tight truncate max-w-sm">
              {production.bottleneckReason}
            </span>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-2 bg-[#39E58C]/10 border border-[#39E58C]/25 px-3 py-1 rounded-full text-[#39E58C] text-[11px] font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Optimal Continuous Mass Balance</span>
          </div>
        )}
      </div>

      {/* Production Flow Sequence Breadcrumb Ribbon */}
      <div className="relative z-10 px-5 py-2 bg-[#0B0F18]/80 border-b border-[#263447]/60 flex items-center justify-between overflow-x-auto text-[11px] font-mono scrollbar-none">
        <div className="flex items-center space-x-2 text-[#9AA9BB]">
          <span className="text-[10px] text-[#627387] uppercase tracking-wider font-bold">Process Flow:</span>
          {stations.map((st, idx) => {
            const Icon = st.icon;
            const isLast = idx === stations.length - 1;
            return (
              <React.Fragment key={st.id}>
                <button
                  onClick={() => setInspectedStation(st.id)}
                  className="flex items-center space-x-1 hover:text-[#28D7F2] transition-colors focus:outline-none"
                >
                  <Icon className="w-3 h-3 text-[#28D7F2]" />
                  <span className="font-semibold">{st.name}</span>
                </button>
                {!isLast && <ArrowRight className="w-3 h-3 text-[#263447]" />}
              </React.Fragment>
            );
          })}
        </div>
        <span className="text-[10px] text-[#627387] hidden xl:inline">
          Click any unit for station diagnostics
        </span>
      </div>

      {/* The Central Factory Floor Interactive World */}
      <div className="relative flex-1 p-3 lg:p-5 overflow-x-auto overflow-y-hidden flex items-center justify-center">
        <div className="w-full max-w-6xl min-w-[960px] h-full flex flex-col justify-between py-1">

          {/* TOP STAGE: Raw Silos, Pneumatic Piping, Preform Hopper */}
          <div className="grid grid-cols-12 gap-3.5 items-stretch h-36">
            
            {/* Unit 1: Raw Material Silos (Liquid Concentrate & Syrup) */}
            <div
              onClick={() => setInspectedStation('raw')}
              className="col-span-4 bg-[#151F2D]/90 hover:bg-[#1B2838] border border-[#263447] hover:border-[#28D7F2]/60 rounded-xl p-3.5 flex flex-col justify-between relative overflow-hidden transition-all cursor-pointer group shadow-card-industrial"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-[#28D7F2]/10 border border-[#28D7F2]/30 text-[#28D7F2]">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F3F7FC] tracking-tight group-hover:text-[#28D7F2] transition-colors">
                      Raw Ingredients Silo
                    </h4>
                    <p className="text-[10px] text-[#9AA9BB]">Natural Syrup, Citric Concentrate & PET</p>
                  </div>
                </div>

                {onQuickReorder && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickReorder();
                    }}
                    className="text-[10px] px-2.5 py-1 bg-[#28D7F2]/15 hover:bg-[#28D7F2]/30 text-[#28D7F2] border border-[#28D7F2]/40 rounded-md font-bold transition-all shadow-sm"
                  >
                    + Reorder
                  </button>
                )}
              </div>

              {/* Liquid Silo Gauge Tank */}
              <div className="flex items-center space-x-3.5 mt-2">
                <div className="flex-1 bg-[#080B12]/80 rounded-lg p-2.5 border border-[#263447]">
                  <div className="flex justify-between text-[11px] mb-1 font-mono">
                    <span className="text-[#9AA9BB]">Supply Reserve:</span>
                    <span
                      className={`font-bold ${
                        rawPercent < 20 ? 'text-[#FF5F6D] animate-pulse' : 'text-[#28D7F2]'
                      }`}
                    >
                      {inventory.rawMaterials.quantity.toLocaleString()} {inventory.rawMaterials.unit}
                    </span>
                  </div>
                  <div className="w-full bg-[#101722] rounded-full h-2.5 overflow-hidden p-0.5 border border-[#263447]">
                    <motion.div
                      className={`h-full rounded-full transition-all duration-500 ${
                        rawPercent < 20 ? 'bg-[#FF5F6D]' : rawPercent < 40 ? 'bg-[#FFB547]' : 'bg-[#28D7F2]'
                      }`}
                      style={{ width: `${rawPercent}%` }}
                    />
                  </div>
                </div>

                {/* Animated Liquid Cylindrical Vat */}
                <div className="w-14 h-14 relative bg-[#080B12] border-2 border-[#263447] rounded-lg overflow-hidden flex flex-col justify-end p-0.5 shadow-inner">
                  <motion.div
                    className="w-full bg-[#28D7F2]/70 rounded-xs relative"
                    style={{ height: `${rawPercent}%` }}
                  >
                    {hasActiveProduction && (
                      <div className="absolute inset-0 bg-[#28D7F2]/40 animate-liquid-fill" />
                    )}
                  </motion.div>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-black text-[#F3F7FC] drop-shadow-md">
                    {rawPercent}%
                  </span>
                </div>
              </div>

              <div className="text-[10px] text-[#627387] flex items-center justify-between mt-1">
                <span>Unit Cost: ${inventory.rawMaterials.unitCost.toFixed(2)}</span>
                <span className="flex items-center text-[#39E58C] font-mono font-semibold">
                  <Zap className="w-3 h-3 mr-1" /> Pressure Fed
                </span>
              </div>
            </div>

            {/* Unit 2: High-Pressure Stainless Feed Pipe Bridge */}
            <div className="col-span-4 flex flex-col items-center justify-center relative">
              <div className="w-full h-10 bg-[#101722] border-y-2 border-[#263447] flex items-center justify-around relative overflow-hidden rounded-md shadow-inner">
                {/* Flowing liquid pattern when running */}
                {hasActiveProduction && (
                  <motion.div
                    className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,#28D7F2_20px,#28D7F2_40px)] opacity-50"
                    animate={{ x: [0, 40] }}
                    transition={{
                      repeat: Infinity,
                      ease: 'linear',
                      duration: conveyorDuration || 1.2,
                    }}
                  />
                )}
                <div className="relative z-10 text-[10px] font-mono text-[#F3F7FC] font-extrabold px-3 py-1 bg-[#151F2D]/90 rounded border border-[#263447] shadow-sm flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28D7F2] animate-pulse" />
                  <span>Pneumatic Fluid & Preform Feed Conduit</span>
                </div>
              </div>
              <span className="text-[9px] font-mono text-[#627387] mt-1.5 uppercase tracking-wider">
                Ultra-Clean Mass Flow Line (1.0 units / bottle)
              </span>
            </div>

            {/* Unit 3: Bottle Preform Feeder & Sterilization Chamber */}
            <div
              onClick={() => setInspectedStation('filler')}
              className="col-span-4 bg-[#151F2D]/90 hover:bg-[#1B2838] border border-[#263447] hover:border-[#39E58C]/60 rounded-xl p-3.5 flex flex-col justify-between cursor-pointer group transition-all shadow-card-industrial"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-[#39E58C]/10 border border-[#39E58C]/30 text-[#39E58C]">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F3F7FC] tracking-tight group-hover:text-[#39E58C] transition-colors">
                      Preform Loader & Heat Chamber
                    </h4>
                    <p className="text-[10px] text-[#9AA9BB]">Infrared Blow-Molding & Sterilization</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-[#39E58C]/10 border border-[#39E58C]/30 text-[#39E58C] rounded font-mono font-bold">
                  99.8% Eff
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-[#080B12]/80 border border-[#263447] rounded-lg p-2 text-center">
                  <div className="text-[9px] text-[#9AA9BB] uppercase">Mold Temp</div>
                  <div className="text-xs font-mono font-bold text-[#39E58C]">118°C Stable</div>
                </div>
                <div className="bg-[#080B12]/80 border border-[#263447] rounded-lg p-2 text-center">
                  <div className="text-[9px] text-[#9AA9BB] uppercase">Air Blow Rate</div>
                  <div className="text-xs font-mono font-bold text-[#28D7F2]">40 Bar High</div>
                </div>
              </div>

              <div className="text-[10px] text-[#9AA9BB] flex items-center justify-between mt-1">
                <span>Cycle Output:</span>
                <span className="text-[#F3F7FC] font-mono font-bold">
                  {production.totalUnitsProduced.toLocaleString()} units lifetime
                </span>
              </div>
            </div>

          </div>

          {/* MIDDLE STAGE: The Automated Conveyor System with VISIBLY ANIMATED BOTTLES */}
          <div className="my-4 relative">
            
            {/* Top Conveyor Guide Rails & Industrial Track */}
            <div className="relative w-full h-16 bg-[#0E1520] border-y-2 border-[#263447] rounded-xl flex items-center overflow-hidden shadow-2xl">
              {/* Conveyor track moving ribbed treads */}
              <motion.div
                className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#151F2D,#151F2D_16px,#080B12_16px,#080B12_32px)] opacity-60 pointer-events-none"
                animate={hasActiveProduction ? { x: [0, 32] } : { x: 0 }}
                transition={{
                  repeat: Infinity,
                  duration: conveyorDuration || 1.4,
                  ease: 'linear',
                }}
              />

              {/* Hazard Safety Border Striping */}
              <div className="absolute top-0 inset-x-0 h-1 bg-[repeating-linear-gradient(45deg,#FFB547,#FFB547_8px,#080B12_8px,#080B12_16px)] opacity-40" />
              <div className="absolute bottom-0 inset-x-0 h-1 bg-[repeating-linear-gradient(45deg,#FFB547,#FFB547_8px,#080B12_8px,#080B12_16px)] opacity-40" />

              {/* MANDATORY ANIMATED BOTTLE STAGES ALONG THE CONVEYOR */}
              <div className="relative z-10 w-full h-full flex items-center justify-between px-6 pointer-events-none">
                
                {/* Stage 1: Empty Bottle Supply Inlet */}
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-center">
                    <div className="w-1.5 h-1.5 bg-slate-600 rounded-t-xs" />
                    <div className="w-4 h-7 border border-slate-500/80 bg-slate-800/30 rounded-xs shadow-sm" />
                    <span className="text-[8px] font-mono text-[#9AA9BB] mt-0.5">Empty Preform</span>
                  </div>

                  {/* Flow Arrow */}
                  <motion.div
                    animate={hasActiveProduction ? { x: [0, 4, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-[#28D7F2]"
                  >
                    →
                  </motion.div>
                </div>

                {/* Stage 2: Bottle Filling Station (Liquid Rises Inside) */}
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-center relative">
                    {/* Mechanical Filling Nozzle */}
                    <motion.div
                      animate={hasActiveProduction ? { y: [0, 5, 0] } : { y: 0 }}
                      transition={{ repeat: Infinity, duration: pistonDuration || 1 }}
                      className="w-1.5 h-3 bg-[#28D7F2] rounded-t-xs mb-0.5 shadow-glow-cyan"
                    />
                    {/* Bottle with Rising Liquid */}
                    <div className="w-4 h-7 border border-[#28D7F2] bg-slate-900 rounded-xs overflow-hidden flex flex-col justify-end p-0.5 relative">
                      <motion.div
                        className="w-full bg-[#28D7F2]"
                        animate={hasActiveProduction ? { height: ['20%', '95%', '20%'] } : { height: '80%' }}
                        transition={{ repeat: Infinity, duration: pistonDuration || 1 }}
                      />
                    </div>
                    <span className="text-[8px] font-mono text-[#28D7F2] mt-0.5 font-bold">1. Filling</span>
                  </div>

                  <motion.div
                    animate={hasActiveProduction ? { x: [0, 4, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-[#39E58C]"
                  >
                    →
                  </motion.div>
                </div>

                {/* Stage 3: Precision Capping Station (Cap Presses Down) */}
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-center relative">
                    {/* Capping Chuck */}
                    <motion.div
                      animate={hasActiveProduction ? { y: [0, 4, 0] } : { y: 0 }}
                      transition={{ repeat: Infinity, duration: pistonDuration || 1, delay: 0.2 }}
                      className="w-2.5 h-2 bg-[#FFB547] rounded-t-xs mb-0.5 shadow-sm"
                    />
                    {/* Capped Bottle */}
                    <div className="w-4 h-7 border border-[#28D7F2] bg-slate-900 rounded-xs overflow-hidden flex flex-col justify-end p-0.5 relative">
                      <div className="w-full h-full bg-[#28D7F2]/80" />
                    </div>
                    <span className="text-[8px] font-mono text-[#FFB547] mt-0.5 font-bold">2. Capping</span>
                  </div>

                  <motion.div
                    animate={hasActiveProduction ? { x: [0, 4, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-[#9875FF]"
                  >
                    →
                  </motion.div>
                </div>

                {/* Stage 4: High-Speed Labelling Station (Apex Label Wrap) */}
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-center">
                    <div className="w-1.5 h-1.5 bg-[#FFB547] rounded-t-xs" />
                    {/* Bottle with Apex Branded Label Band */}
                    <div className="w-4 h-7 border border-[#28D7F2] bg-slate-900 rounded-xs overflow-hidden flex flex-col justify-between p-0.5 relative">
                      <div className="w-full h-2 bg-[#28D7F2]/80" />
                      {/* Branded Label Band */}
                      <motion.div
                        className="w-full h-2.5 bg-[#9875FF] border-y border-white/60 flex items-center justify-center shadow-sm"
                        animate={hasActiveProduction ? { opacity: [0.7, 1, 0.7] } : {}}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                      >
                        <div className="w-2 h-0.5 bg-white rounded-full" />
                      </motion.div>
                      <div className="w-full h-1 bg-[#28D7F2]/80" />
                    </div>
                    <span className="text-[8px] font-mono text-[#9875FF] mt-0.5 font-bold">3. Labelled</span>
                  </div>

                  <motion.div
                    animate={hasActiveProduction ? { x: [0, 4, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-[#39E58C]"
                  >
                    →
                  </motion.div>
                </div>

                {/* Stage 5: Finished Bottle Entering Packaging Station */}
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-center">
                    <div className="w-1.5 h-1.5 bg-[#FFB547] rounded-t-xs" />
                    <div className="w-4 h-7 border border-[#39E58C] bg-[#28D7F2] rounded-xs shadow-glow-green relative flex items-center justify-center">
                      <div className="w-full h-2.5 bg-[#9875FF]" />
                    </div>
                    <span className="text-[8px] font-mono text-[#39E58C] mt-0.5 font-bold">4. Inspected</span>
                  </div>

                  <motion.div
                    animate={hasActiveProduction ? { x: [0, 4, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-[#28D7F2]"
                  >
                    →
                  </motion.div>
                </div>

                {/* Stage 6: Boxed Cases Entering Finished Goods */}
                <div className="flex flex-col items-center">
                  <div className="w-7 h-6 bg-[#1B2838] border border-[#28D7F2]/60 rounded-xs flex items-center justify-center text-[8px] font-mono font-black text-[#28D7F2] shadow-sm">
                    24x
                  </div>
                  <span className="text-[8px] font-mono text-[#9AA9BB] mt-0.5">5. Palletized</span>
                </div>

              </div>
            </div>

            {/* Machinery Dock: 5 Production Bays */}
            <div className="grid grid-cols-5 gap-3 mt-3.5">
              {machines.map((machine, index) => {
                const isSelected = selectedMachineId === machine.id;
                const isMachineRunning = machine.operating && machine.status === 'RUNNING' && hasActiveProduction;

                return (
                  <motion.div
                    key={machine.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectMachine(machine.id)}
                    className={`cursor-pointer rounded-xl p-3 border transition-all relative flex flex-col justify-between shadow-card-industrial ${
                      isSelected
                        ? 'bg-[#1B2838] border-[#28D7F2] shadow-glow-cyan'
                        : machine.operating
                        ? 'bg-[#151F2D] border-[#263447] hover:border-[#28D7F2]/60'
                        : 'bg-[#101722]/80 border-[#263447]/60 opacity-65'
                    }`}
                  >
                    {/* Machine Header */}
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-1.5 min-w-0">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isMachineRunning
                              ? 'bg-[#39E58C] shadow-glow-green animate-pulse'
                              : machine.operating
                              ? 'bg-[#FFB547]'
                              : 'bg-[#627387]'
                          }`}
                        />
                        <span className="text-[11px] font-bold text-[#F3F7FC] truncate">{machine.name}</span>
                      </div>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#080B12] text-[#9AA9BB] border border-[#263447]">
                        {machine.id}
                      </span>
                    </div>

                    {/* Machine Mechanical Graphic & Rotating Gears */}
                    <div className="h-20 bg-[#080B12] rounded-lg border border-[#263447] relative flex items-center justify-center overflow-hidden my-1">
                      <div className="relative flex items-center justify-center">
                        <motion.div
                          animate={isMachineRunning ? { rotate: 360 } : { rotate: 0 }}
                          transition={{
                            repeat: Infinity,
                            duration: pistonDuration ? pistonDuration * 2 : 2,
                            ease: 'linear',
                          }}
                          className={`w-11 h-11 rounded-full border-2 border-dashed flex items-center justify-center ${
                            isMachineRunning ? 'border-[#28D7F2] text-[#28D7F2]' : 'border-[#627387] text-[#627387]'
                          }`}
                        >
                          <Wrench className="w-5 h-5" />
                        </motion.div>

                        {/* Liquid Injection Effect */}
                        {isMachineRunning && (
                          <motion.div
                            animate={{ scale: [0.8, 1.3, 0.8] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="absolute -top-1 w-3 h-3 bg-[#28D7F2] rounded-full blur-[2px]"
                          />
                        )}
                      </div>

                      {/* State Tag Overlay */}
                      <div className="absolute bottom-1 right-1">
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-black uppercase ${
                            isMachineRunning
                              ? 'bg-[#39E58C]/15 text-[#39E58C] border border-[#39E58C]/40'
                              : machine.operating
                              ? 'bg-[#FFB547]/15 text-[#FFB547] border border-[#FFB547]/40'
                              : 'bg-[#101722] text-[#627387]'
                          }`}
                        >
                          {machine.operating ? 'RUNNING' : 'STANDBY'}
                        </span>
                      </div>
                    </div>

                    {/* Machine Telemetry Footer */}
                    <div className="mt-1.5 text-[10px] text-[#9AA9BB] flex items-center justify-between font-mono">
                      <span>Rated:</span>
                      <span className="font-bold text-[#28D7F2]">
                        {machine.productionCapacity} b/d
                      </span>
                    </div>
                    <div className="text-[10px] text-[#9AA9BB] flex items-center justify-between font-mono">
                      <span>Reliability:</span>
                      <span className="font-bold text-[#39E58C]">
                        {Math.round(machine.efficiency * 100)}%
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Empty Bays Available for CapEx Expansion */}
              {[...Array(Math.max(0, 5 - machines.length))].map((_, idx) => (
                <div
                  key={`empty-${idx}`}
                  className="rounded-xl p-3 border-2 border-dashed border-[#263447] bg-[#101722]/40 flex flex-col items-center justify-center text-center text-[#627387]"
                >
                  <Sparkles className="w-5 h-5 mb-1.5 text-[#627387]" />
                  <span className="text-[11px] font-bold text-[#9AA9BB]">
                    Expansion Bay 0{machines.length + idx + 1}
                  </span>
                  <span className="text-[9px] text-[#627387] mt-0.5">
                    $20,000 (+200 b/d)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM STAGE: Automated Packaging, Finished Storage & Dispatch Freight Bay */}
          <div className="grid grid-cols-12 gap-3.5 items-stretch h-36">
            
            {/* Unit 5: Packaging Robotic Arm Unit */}
            <div
              onClick={() => setInspectedStation('packer')}
              className="col-span-3 bg-[#151F2D]/90 hover:bg-[#1B2838] border border-[#263447] hover:border-[#9875FF]/60 rounded-xl p-3.5 flex flex-col justify-between cursor-pointer group transition-all shadow-card-industrial"
            >
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-[#9875FF]/10 border border-[#9875FF]/30 text-[#9875FF]">
                  <Box className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#F3F7FC] tracking-tight group-hover:text-[#9875FF] transition-colors">
                    Automated Case Pack
                  </h4>
                  <p className="text-[10px] text-[#9AA9BB]">Corrugated 24-Pack Palletizer</p>
                </div>
              </div>

              <div className="bg-[#080B12]/80 border border-[#263447] rounded-lg p-2 flex items-center justify-around font-mono text-center">
                <div>
                  <div className="text-[9px] text-[#9AA9BB] uppercase">Case Size</div>
                  <div className="text-xs font-bold text-[#F3F7FC]">24 x 500ml</div>
                </div>
                <div className="h-6 w-px bg-[#263447]" />
                <div>
                  <div className="text-[9px] text-[#9AA9BB] uppercase">Robotic Arm</div>
                  <div className="text-xs font-bold text-[#39E58C]">Synced</div>
                </div>
              </div>

              <div className="text-[10px] text-[#627387]">
                Automated continuous transfer to ASRS
              </div>
            </div>

            {/* Unit 6: Finished Goods Warehouse Storage (ASRS) */}
            <div
              onClick={() => setInspectedStation('warehouse')}
              className="col-span-4 bg-[#151F2D]/90 hover:bg-[#1B2838] border border-[#263447] hover:border-[#39E58C]/60 rounded-xl p-3.5 flex flex-col justify-between relative overflow-hidden group transition-all cursor-pointer shadow-card-industrial"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-[#39E58C]/10 border border-[#39E58C]/30 text-[#39E58C]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F3F7FC] tracking-tight group-hover:text-[#39E58C] transition-colors">
                      Finished Goods ASRS
                    </h4>
                    <p className="text-[10px] text-[#9AA9BB]">Automated Climate Racking</p>
                  </div>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 bg-[#39E58C]/15 border border-[#39E58C]/30 text-[#39E58C] rounded font-bold font-mono">
                  {inventory.finishedGoods.quantity.toLocaleString()} bottles
                </span>
              </div>

              {/* Warehouse Storage Fill Bar */}
              <div className="bg-[#080B12]/80 rounded-lg p-2.5 border border-[#263447]">
                <div className="flex justify-between text-[11px] mb-1 font-mono">
                  <span className="text-[#9AA9BB]">Bay Capacity:</span>
                  <span className="text-[#39E58C] font-bold">{fgPercent}%</span>
                </div>
                <div className="w-full bg-[#101722] rounded-full h-2.5 overflow-hidden p-0.5 border border-[#263447]">
                  <motion.div
                    className="h-full rounded-full bg-[#39E58C] transition-all duration-500"
                    style={{ width: `${fgPercent}%` }}
                  />
                </div>
              </div>

              <div className="text-[10px] text-[#9AA9BB] flex items-center justify-between font-mono">
                <span>Inventory Valuation:</span>
                <span className="font-bold text-[#39E58C]">
                  ${Math.round(inventory.finishedGoods.quantity * inventory.finishedGoods.unitCost).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Unit 7: Logistics Freight Bay & Outbound Transporters */}
            <div
              onClick={() => setInspectedStation('dispatch')}
              className="col-span-5 bg-[#151F2D]/90 hover:bg-[#1B2838] border border-[#263447] hover:border-[#FFB547]/60 rounded-xl p-3.5 flex flex-col justify-between cursor-pointer group transition-all shadow-card-industrial"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-[#FFB547]/10 border border-[#FFB547]/30 text-[#FFB547]">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F3F7FC] tracking-tight group-hover:text-[#FFB547] transition-colors">
                      Freight Dispatch Dock
                    </h4>
                    <p className="text-[10px] text-[#9AA9BB]">Commercial Logistics & Freight Trailer</p>
                  </div>
                </div>

                <span className="text-[10px] px-2 py-0.5 bg-[#080B12] text-[#FFB547] border border-[#263447] rounded font-mono font-bold">
                  Dock 01 Active
                </span>
              </div>

              {/* Delivery Commitment Progress */}
              <div className="bg-[#080B12]/80 border border-[#263447] rounded-lg p-2.5">
                {activeOrders.length > 0 ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#F3F7FC] truncate max-w-[150px]">
                        {activeOrders[0].customer}
                      </span>
                      <span className="text-[#FFB547] font-mono font-black">
                        Due: Day {activeOrders[0].deadlineDay}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#9AA9BB] font-mono">
                      <span>
                        Packed: {inventory.finishedGoods.quantity} / {activeOrders[0].quantity}
                      </span>
                      <span className="text-[#28D7F2] font-bold">
                        ${(activeOrders[0].quantity * activeOrders[0].pricePerUnit).toLocaleString()} Contract
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-[11px] text-[#627387] text-center py-1 flex items-center justify-center space-x-1.5 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#627387]" />
                    <span>No active contract staged. Review Orders panel.</span>
                  </div>
                )}
              </div>

              <div className="text-[10px] text-[#9AA9BB] flex items-center justify-between font-mono">
                <span>Staging Status:</span>
                <span className="text-[#39E58C] font-semibold">EDD Priority Rule Active</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Contextual Station Diagnostics Drawer */}
      <AnimatePresence>
        {inspectedStation && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="absolute bottom-4 left-4 right-4 z-30 bg-[#151F2D]/95 border border-[#28D7F2]/40 rounded-xl p-4 backdrop-blur-xl shadow-2xl flex items-center justify-between text-xs"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#28D7F2]/15 text-[#28D7F2]">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-[#F3F7FC] text-sm capitalize">
                  {inspectedStation === 'raw' && 'Raw Material Supply Silo'}
                  {inspectedStation === 'filler' && 'High-Speed Rotary Filling Station'}
                  {inspectedStation === 'capper' && 'Automated Capping & Sealing Unit'}
                  {inspectedStation === 'labeler' && 'Precision Rotary Labeler'}
                  {inspectedStation === 'packer' && 'Robotic Case Packaging System'}
                  {inspectedStation === 'warehouse' && 'Finished Goods ASRS Warehouse'}
                  {inspectedStation === 'dispatch' && 'Freight Outbound Dock & Logistics'}
                </h5>
                <p className="text-[11px] text-[#9AA9BB]">
                  Telemetry synced with authoritative simulation clock • Discrete Tick Cycle #{state.currentTick}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {inspectedStation === 'raw' && onQuickReorder && (
                <button
                  onClick={onQuickReorder}
                  className="px-3 py-1.5 rounded-lg bg-[#28D7F2] hover:bg-[#28D7F2]/80 text-[#080B12] font-bold text-xs transition-all shadow-glow-cyan"
                >
                  Order 2,000 Units ($4,000)
                </button>
              )}
              <button
                onClick={() => setInspectedStation(null)}
                className="px-3 py-1.5 rounded-lg bg-[#1B2838] hover:bg-[#263447] text-[#F3F7FC] font-semibold text-xs transition-colors"
              >
                Close Diagnostics
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

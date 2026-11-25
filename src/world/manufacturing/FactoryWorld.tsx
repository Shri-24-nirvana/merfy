'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SimulationState } from '@/types/simulation';
import { Plus } from 'lucide-react';

interface FactoryWorldProps {
  state: SimulationState;
  onSelectMachine: (machineId: string) => void;
  selectedMachineId: string | null;
  onQuickReorder?: () => void;
}

// ==========================================
// 1. AUTHENTIC CARTOON BEVERAGE BOTTLE
// Curving shoulders, slender neck, realistic liquid fill, label, crown cap
// ==========================================
const CartoonBottle: React.FC<{
  filled: number;       // 0 to 100
  capped: boolean;
  labelled: boolean;
  size?: number;        // width in px (default 36)
  glow?: boolean;
}> = ({ filled, capped, labelled, size = 36, glow = false }) => {
  const height = Math.round(size * 2.05); // ~74px for size 36

  return (
    <div className="relative select-none flex flex-col items-center" style={{ width: size, height }}>
      {glow && (
        <div className="absolute inset-0 rounded-full bg-rose-400/40 blur-md pointer-events-none animate-pulse" />
      )}
      <svg
        width={size}
        height={height}
        viewBox="0 0 38 78"
        fill="none"
        className="drop-shadow-sm overflow-visible"
      >
        <defs>
          {/* Exact interior contour of the bottle for liquid clipping */}
          <clipPath id={`liquid-clip-${size}`}>
            <path d="M9 34 C9 26, 14 23, 16 20 L16 14 C16 12, 17 11, 19 11 C21 11, 22 12, 22 14 L22 20 C24 23, 29 26, 29 34 L29 67 C29 72, 26 75, 19 75 C12 75, 9 72, 9 67 Z" />
          </clipPath>

          {/* Liquid gradient (fruit punch red like the reference game) */}
          <linearGradient id={`juice-grad-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="40%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#9F1239" />
          </linearGradient>

          {/* Glass Specular highlights */}
          <linearGradient id={`glass-shine-${size}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Glass body outer tint */}
          <linearGradient id={`glass-body-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F0F9FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {/* --- 1. Glass Bottle Base & Silhouette --- */}
        <path
          d="M9 34 C9 26, 14 23, 16 20 L16 14 C16 12, 17 11, 19 11 C21 11, 22 12, 22 14 L22 20 C24 23, 29 26, 29 34 L29 67 C29 72, 26 75, 19 75 C12 75, 9 72, 9 67 Z"
          fill={`url(#glass-body-${size})`}
          stroke="#7DD3FC"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* --- 2. Liquid Fill (0% to 100%) --- */}
        {filled > 0 && (
          <g clipPath={`url(#liquid-clip-${size})`}>
            {/* Liquid body */}
            <rect
              x="6"
              y={75 - (58 * (filled / 100))}
              width="26"
              height={58 * (filled / 100) + 4}
              fill={`url(#juice-grad-${size})`}
            />
            {/* Liquid surface meniscus */}
            <ellipse
              cx="19"
              cy={75 - (58 * (filled / 100))}
              rx="9"
              ry="2.5"
              fill="#FDA4AF"
              opacity="0.9"
            />
            {/* Sparkles / bubbles inside liquid */}
            <circle cx="15" cy={Math.max(38, 70 - (filled * 0.35))} r="1.2" fill="#FFE4E6" opacity="0.7" />
            <circle cx="23" cy={Math.max(42, 65 - (filled * 0.3))} r="1.6" fill="#FFE4E6" opacity="0.8" />
          </g>
        )}

        {/* --- 3. Body Label (wrap around waist) --- */}
        {labelled && (
          <g>
            <path
              d="M9.5 44 C9.5 44, 19 46, 28.5 44 L28.5 58 C28.5 58, 19 60, 9.5 58 Z"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="0.8"
            />
            {/* Colored brand band on label */}
            <path
              d="M9.5 47 C9.5 47, 19 49, 28.5 47 L28.5 53 C28.5 53, 19 55, 9.5 53 Z"
              fill="#4338CA"
            />
            {/* Gold emblem */}
            <circle cx="19" cy="50" r="2.2" fill="#F59E0B" />
          </g>
        )}

        {/* --- 4. Specular Glass Highlight running down shoulder and flank --- */}
        <path
          d="M12 34 C12 28, 15 25, 17 22 L17 65 C14 65, 12 62, 12 58 Z"
          fill={`url(#glass-shine-${size})`}
        />

        {/* --- 5. Glass Lip / Ring at bottle opening --- */}
        <rect
          x="15.5"
          y="8.5"
          width="7"
          height="3.5"
          rx="1"
          fill="#E0F2FE"
          stroke="#7DD3FC"
          strokeWidth="1.2"
        />

        {/* --- 6. Crown Cap --- */}
        {capped ? (
          <g>
            <path
              d="M14.5 5.5 C14.5 4, 16 3, 19 3 C22 3, 23.5 4, 23.5 5.5 L24 8.5 L14 8.5 Z"
              fill="#E11D48"
              stroke="#BE123C"
              strokeWidth="1"
            />
            {/* Cap highlight */}
            <ellipse cx="19" cy="4.5" rx="3" ry="1" fill="#FDA4AF" opacity="0.8" />
          </g>
        ) : (
          /* Open lip rim */
          <ellipse cx="19" cy="9" rx="3" ry="1" fill="#BAE6FD" />
        )}
      </svg>
    </div>
  );
};

// ==========================================
// 2. BEVERAGE CRATE WITH BOTTLES PROPERLY NESTLED INSIDE
// Bottles are physically enclosed inside the container compartments!
// ==========================================
const BeverageCrate: React.FC<{ bottleCount?: number; label?: string }> = ({
  bottleCount = 6,
  label = 'APEX',
}) => {
  return (
    <div className="relative select-none w-28 h-20 flex flex-col items-center justify-end">
      {/* 1. Back Wall & Interior of Crate */}
      <div className="absolute inset-x-0 bottom-0 h-16 rounded-xl bg-blue-900 border-2 border-blue-950 shadow-md overflow-hidden">
        {/* Interior compartment divider lines */}
        <div className="absolute inset-0 grid grid-cols-3 gap-0.5 opacity-20 p-1">
          <div className="border border-blue-400/40 rounded-xs" />
          <div className="border border-blue-400/40 rounded-xs" />
          <div className="border border-blue-400/40 rounded-xs" />
        </div>
      </div>

      {/* 2. Bottles Sitting INSIDE the Crate (Bodies deep inside, only necks and caps emerge!) */}
      <div className="relative z-10 w-full px-2 mb-2 flex justify-around items-end">
        {[...Array(Math.min(bottleCount, 3))].map((_, i) => (
          <div key={i} className="transform scale-75 origin-bottom translate-y-3">
            <CartoonBottle filled={100} capped={true} labelled={true} size={28} />
          </div>
        ))}
      </div>

      {/* 3. Front Wall of Crate (Solid molded plastic covering the bottle bodies!) */}
      <div className="relative z-20 w-full h-12 rounded-xl bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 border-2 border-blue-800 shadow-md p-1.5 flex flex-col justify-between">
        {/* Upper rim highlight */}
        <div className="w-full h-1 bg-blue-400/60 rounded-full" />

        {/* Center Handle Slot with Brand Name */}
        <div className="w-14 h-4 mx-auto bg-blue-900 rounded-md border border-blue-400/40 flex items-center justify-center shadow-inner">
          <span className="text-[7px] text-blue-100 font-black tracking-widest uppercase">{label}</span>
        </div>

        {/* Molded diamond cutouts on crate face */}
        <div className="flex justify-around items-center pt-0.5">
          <div className="w-3.5 h-2 rounded-xs bg-blue-800/80 border border-blue-400/30" />
          <div className="w-3.5 h-2 rounded-xs bg-blue-800/80 border border-blue-400/30" />
          <div className="w-3.5 h-2 rounded-xs bg-blue-800/80 border border-blue-400/30" />
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. INDUSTRIAL CONVEYOR BELT SYSTEM
// Metallic guides, dark rubber belt surface, rollers, and mechanical floor legs
// ==========================================
const IndustrialConveyor: React.FC<{ moving: boolean; children: React.ReactNode }> = ({
  moving,
  children,
}) => {
  return (
    <div className="relative w-full rounded-2xl select-none pt-2">
      {/* Upper Stainless Steel Bottle Guide Rail */}
      <div className="relative h-3 w-full bg-gradient-to-b from-slate-200 via-white to-slate-300 border-y border-slate-400 rounded-full shadow-xs flex items-center justify-around z-10 px-6">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-slate-500" />
        ))}
      </div>

      {/* Main Track Surface (Where Bottles Stand Upright) */}
      <div className="relative h-24 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-x-4 border-slate-600 flex items-center px-4 overflow-hidden shadow-inner">
        {/* Moving rubber belt grooves */}
        <motion.div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.2) 20px, rgba(255,255,255,0.2) 24px)',
          }}
          animate={moving ? { backgroundPositionX: ['0px', '24px'] } : {}}
          transition={{ repeat: Infinity, duration: 0.5, ease: 'linear' }}
        />

        {/* Mechanical Rollers visible underneath track */}
        <div className="absolute inset-x-0 bottom-0.5 flex justify-around opacity-30 pointer-events-none">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full border border-slate-400 bg-slate-600" />
          ))}
        </div>

        {/* Bottles on the track */}
        <div className="relative w-full h-full flex items-center">
          {children}
        </div>
      </div>

      {/* Lower Guide Rail & Safety Hazard Stripe Beam */}
      <div
        className="h-3 w-full rounded-b-xl border-b-2 border-slate-500 shadow-sm"
        style={{
          background: 'repeating-linear-gradient(45deg, #F59E0B, #F59E0B 8px, #1E1E2E 8px, #1E1E2E 16px)',
        }}
      />

      {/* Heavy Steel Support Legs on the Factory Floor */}
      <div className="flex justify-around px-8 -mt-0.5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-3.5 h-4 bg-gradient-to-r from-slate-500 via-slate-400 to-slate-600 border-x border-slate-700" />
            <div className="w-7 h-1.5 bg-slate-600 rounded-t-xs border-b border-slate-800" />
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 4. FACTORY PIPEWORK & CEILING NETWORK
// Steel pipes with flanged joints and pulse flows connecting machines
// ==========================================
const FactoryConnectedPipes: React.FC<{ flowing: boolean }> = ({ flowing }) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pipe-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="35%" stopColor="#F8FAFC" />
          <stop offset="65%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
      </defs>

      {/* Ceiling Main Header Line */}
      <path
        d="M 60 18 L 850 18"
        stroke="url(#pipe-metal)"
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* Pipe 1: From Raw Hopper bottom elbow (x: ~140, y: 150) -> Up to ceiling -> Across to Mixing Tank (x: ~450, y: 50) */}
      <path
        d="M 125 140 L 125 40 Q 125 18 150 18 L 440 18 Q 460 18 460 38 L 460 55"
        fill="none"
        stroke="url(#pipe-metal)"
        strokeWidth="12"
        strokeLinejoin="round"
      />

      {/* Pipe 2: From Mixing Tank outlet (x: ~540, y: 55) -> Up to ceiling -> Across to Packaging (x: ~800, y: 70) */}
      <path
        d="M 540 55 L 540 38 Q 540 18 560 18 L 780 18 Q 800 18 800 38 L 800 80"
        fill="none"
        stroke="url(#pipe-metal)"
        strokeWidth="10"
        strokeLinejoin="round"
      />

      {/* Flanged Joint Rings on Pipes */}
      <rect x="120" y="70" width="10" height="6" rx="1" fill="#64748B" />
      <rect x="280" y="14" width="6" height="10" rx="1" fill="#64748B" />
      <rect x="660" y="14" width="6" height="10" rx="1" fill="#64748B" />

      {/* Animated fluid pulse along the pipe line when factory is running */}
      {flowing && (
        <>
          <circle cx="125" cy="90" r="4" fill="#E11D48">
            <animate attributeName="cy" values="140;40;18" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="300" cy="18" r="4" fill="#E11D48">
            <animate attributeName="cx" values="150;440" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="670" cy="18" r="3.5" fill="#10B981">
            <animate attributeName="cx" values="560;780" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </svg>
  );
};

// ==========================================
// 5. MOVING BOTTLE STATE & MAIN FACTORY COMPONENT
// ==========================================
interface TrackBottle {
  id: number;
  x: number; // 0% to 100%
  stage: number; // 0=Empty, 1=Filling, 2=Capped, 3=Labelled, 4=Finished
}

export const FactoryWorld: React.FC<FactoryWorldProps> = ({
  state,
  onSelectMachine,
  selectedMachineId,
  onQuickReorder,
}) => {
  const { machines, inventory, production, orders, status, speed, currentDay } = state;
  const isRunning = status === 'RUNNING';

  // Active production condition: Running with active machines and available raw materials
  const hasActiveLines = production.activeMachinesCount > 0;
  const hasMaterials = inventory.rawMaterials.quantity > 0;
  const isProducing = isRunning && hasActiveLines && hasMaterials;

  // Track bottles on conveyor line
  const [trackBottles, setTrackBottles] = useState<TrackBottle[]>([
    { id: 1, x: 12, stage: 0 },
    { id: 2, x: 34, stage: 1 },
    { id: 3, x: 55, stage: 2 },
    { id: 4, x: 74, stage: 3 },
    { id: 5, x: 92, stage: 4 },
  ]);

  const nextBottleId = useRef(100);
  const rafHandle = useRef<number | null>(null);
  const lastSpawnTime = useRef(Date.now());

  // Continuous Sub-Pixel Smooth Movement Loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const deltaMs = Math.min(50, time - lastTime);
      lastTime = time;

      if (isProducing) {
        const simSpeed = speed || 1;
        // Move rate: smooth 10.5% per second at 1x speed
        const advanceRate = (0.0105 * simSpeed * deltaMs) / 16.66;

        setTrackBottles(prev => {
          let updated = prev.map(b => {
            const nextX = b.x + advanceRate;
            let nextStage = 0;
            if (nextX >= 86) nextStage = 4;
            else if (nextX >= 66) nextStage = 3;
            else if (nextX >= 46) nextStage = 2;
            else if (nextX >= 26) nextStage = 1;

            return { ...b, x: nextX, stage: nextStage };
          });

          // Filter out bottles that reach the end of the line
          updated = updated.filter(b => b.x <= 101);

          // Spawn new bottles at regular intervals
          const now = Date.now();
          const spawnInterval = Math.max(900, 2800 / simSpeed);
          if (now - lastSpawnTime.current > spawnInterval && updated.length < 8) {
            const leftmost = updated.reduce((min, b) => Math.min(min, b.x), 100);
            if (leftmost > 18) {
              updated.push({
                id: nextBottleId.current++,
                x: 0,
                stage: 0,
              });
              lastSpawnTime.current = now;
            }
          }

          return updated;
        });
      }

      rafHandle.current = requestAnimationFrame(loop);
    };

    rafHandle.current = requestAnimationFrame(loop);
    return () => {
      if (rafHandle.current) cancelAnimationFrame(rafHandle.current);
    };
  }, [isProducing, speed]);

  const rawPercentage = Math.min(100, Math.round((inventory.rawMaterials.quantity / 8000) * 100));
  const fulfilledOrders = orders.filter(o => o.status === 'FULFILLED');
  const isBottleUnderFiller = trackBottles.some(b => b.x >= 28 && b.x <= 42);

  return (
    <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-sm flex flex-col">
      {/* Background dot grid pattern */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      {/* --- TOP SCADA STATUS BAR --- */}
      <div className="relative z-10 px-4 py-2 bg-gradient-to-r from-slate-50 via-indigo-50/30 to-slate-50 border-b-2 border-slate-100 flex items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-2 px-2.5 py-1 rounded-full bg-white border border-slate-200 shadow-xs">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isProducing
                  ? 'bg-emerald-500 animate-pulse'
                  : isRunning
                  ? 'bg-amber-400'
                  : 'bg-slate-300'
              }`}
            />
            <span className="text-[11px] font-black text-slate-800">
              {isProducing ? 'FACTORY PRODUCING' : isRunning ? 'IDLE / THROTTLED' : 'STOPPED'}
            </span>
          </div>

          <div className="px-3 py-0.5 rounded-full bg-emerald-500 text-white font-mono font-black text-xs shadow-xs flex items-center space-x-1">
            <span>Day</span>
            <span>{currentDay}</span>
            <span className="text-emerald-100">/ {state.objectives.maxDays || 7}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-3 text-xs font-bold text-slate-600 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-xs">
          <span>Active Lines: <strong className="text-indigo-600">{production.activeMachinesCount}/{production.totalMachinesCount}</strong></span>
          <span className="text-slate-300">|</span>
          <span>Output: <strong className="text-emerald-600">{production.currentHourlyRate} b/h</strong></span>
          <span className="text-slate-300">|</span>
          <span>Cap: <strong className="text-purple-600">{production.currentDailyCapacity} b/d</strong></span>
          <span className="text-slate-300">|</span>
          <span>Util: <strong className="text-amber-600">{production.utilizationRate}%</strong></span>
        </div>
      </div>

      {/* --- MAIN STAGE: Factory Floor (~65%) + Compact HUD (~35%) --- */}
      <div className="relative flex-1 p-3 lg:p-4 flex flex-col justify-between overflow-y-auto space-y-3">
        {/* UPPER FACTORY STAGE: Full Continuous Visual Environment */}
        <div className="relative w-full min-h-[350px] lg:min-h-[380px] bg-gradient-to-b from-slate-100 via-slate-50 to-white rounded-2xl border-2 border-slate-200 p-4 shadow-inner flex flex-col justify-between flex-shrink-0 overflow-hidden">
          {/* Connected Industrial Pipework */}
          <FactoryConnectedPipes flowing={isProducing} />

          {/* Machinery Stations Row: Hopper -> Mixing Reservoir -> Crates */}
          <div className="grid grid-cols-12 gap-3 items-start relative z-10 pt-1">
            {/* 1. Raw Materials Hopper (Left) */}
            <div className="col-span-4 md:col-span-3 flex flex-col items-center">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1 flex items-center space-x-1">
                <span>🛢 Raw Material Hopper</span>
              </span>

              {/* Clear hopper container with round red balls inside */}
              <div className="relative w-28 h-36 rounded-2xl bg-gradient-to-b from-white/95 to-slate-100 border-2 border-slate-400 shadow-md p-1.5 flex flex-col items-center justify-end overflow-hidden">
                <div className="absolute -top-1 w-12 h-4 bg-slate-300 border border-slate-400 rounded-b-lg" />

                {/* Floating Red Spheres */}
                <div className="absolute inset-x-1 bottom-2 top-4 flex flex-wrap items-end justify-center gap-1 p-0.5">
                  {[...Array(Math.min(8, Math.max(3, Math.ceil(rawPercentage / 12))))].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-400 via-rose-500 to-rose-700 shadow-sm border border-rose-300/60 flex items-center justify-center"
                      animate={isProducing ? { y: [0, -3, 0] } : {}}
                      transition={{ repeat: Infinity, duration: 1.5 + (i * 0.2), ease: 'easeInOut' }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/70 -translate-x-0.5 -translate-y-0.5" />
                    </motion.div>
                  ))}
                </div>

                {/* Level Counter */}
                <div className="relative z-10 bg-white/90 px-1.5 py-0.5 rounded border border-slate-300 text-[9px] font-mono font-black text-slate-700">
                  {inventory.rawMaterials.quantity.toLocaleString()} un.
                </div>
              </div>

              {onQuickReorder && (
                <button
                  onClick={onQuickReorder}
                  className="mt-1.5 px-2.5 py-0.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[10px] font-bold transition-all flex items-center space-x-1 shadow-xs"
                >
                  <Plus className="w-3 h-3" />
                  <span>Reorder +2k</span>
                </button>
              )}
            </div>

            {/* Space for Pipe Crossing */}
            <div className="hidden md:block col-span-2" />

            {/* 2. Juice Mixing & Overhead Dispenser Nozzle (Center) */}
            <div className="col-span-8 md:col-span-4 flex flex-col items-center">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1">
                🧪 Juice Mixing & Reservoir
              </span>

              {/* Mixing Tank with Sloshing Liquid */}
              <div className="relative w-56 h-20 rounded-2xl bg-slate-100 border-2 border-slate-400 shadow-md overflow-hidden flex flex-col justify-end p-1.5">
                <div className="absolute top-1 left-2 right-2 h-1.5 rounded-full bg-slate-300" />

                {/* Liquid Fill */}
                <div
                  className="w-full rounded-xl bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 shadow-inner relative overflow-hidden transition-all duration-500"
                  style={{ height: `${Math.max(30, rawPercentage * 0.75)}%` }}
                >
                  {isProducing && (
                    <motion.div
                      className="absolute inset-0 flex justify-around items-center"
                      animate={{ x: [-8, 8, -8] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                      <div className="w-3.5 h-3.5 rounded-full bg-white/30" />
                      <div className="w-2 h-2 rounded-full bg-white/50" />
                    </motion.div>
                  )}
                  <div className="absolute top-0 inset-x-0 h-1 bg-rose-300 opacity-60" />
                </div>

                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-4 bg-slate-500 rounded-b-md border border-slate-600" />
              </div>

              {/* Dispenser Pipe & Active Pouring Nozzle */}
              <div className="relative flex flex-col items-center">
                <div className="w-3.5 h-6 bg-slate-400 border-x border-slate-500" />
                {/* Conical dispenser head */}
                <div className="w-6 h-3 bg-slate-600 rounded-b-md" />

                {/* Animated Juice Stream Pouring Directly into Bottle Mouth */}
                {isProducing && isBottleUnderFiller ? (
                  <motion.div
                    className="w-2 h-8 bg-gradient-to-b from-rose-500 to-rose-600 rounded-full shadow-md shadow-rose-400/60"
                    animate={{ scaleY: [0.8, 1.1, 0.9], opacity: [0.9, 1, 0.85] }}
                    transition={{ repeat: Infinity, duration: 0.25 }}
                  />
                ) : (
                  <div className="w-2 h-8" />
                )}
              </div>
            </div>

            {/* Space for Pipe Crossing */}
            <div className="hidden md:block col-span-1" />

            {/* 3. Packaged Stock: Stack of Beverage Crates (Bottles INSIDE!) */}
            <div className="hidden md:flex col-span-2 flex-col items-center">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1">
                📦 Packaged Stock
              </span>

              {/* Realistic Stack of Crates with Bottles Enclosed Inside */}
              <div className="flex flex-col items-center space-y-[-10px]">
                <BeverageCrate bottleCount={6} label="APEX" />
                <div className="flex space-x-1">
                  <div className="transform scale-90">
                    <BeverageCrate bottleCount={6} label="APEX" />
                  </div>
                  <div className="transform scale-90">
                    <BeverageCrate bottleCount={4} label="APEX" />
                  </div>
                </div>
              </div>

              <span className="mt-1 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {inventory.finishedGoods.quantity.toLocaleString()} b. ready
              </span>
            </div>
          </div>

          {/* Heavy Industrial Conveyor Belt with Moving Bottles */}
          <div className="relative z-20 mt-1">
            <IndustrialConveyor moving={isProducing}>
              {trackBottles.map(bottle => {
                const isUnderFilling = bottle.stage === 1;
                const isCapped = bottle.stage >= 2;
                const isLabelled = bottle.stage >= 3;
                const fillPct = bottle.stage === 0 ? 0 : bottle.stage === 1 ? 75 : 100;

                return (
                  <div
                    key={bottle.id}
                    className="absolute bottom-2 flex flex-col items-center"
                    style={{
                      left: `${bottle.x}%`,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    {/* The Authentic Cartoon Beverage Bottle */}
                    <CartoonBottle
                      size={36}
                      filled={fillPct}
                      capped={isCapped}
                      labelled={isLabelled}
                      glow={isUnderFilling && isProducing}
                    />

                    {/* Step label pill under the bottle */}
                    <span className="text-[7.5px] font-mono font-bold text-slate-700 bg-white/95 px-1 rounded shadow-xs mt-0.5">
                      {bottle.stage === 0
                        ? '1. Empty'
                        : bottle.stage === 1
                        ? '2. Filling'
                        : bottle.stage === 2
                        ? '3. Capped'
                        : bottle.stage === 3
                        ? '4. Labelled'
                        : '5. Packed'}
                    </span>
                  </div>
                );
              })}
            </IndustrialConveyor>
          </div>
        </div>

        {/* --- LOWER SECTION: 3 Compact HUD Dashboard Panels --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 flex-shrink-0">
          {/* PANEL 1: Raw Material Handling */}
          <div className="md:col-span-4 bg-white border border-slate-200 rounded-2xl p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <h3 className="font-black text-slate-800 text-xs flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Raw Material Handling</span>
              </h3>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">
                SCADA IN
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-600">Order quantity (Q):</span>
                <span className="font-black font-mono text-slate-800">2,000 un.</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-600">Reorder point (R):</span>
                <span className="font-black font-mono text-amber-700">{inventory.rawMaterials.reorderThreshold} un.</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-600">Raw material:</span>
                <span className="font-black font-mono text-indigo-700">{inventory.rawMaterials.quantity.toLocaleString()} un.</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-600">Overhead / Cost:</span>
                <span className="font-bold font-mono text-slate-700">$200/day · $1.50/b</span>
              </div>
            </div>
          </div>

          {/* PANEL 2: Production Stations Table */}
          <div className="md:col-span-5 bg-white border border-slate-200 rounded-2xl p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <h3 className="font-black text-slate-800 text-xs flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Production Stations</span>
              </h3>
              <div className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                Output: <strong className="text-emerald-700">{production.currentDailyCapacity} b/d</strong>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[9px] font-black text-slate-500 uppercase">
                    <th className="py-1 px-1.5">Station</th>
                    <th className="py-1 px-1.5 text-center">Mixing</th>
                    <th className="py-1 px-1.5 text-center">Bottling</th>
                    <th className="py-1 px-1.5 text-center">Packaging</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr>
                    <td className="py-1 px-1.5 font-bold text-slate-600 font-sans">Daily prod.</td>
                    <td className="py-1 px-1.5 text-center font-black text-slate-800">{production.currentDailyCapacity}</td>
                    <td className="py-1 px-1.5 text-center font-black text-indigo-700">{production.currentDailyCapacity}</td>
                    <td className="py-1 px-1.5 text-center font-black text-slate-800">{production.currentDailyCapacity}</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-1.5 font-bold text-slate-600 font-sans">Machines on</td>
                    <td className="py-1 px-1.5 text-center font-bold text-emerald-700">{production.activeMachinesCount}/{production.totalMachinesCount}</td>
                    <td className="py-1 px-1.5 text-center font-bold text-emerald-700">{production.activeMachinesCount}/{production.totalMachinesCount}</td>
                    <td className="py-1 px-1.5 text-center font-bold text-emerald-700">1/1</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-1.5 font-bold text-slate-600 font-sans">Utilization</td>
                    <td className="py-1 px-1.5 text-center font-black text-amber-600">{production.utilizationRate}%</td>
                    <td className="py-1 px-1.5 text-center font-black text-indigo-600">{production.utilizationRate}%</td>
                    <td className="py-1 px-1.5 text-center font-black text-purple-600">{Math.min(100, production.utilizationRate)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Compact Machine Selector Buttons */}
            <div className="flex gap-1.5 pt-0.5 overflow-x-auto">
              {machines.map((m, idx) => {
                const isSelected = selectedMachineId === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => onSelectMachine(m.id)}
                    className={`flex-1 min-w-[60px] py-1 px-1.5 rounded-lg border transition-all text-center ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50/70 shadow-xs'
                        : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${m.operating ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span className="text-[9px] font-black text-slate-800">Line {idx + 1}</span>
                    </div>
                    <div className="text-[8px] font-mono text-slate-500">{m.productionCapacity}/d</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PANEL 3: Demand & Performance */}
          <div className="md:col-span-3 bg-white border border-slate-200 rounded-2xl p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <h3 className="font-black text-slate-800 text-xs flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Demand & Performance</span>
              </h3>
            </div>

            {/* Sleek Compact Cash Card */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-xl p-2.5 shadow-xs text-center">
              <div className="text-[9px] font-mono font-bold text-indigo-300 uppercase tracking-wider">
                Treasury Reserves
              </div>
              <div className="text-xl font-black font-mono tracking-tight text-emerald-400 mt-0.5">
                ${Math.round(state.business.cash).toLocaleString()}
              </div>
              <div className="text-[9px] font-mono text-slate-400">
                Profit: <span className={state.business.profit >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  ${Math.round(state.business.profit).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-600">Finished goods:</span>
                <span className="font-black font-mono text-emerald-700">{inventory.finishedGoods.quantity.toLocaleString()} b.</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-600">Orders fulfilled:</span>
                <span className="font-black font-mono text-indigo-700">{fulfilledOrders.length} / {orders.length}</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-600">Price per bottle:</span>
                <span className="font-black font-mono text-slate-800">$20.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

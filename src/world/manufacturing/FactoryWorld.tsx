'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SimulationState } from '@/types/simulation';
import { Plus, RotateCw } from 'lucide-react';

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
  size?: number;        // width in px (default 34)
  glow?: boolean;
}> = ({ filled, capped, labelled, size = 34, glow = false }) => {
  const height = Math.round(size * 2.05); // ~70px for size 34

  return (
    <div className="relative select-none flex flex-col items-center" style={{ width: size, height }}>
      {glow && (
        <div className="absolute inset-0 rounded-full bg-rose-400/35 blur-md pointer-events-none animate-pulse" />
      )}
      <svg
        width={size}
        height={height}
        viewBox="0 0 38 78"
        fill="none"
        className="drop-shadow-sm overflow-visible"
      >
        <defs>
          <clipPath id={`liquid-clip-${size}`}>
            <path d="M9 34 C9 26, 14 23, 16 20 L16 14 C16 12, 17 11, 19 11 C21 11, 22 12, 22 14 L22 20 C24 23, 29 26, 29 34 L29 67 C29 72, 26 75, 19 75 C12 75, 9 72, 9 67 Z" />
          </clipPath>

          <linearGradient id={`juice-grad-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="40%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#9F1239" />
          </linearGradient>

          <linearGradient id={`glass-shine-${size}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id={`glass-body-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F0F9FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {/* Glass Bottle Silhouette */}
        <path
          d="M9 34 C9 26, 14 23, 16 20 L16 14 C16 12, 17 11, 19 11 C21 11, 22 12, 22 14 L22 20 C24 23, 29 26, 29 34 L29 67 C29 72, 26 75, 19 75 C12 75, 9 72, 9 67 Z"
          fill={`url(#glass-body-${size})`}
          stroke="#7DD3FC"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Liquid Fill */}
        {filled > 0 && (
          <g clipPath={`url(#liquid-clip-${size})`}>
            <rect
              x="6"
              y={75 - (58 * (filled / 100))}
              width="26"
              height={58 * (filled / 100) + 4}
              fill={`url(#juice-grad-${size})`}
            />
            <ellipse
              cx="19"
              cy={75 - (58 * (filled / 100))}
              rx="9"
              ry="2.5"
              fill="#FDA4AF"
              opacity="0.9"
            />
            <circle cx="15" cy={Math.max(38, 70 - (filled * 0.35))} r="1.2" fill="#FFE4E6" opacity="0.7" />
            <circle cx="23" cy={Math.max(42, 65 - (filled * 0.3))} r="1.6" fill="#FFE4E6" opacity="0.8" />
          </g>
        )}

        {/* Body Label Wrap */}
        {labelled && (
          <g>
            <path
              d="M9.5 44 C9.5 44, 19 46, 28.5 44 L28.5 58 C28.5 58, 19 60, 9.5 58 Z"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="0.8"
            />
            <path
              d="M9.5 47 C9.5 47, 19 49, 28.5 47 L28.5 53 C28.5 53, 19 55, 9.5 53 Z"
              fill="#4338CA"
            />
            <circle cx="19" cy="50" r="2.2" fill="#F59E0B" />
          </g>
        )}

        {/* Specular Glass Highlight */}
        <path
          d="M12 34 C12 28, 15 25, 17 22 L17 65 C14 65, 12 62, 12 58 Z"
          fill={`url(#glass-shine-${size})`}
        />

        {/* Bottle Lip */}
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

        {/* Crown Cap */}
        {capped ? (
          <g>
            <path
              d="M14.5 5.5 C14.5 4, 16 3, 19 3 C22 3, 23.5 4, 23.5 5.5 L24 8.5 L14 8.5 Z"
              fill="#E11D48"
              stroke="#BE123C"
              strokeWidth="1"
            />
            <ellipse cx="19" cy="4.5" rx="3" ry="1" fill="#FDA4AF" opacity="0.8" />
          </g>
        ) : (
          <ellipse cx="19" cy="9" rx="3" ry="1" fill="#BAE6FD" />
        )}
      </svg>
    </div>
  );
};

// ==========================================
// 2. BEVERAGE CRATE WITH BOTTLES PROPERLY NESTLED INSIDE
// ==========================================
const BeverageCrate: React.FC<{ bottleCount?: number; label?: string }> = ({
  bottleCount = 6,
  label = 'APEX',
}) => {
  return (
    <div className="relative select-none w-28 h-20">
      {/* Back Wall of Crate */}
      <div className="absolute inset-x-0 bottom-0 h-14 rounded-xl bg-blue-950 border-2 border-blue-900 shadow-inner flex flex-col justify-start p-1 overflow-hidden">
        <div className="w-full flex justify-around opacity-30">
          <div className="w-6 h-4 border border-blue-400 rounded-xs" />
          <div className="w-6 h-4 border border-blue-400 rounded-xs" />
          <div className="w-6 h-4 border border-blue-400 rounded-xs" />
        </div>
      </div>

      {/* Bottles Sitting INSIDE the Crate (positioned at bottom, poking slightly out of top) */}
      <div className="absolute inset-x-0 bottom-1.5 z-10 px-2 flex justify-around items-end pointer-events-none">
        {[...Array(Math.min(bottleCount, 3))].map((_, i) => (
          <div key={i} className="transform scale-80 origin-bottom">
            <CartoonBottle filled={100} capped={true} labelled={true} size={28} />
          </div>
        ))}
      </div>

      {/* Front Wall of Crate (covers the bottle bodies completely, showing only necks/caps!) */}
      <div className="absolute inset-x-0 bottom-0 h-11 rounded-xl bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 border-2 border-blue-800 shadow-md z-20 p-1 flex flex-col justify-between">
        <div className="w-full h-1 bg-blue-400/60 rounded-full" />
        <div className="w-14 h-4 mx-auto bg-blue-900 rounded-md border border-blue-400/40 flex items-center justify-center shadow-inner">
          <span className="text-[7px] text-blue-100 font-black tracking-widest uppercase">{label}</span>
        </div>
        <div className="flex justify-around items-center pt-0.5">
          <div className="w-3.5 h-1.5 rounded-xs bg-blue-800/80 border border-blue-400/30" />
          <div className="w-3.5 h-1.5 rounded-xs bg-blue-800/80 border border-blue-400/30" />
          <div className="w-3.5 h-1.5 rounded-xs bg-blue-800/80 border border-blue-400/30" />
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. INDUSTRIAL CONVEYOR BELT SYSTEM
// Stainless steel rails, grooved belt, rollers, support pedestals
// ==========================================
const IndustrialConveyor: React.FC<{ moving: boolean; children: React.ReactNode }> = ({
  moving,
  children,
}) => {
  return (
    <div className="relative w-full rounded-2xl select-none pt-1">
      {/* Upper Stainless Steel Guide Rail */}
      <div className="relative h-2.5 w-full bg-gradient-to-b from-slate-200 via-white to-slate-300 border-y border-slate-400 rounded-full shadow-xs flex items-center justify-around z-10 px-6">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-slate-500" />
        ))}
      </div>

      {/* Main Belt Surface */}
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

        {/* Rollers underneath */}
        <div className="absolute inset-x-0 bottom-0.5 flex justify-around opacity-30 pointer-events-none">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full border border-slate-400 bg-slate-600" />
          ))}
        </div>

        {/* Bottles on track */}
        <div className="relative w-full h-full flex items-center">
          {children}
        </div>
      </div>

      {/* Lower Rail & Hazard Stripes */}
      <div
        className="h-3 w-full rounded-b-xl border-b-2 border-slate-500 shadow-sm"
        style={{
          background: 'repeating-linear-gradient(45deg, #F59E0B, #F59E0B 8px, #1E1E2E 8px, #1E1E2E 16px)',
        }}
      />

      {/* Support Legs */}
      <div className="flex justify-around px-8 -mt-0.5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-3.5 h-3 bg-gradient-to-r from-slate-500 via-slate-400 to-slate-600 border-x border-slate-700" />
            <div className="w-7 h-1.5 bg-slate-600 rounded-t-xs border-b border-slate-800" />
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 4. FACTORY PIPEWORK & CEILING NETWORK
// Connected pipes from hopper to reservoir to packaging
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
        d="M 60 16 L 850 16"
        stroke="url(#pipe-metal)"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Pipe 1: From Hopper bottom -> Up to ceiling -> Across to Mixing Tank */}
      <path
        d="M 125 135 L 125 35 Q 125 16 150 16 L 430 16 Q 450 16 450 35 L 450 50"
        fill="none"
        stroke="url(#pipe-metal)"
        strokeWidth="10"
        strokeLinejoin="round"
      />

      {/* Pipe 2: From Mixing Tank outlet -> Up to ceiling -> Across to Packaging */}
      <path
        d="M 530 50 L 530 35 Q 530 16 550 16 L 780 16 Q 800 16 800 35 L 800 75"
        fill="none"
        stroke="url(#pipe-metal)"
        strokeWidth="10"
        strokeLinejoin="round"
      />

      {/* Flanged Joint Rings */}
      <rect x="120" y="65" width="10" height="5" rx="1" fill="#64748B" />
      <rect x="270" y="13" width="5" height="8" rx="1" fill="#64748B" />
      <rect x="650" y="13" width="5" height="8" rx="1" fill="#64748B" />

      {/* Fluid Pulses */}
      {flowing && (
        <>
          <circle cx="125" cy="85" r="3.5" fill="#E11D48">
            <animate attributeName="cy" values="135;35;16" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="290" cy="16" r="3.5" fill="#E11D48">
            <animate attributeName="cx" values="150;430" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="660" cy="16" r="3.5" fill="#10B981">
            <animate attributeName="cx" values="550;780" dur="1.6s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </svg>
  );
};

// ==========================================
// 5. ANIMATED CONVEYOR BELT (ISOLATED 60FPS RAF LOOP)
// ==========================================
interface TrackBottle {
  id: number;
  x: number; // 0% to 100%
  stage: number; // 0=Empty, 1=Filling, 2=Capped, 3=Labelled, 4=Finished
}

interface AnimatedConveyorBeltProps {
  isProducing: boolean;
  speed: number;
}

const AnimatedConveyorBelt: React.FC<AnimatedConveyorBeltProps> = React.memo(({ isProducing, speed }) => {
  const [trackBottles, setTrackBottles] = useState<TrackBottle[]>([
    { id: 1, x: 10, stage: 0 },
    { id: 2, x: 32, stage: 1 },
    { id: 3, x: 54, stage: 2 },
    { id: 4, x: 74, stage: 3 },
    { id: 5, x: 92, stage: 4 },
  ]);

  const nextBottleId = useRef(100);
  const rafHandle = useRef<number | null>(null);
  const lastSpawnTime = useRef(Date.now());

  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const deltaMs = Math.min(50, time - lastTime);
      lastTime = time;

      if (isProducing) {
        const simSpeed = speed || 1;
        const advanceRate = (0.011 * simSpeed * deltaMs) / 16.66;

        setTrackBottles(prev => {
          let updated = prev.map(b => {
            const nextX = b.x + advanceRate;
            let nextStage = 0;
            if (nextX >= 86) nextStage = 4;
            else if (nextX >= 66) nextStage = 3;
            else if (nextX >= 46) nextStage = 2;
            else if (nextX >= 24) nextStage = 1;

            return { ...b, x: nextX, stage: nextStage };
          });

          updated = updated.filter(b => b.x <= 101);

          const now = Date.now();
          const spawnInterval = Math.max(900, 2600 / simSpeed);
          if (now - lastSpawnTime.current > spawnInterval && updated.length < 7) {
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

  return (
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
            <CartoonBottle
              size={34}
              filled={fillPct}
              capped={isCapped}
              labelled={isLabelled}
              glow={isUnderFilling && isProducing}
            />

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
  );
});
AnimatedConveyorBelt.displayName = 'AnimatedConveyorBelt';

// ==========================================
// 6. MAIN FACTORY WORLD COMPONENT
// ==========================================
export const FactoryWorld: React.FC<FactoryWorldProps> = ({
  state,
  onSelectMachine,
  selectedMachineId,
  onQuickReorder,
}) => {
  const { machines, inventory, production, orders, status, speed, currentDay } = state;
  const isRunning = status === 'RUNNING';

  const hasActiveLines = production.activeMachinesCount > 0;
  const hasMaterials = inventory.rawMaterials.quantity > 0;
  const isProducing = isRunning && hasActiveLines && hasMaterials;

  const rawPercentage = Math.min(100, Math.round((inventory.rawMaterials.quantity / 8000) * 100));
  const fulfilledOrders = orders.filter(o => o.status === 'FULFILLED');

  return (
    <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-sm flex flex-col">
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      {/* SCADA Status Bar */}
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

      {/* Main Content Area */}
      <div className="relative flex-1 p-3 lg:p-4 flex flex-col justify-between overflow-y-auto space-y-3">
        {/* UPPER FACTORY STAGE */}
        <div className="relative w-full min-h-[350px] lg:min-h-[380px] bg-gradient-to-b from-slate-100 via-slate-50 to-white rounded-2xl border-2 border-slate-200 p-4 shadow-inner flex flex-col justify-between flex-shrink-0 overflow-hidden">
          <FactoryConnectedPipes flowing={isProducing} />

          {/* Machinery Stations Row */}
          <div className="grid grid-cols-12 gap-3 items-start relative z-10 pt-1">
            {/* 1. Raw Materials Hopper */}
            <div className="col-span-4 md:col-span-3 flex flex-col items-center">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1 flex items-center space-x-1">
                <span>🛢 Raw Material Hopper</span>
              </span>

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

            <div className="hidden md:block col-span-2" />

            {/* 2. Juice Mixing Reservoir with Rotating Agitators */}
            <div className="col-span-8 md:col-span-4 flex flex-col items-center">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1">
                🧪 Juice Mixing & Reservoir
              </span>

              {/* Mixing Tank with dual rotating agitator impellers (as in reference image) */}
              <div className="relative w-60 h-22 rounded-2xl bg-slate-100 border-2 border-slate-400 shadow-md overflow-hidden flex flex-col justify-end p-1.5">
                <div className="absolute top-1 left-2 right-2 h-1.5 rounded-full bg-slate-300" />

                {/* Rotating Agitator Impellers */}
                <div className="absolute inset-x-4 top-2 flex justify-around items-center z-10 opacity-70">
                  <motion.div
                    className="w-7 h-7 rounded-full border-2 border-slate-400 flex items-center justify-center bg-slate-200/50"
                    animate={isProducing ? { rotate: 360 } : {}}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  >
                    <div className="w-5 h-1 bg-slate-500 rounded" />
                    <div className="w-1 h-5 bg-slate-500 rounded absolute" />
                  </motion.div>

                  <motion.div
                    className="w-7 h-7 rounded-full border-2 border-slate-400 flex items-center justify-center bg-slate-200/50"
                    animate={isProducing ? { rotate: -360 } : {}}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  >
                    <div className="w-5 h-1 bg-slate-500 rounded" />
                    <div className="w-1 h-5 bg-slate-500 rounded absolute" />
                  </motion.div>
                </div>

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

              {/* Conical Dispenser Nozzle over Conveyor */}
              <div className="relative flex flex-col items-center">
                <div className="w-3.5 h-5 bg-slate-400 border-x border-slate-500" />
                <div className="w-6 h-3 bg-slate-600 rounded-b-md" />

                {/* Pouring stream into bottle mouth */}
                {isProducing ? (
                  <motion.div
                    className="w-2 h-7 bg-gradient-to-b from-rose-500 via-rose-600 to-rose-700 rounded-full shadow-md shadow-rose-400/60"
                    animate={{ scaleY: [0.85, 1.08, 0.9], opacity: [0.9, 1, 0.85] }}
                    transition={{ repeat: Infinity, duration: 0.25 }}
                  />
                ) : (
                  <div className="w-2 h-7" />
                )}
              </div>
            </div>

            <div className="hidden md:block col-span-1" />

            {/* 3. Packaged Stock Crate Area (Bottles inside crate!) */}
            <div className="hidden md:flex col-span-2 flex-col items-center">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1">
                📦 Packaged Stock
              </span>

              <div className="flex flex-col items-center space-y-[-14px]">
                <BeverageCrate bottleCount={6} label="APEX" />
                <div className="flex space-x-1.5">
                  <div className="transform scale-95">
                    <BeverageCrate bottleCount={6} label="APEX" />
                  </div>
                  <div className="transform scale-95">
                    <BeverageCrate bottleCount={5} label="APEX" />
                  </div>
                </div>
              </div>

              <span className="mt-1 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {inventory.finishedGoods.quantity.toLocaleString()} b. ready
              </span>
            </div>
          </div>

          {/* Industrial Conveyor Belt (Smooth 60fps RAF Animated) */}
          <div className="relative z-20 mt-1">
            <AnimatedConveyorBelt isProducing={isProducing} speed={speed} />
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

            {/* Machine Selector Buttons */}
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

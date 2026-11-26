'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SimulationState } from '@/types/simulation';
import { Plus, RotateCw, Play, Pause, Zap, CheckCircle2, Package, Droplets, Gauge } from 'lucide-react';

interface FactoryWorldProps {
  state: SimulationState;
  onSelectMachine: (machineId: string) => void;
  selectedMachineId: string | null;
  onQuickReorder?: () => void;
}

// ==========================================
// 1. CARTOON APEX BEVERAGE GLASS BOTTLE
// Sleek contour, glass shimmer, dynamic juice fill, rising fizz bubbles,
// crimped crown cap, and Apex medallion wrap label
// ==========================================
interface ApexBottleProps {
  fillLevel: number; // 0 to 100
  capped: boolean;
  labelled: boolean;
  flavor?: 'ruby' | 'citrus' | 'blue';
  size?: number; // width in px
  glow?: boolean;
}

const ApexBottle: React.FC<ApexBottleProps> = ({
  fillLevel,
  capped,
  labelled,
  flavor = 'ruby',
  size = 36,
  glow = false,
}) => {
  const height = Math.round(size * 2.15); // ~77px for size 36

  const flavorColors = {
    ruby: {
      top: '#FB7185',
      mid: '#E11D48',
      dark: '#9F1239',
      bubble: '#FFE4E6',
      splash: '#FDA4AF',
      labelBand: '#E11D48',
    },
    citrus: {
      top: '#FDE047',
      mid: '#F59E0B',
      dark: '#B45309',
      bubble: '#FEF3C7',
      splash: '#FCD34D',
      labelBand: '#D97706',
    },
    blue: {
      top: '#38BDF8',
      mid: '#0284C7',
      dark: '#0369A1',
      bubble: '#E0F2FE',
      splash: '#7DD3FC',
      labelBand: '#0284C7',
    },
  }[flavor];

  return (
    <div className="relative select-none flex flex-col items-center justify-end" style={{ width: size, height }}>
      {glow && (
        <div className="absolute inset-0 rounded-full bg-rose-400/40 blur-md pointer-events-none animate-pulse" />
      )}

      {/* Sparkle Glint ✨ */}
      {glow && (
        <motion.div
          className="absolute -top-2 -right-2 text-yellow-300 font-bold text-xs pointer-events-none"
          animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          ✨
        </motion.div>
      )}

      <svg width={size} height={height} viewBox="0 0 40 82" fill="none" className="drop-shadow-md overflow-visible">
        <defs>
          <clipPath id={`bottle-clip-${size}-${flavor}`}>
            <path d="M10 34 C10 26, 15 23, 17 20 L17 14 C17 12, 18 11, 20 11 C22 11, 23 12, 23 14 L23 20 C25 23, 30 26, 30 34 L30 71 C30 76, 27 79, 20 79 C13 79, 10 76, 10 71 Z" />
          </clipPath>

          <linearGradient id={`juice-grad-${size}-${flavor}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={flavorColors.top} />
            <stop offset="50%" stopColor={flavorColors.mid} />
            <stop offset="100%" stopColor={flavorColors.dark} />
          </linearGradient>

          <linearGradient id={`glass-body-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F0F9FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id={`glass-shine-${size}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Outer Glass Body Contour */}
        <path
          d="M10 34 C10 26, 15 23, 17 20 L17 14 C17 12, 18 11, 20 11 C22 11, 23 12, 23 14 L23 20 C25 23, 30 26, 30 34 L30 71 C30 76, 27 79, 20 79 C13 79, 10 76, 10 71 Z"
          fill={`url(#glass-body-${size})`}
          stroke="#7DD3FC"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* 2. Dynamic Liquid Fill */}
        {fillLevel > 0 && (
          <g clipPath={`url(#bottle-clip-${size}-${flavor})`}>
            <rect
              x="8"
              y={79 - 61 * (fillLevel / 100)}
              width="24"
              height={61 * (fillLevel / 100) + 4}
              fill={`url(#juice-grad-${size}-${flavor})`}
            />

            {/* Liquid Meniscus Surface */}
            <ellipse
              cx="20"
              cy={79 - 61 * (fillLevel / 100)}
              rx="9.5"
              ry="2.5"
              fill={flavorColors.splash}
              opacity="0.9"
            />

            {/* Rising Carbonation Fizz Bubbles */}
            <circle cx="16" cy={Math.max(38, 72 - fillLevel * 0.35)} r="1.3" fill={flavorColors.bubble} opacity="0.8" />
            <circle cx="24" cy={Math.max(42, 66 - fillLevel * 0.3)} r="1.6" fill={flavorColors.bubble} opacity="0.85" />
            <circle cx="19" cy={Math.max(46, 58 - fillLevel * 0.25)} r="1.1" fill={flavorColors.bubble} opacity="0.75" />
          </g>
        )}

        {/* 3. Apex Medallion Wrap Label */}
        {labelled && (
          <g>
            <path
              d="M10.5 44 C10.5 44, 20 46, 29.5 44 L29.5 59 C29.5 59, 20 61, 10.5 59 Z"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="0.8"
            />
            {/* Color Ribbon */}
            <path
              d="M10.5 48 C10.5 48, 20 50, 29.5 48 L29.5 55 C29.5 55, 20 57, 10.5 55 Z"
              fill={flavorColors.labelBand}
            />
            {/* Gold Apex Emblem */}
            <circle cx="20" cy="51.5" r="2.8" fill="#FBBF24" stroke="#D97706" strokeWidth="0.6" />
            <text x="20" y="53" textAnchor="middle" fontSize="3" fontWeight="900" fill="#78350F" fontFamily="sans-serif">
              A
            </text>
          </g>
        )}

        {/* 4. Specular Glass Shine Highlight */}
        <path
          d="M13 34 C13 28, 16 25, 18 22 L18 69 C15 69, 13 66, 13 61 Z"
          fill={`url(#glass-shine-${size})`}
        />

        {/* 5. Bottle Lip */}
        <rect
          x="16.5"
          y="8.5"
          width="7"
          height="3.5"
          rx="1"
          fill="#E0F2FE"
          stroke="#7DD3FC"
          strokeWidth="1.2"
        />

        {/* 6. Crown Cap */}
        {capped ? (
          <g>
            <path
              d="M15.5 5.5 C15.5 4, 17 3, 20 3 C23 3, 24.5 4, 24.5 5.5 L25 8.5 L15 8.5 Z"
              fill="#E11D48"
              stroke="#9F1239"
              strokeWidth="1"
            />
            <ellipse cx="20" cy="4.5" rx="3" ry="1" fill="#FDA4AF" opacity="0.8" />
          </g>
        ) : (
          <ellipse cx="20" cy="9" rx="3" ry="1" fill="#BAE6FD" />
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

      {/* Bottles Sitting INSIDE the Crate (only upper neck and cap peek out) */}
      <div className="absolute inset-x-0 bottom-1.5 z-10 px-2 flex justify-around items-end pointer-events-none">
        {[...Array(Math.min(bottleCount, 3))].map((_, i) => (
          <div key={i} className="transform scale-80 origin-bottom">
            <ApexBottle fillLevel={100} capped={true} labelled={true} size={28} />
          </div>
        ))}
      </div>

      {/* Front Wall of Crate (covers the bottle bodies completely) */}
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
// 3. OVERHEAD CONNECTED FACTORY PIPES
// Seamless stainless steel pipelines carrying fluids from hopper to mixing to filling
// ==========================================
const FactoryConnectedPipes: React.FC<{ flowing: boolean }> = ({ flowing }) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pipe-chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="30%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
      </defs>

      {/* Ceiling Main Header Line */}
      <path d="M 40 18 L 880 18" stroke="url(#pipe-chrome)" strokeWidth="12" strokeLinecap="round" />

      {/* Pipe 1: Hopper bottom -> Up to ceiling header -> Down to Mixing Tank */}
      <path
        d="M 115 135 L 115 40 Q 115 18 140 18 L 410 18 Q 430 18 430 40 L 430 55"
        fill="none"
        stroke="url(#pipe-chrome)"
        strokeWidth="10"
        strokeLinejoin="round"
      />

      {/* Pipe 2: Mixing Tank outlet -> Up to ceiling -> Across to Packaging */}
      <path
        d="M 540 55 L 540 40 Q 540 18 560 18 L 760 18 Q 780 18 780 40 L 780 80"
        fill="none"
        stroke="url(#pipe-chrome)"
        strokeWidth="10"
        strokeLinejoin="round"
      />

      {/* Flanged Collars */}
      <rect x="110" y="70" width="10" height="5" rx="1" fill="#475569" />
      <rect x="260" y="15" width="5" height="8" rx="1" fill="#475569" />
      <rect x="640" y="15" width="5" height="8" rx="1" fill="#475569" />

      {/* Moving Fluid Pulses */}
      {flowing && (
        <>
          <circle cx="115" cy="85" r="4" fill="#E11D48">
            <animate attributeName="cy" values="135;40;18" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="280" cy="18" r="4" fill="#E11D48">
            <animate attributeName="cx" values="140;410" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="650" cy="18" r="4" fill="#10B981">
            <animate attributeName="cx" values="560;760" dur="1.2s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </svg>
  );
};

// ==========================================
// 4. FAST, SILKY-SMOOTH BOTTLING CONVEYOR BELT (60 FPS SUBPIXEL MOVEMENT)
// ==========================================
interface MovingTrackBottle {
  id: number;
  x: number; // 0% to 100%
  stage: number; // 1=Empty, 2=Filling, 3=Full Fizz, 4=Capped & Labelled, 5=Packed
}

interface BottlingConveyorProps {
  moving: boolean;
  speed: number;
  flavor: 'ruby' | 'citrus' | 'blue';
}

const BottlingConveyor: React.FC<BottlingConveyorProps> = ({ moving, speed, flavor }) => {
  // 6 evenly distributed bottles traversing the line
  const [trackBottles, setTrackBottles] = useState<MovingTrackBottle[]>([
    { id: 1, x: 8, stage: 1 },
    { id: 2, x: 26, stage: 2 },
    { id: 3, x: 44, stage: 2 },
    { id: 4, x: 62, stage: 3 },
    { id: 5, x: 80, stage: 4 },
    { id: 6, x: 96, stage: 5 },
  ]);

  const lastTime = useRef(performance.now());
  const rafHandle = useRef<number | null>(null);

  // Fast, lively subpixel conveyor loop
  useEffect(() => {
    const loop = (time: number) => {
      const deltaMs = Math.min(40, time - lastTime.current);
      lastTime.current = time;

      if (moving) {
        const simSpeed = speed || 1;
        // At 1x: ~0.35% per frame (traverse 100% in ~4.8 seconds)
        const advanceRate = (0.35 * simSpeed * deltaMs) / 16.66;

        setTrackBottles(prev =>
          prev.map(b => {
            let nextX = b.x + advanceRate;
            if (nextX > 100) nextX = 0; // Seamless loop

            let stage = 1;
            if (nextX >= 76) stage = 4; // Capped & Labelled
            else if (nextX >= 56) stage = 3; // Carbonated Full
            else if (nextX >= 28) stage = 2; // Under Nozzle Filling
            else stage = 1; // Empty entering

            return { ...b, x: nextX, stage };
          })
        );
      }

      rafHandle.current = requestAnimationFrame(loop);
    };

    rafHandle.current = requestAnimationFrame(loop);
    return () => {
      if (rafHandle.current) cancelAnimationFrame(rafHandle.current);
    };
  }, [moving, speed]);

  const beltDuration = Math.max(0.12, 0.45 / (speed || 1));

  return (
    <div className="relative w-full select-none pt-1">
      {/* Upper Stainless Steel Guide Rail with Ball Bearings */}
      <div className="relative h-3 w-full bg-gradient-to-b from-slate-200 via-white to-slate-300 border-y border-slate-400 rounded-full shadow-xs flex items-center justify-around z-10 px-6">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-500 border border-slate-300 shadow-2xs" />
        ))}
      </div>

      {/* Main Belt Surface (Smooth moving grooves) */}
      <div className="relative h-26 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-x-4 border-slate-600 flex items-center px-4 overflow-hidden shadow-inner">
        {/* Rapid, smooth moving grooved slats */}
        <motion.div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.2) 20px, rgba(255,255,255,0.2) 24px)',
          }}
          animate={moving ? { backgroundPositionX: ['0px', '24px'] } : {}}
          transition={{ repeat: Infinity, duration: beltDuration, ease: 'linear' }}
        />

        {/* Underlying Roller Bearings */}
        <div className="absolute inset-x-0 bottom-1 flex justify-around opacity-35 pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3.5 h-3.5 rounded-full border border-slate-400 bg-slate-600"
              animate={moving ? { rotate: 360 } : {}}
              transition={{ repeat: Infinity, duration: beltDuration, ease: 'linear' }}
            />
          ))}
        </div>

        {/* Bottles Gliding Smoothly Across Belt */}
        <div className="relative w-full h-full flex items-center">
          {trackBottles.map(bottle => {
            const fillLevel =
              bottle.stage === 1 ? 0 : bottle.stage === 2 ? 65 : bottle.stage === 3 ? 95 : 100;
            const capped = bottle.stage >= 4;
            const labelled = bottle.stage >= 4;
            const isFilling = bottle.stage === 2;

            return (
              <div
                key={bottle.id}
                className="absolute bottom-2 flex flex-col items-center"
                style={{
                  left: `${bottle.x}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                {/* White Circular Bottle Coaster Pedestal */}
                <div className="w-8 h-2 rounded-full bg-white/95 shadow-md border border-slate-300 -mb-1" />

                {/* Animated Bottle */}
                <ApexBottle
                  fillLevel={fillLevel}
                  capped={capped}
                  labelled={labelled}
                  flavor={flavor}
                  size={36}
                  glow={moving && isFilling}
                />

                <span className="text-[7.5px] font-mono font-bold text-slate-700 bg-white/95 px-1 rounded shadow-xs mt-0.5">
                  {bottle.stage === 1
                    ? '1. Empty'
                    : bottle.stage === 2
                    ? '2. Filling'
                    : bottle.stage === 3
                    ? '3. Carbonated'
                    : '4. Packed'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lower Rail & Hazard Stripes */}
      <div
        className="h-3 w-full rounded-b-xl border-b-2 border-slate-500 shadow-sm"
        style={{
          background: 'repeating-linear-gradient(45deg, #F59E0B, #F59E0B 8px, #1E1E2E 8px, #1E1E2E 16px)',
        }}
      />

      {/* Structural Support Legs */}
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
// 5. MAIN FACTORY WORLD COMPONENT (APEX BEVERAGES BOTTLING PLANT)
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

  // Selected flavor
  const [flavor, setFlavor] = useState<'ruby' | 'citrus' | 'blue'>('ruby');

  const rawPercentage = Math.min(100, Math.round((inventory.rawMaterials.quantity / 8000) * 100));
  const fulfilledOrders = orders.filter(o => o.status === 'FULFILLED');

  return (
    <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-sm flex flex-col">
      {/* SCADA Status Bar */}
      <div className="relative z-20 px-4 py-2 bg-gradient-to-r from-slate-50 via-sky-50/50 to-slate-50 border-b-2 border-slate-200 flex items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isProducing
                  ? 'bg-emerald-500 animate-pulse'
                  : isRunning
                  ? 'bg-amber-400'
                  : 'bg-slate-300'
              }`}
            />
            <span className="text-[11px] font-black text-slate-800 tracking-tight">
              {isProducing ? 'APEX BEVERAGES — BOTTLING LINE ACTIVE' : 'BOTTLING LINE STANDBY / PAUSED'}
            </span>
          </div>

          <div className="px-3 py-0.5 rounded-full bg-emerald-500 text-white font-mono font-black text-xs shadow-xs flex items-center space-x-1">
            <span>Day</span>
            <span>{currentDay}</span>
            <span className="text-emerald-100">/ {state.objectives.maxDays || 7}</span>
          </div>
        </div>

        {/* Telemetry stats */}
        <div className="hidden md:flex items-center space-x-3 text-xs font-bold text-slate-600 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-xs">
          <span>Active Lines: <strong className="text-indigo-600">{production.activeMachinesCount}/{production.totalMachinesCount}</strong></span>
          <span className="text-slate-200">|</span>
          <span>Output: <strong className="text-emerald-600">{production.currentHourlyRate} b/h</strong></span>
          <span className="text-slate-200">|</span>
          <span>Cap: <strong className="text-purple-600">{production.currentDailyCapacity} b/d</strong></span>
          <span className="text-slate-200">|</span>
          <span>Util: <strong className="text-amber-600">{production.utilizationRate}%</strong></span>
        </div>

        {/* Active Flavor Selector */}
        <div className="flex items-center space-x-1 bg-white p-0.5 rounded-xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setFlavor('ruby')}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
              flavor === 'ruby' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🍓</span>
            <span>Ruby Berry</span>
          </button>
          <button
            onClick={() => setFlavor('citrus')}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
              flavor === 'citrus' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🍋</span>
            <span>Citrus Fizz</span>
          </button>
          <button
            onClick={() => setFlavor('blue')}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
              flavor === 'blue' ? 'bg-cyan-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🫐</span>
            <span>Blue Splash</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 p-3 lg:p-4 flex flex-col justify-between overflow-y-auto space-y-3">
        {/* ========================================================= */}
        {/* UPPER STAGE: AUTHENTIC VIBRANT APEX BOTTLING PLANT ARENA */}
        {/* ========================================================= */}
        <div className="relative w-full min-h-[380px] lg:min-h-[410px] bg-gradient-to-b from-slate-100 via-sky-50/30 to-slate-50 rounded-3xl border-2 border-slate-300 p-4 shadow-inner flex flex-col justify-between flex-shrink-0 overflow-hidden select-none">
          {/* Overhead stainless steel fluid pipes */}
          <FactoryConnectedPipes flowing={isProducing} />

          {/* Machinery Stations Row */}
          <div className="grid grid-cols-12 gap-3 items-start relative z-10 pt-1">
            {/* 1. RAW MATERIAL HOPPER / FRUIT SILO */}
            <div className="col-span-4 md:col-span-3 flex flex-col items-center">
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1 flex items-center space-x-1">
                <span>🛢 Fruit & Syrup Hopper</span>
              </span>

              <div className="relative w-30 h-38 rounded-2xl bg-gradient-to-b from-white/95 to-slate-100 border-2 border-slate-400 shadow-md p-1.5 flex flex-col items-center justify-end overflow-hidden">
                <div className="absolute -top-1 w-14 h-4 bg-slate-300 border border-slate-400 rounded-b-lg" />

                {/* Floating Bouncing Fruit Spheres */}
                <div className="absolute inset-x-1 bottom-2 top-4 flex flex-wrap items-end justify-center gap-1.5 p-0.5">
                  {[...Array(Math.min(9, Math.max(3, Math.ceil(rawPercentage / 11))))].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-400 via-rose-500 to-rose-700 shadow-sm border border-rose-300/60 flex items-center justify-center"
                      animate={isProducing ? { y: [0, -4, 0] } : {}}
                      transition={{ repeat: Infinity, duration: 1.2 + i * 0.15, ease: 'easeInOut' }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/70 -translate-x-0.5 -translate-y-0.5" />
                    </motion.div>
                  ))}
                </div>

                <div className="relative z-10 bg-white/95 px-2 py-0.5 rounded-md border border-slate-300 text-[9.5px] font-mono font-black text-slate-800 shadow-2xs">
                  {inventory.rawMaterials.quantity.toLocaleString()} un.
                </div>
              </div>

              {onQuickReorder && (
                <button
                  onClick={onQuickReorder}
                  className="mt-1.5 px-3 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[10px] font-bold transition-all flex items-center space-x-1 shadow-xs"
                >
                  <Plus className="w-3 h-3" />
                  <span>Reorder +2k</span>
                </button>
              )}
            </div>

            <div className="hidden md:block col-span-1" />

            {/* 2. JUICE MIXING RESERVOIR WITH ROTATING AGITATORS & DISPENSER NOZZLE */}
            <div className="col-span-8 md:col-span-4 flex flex-col items-center">
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1 flex items-center space-x-1">
                <span>🧪 Juice Reservoir & Mixing Station</span>
              </span>

              {/* Mixing Tank with Dual Rotating Impellers */}
              <div className="relative w-64 h-24 rounded-2xl bg-slate-100 border-2 border-slate-400 shadow-md overflow-hidden flex flex-col justify-end p-1.5">
                <div className="absolute top-1 left-2 right-2 h-1.5 rounded-full bg-slate-300" />

                {/* Rotating Agitator Impeller Agitators */}
                <div className="absolute inset-x-6 top-2.5 flex justify-around items-center z-10 opacity-75">
                  <motion.div
                    className="w-8 h-8 rounded-full border-2 border-slate-400 flex items-center justify-center bg-slate-200/60 shadow-xs"
                    animate={isProducing ? { rotate: 360 } : {}}
                    transition={{ repeat: Infinity, duration: 1.0, ease: 'linear' }}
                  >
                    <div className="w-6 h-1.5 bg-slate-500 rounded" />
                    <div className="w-1.5 h-6 bg-slate-500 rounded absolute" />
                  </motion.div>

                  <motion.div
                    className="w-8 h-8 rounded-full border-2 border-slate-400 flex items-center justify-center bg-slate-200/60 shadow-xs"
                    animate={isProducing ? { rotate: -360 } : {}}
                    transition={{ repeat: Infinity, duration: 1.0, ease: 'linear' }}
                  >
                    <div className="w-6 h-1.5 bg-slate-500 rounded" />
                    <div className="w-1.5 h-6 bg-slate-500 rounded absolute" />
                  </motion.div>
                </div>

                {/* Liquid Fill Level in Reservoir */}
                <div
                  className="w-full rounded-xl bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 shadow-inner relative overflow-hidden transition-all duration-500"
                  style={{ height: `${Math.max(30, rawPercentage * 0.75)}%` }}
                >
                  {isProducing && (
                    <motion.div
                      className="absolute inset-0 flex justify-around items-center"
                      animate={{ x: [-8, 8, -8] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                      <div className="w-3.5 h-3.5 rounded-full bg-white/30" />
                      <div className="w-2 h-2 rounded-full bg-white/50" />
                    </motion.div>
                  )}
                  <div className="absolute top-0 inset-x-0 h-1 bg-rose-300 opacity-60" />
                </div>

                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-4 bg-slate-500 rounded-b-md border border-slate-600" />
              </div>

              {/* Stainless Steel Conical Pouring Nozzle directly streaming into bottles below */}
              <div className="relative flex flex-col items-center">
                <div className="w-4 h-4 bg-slate-400 border-x border-slate-500" />
                <div className="w-7 h-3 bg-slate-600 rounded-b-md" />

                {/* Steady Pouring Juice Stream */}
                {isProducing ? (
                  <motion.div
                    className="w-2.5 h-8 bg-gradient-to-b from-rose-500 via-rose-600 to-rose-700 rounded-full shadow-md shadow-rose-400/70"
                    animate={{ scaleY: [0.85, 1.08, 0.9], opacity: [0.92, 1, 0.88] }}
                    transition={{ repeat: Infinity, duration: 0.2 }}
                  />
                ) : (
                  <div className="w-2.5 h-8" />
                )}
              </div>
            </div>

            <div className="hidden md:block col-span-1" />

            {/* 3. PACKAGED BEVERAGE CRATE AREA */}
            <div className="hidden md:flex col-span-3 flex-col items-center">
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1 flex items-center space-x-1">
                <span>📦 Packaged Beverage Crates</span>
              </span>

              {/* Stacked Crates with Bottles strictly inside */}
              <div className="flex flex-col items-center space-y-[-14px]">
                <BeverageCrate bottleCount={6} label="APEX" />
                <div className="flex space-x-2">
                  <div className="transform scale-95">
                    <BeverageCrate bottleCount={6} label="APEX" />
                  </div>
                  <div className="transform scale-95">
                    <BeverageCrate bottleCount={5} label="APEX" />
                  </div>
                </div>
              </div>

              <span className="mt-1 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 shadow-2xs">
                {inventory.finishedGoods.quantity.toLocaleString()} bottles ready
              </span>
            </div>
          </div>

          {/* 4. FAST & SMOOTH INDUSTRIAL CONVEYOR BELT */}
          <div className="relative z-20 mt-1">
            <BottlingConveyor
              moving={isProducing}
              speed={speed}
              flavor={flavor}
            />
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
                <span className="font-semibold text-slate-600">Order batch size (Q):</span>
                <span className="font-black font-mono text-slate-800">2,000 un.</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-600">Reorder point (R):</span>
                <span className="font-black font-mono text-amber-700">{inventory.rawMaterials.reorderThreshold} un.</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-600">Raw syrup stock:</span>
                <span className="font-black font-mono text-indigo-700">{inventory.rawMaterials.quantity.toLocaleString()} un.</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-600">Daily overhead & cost:</span>
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

            {/* Machine Line Switches */}
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
                <span className="font-semibold text-slate-600">Finished bottles:</span>
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

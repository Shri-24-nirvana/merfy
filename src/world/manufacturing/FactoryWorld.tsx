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
// 1. CARTOON APEX BEVERAGE BOTTLE
// Sleek contour, realistic liquid fill, rising fizz bubbles, specular glass highlight,
// crimped crown cap, and Apex medallion wrap label
// ==========================================
interface ApexBottleProps {
  fillLevel: number; // 0 to 100
  capped: boolean;
  labelled: boolean;
  flavor?: 'ruby' | 'citrus' | 'blue';
  capColor?: 'red' | 'gold' | 'blue';
  bottleMold?: 'contour' | 'sleek' | 'vintage';
  size?: number; // default 36px wide
  glow?: boolean;
}

const ApexBottle: React.FC<ApexBottleProps> = ({
  fillLevel,
  capped,
  labelled,
  flavor = 'ruby',
  capColor = 'red',
  bottleMold = 'contour',
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
    },
    citrus: {
      top: '#FDE047',
      mid: '#F59E0B',
      dark: '#B45309',
      bubble: '#FEF3C7',
      splash: '#FCD34D',
    },
    blue: {
      top: '#38BDF8',
      mid: '#0284C7',
      dark: '#0369A1',
      bubble: '#E0F2FE',
      splash: '#7DD3FC',
    },
  }[flavor];

  const capColors = {
    red: { fill: '#E11D48', stroke: '#9F1239', highlight: '#FDA4AF' },
    gold: { fill: '#F59E0B', stroke: '#B45309', highlight: '#FDE68A' },
    blue: { fill: '#3B82F6', stroke: '#1D4ED8', highlight: '#93C5FD' },
  }[capColor];

  return (
    <div className="relative select-none flex flex-col items-center justify-end" style={{ width: size, height }}>
      {glow && (
        <div className="absolute inset-0 rounded-full bg-rose-400/35 blur-md pointer-events-none animate-pulse" />
      )}

      {/* Sparkle Glint ✨ */}
      {glow && (
        <motion.div
          className="absolute -top-2 -right-2 text-yellow-300 font-bold text-xs pointer-events-none"
          animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.4, repeat: Infinity }}
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
            <stop offset="0%" stopColor="#F0F9FF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id={`glass-shine-${size}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Outer Glass Silhouette */}
        <path
          d="M10 34 C10 26, 15 23, 17 20 L17 14 C17 12, 18 11, 20 11 C22 11, 23 12, 23 14 L23 20 C25 23, 30 26, 30 34 L30 71 C30 76, 27 79, 20 79 C13 79, 10 76, 10 71 Z"
          fill={`url(#glass-body-${size})`}
          stroke="#7DD3FC"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* 2. Liquid Filling Level */}
        {fillLevel > 0 && (
          <g clipPath={`url(#bottle-clip-${size}-${flavor})`}>
            <rect
              x="8"
              y={79 - 61 * (fillLevel / 100)}
              width="24"
              height={61 * (fillLevel / 100) + 4}
              fill={`url(#juice-grad-${size}-${flavor})`}
            />

            {/* Liquid Surface Meniscus */}
            <ellipse
              cx="20"
              cy={79 - 61 * (fillLevel / 100)}
              rx="9.5"
              ry="2.6"
              fill={flavorColors.splash}
              opacity="0.9"
            />

            {/* Rising Fizz / Effervescent Carbonation Bubbles */}
            <circle cx="16" cy={Math.max(38, 72 - fillLevel * 0.35)} r="1.2" fill={flavorColors.bubble} opacity="0.8" />
            <circle cx="24" cy={Math.max(42, 66 - fillLevel * 0.3)} r="1.5" fill={flavorColors.bubble} opacity="0.85" />
            <circle cx="19" cy={Math.max(46, 58 - fillLevel * 0.25)} r="1" fill={flavorColors.bubble} opacity="0.75" />
          </g>
        )}

        {/* 3. Apex Medallion Wrap Label */}
        {labelled && (
          <g>
            <path
              d="M10.5 44 C10.5 44, 20 46, 29.5 44 L29.5 59 C29.5 59, 20 61, 10.5 59 Z"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="0.8"
            />
            {/* Color Band */}
            <path
              d="M10.5 48 C10.5 48, 20 50, 29.5 48 L29.5 55 C29.5 55, 20 57, 10.5 55 Z"
              fill={flavorColors.mid}
            />
            {/* Apex Gold Center Emblem */}
            <circle cx="20" cy="51.5" r="2.6" fill="#FBBF24" stroke="#D97706" strokeWidth="0.5" />
            <text x="20" y="53" textAnchor="middle" fontSize="3" fontWeight="900" fill="#78350F" fontFamily="sans-serif">
              A
            </text>
          </g>
        )}

        {/* 4. Specular Curved Glass Shine Reflection */}
        <path
          d="M13 34 C13 28, 16 25, 18 22 L18 69 C15 69, 13 66, 13 61 Z"
          fill={`url(#glass-shine-${size})`}
        />

        {/* 5. Flanged Bottle Lip */}
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
              fill={capColors.fill}
              stroke={capColors.stroke}
              strokeWidth="1"
            />
            <ellipse cx="20" cy="4.5" rx="3" ry="1" fill={capColors.highlight} opacity="0.8" />
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

      {/* Bottles Sitting INSIDE the Crate (necks and caps visible) */}
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
// 3. PURBLE-STYLE BEVERAGE CEILING MACHINERY
// TV Order screen, syrup bell dispenser, swirling juice nozzle with sparkles,
// carbonation chamber, crown capper, and cyan digital order HUD
// ==========================================
interface BeverageCeilingMachineryProps {
  isProducing: boolean;
  activeFlavor: 'ruby' | 'citrus' | 'blue';
  orderCount: number;
}

const BeverageCeilingMachinery: React.FC<BeverageCeilingMachineryProps> = ({
  isProducing,
  activeFlavor,
  orderCount,
}) => {
  const streamColors = {
    ruby: 'from-pink-500 via-rose-600 to-red-600',
    citrus: 'from-yellow-400 via-amber-500 to-orange-500',
    blue: 'from-cyan-400 via-sky-500 to-blue-600',
  }[activeFlavor];

  return (
    <div className="relative w-full h-32 flex items-start justify-between px-3 z-10 pointer-events-none select-none">
      {/* 1. Leftmost: Retro CRT TV Order Monitor */}
      <div className="relative flex flex-col items-center">
        {/* Antenna */}
        <div className="flex items-center space-x-2 -mb-1">
          <div className="w-0.5 h-4 bg-slate-400 rotate-[-25deg] origin-bottom" />
          <div className="w-0.5 h-4 bg-slate-400 rotate-[25deg] origin-bottom" />
        </div>
        {/* TV Frame */}
        <div className="w-22 h-24 rounded-xl bg-gradient-to-b from-sky-400 to-indigo-600 p-1.5 shadow-lg border-2 border-indigo-700 flex flex-col items-center justify-between">
          <div className="w-full h-16 rounded-lg bg-indigo-950/95 border border-sky-300/40 p-1 flex flex-col items-center justify-center overflow-hidden relative">
            <ApexBottle fillLevel={100} capped={true} labelled={true} flavor={activeFlavor} size={22} glow={false} />
          </div>
          <div className="w-full flex items-center justify-between px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[7px] font-black text-sky-100 uppercase tracking-tighter">ORDER #104</span>
          </div>
        </div>
      </div>

      {/* 2. Syrup & Fruit Bell Dispenser */}
      <div className="hidden sm:flex flex-col items-center">
        <div className="w-1.5 h-5 bg-slate-300 border-x border-slate-400" />
        <div className="relative flex flex-col items-center">
          {/* Glowing Crystal Gem */}
          <div className="w-3.5 h-5 bg-gradient-to-t from-cyan-400 to-blue-200 rounded-full border border-cyan-300 shadow-md" />
          {/* Yellow Bell Body */}
          <div className="w-12 h-10 -mt-1 rounded-t-full rounded-b-xl bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-500 border-2 border-amber-600 shadow-md flex items-center justify-center">
            <div className="flex space-x-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-xs" />
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-xs" />
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-xs" />
            </div>
          </div>
          <div className="w-3.5 h-2.5 bg-amber-700 rounded-b-md" />
        </div>
      </div>

      {/* 3. Carbonation Fizz Chamber */}
      <div className="hidden md:flex flex-col items-center">
        <div className="w-1.5 h-4 bg-slate-300 border-x border-slate-400" />
        <div className="w-13 h-14 rounded-2xl bg-gradient-to-b from-purple-500 via-indigo-600 to-purple-700 border-2 border-purple-800 shadow-md p-1 flex flex-col items-center justify-between">
          <div className="text-[8px] font-black text-purple-200 uppercase">CO₂ FIZZ</div>
          {/* Animated bubbles */}
          <div className="flex space-x-1 items-center">
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-300"
              animate={isProducing ? { y: [2, -2, 2] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white"
              animate={isProducing ? { y: [-2, 2, -2] } : {}}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
          </div>
          <div className="w-6 h-1.5 rounded-full bg-cyan-400" />
        </div>
        <div className="w-3 h-2 bg-purple-900 rounded-b-md" />
      </div>

      {/* 4. CENTERPIECE: Swirling Juice Dispenser & Stream into Bottles with Sparkles ✨ */}
      <div className="relative flex flex-col items-center -mt-1">
        {/* Hanging Pole with Candy / Mechanical Stripes */}
        <div
          className="w-2.5 h-6 border-x border-pink-500 shadow-xs"
          style={{
            background: 'repeating-linear-gradient(45deg, #F43F5E, #F43F5E 3px, #FFFFFF 3px, #FFFFFF 6px)',
          }}
        />

        {/* Rotating Swirling Agitator Cone */}
        <motion.div
          className="relative w-16 h-16 rounded-full border-2 border-pink-600 shadow-xl overflow-hidden flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, #FB7185 20%, #F43F5E 60%, #BE123C 100%)',
          }}
          animate={isProducing ? { rotate: [0, 360] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          {/* Swirl Arms */}
          <div className="absolute inset-0 flex items-center justify-center opacity-80">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-16 bg-white rounded-full absolute"
                style={{ transform: `rotate(${i * 30}deg)` }}
              />
            ))}
          </div>
          {/* Center Gem */}
          <div className="relative z-10 w-6 h-6 rounded-full bg-yellow-300 border-2 border-amber-500 shadow-inner" />
        </motion.div>

        {/* Nozzle */}
        <div className="w-4 h-3 bg-gradient-to-b from-pink-600 to-rose-700 rounded-b-md shadow-sm" />

        {/* Pouring Juice Stream Directly Into Bottle Mouth */}
        {isProducing ? (
          <div className="relative flex flex-col items-center">
            <motion.div
              className={`w-2.5 h-13 bg-gradient-to-b ${streamColors} rounded-full shadow-lg shadow-pink-500/80`}
              animate={{ scaleY: [0.88, 1.08, 0.92], opacity: [0.92, 1, 0.9] }}
              transition={{ repeat: Infinity, duration: 0.25 }}
            />
            {/* Splash Meniscus */}
            <motion.div
              className="w-5 h-2 rounded-full bg-rose-300 blur-xs -mt-1"
              animate={{ scale: [0.8, 1.25, 0.8] }}
              transition={{ repeat: Infinity, duration: 0.25 }}
            />
            {/* Sparkles ✨ */}
            <motion.div
              className="absolute -top-1 -left-4 text-yellow-300 font-bold text-sm pointer-events-none"
              animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute top-5 -right-4 text-yellow-300 font-bold text-sm pointer-events-none"
              animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              ✨
            </motion.div>
          </div>
        ) : (
          <div className="w-2.5 h-13" />
        )}
      </div>

      {/* 5. Pneumatic Crown Capper Station */}
      <div className="hidden sm:flex flex-col items-center">
        <div className="w-1.5 h-5 bg-slate-300 border-x border-slate-400" />
        <div className="w-12 h-14 rounded-2xl bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-600 border-2 border-blue-700 shadow-md p-1 flex flex-col items-center justify-between">
          <div className="text-[7px] font-black text-cyan-100 uppercase">CAPPER</div>
          <div className="flex space-x-0.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 border border-white" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-white" />
          </div>
          <motion.div
            className="w-4 h-3 bg-slate-300 border border-slate-500 rounded-b"
            animate={isProducing ? { y: [0, 3, 0] } : {}}
            transition={{ repeat: Infinity, duration: 0.8 }}
          />
        </div>
      </div>

      {/* 6. Label Roll Dispenser */}
      <div className="hidden md:flex flex-col items-center">
        <div className="w-1.5 h-4 bg-slate-300 border-x border-slate-400" />
        <div className="w-12 h-14 rounded-2xl bg-gradient-to-b from-emerald-400 via-teal-500 to-emerald-700 border-2 border-teal-800 shadow-md p-1 flex flex-col items-center justify-between">
          <div className="text-[7px] font-black text-emerald-100 uppercase">LABELLER</div>
          <div className="w-7 h-4 rounded bg-white border border-slate-300 flex items-center justify-center text-[7px] font-black text-blue-900">
            APEX
          </div>
          <div className="w-5 h-2 bg-slate-600 rounded-b" />
        </div>
      </div>

      {/* 7. Cyan Digital Order HUD [✕] [🎁] [ - - ] */}
      <div className="relative flex flex-col items-center">
        <div className="w-1 h-4 bg-slate-400" />
        <div className="w-22 h-13 rounded-xl bg-gradient-to-b from-cyan-400 via-sky-500 to-blue-600 p-1 border-2 border-cyan-300 shadow-lg flex flex-col justify-between">
          <div className="w-full h-7 rounded-lg bg-slate-950 border border-cyan-400/40 px-1.5 py-0.5 flex items-center justify-between font-mono font-black text-xs">
            <span className="text-rose-400 font-bold">✕</span>
            <span className="text-yellow-300">🎁</span>
            <span className="text-cyan-300 tracking-wider">--</span>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="text-[7.5px] font-mono font-black text-white">DAY TARGET</span>
            <span className="text-[8px] font-mono font-black text-yellow-200">800/800</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. PURBLE-STYLE BEVERAGE MODULAR COUNTER CONTROLS
// 6 modular columns:
// 1: Bottle Mold | 2: Juice Flavor | 3: Carbonation Fizz | 4: Crown Cap | 5: Label Wrap | 6: Supply & Turbo
// ==========================================
interface BeverageModularControlsProps {
  bottleMold: 'contour' | 'sleek' | 'vintage';
  onSelectMold: (mold: 'contour' | 'sleek' | 'vintage') => void;
  flavor: 'ruby' | 'citrus' | 'blue';
  onSelectFlavor: (flavor: 'ruby' | 'citrus' | 'blue') => void;
  capColor: 'red' | 'gold' | 'blue';
  onSelectCap: (color: 'red' | 'gold' | 'blue') => void;
  onTurboBoost: () => void;
  onQuickReorder?: () => void;
}

const BeverageModularControls: React.FC<BeverageModularControlsProps> = ({
  bottleMold,
  onSelectMold,
  flavor,
  onSelectFlavor,
  capColor,
  onSelectCap,
  onTurboBoost,
  onQuickReorder,
}) => {
  return (
    <div className="relative w-full bg-gradient-to-b from-sky-200 via-cyan-100 to-sky-300 border-2 border-sky-400 rounded-2xl p-2 shadow-md select-none overflow-hidden">
      {/* Counter Top Edge Highlight */}
      <div className="w-full h-1 bg-white/70 rounded-full mb-1.5 shadow-xs" />

      <div className="grid grid-cols-6 gap-2">
        {/* COL 1: Bottle Silhouette / Mold */}
        <div className="bg-sky-100/80 rounded-xl border border-sky-300/80 p-1 flex flex-col space-y-1">
          <button
            onClick={() => onSelectMold('contour')}
            className={`w-full py-1 rounded-lg border flex items-center justify-center transition-all ${
              bottleMold === 'contour'
                ? 'bg-amber-100 border-amber-400 shadow-sm scale-102'
                : 'bg-amber-50 hover:bg-amber-100/70 border-amber-200/60'
            }`}
            title="Contour Bottle"
          >
            <div className="w-3.5 h-6 rounded-t-full rounded-b-md border-2 border-sky-500 bg-sky-100" />
          </button>
          <button
            onClick={() => onSelectMold('sleek')}
            className={`w-full py-1 rounded-lg border flex items-center justify-center transition-all ${
              bottleMold === 'sleek'
                ? 'bg-amber-100 border-amber-400 shadow-sm scale-102'
                : 'bg-amber-50 hover:bg-amber-100/70 border-amber-200/60'
            }`}
            title="Sleek Bottle"
          >
            <div className="w-3 h-6 rounded-md border-2 border-sky-500 bg-sky-100" />
          </button>
          <button
            onClick={() => onSelectMold('vintage')}
            className={`w-full py-1 rounded-lg border flex items-center justify-center transition-all ${
              bottleMold === 'vintage'
                ? 'bg-amber-100 border-amber-400 shadow-sm scale-102'
                : 'bg-amber-50 hover:bg-amber-100/70 border-amber-200/60'
            }`}
            title="Vintage Flask"
          >
            <div className="w-5 h-5 rounded-b-lg border-2 border-sky-500 bg-sky-100" />
          </button>
        </div>

        {/* COL 2: Juice Flavor Syrups */}
        <div className="bg-sky-100/80 rounded-xl border border-sky-300/80 p-1 flex flex-col space-y-1">
          <button
            onClick={() => onSelectFlavor('ruby')}
            className={`w-full py-1 rounded-lg border flex items-center justify-center transition-all ${
              flavor === 'ruby'
                ? 'bg-amber-100 border-amber-400 shadow-sm scale-102'
                : 'bg-amber-50 hover:bg-amber-100/70 border-amber-200/60'
            }`}
            title="Ruby Berry Juice"
          >
            <div className="w-5 h-4 rounded-b-md bg-rose-600 border border-rose-800 shadow-xs" />
          </button>
          <button
            onClick={() => onSelectFlavor('citrus')}
            className={`w-full py-1 rounded-lg border flex items-center justify-center transition-all ${
              flavor === 'citrus'
                ? 'bg-amber-100 border-amber-400 shadow-sm scale-102'
                : 'bg-amber-50 hover:bg-amber-100/70 border-amber-200/60'
            }`}
            title="Golden Citrus / Lemon"
          >
            <div className="w-5 h-4 rounded-b-md bg-amber-400 border border-amber-600 shadow-xs" />
          </button>
          <button
            onClick={() => onSelectFlavor('blue')}
            className={`w-full py-1 rounded-lg border flex items-center justify-center transition-all ${
              flavor === 'blue'
                ? 'bg-amber-100 border-amber-400 shadow-sm scale-102'
                : 'bg-amber-50 hover:bg-amber-100/70 border-amber-200/60'
            }`}
            title="Ocean Blue Fizz"
          >
            <div className="w-5 h-4 rounded-b-md bg-cyan-500 border border-cyan-700 shadow-xs" />
          </button>
        </div>

        {/* COL 3: Carbonation / Fizz Levels */}
        <div className="bg-sky-100/80 rounded-xl border border-sky-300/80 p-1 flex flex-col space-y-1">
          <div className="w-full py-1 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center text-xs cursor-pointer hover:bg-amber-100/70" title="Still Juice">
            🧃
          </div>
          <div className="w-full py-1 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center text-xs cursor-pointer hover:bg-amber-100/70" title="Medium Fizz">
            🫧
          </div>
          <div className="w-full py-1 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center text-xs cursor-pointer hover:bg-amber-100/70" title="Nitro Sparkle">
            ✨
          </div>
        </div>

        {/* COL 4: Crown Cap Styles */}
        <div className="bg-sky-100/80 rounded-xl border border-sky-300/80 p-1 flex flex-col space-y-1">
          <button
            onClick={() => onSelectCap('red')}
            className={`w-full py-1 rounded-lg border flex items-center justify-center transition-all ${
              capColor === 'red'
                ? 'bg-amber-100 border-amber-400 shadow-sm scale-102'
                : 'bg-amber-50 hover:bg-amber-100/70 border-amber-200/60'
            }`}
            title="Crimson Crown Cap"
          >
            <div className="w-5 h-3 rounded-full bg-rose-600 border border-rose-800" />
          </button>
          <button
            onClick={() => onSelectCap('gold')}
            className={`w-full py-1 rounded-lg border flex items-center justify-center transition-all ${
              capColor === 'gold'
                ? 'bg-amber-100 border-amber-400 shadow-sm scale-102'
                : 'bg-amber-50 hover:bg-amber-100/70 border-amber-200/60'
            }`}
            title="Gold Seal Crown Cap"
          >
            <div className="w-5 h-3 rounded-full bg-amber-400 border border-amber-600" />
          </button>
          <button
            onClick={() => onSelectCap('blue')}
            className={`w-full py-1 rounded-lg border flex items-center justify-center transition-all ${
              capColor === 'blue'
                ? 'bg-amber-100 border-amber-400 shadow-sm scale-102'
                : 'bg-amber-50 hover:bg-amber-100/70 border-amber-200/60'
            }`}
            title="Royal Blue Crown Cap"
          >
            <div className="w-5 h-3 rounded-full bg-blue-600 border border-blue-800" />
          </button>
        </div>

        {/* COL 5: Branding Labels */}
        <div className="bg-sky-100/80 rounded-xl border border-sky-300/80 p-1 grid grid-cols-2 gap-1 items-center">
          <div className="py-1 rounded bg-amber-50 border border-amber-200/60 flex items-center justify-center text-xs cursor-pointer hover:bg-amber-100/70" title="Apex Classic">
            🏷️
          </div>
          <div className="py-1 rounded bg-amber-50 border border-amber-200/60 flex items-center justify-center text-xs cursor-pointer hover:bg-amber-100/70" title="Gold Medallion">
            🥇
          </div>
          <div className="py-1 rounded bg-amber-50 border border-amber-200/60 flex items-center justify-center text-xs cursor-pointer hover:bg-amber-100/70" title="Fruit Splash">
            🍓
          </div>
          <div className="py-1 rounded bg-amber-50 border border-amber-200/60 flex items-center justify-center text-xs cursor-pointer hover:bg-amber-100/70" title="Organic Seal">
            🍀
          </div>
        </div>

        {/* COL 6: Ingredients Reorder & Turbo Press */}
        <div className="bg-sky-100/80 rounded-xl border border-sky-300/80 p-1 flex flex-col space-y-1">
          {onQuickReorder && (
            <button
              onClick={onQuickReorder}
              className="w-full py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200/60 flex items-center justify-center text-xs transition-transform active:scale-95 shadow-2xs"
              title="Reorder Ingredients / Sugar (+2k)"
            >
              🧂
            </button>
          )}
          <button
            onClick={onTurboBoost}
            className="w-full py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border border-emerald-600 text-white font-bold text-xs shadow-sm flex items-center justify-center transition-transform active:scale-95"
            title="Accelerate Bottling Output"
          >
            ⚡
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. FLOOR FOOT PEDAL CONTROLLER
// Green left and right arrow buttons connected via flexible rubber cord
// ==========================================
const FloorPedal: React.FC<{
  onStepLeft: () => void;
  onStepRight: () => void;
  isRunning: boolean;
}> = ({ onStepLeft, onStepRight, isRunning }) => {
  return (
    <div className="relative flex items-center select-none pt-1">
      {/* 3D Flexible Rubber Cord */}
      <svg className="w-16 h-8 -mr-1" viewBox="0 0 64 32" fill="none">
        <path d="M 4 2 Q 24 28 62 16" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M 4 2 Q 24 28 62 16" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* Light Cyan Pedal Base */}
      <div className="bg-gradient-to-b from-sky-200 to-cyan-300 border-2 border-sky-400 rounded-2xl p-1.5 shadow-lg flex items-center space-x-2">
        <button
          onClick={onStepLeft}
          className="w-8 h-8 rounded-full bg-gradient-to-b from-lime-400 to-emerald-500 hover:from-lime-300 hover:to-emerald-400 border-2 border-emerald-600 shadow-md flex items-center justify-center font-black text-white text-sm transition-transform active:scale-90"
          title="Jog Conveyor Left"
        >
          ⬅
        </button>
        <button
          onClick={onStepRight}
          className="w-8 h-8 rounded-full bg-gradient-to-b from-lime-400 to-emerald-500 hover:from-lime-300 hover:to-emerald-400 border-2 border-emerald-600 shadow-md flex items-center justify-center font-black text-white text-sm transition-transform active:scale-90"
          title="Run Conveyor Right"
        >
          ➡
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 6. BEVERAGE CONVEYOR BELT (SMOOTH 60FPS WITH MOVING BOTTLES)
// ==========================================
interface BeverageConveyorProps {
  moving: boolean;
  flavor: 'ruby' | 'citrus' | 'blue';
  capColor: 'red' | 'gold' | 'blue';
  bottleMold: 'contour' | 'sleek' | 'vintage';
}

const BeverageConveyor: React.FC<BeverageConveyorProps> = ({ moving, flavor, capColor, bottleMold }) => {
  const [trackBottles, setTrackBottles] = useState([
    { id: 1, x: 10, stage: 1 },
    { id: 2, x: 32, stage: 2 },
    { id: 3, x: 54, stage: 3 },
    { id: 4, x: 74, stage: 4 },
    { id: 5, x: 92, stage: 5 },
  ]);

  const lastTime = useRef(performance.now());
  const rafHandle = useRef<number | null>(null);

  useEffect(() => {
    const loop = (time: number) => {
      const delta = Math.min(50, time - lastTime.current);
      lastTime.current = time;

      if (moving) {
        const rate = (0.012 * delta) / 16.66;
        setTrackBottles(prev =>
          prev.map(b => {
            let nextX = b.x + rate;
            if (nextX > 98) nextX = 4;
            let stage = 1;
            if (nextX >= 80) stage = 5;
            else if (nextX >= 60) stage = 4;
            else if (nextX >= 42) stage = 3;
            else if (nextX >= 22) stage = 2;
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
  }, [moving]);

  return (
    <div className="relative w-full select-none">
      {/* Main Conveyor Bed */}
      <div className="relative h-28 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-y-4 border-slate-600 rounded-xl shadow-inner overflow-hidden flex items-center px-4">
        {/* Moving Rubber Segment Grooves */}
        <motion.div
          className="absolute inset-0 opacity-35 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(255,255,255,0.25) 28px, rgba(255,255,255,0.25) 32px)',
          }}
          animate={moving ? { backgroundPositionX: ['0px', '32px'] } : {}}
          transition={{ repeat: Infinity, duration: 0.6, ease: 'linear' }}
        />

        {/* Silver End Rollers */}
        <div className="absolute left-0 inset-y-0 w-3 bg-gradient-to-r from-slate-400 to-slate-600 rounded-l" />
        <div className="absolute right-0 inset-y-0 w-3 bg-gradient-to-l from-slate-400 to-slate-600 rounded-r" />

        {/* Moving Bottles on Belt */}
        <div className="relative w-full h-full flex items-center">
          {trackBottles.map(bottle => {
            const fillLevel =
              bottle.stage === 1 ? 0 : bottle.stage === 2 ? 65 : bottle.stage === 3 ? 95 : 100;
            const capped = bottle.stage >= 4;
            const labelled = bottle.stage >= 4;
            const isUnderNozzle = bottle.stage === 2;

            return (
              <div
                key={bottle.id}
                className="absolute bottom-2 flex flex-col items-center"
                style={{
                  left: `${bottle.x}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                {/* White Square Coaster / Bottle Pedestal */}
                <div className="w-9 h-2 rounded-full bg-white/95 shadow-md border border-slate-300 -mb-1" />

                {/* Apex Bottle */}
                <ApexBottle
                  fillLevel={fillLevel}
                  capped={capped}
                  labelled={labelled}
                  flavor={flavor}
                  capColor={capColor}
                  bottleMold={bottleMold}
                  size={36}
                  glow={moving && isUnderNozzle}
                />

                <span className="text-[7.5px] font-mono font-bold text-slate-700 bg-white/95 px-1 rounded shadow-xs mt-0.5">
                  {bottle.stage === 1
                    ? '1. Empty'
                    : bottle.stage === 2
                    ? '2. Filling'
                    : bottle.stage === 3
                    ? '3. Fizz'
                    : bottle.stage === 4
                    ? '4. Capped'
                    : '5. Packed'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Star Delivery Platform & Recycle Chute */}
      <div className="absolute right-[-14px] -top-3 flex items-center space-x-2 z-20">
        {/* Sky-Blue Star Delivery Platform */}
        <div className="w-16 h-12 rounded-xl bg-gradient-to-b from-sky-300 to-cyan-500 border-2 border-sky-200 shadow-lg flex items-center justify-center">
          <motion.span
            className="text-2xl text-yellow-300 drop-shadow-md"
            animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⭐
          </motion.span>
        </div>

        {/* Lavender Recycle Chute */}
        <div className="w-12 h-16 rounded-xl bg-gradient-to-b from-purple-300 via-purple-400 to-indigo-500 border-2 border-purple-600 shadow-md flex flex-col items-center justify-between p-1">
          <div className="w-full h-2 rounded-full bg-purple-700/60" />
          <div className="w-7 h-7 rounded-full bg-purple-900/80 border border-purple-300/50 flex items-center justify-center text-white text-xs font-bold shadow-inner">
            ♻️
          </div>
          <div className="w-full h-1 bg-purple-200/50 rounded-full" />
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 7. MAIN FACTORY WORLD COMPONENT (APEX BEVERAGES WITH PURBLE PLACE INSPIRATION)
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

  // Interactive controls state
  const [flavor, setFlavor] = useState<'ruby' | 'citrus' | 'blue'>('ruby');
  const [capColor, setCapColor] = useState<'red' | 'gold' | 'blue'>('red');
  const [bottleMold, setBottleMold] = useState<'contour' | 'sleek' | 'vintage'>('contour');
  const [manualJog, setManualJog] = useState(false);

  const rawPercentage = Math.min(100, Math.round((inventory.rawMaterials.quantity / 8000) * 100));
  const fulfilledOrders = orders.filter(o => o.status === 'FULFILLED');

  const handlePedalJog = (forward: boolean) => {
    setManualJog(true);
    setTimeout(() => setManualJog(false), 900);
  };

  const isConveyorMoving = isProducing || manualJog;

  return (
    <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden border-2 border-pink-200 shadow-md flex flex-col">
      {/* Top SCADA Status Bar */}
      <div className="relative z-20 px-4 py-2 bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 border-b-2 border-pink-200 flex items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-pink-200 shadow-xs">
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
              {isProducing ? 'APEX BEVERAGES BOTTLING LINE ACTIVE' : 'BOTTLING LINE STANDBY'}
            </span>
          </div>

          <div className="px-3 py-0.5 rounded-full bg-pink-500 text-white font-mono font-black text-xs shadow-xs flex items-center space-x-1">
            <span>Day</span>
            <span>{currentDay}</span>
            <span className="text-pink-100">/ {state.objectives.maxDays || 7}</span>
          </div>
        </div>

        {/* Telemetry */}
        <div className="hidden md:flex items-center space-x-3 text-xs font-bold text-slate-600 bg-white px-3 py-1 rounded-xl border border-pink-200 shadow-xs">
          <span>Active Lines: <strong className="text-pink-600">{production.activeMachinesCount}/{production.totalMachinesCount}</strong></span>
          <span className="text-slate-200">|</span>
          <span>Output: <strong className="text-emerald-600">{production.currentHourlyRate} b/h</strong></span>
          <span className="text-slate-200">|</span>
          <span>Cap: <strong className="text-purple-600">{production.currentDailyCapacity} b/d</strong></span>
          <span className="text-slate-200">|</span>
          <span>Util: <strong className="text-amber-600">{production.utilizationRate}%</strong></span>
        </div>

        {/* Quick Recipe Info */}
        <div className="flex items-center space-x-1 bg-white/90 px-2.5 py-1 rounded-xl border border-pink-200 text-xs font-bold text-slate-700 shadow-xs">
          <span>🥤</span>
          <span className="capitalize">{flavor} Rush</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 p-3 lg:p-4 flex flex-col justify-between overflow-y-auto space-y-3">
        {/* ========================================================= */}
        {/* UPPER STAGE: PURBLE-STYLE APEX BEVERAGES ARENA */}
        {/* ========================================================= */}
        <div className="relative w-full min-h-[380px] lg:min-h-[410px] rounded-3xl border-2 border-pink-300 shadow-inner flex flex-col justify-between flex-shrink-0 overflow-hidden select-none">
          {/* 1. Pink/Peach Wallpaper with Glass Bottle Silhouettes */}
          <div className="absolute inset-x-0 top-0 h-[68%] bg-gradient-to-b from-pink-400 via-pink-300 to-pink-300 overflow-hidden">
            {/* Subtle Bottle Outlines on Wallpaper */}
            <div className="absolute inset-0 opacity-20 pointer-events-none flex justify-around items-center">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-6 h-3 border-2 border-white rounded-t-sm" />
                  <div className="w-12 h-20 border-2 border-white rounded-2xl -mt-0.5" />
                </div>
              ))}
            </div>

            {/* Right Escalator / Delivery Ramp */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-b from-slate-400 via-slate-500 to-slate-600 border-l-4 border-slate-700 opacity-80 transform skew-y-12 origin-top-right overflow-hidden shadow-lg">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, #334155, #334155 8px, #475569 8px, #475569 16px)',
                }}
              />
            </div>

            {/* Hanging Ceiling Machinery (Purble Place Style for Beverages) */}
            <BeverageCeilingMachinery
              isProducing={isConveyorMoving}
              activeFlavor={flavor}
              orderCount={orders.length}
            />
          </div>

          {/* 2. Checkerboard Floor (Perspective Slate-Purple & White Tiles) */}
          <div
            className="absolute inset-x-0 bottom-0 h-[36%] border-t-2 border-slate-400/40"
            style={{
              backgroundColor: '#524E75',
              backgroundImage: `
                linear-gradient(45deg, #F8FAFC 25%, transparent 25%),
                linear-gradient(-45deg, #F8FAFC 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #F8FAFC 75%),
                linear-gradient(-45deg, transparent 75%, #F8FAFC 75%)
              `,
              backgroundSize: '36px 36px',
              backgroundPosition: '0 0, 0 18px, 18px -18px, -18px 0px',
            }}
          />

          {/* 3. Conveyor Belt, Modular Counter & Floor Pedal */}
          <div className="relative z-10 w-full mt-auto p-3 flex flex-col space-y-2">
            {/* Moving Bottles on Conveyor */}
            <div className="w-full">
              <BeverageConveyor
                moving={isConveyorMoving}
                flavor={flavor}
                capColor={capColor}
                bottleMold={bottleMold}
              />
            </div>

            {/* Modular Counter Drawers & Floor Pedal */}
            <div className="w-full flex items-end justify-between gap-3 pt-1">
              <div className="flex-1">
                <BeverageModularControls
                  bottleMold={bottleMold}
                  onSelectMold={setBottleMold}
                  flavor={flavor}
                  onSelectFlavor={setFlavor}
                  capColor={capColor}
                  onSelectCap={setCapColor}
                  onTurboBoost={() => handlePedalJog(true)}
                  onQuickReorder={onQuickReorder}
                />
              </div>

              {/* Floor Foot Pedal */}
              <div className="flex-shrink-0">
                <FloorPedal
                  onStepLeft={() => handlePedalJog(false)}
                  onStepRight={() => handlePedalJog(true)}
                  isRunning={isConveyorMoving}
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- LOWER SECTION: 3 Compact HUD Dashboard Panels --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 flex-shrink-0">
          {/* PANEL 1: Raw Material Handling */}
          <div className="md:col-span-4 bg-white/95 border-2 border-pink-100 rounded-2xl p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-pink-50 pb-1.5">
              <h3 className="font-black text-slate-800 text-xs flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-500" />
                <span>Raw Materials & Syrup Inventory</span>
              </h3>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-pink-50 text-pink-700 border border-pink-200">
                SCADA IN
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-pink-50/50 border border-pink-100">
                <span className="font-semibold text-slate-600">Order batch size (Q):</span>
                <span className="font-black font-mono text-slate-800">2,000 un.</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-pink-50/50 border border-pink-100">
                <span className="font-semibold text-slate-600">Reorder point (R):</span>
                <span className="font-black font-mono text-amber-700">{inventory.rawMaterials.reorderThreshold} un.</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-pink-50/50 border border-pink-100">
                <span className="font-semibold text-slate-600">Raw syrup supply:</span>
                <span className="font-black font-mono text-indigo-700">{inventory.rawMaterials.quantity.toLocaleString()} un.</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-pink-50/50 border border-pink-100">
                <span className="font-semibold text-slate-600">Overhead / Unit cost:</span>
                <span className="font-bold font-mono text-slate-700">$200/day · $1.50/b</span>
              </div>
            </div>
          </div>

          {/* PANEL 2: Production Stations Table */}
          <div className="md:col-span-5 bg-white/95 border-2 border-pink-100 rounded-2xl p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-pink-50 pb-1.5">
              <h3 className="font-black text-slate-800 text-xs flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Production Stations</span>
              </h3>
              <div className="text-[10px] font-mono font-bold text-slate-700 bg-pink-50 px-2 py-0.5 rounded-lg border border-pink-200">
                Output: <strong className="text-emerald-700">{production.currentDailyCapacity} b/d</strong>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-pink-100 text-[9px] font-black text-slate-500 uppercase">
                    <th className="py-1 px-1.5">Station</th>
                    <th className="py-1 px-1.5 text-center">Mixing</th>
                    <th className="py-1 px-1.5 text-center">Bottling</th>
                    <th className="py-1 px-1.5 text-center">Packaging</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-50 font-mono">
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
                        ? 'border-pink-500 bg-pink-50/80 shadow-xs'
                        : 'border-pink-100 bg-white hover:border-pink-200'
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
          <div className="md:col-span-3 bg-white/95 border-2 border-pink-100 rounded-2xl p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-pink-50 pb-1.5">
              <h3 className="font-black text-slate-800 text-xs flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Demand & Performance</span>
              </h3>
            </div>

            <div className="bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 text-white rounded-xl p-2.5 shadow-xs text-center border border-pink-200/20">
              <div className="text-[9px] font-mono font-bold text-pink-300 uppercase tracking-wider">
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
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-pink-50/50 border border-pink-100">
                <span className="font-semibold text-slate-600">Finished goods:</span>
                <span className="font-black font-mono text-emerald-700">{inventory.finishedGoods.quantity.toLocaleString()} b.</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-pink-50/50 border border-pink-100">
                <span className="font-semibold text-slate-600">Orders fulfilled:</span>
                <span className="font-black font-mono text-indigo-700">{fulfilledOrders.length} / {orders.length}</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-pink-50/50 border border-pink-100">
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

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
// 1. AUTHENTIC PURBLE PLACE LAYERED CAKE
// 3 rounded sponge tiers, dripping glossy glaze, sparkles, and toppings
// ==========================================
const PurbleCake: React.FC<{
  shape?: 'circle' | 'square' | 'heart';
  tiers?: number;
  glazeFlavor?: 'strawberry' | 'chocolate' | 'vanilla';
  hasToppings?: boolean;
  size?: number;
  glow?: boolean;
}> = ({
  shape = 'circle',
  tiers = 3,
  glazeFlavor = 'strawberry',
  hasToppings = true,
  size = 56,
  glow = true,
}) => {
  const glazeColor =
    glazeFlavor === 'strawberry'
      ? { top: '#F43F5E', mid: '#FB7185', light: '#FECDD3' }
      : glazeFlavor === 'chocolate'
      ? { top: '#78350F', mid: '#92400E', light: '#FDE68A' }
      : { top: '#F59E0B', mid: '#FBBF24', light: '#FEF3C7' };

  return (
    <div className="relative select-none flex flex-col items-center justify-end" style={{ width: size, height: size * 1.35 }}>
      {glow && (
        <div className="absolute inset-0 rounded-full bg-pink-400/30 blur-md pointer-events-none animate-pulse" />
      )}

      {/* Animated Glint Sparkles ✨ */}
      {glow && (
        <motion.div
          className="absolute -top-3 -right-2 text-yellow-300 font-bold text-xs pointer-events-none"
          animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.6, 1, 0.6], rotate: [0, 45, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          ✨
        </motion.div>
      )}

      <svg width={size} height={size * 1.3} viewBox="0 0 64 80" fill="none" className="drop-shadow-md overflow-visible">
        <defs>
          <linearGradient id="tier1-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A3E635" />
            <stop offset="100%" stopColor="#65A30D" />
          </linearGradient>
          <linearGradient id="tier2-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          <linearGradient id="tier3-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#7E22CE" />
          </linearGradient>
          <linearGradient id="glaze-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={glazeColor.top} />
            <stop offset="70%" stopColor={glazeColor.mid} />
            <stop offset="100%" stopColor={glazeColor.light} />
          </linearGradient>
          <filter id="frosting-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#881337" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* --- TIER 1: Bottom Lime Green Sponge --- */}
        <rect x="8" y="52" width="48" height="18" rx="6" fill="url(#tier1-grad)" stroke="#4D7C0F" strokeWidth="1.5" />
        <ellipse cx="32" cy="53" rx="23" ry="4" fill="#BEF264" opacity="0.6" />

        {/* --- TIER 2: Middle Lemon Yellow Sponge --- */}
        {tiers >= 2 && (
          <g>
            <rect x="11" y="36" width="42" height="18" rx="6" fill="url(#tier2-grad)" stroke="#A16207" strokeWidth="1.5" />
            <ellipse cx="32" cy="37" rx="20" ry="3.5" fill="#FEF08A" opacity="0.7" />
            {/* Cream filling line */}
            <path d="M 12 45 Q 32 48 52 45" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
          </g>
        )}

        {/* --- TIER 3: Top Lavender Purple Sponge --- */}
        {tiers >= 3 && (
          <g>
            <rect x="14" y="20" width="36" height="18" rx="6" fill="url(#tier3-grad)" stroke="#6B21A8" strokeWidth="1.5" />
            <ellipse cx="32" cy="21" rx="17" ry="3" fill="#E9D5FF" opacity="0.7" />
          </g>
        )}

        {/* --- DRIPPING FROSTING / GLAZE --- */}
        <g filter="url(#frosting-shadow)">
          {/* Top frosting crown */}
          <ellipse cx="32" cy="21" rx="18.5" ry="5.5" fill="url(#glaze-grad)" stroke="#BE123C" strokeWidth="1" />
          {/* Dripping glaze tongues */}
          <path
            d="M 13.5 21 
               C 13.5 26, 17 31, 19 31 
               C 21 31, 23 24, 25 24 
               C 27 24, 28 34, 31 34 
               C 34 34, 35 25, 38 25 
               C 40 25, 42 32, 45 32 
               C 48 32, 50.5 25, 50.5 21 Z"
            fill="url(#glaze-grad)"
          />
          {/* Specular frosting gloss highlight */}
          <path d="M 18 19 Q 32 16 46 19" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
          <circle cx="24" cy="20" r="1.5" fill="#FFFFFF" opacity="0.9" />
          <circle cx="40" cy="21" r="1.2" fill="#FFFFFF" opacity="0.9" />
        </g>

        {/* --- TOPPINGS: Candy Beans & Sugar Pearls --- */}
        {hasToppings && (
          <g>
            {/* Candy 1 (Cyan) */}
            <ellipse cx="24" cy="18" rx="3" ry="2.2" fill="#06B6D4" stroke="#0891B2" strokeWidth="0.8" />
            <circle cx="23" cy="17" r="0.7" fill="#FFFFFF" />

            {/* Candy 2 (Magenta Pink) */}
            <ellipse cx="32" cy="16.5" rx="3.5" ry="2.5" fill="#EC4899" stroke="#BE185D" strokeWidth="0.8" />
            <circle cx="31" cy="15.5" r="0.9" fill="#FFFFFF" />

            {/* Candy 3 (Golden Amber) */}
            <ellipse cx="40" cy="18" rx="3" ry="2.2" fill="#F59E0B" stroke="#D97706" strokeWidth="0.8" />
            <circle cx="39" cy="17" r="0.7" fill="#FFFFFF" />
          </g>
        )}
      </svg>
    </div>
  );
};

// ==========================================
// 1B. CARTOON BEVERAGE BOTTLE (FOR BOTTLING MODE)
// ==========================================
const CartoonBottle: React.FC<{
  filled: number;
  capped: boolean;
  labelled: boolean;
  size?: number;
  glow?: boolean;
}> = ({ filled, capped, labelled, size = 34, glow = false }) => {
  const height = Math.round(size * 2.05);

  return (
    <div className="relative select-none flex flex-col items-center" style={{ width: size, height }}>
      {glow && (
        <div className="absolute inset-0 rounded-full bg-rose-400/35 blur-md pointer-events-none animate-pulse" />
      )}
      <svg width={size} height={height} viewBox="0 0 38 78" fill="none" className="drop-shadow-sm overflow-visible">
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

        {/* Glass Silhouette */}
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
              y={75 - 58 * (filled / 100)}
              width="26"
              height={58 * (filled / 100) + 4}
              fill={`url(#juice-grad-${size})`}
            />
            <ellipse cx="19" cy={75 - 58 * (filled / 100)} rx="9" ry="2.5" fill="#FDA4AF" opacity="0.9" />
            <circle cx="15" cy={Math.max(38, 70 - filled * 0.35)} r="1.2" fill="#FFE4E6" opacity="0.7" />
            <circle cx="23" cy={Math.max(42, 65 - filled * 0.3)} r="1.6" fill="#FFE4E6" opacity="0.8" />
          </g>
        )}

        {/* Label */}
        {labelled && (
          <g>
            <path d="M9.5 44 C9.5 44, 19 46, 28.5 44 L28.5 58 C28.5 58, 19 60, 9.5 58 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
            <path d="M9.5 47 C9.5 47, 19 49, 28.5 47 L28.5 53 C28.5 53, 19 55, 9.5 53 Z" fill="#4338CA" />
            <circle cx="19" cy="50" r="2.2" fill="#F59E0B" />
          </g>
        )}

        {/* Highlight */}
        <path d="M12 34 C12 28, 15 25, 17 22 L17 65 C14 65, 12 62, 12 58 Z" fill={`url(#glass-shine-${size})`} />

        {/* Lip */}
        <rect x="15.5" y="8.5" width="7" height="3.5" rx="1" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="1.2" />

        {/* Cap */}
        {capped ? (
          <g>
            <path d="M14.5 5.5 C14.5 4, 16 3, 19 3 C22 3, 23.5 4, 23.5 5.5 L24 8.5 L14 8.5 Z" fill="#E11D48" stroke="#BE123C" strokeWidth="1" />
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
// 2. PURBLE PLACE HANGING CEILING MACHINERY
// TV Order screen, bell dispenser, jelly vials, swirling candy glaze nozzle with sparkles,
// fruit topping bowls, polka-dot sprinkles cone, and cyan order HUD
// ==========================================
const PurbleCeilingMachinery: React.FC<{
  isProducing: boolean;
  activeGlaze: string;
  orderTarget?: string;
}> = ({ isProducing, activeGlaze, orderTarget = 'Classic 3-Tier Strawberry' }) => {
  return (
    <div className="relative w-full h-32 flex items-start justify-between px-3 z-10 pointer-events-none select-none">
      {/* 1. Leftmost: TV Order Screen */}
      <div className="relative flex flex-col items-center">
        {/* Antenna */}
        <div className="flex items-center space-x-2 -mb-1">
          <div className="w-0.5 h-4 bg-slate-400 rotate-[-25deg] origin-bottom" />
          <div className="w-0.5 h-4 bg-slate-400 rotate-[25deg] origin-bottom" />
        </div>
        {/* TV Box */}
        <div className="w-20 h-22 rounded-xl bg-gradient-to-b from-blue-400 to-indigo-600 p-1.5 shadow-lg border-2 border-indigo-700 flex flex-col items-center justify-between">
          <div className="w-full h-15 rounded-lg bg-indigo-950/90 border border-blue-300/40 p-1 flex flex-col items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-blue-500/10 scanlines pointer-events-none" />
            <PurbleCake size={32} glow={false} />
          </div>
          <div className="w-full flex items-center justify-between px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[7px] font-black text-blue-100 uppercase tracking-tighter">ORDER #104</span>
          </div>
        </div>
      </div>

      {/* 2. Yellow & Cyan Bell Batter Dispenser */}
      <div className="hidden sm:flex flex-col items-center">
        <div className="w-1.5 h-6 bg-slate-300 border-x border-slate-400" />
        <div className="relative flex flex-col items-center">
          {/* Glowing Crystal Gem */}
          <div className="w-3.5 h-5 bg-gradient-to-t from-cyan-400 to-blue-200 rounded-full border border-cyan-300 shadow-md" />
          {/* Yellow Bell Body */}
          <div className="w-12 h-10 -mt-1 rounded-t-full rounded-b-xl bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-500 border-2 border-amber-600 shadow-md flex items-center justify-center">
            <div className="flex space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
            </div>
          </div>
          {/* Nozzle */}
          <div className="w-3 h-3 bg-amber-600 rounded-b-md" />
        </div>
      </div>

      {/* 3. Purple & Cyan Jelly Multi-Vial Machine */}
      <div className="hidden md:flex flex-col items-center">
        <div className="w-1.5 h-4 bg-slate-300 border-x border-slate-400" />
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-purple-500 via-purple-600 to-indigo-700 border-2 border-purple-800 shadow-md p-1 flex flex-col items-center justify-between">
          <div className="w-full flex justify-around items-center pt-1">
            <div className="w-2.5 h-6 rounded-full bg-rose-400 border border-white/50" />
            <div className="w-2.5 h-6 rounded-full bg-amber-300 border border-white/50" />
            <div className="w-2.5 h-6 rounded-full bg-emerald-400 border border-white/50" />
          </div>
          <div className="w-6 h-2 rounded-full bg-cyan-400 border border-cyan-500" />
        </div>
        <div className="w-3 h-3 bg-purple-900 rounded-b-md" />
      </div>

      {/* 4. Cyan Horned Extruder Machine */}
      <div className="hidden lg:flex flex-col items-center">
        <div className="w-1.5 h-4 bg-slate-300 border-x border-slate-400" />
        <div className="relative w-12 h-14 rounded-2xl bg-gradient-to-b from-cyan-400 to-blue-600 border-2 border-blue-700 shadow-md flex flex-col items-center justify-between p-1">
          {/* Horns */}
          <div className="absolute -left-2 top-0 w-3 h-5 border-2 border-pink-400 rounded-t-full rotate-[-30deg]" />
          <div className="absolute -right-2 top-0 w-3 h-5 border-2 border-pink-400 rounded-t-full rotate-[30deg]" />
          <div className="w-6 h-6 rounded-full bg-pink-400 border border-white/60 mt-1" />
          <div className="w-3 h-2 bg-blue-800 rounded-b" />
        </div>
      </div>

      {/* 5. CENTERPIECE: Candy-Striped Swirling Glaze Dispenser & Pouring Stream with Sparkles ✨ */}
      <div className="relative flex flex-col items-center -mt-1">
        {/* Ceiling Mount Pole with Candy Stripes */}
        <div
          className="w-2.5 h-6 border-x border-pink-600 shadow-xs"
          style={{
            background: 'repeating-linear-gradient(45deg, #F43F5E, #F43F5E 3px, #FFFFFF 3px, #FFFFFF 6px)',
          }}
        />

        {/* Swirling Spiral Cone Nozzle */}
        <motion.div
          className="relative w-16 h-16 rounded-full border-2 border-pink-600 shadow-xl overflow-hidden flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, #FB7185 20%, #F43F5E 60%, #BE123C 100%)',
          }}
          animate={isProducing ? { rotate: [0, 360] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          {/* Candy swirl arms */}
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

        {/* Tapered Nozzle */}
        <div className="w-4 h-3 bg-gradient-to-b from-pink-600 to-rose-700 rounded-b-md shadow-sm" />

        {/* Luscious Dripping Pink Strawberry Glaze Stream with Sparkles */}
        {isProducing ? (
          <div className="relative flex flex-col items-center">
            <motion.div
              className="w-3 h-14 bg-gradient-to-b from-pink-500 via-rose-500 to-pink-600 rounded-full shadow-lg shadow-pink-500/80"
              animate={{ scaleY: [0.88, 1.08, 0.92], opacity: [0.92, 1, 0.9] }}
              transition={{ repeat: Infinity, duration: 0.3 }}
            />
            {/* Splash Ring */}
            <motion.div
              className="w-6 h-2 rounded-full bg-pink-300 blur-xs -mt-1"
              animate={{ scale: [0.8, 1.3, 0.8] }}
              transition={{ repeat: Infinity, duration: 0.3 }}
            />
            {/* Sparkles */}
            <motion.div
              className="absolute -top-1 -left-4 text-yellow-300 font-bold text-sm pointer-events-none"
              animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute top-6 -right-4 text-yellow-300 font-bold text-sm pointer-events-none"
              animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              ✨
            </motion.div>
          </div>
        ) : (
          <div className="w-3 h-14" />
        )}
      </div>

      {/* 6. Fruit & Herb Topping Triple Bowl Dispenser */}
      <div className="hidden sm:flex flex-col items-center">
        <div className="w-1.5 h-6 bg-slate-300 border-x border-slate-400" />
        <div className="relative flex flex-col items-center">
          {/* Triple Bowls Cluster */}
          <div className="flex space-x-1 items-end">
            {/* Strawberries */}
            <div className="w-7 h-8 rounded-b-xl bg-gradient-to-b from-red-500 to-rose-700 border-2 border-red-800 shadow-md p-0.5 flex flex-col items-center justify-start">
              <span className="text-[10px]">🍓</span>
            </div>
            {/* Mint Leaves */}
            <div className="w-8 h-9 rounded-b-xl bg-gradient-to-b from-emerald-500 to-teal-700 border-2 border-emerald-800 shadow-md p-0.5 flex flex-col items-center justify-start">
              <span className="text-[11px]">🍃</span>
            </div>
            {/* Bananas */}
            <div className="w-7 h-8 rounded-b-xl bg-gradient-to-b from-amber-400 to-yellow-600 border-2 border-amber-700 shadow-md p-0.5 flex flex-col items-center justify-start">
              <span className="text-[10px]">🍌</span>
            </div>
          </div>
          <div className="w-4 h-2 bg-slate-600 rounded-b-md" />
        </div>
      </div>

      {/* 7. Polka-Dot Sprinkles & Candy Cone */}
      <div className="hidden md:flex flex-col items-center">
        <div
          className="w-1.5 h-4 border-x border-pink-400"
          style={{
            background: 'repeating-linear-gradient(45deg, #EC4899, #EC4899 3px, #FFFFFF 3px, #FFFFFF 6px)',
          }}
        />
        <div className="w-12 h-14 rounded-2xl bg-gradient-to-b from-fuchsia-500 via-pink-600 to-purple-700 border-2 border-purple-800 shadow-md p-1 flex flex-col items-center justify-between">
          <div className="w-full h-1 bg-yellow-300 rounded-full" />
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-cyan-300" />
            <div className="w-2 h-2 rounded-full bg-yellow-300" />
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          {/* Polka-dot nozzle */}
          <div className="w-5 h-3 bg-white border border-slate-400 rounded-b flex items-center justify-around px-0.5">
            <span className="w-1 h-1 rounded-full bg-slate-900" />
            <span className="w-1 h-1 rounded-full bg-slate-900" />
          </div>
        </div>
      </div>

      {/* 8. Top-Right: Cyan Digital Order HUD [X] [🎁] [ - - ] */}
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
// 3. PURBLE PLACE MODULAR KITCHEN COUNTER CONTROLS
// 6 modular columns of cream bevelled button tiles:
// 1: Pan Shape | 2: Batter Pot | 3: Sponges | 4: Glazes | 5: Toppings | 6: Dust & Bake
// ==========================================
interface ModularCounterControlsProps {
  selectedShape: 'circle' | 'square' | 'heart';
  onSelectShape: (shape: 'circle' | 'square' | 'heart') => void;
  selectedGlaze: 'strawberry' | 'chocolate' | 'vanilla';
  onSelectGlaze: (glaze: 'strawberry' | 'chocolate' | 'vanilla') => void;
  onBake: () => void;
  onQuickReorder?: () => void;
}

const ModularCounterControls: React.FC<ModularCounterControlsProps> = ({
  selectedShape,
  onSelectShape,
  selectedGlaze,
  onSelectGlaze,
  onBake,
  onQuickReorder,
}) => {
  return (
    <div className="relative w-full bg-gradient-to-b from-sky-200 via-cyan-100 to-sky-300 border-2 border-sky-400 rounded-2xl p-2 shadow-md select-none overflow-hidden">
      {/* Counter Top Edge Highlight */}
      <div className="w-full h-1 bg-white/70 rounded-full mb-1.5 shadow-xs" />

      <div className="grid grid-cols-6 gap-2">
        {/* COL 1: Cake Pan Shapes */}
        <div className="bg-sky-100/80 rounded-xl border border-sky-300/80 p-1 flex flex-col space-y-1">
          <button
            onClick={() => onSelectShape('circle')}
            className={`w-full py-1 rounded-lg border flex items-center justify-center transition-all ${
              selectedShape === 'circle'
                ? 'bg-amber-100 border-amber-400 shadow-sm scale-102'
                : 'bg-amber-50 hover:bg-amber-100/70 border-amber-200/60'
            }`}
          >
            <div className="w-5 h-5 rounded-full border-2 border-pink-400 bg-pink-100 shadow-inner" />
          </button>
          <button
            onClick={() => onSelectShape('square')}
            className={`w-full py-1 rounded-lg border flex items-center justify-center transition-all ${
              selectedShape === 'square'
                ? 'bg-amber-100 border-amber-400 shadow-sm scale-102'
                : 'bg-amber-50 hover:bg-amber-100/70 border-amber-200/60'
            }`}
          >
            <div className="w-5 h-5 rounded-md border-2 border-pink-400 bg-pink-100 shadow-inner" />
          </button>
          <button
            onClick={() => onSelectShape('heart')}
            className={`w-full py-1 rounded-lg border flex items-center justify-center transition-all ${
              selectedShape === 'heart'
                ? 'bg-amber-100 border-amber-400 shadow-sm scale-102'
                : 'bg-amber-50 hover:bg-amber-100/70 border-amber-200/60'
            }`}
          >
            <span className="text-sm">🩷</span>
          </button>
        </div>

        {/* COL 2: Batter Pots */}
        <div className="bg-sky-100/80 rounded-xl border border-sky-300/80 p-1 flex flex-col space-y-1">
          <div className="w-full py-1 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center cursor-pointer hover:bg-amber-100/70">
            <div className="w-5 h-4 rounded-b-lg bg-amber-900 border border-amber-950" />
          </div>
          <div className="w-full py-1 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center cursor-pointer hover:bg-amber-100/70">
            <div className="w-5 h-4 rounded-b-lg bg-rose-600 border border-rose-800" />
          </div>
          <div className="w-full py-1 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center cursor-pointer hover:bg-amber-100/70">
            <div className="w-5 h-4 rounded-b-lg bg-amber-300 border border-amber-500" />
          </div>
        </div>

        {/* COL 3: Cake Sponge Layering */}
        <div className="bg-sky-100/80 rounded-xl border border-sky-300/80 p-1 flex flex-col space-y-1">
          <div className="w-full py-1 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center cursor-pointer hover:bg-amber-100/70">
            <div className="w-6 h-3 rounded-md bg-amber-800 border border-amber-950" />
          </div>
          <div className="w-full py-1 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center cursor-pointer hover:bg-amber-100/70">
            <div className="w-6 h-3 rounded-md bg-purple-500 border border-purple-700" />
          </div>
          <div className="w-full py-1 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center cursor-pointer hover:bg-amber-100/70">
            <div className="w-6 h-3 rounded-md bg-lime-500 border border-lime-700" />
          </div>
        </div>

        {/* COL 4: Glazes & Dripping Frosting */}
        <div className="bg-sky-100/80 rounded-xl border border-sky-300/80 p-1 flex flex-col space-y-1">
          <button
            onClick={() => onSelectGlaze('chocolate')}
            className={`w-full py-1 rounded-lg border flex items-center justify-center transition-all ${
              selectedGlaze === 'chocolate'
                ? 'bg-amber-100 border-amber-400 shadow-sm scale-102'
                : 'bg-amber-50 hover:bg-amber-100/70 border-amber-200/60'
            }`}
          >
            <div className="w-5 h-3 rounded-full bg-amber-900 border border-amber-950" />
          </button>
          <button
            onClick={() => onSelectGlaze('strawberry')}
            className={`w-full py-1 rounded-lg border flex items-center justify-center transition-all ${
              selectedGlaze === 'strawberry'
                ? 'bg-amber-100 border-amber-400 shadow-sm scale-102'
                : 'bg-amber-50 hover:bg-amber-100/70 border-amber-200/60'
            }`}
          >
            <div className="w-5 h-3 rounded-full bg-pink-500 border border-pink-700 shadow-xs" />
          </button>
          <button
            onClick={() => onSelectGlaze('vanilla')}
            className={`w-full py-1 rounded-lg border flex items-center justify-center transition-all ${
              selectedGlaze === 'vanilla'
                ? 'bg-amber-100 border-amber-400 shadow-sm scale-102'
                : 'bg-amber-50 hover:bg-amber-100/70 border-amber-200/60'
            }`}
          >
            <div className="w-5 h-3 rounded-full bg-amber-300 border border-amber-500" />
          </button>
        </div>

        {/* COL 5: Candy Toppings */}
        <div className="bg-sky-100/80 rounded-xl border border-sky-300/80 p-1 grid grid-cols-2 gap-1 items-center">
          <div className="py-1 rounded bg-amber-50 border border-amber-200/60 flex items-center justify-center text-xs cursor-pointer hover:bg-amber-100/70">
            😊
          </div>
          <div className="py-1 rounded bg-amber-50 border border-amber-200/60 flex items-center justify-center text-xs cursor-pointer hover:bg-amber-100/70">
            🍬
          </div>
          <div className="py-1 rounded bg-amber-50 border border-amber-200/60 flex items-center justify-center text-xs cursor-pointer hover:bg-amber-100/70">
            ❤️
          </div>
          <div className="py-1 rounded bg-amber-50 border border-amber-200/60 flex items-center justify-center text-xs cursor-pointer hover:bg-amber-100/70">
            🍀
          </div>
        </div>

        {/* COL 6: Sugar Shaker & Oven Bake */}
        <div className="bg-sky-100/80 rounded-xl border border-sky-300/80 p-1 flex flex-col space-y-1">
          {onQuickReorder && (
            <button
              onClick={onQuickReorder}
              className="w-full py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200/60 flex items-center justify-center text-xs transition-transform active:scale-95"
              title="Add Sugar/Ingredients"
            >
              🧂
            </button>
          )}
          <button
            onClick={onBake}
            className="w-full py-1.5 rounded-lg bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 border border-orange-600 text-white font-bold text-xs shadow-sm flex items-center justify-center transition-transform active:scale-95"
            title="Bake Cake / Accelerate Output"
          >
            🔥
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. FLOOR PEDAL CONTROLLER (CONNECTED VIA RUBBER CABLE)
// Green left and right arrow buttons on light-blue foot pedal
// ==========================================
const FloorPedal: React.FC<{
  onStepLeft: () => void;
  onStepRight: () => void;
  isRunning: boolean;
}> = ({ onStepLeft, onStepRight, isRunning }) => {
  return (
    <div className="relative flex items-center select-none pt-1">
      {/* Flexible 3D Rubber Cable */}
      <svg className="w-16 h-8 -mr-1" viewBox="0 0 64 32" fill="none">
        <path d="M 4 2 Q 24 28 62 16" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M 4 2 Q 24 28 62 16" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* Light Cyan Pedal Base */}
      <div className="bg-gradient-to-b from-sky-200 to-cyan-300 border-2 border-sky-400 rounded-2xl p-1.5 shadow-lg flex items-center space-x-2">
        {/* Left Arrow Button */}
        <button
          onClick={onStepLeft}
          className="w-8 h-8 rounded-full bg-gradient-to-b from-lime-400 to-emerald-500 hover:from-lime-300 hover:to-emerald-400 border-2 border-emerald-600 shadow-md flex items-center justify-center font-black text-white text-sm transition-transform active:scale-90"
          title="Conveyor Left / Jog"
        >
          ⬅
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={onStepRight}
          className="w-8 h-8 rounded-full bg-gradient-to-b from-lime-400 to-emerald-500 hover:from-lime-300 hover:to-emerald-400 border-2 border-emerald-600 shadow-md flex items-center justify-center font-black text-white text-sm transition-transform active:scale-90"
          title="Conveyor Right / Run"
        >
          ➡
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 5. PURBLE CONVEYOR BELT (SMOOTH SEGMENTED RUBBER WITH CAKES)
// ==========================================
interface PurbleConveyorProps {
  moving: boolean;
  shape: 'circle' | 'square' | 'heart';
  glaze: 'strawberry' | 'chocolate' | 'vanilla';
}

const PurbleConveyor: React.FC<PurbleConveyorProps> = ({ moving, shape, glaze }) => {
  const [trackCakes, setTrackCakes] = useState([
    { id: 1, x: 12, stage: 1 },
    { id: 2, x: 38, stage: 2 },
    { id: 3, x: 62, stage: 3 },
    { id: 4, x: 88, stage: 4 },
  ]);

  const lastTime = useRef(performance.now());
  const rafHandle = useRef<number | null>(null);

  useEffect(() => {
    const loop = (time: number) => {
      const delta = Math.min(50, time - lastTime.current);
      lastTime.current = time;

      if (moving) {
        const rate = (0.012 * delta) / 16.66;
        setTrackCakes(prev =>
          prev.map(c => {
            let nextX = c.x + rate;
            if (nextX > 98) nextX = 5;
            let stage = 1;
            if (nextX >= 75) stage = 4;
            else if (nextX >= 50) stage = 3;
            else if (nextX >= 25) stage = 2;
            return { ...c, x: nextX, stage };
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
      {/* Main Conveyor Table Structure */}
      <div className="relative h-28 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-y-4 border-slate-600 rounded-xl shadow-inner overflow-hidden flex items-center px-4">
        {/* Moving Segmented Belt Grooves */}
        <motion.div
          className="absolute inset-0 opacity-30 pointer-events-none"
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

        {/* Cakes on Track */}
        <div className="relative w-full h-full flex items-center">
          {trackCakes.map(cake => {
            const tiers = cake.stage >= 2 ? 3 : 2;
            const hasGlaze = cake.stage >= 2;
            const hasToppings = cake.stage >= 3;

            return (
              <div
                key={cake.id}
                className="absolute bottom-2 flex flex-col items-center"
                style={{
                  left: `${cake.x}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                {/* White Square Baking Parchment Paper */}
                <div className="w-14 h-3 bg-white/95 rounded-xs shadow-md border border-slate-200 -mb-1 transform rotate-1" />

                {/* Layered Cake */}
                <PurbleCake
                  shape={shape}
                  tiers={tiers}
                  glazeFlavor={glaze}
                  hasToppings={hasToppings}
                  size={52}
                  glow={moving && cake.stage === 2}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Star Delivery Platform & Recycle Bin */}
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

        {/* Lavender Recycle / Trash Bin */}
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
// 5. INDUSTRIAL CONVEYOR BELT (FOR BOTTLING MODE)
// ==========================================
const IndustrialConveyor: React.FC<{ moving: boolean; children: React.ReactNode }> = ({
  moving,
  children,
}) => {
  return (
    <div className="relative w-full rounded-2xl select-none pt-1">
      <div className="relative h-2.5 w-full bg-gradient-to-b from-slate-200 via-white to-slate-300 border-y border-slate-400 rounded-full shadow-xs flex items-center justify-around z-10 px-6">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-slate-500" />
        ))}
      </div>
      <div className="relative h-24 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-x-4 border-slate-600 flex items-center px-4 overflow-hidden shadow-inner">
        <motion.div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.2) 20px, rgba(255,255,255,0.2) 24px)',
          }}
          animate={moving ? { backgroundPositionX: ['0px', '24px'] } : {}}
          transition={{ repeat: Infinity, duration: 0.5, ease: 'linear' }}
        />
        <div className="relative w-full h-full flex items-center">{children}</div>
      </div>
      <div
        className="h-3 w-full rounded-b-xl border-b-2 border-slate-500 shadow-sm"
        style={{
          background: 'repeating-linear-gradient(45deg, #F59E0B, #F59E0B 8px, #1E1E2E 8px, #1E1E2E 16px)',
        }}
      />
    </div>
  );
};

// ==========================================
// 5B. ANIMATED CONVEYOR BELT (ISOLATED 60FPS RAF LOOP)
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
// Purble Place Comfy Cakes Bakery & Beverage Factory
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

  // Purble Place Interactive State
  const [themeMode, setThemeMode] = useState<'cakes' | 'bottles'>('cakes');
  const [selectedShape, setSelectedShape] = useState<'circle' | 'square' | 'heart'>('circle');
  const [selectedGlaze, setSelectedGlaze] = useState<'strawberry' | 'chocolate' | 'vanilla'>('strawberry');
  const [manualJog, setManualJog] = useState(false);

  const rawPercentage = Math.min(100, Math.round((inventory.rawMaterials.quantity / 8000) * 100));
  const fulfilledOrders = orders.filter(o => o.status === 'FULFILLED');

  const handlePedalJog = (forward: boolean) => {
    setManualJog(true);
    setTimeout(() => setManualJog(false), 800);
  };

  const isConveyorMoving = isProducing || manualJog;

  return (
    <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden border-2 border-pink-200 shadow-md flex flex-col">
      {/* Top Status & SCADA Bar */}
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
              {themeMode === 'cakes'
                ? isProducing
                  ? '🎂 COMFY CAKES BAKERY ACTIVE'
                  : '🎂 COMFY CAKES STANDBY'
                : isProducing
                ? '🍾 APEX BOTTLING PRODUCING'
                : '🍾 APEX BOTTLING STOPPED'}
            </span>
          </div>

          <div className="px-3 py-0.5 rounded-full bg-pink-500 text-white font-mono font-black text-xs shadow-xs flex items-center space-x-1">
            <span>Day</span>
            <span>{currentDay}</span>
            <span className="text-pink-100">/ {state.objectives.maxDays || 7}</span>
          </div>
        </div>

        {/* Telemetry stats */}
        <div className="hidden md:flex items-center space-x-3 text-xs font-bold text-slate-600 bg-white px-3 py-1 rounded-xl border border-pink-200 shadow-xs">
          <span>Active Lines: <strong className="text-pink-600">{production.activeMachinesCount}/{production.totalMachinesCount}</strong></span>
          <span className="text-slate-200">|</span>
          <span>Output: <strong className="text-emerald-600">{production.currentHourlyRate} u/h</strong></span>
          <span className="text-slate-200">|</span>
          <span>Cap: <strong className="text-purple-600">{production.currentDailyCapacity} u/d</strong></span>
          <span className="text-slate-200">|</span>
          <span>Util: <strong className="text-amber-600">{production.utilizationRate}%</strong></span>
        </div>

        {/* Theme Mode Toggle (Cake Factory vs Bottle Line) */}
        <div className="flex items-center bg-white/90 p-0.5 rounded-xl border border-pink-200 shadow-xs">
          <button
            onClick={() => setThemeMode('cakes')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
              themeMode === 'cakes'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🍰</span>
            <span>Purble Cakes</span>
          </button>
          <button
            onClick={() => setThemeMode('bottles')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
              themeMode === 'bottles'
                ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🍾</span>
            <span>Bottling</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 p-3 lg:p-4 flex flex-col justify-between overflow-y-auto space-y-3">
        {/* ========================================================= */}
        {/* UPPER STAGE: PURBLE PLACE COMFY CAKES BAKERY THEME */}
        {/* ========================================================= */}
        {themeMode === 'cakes' ? (
          <div className="relative w-full min-h-[380px] lg:min-h-[410px] rounded-3xl border-2 border-pink-300 shadow-inner flex flex-col justify-between flex-shrink-0 overflow-hidden select-none">
            {/* 1. Pink Wallpaper with Cake Silhouettes */}
            <div className="absolute inset-x-0 top-0 h-[68%] bg-gradient-to-b from-pink-400 via-pink-300 to-pink-300 overflow-hidden">
              {/* Subtle Wallpaper Repeating Cake Outline SVGs */}
              <div className="absolute inset-0 opacity-20 pointer-events-none flex justify-around items-center">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-16 h-4 border-2 border-white rounded-t-lg" />
                    <div className="w-20 h-6 border-2 border-white rounded-t-lg -mt-0.5" />
                    <div className="w-24 h-8 border-2 border-white rounded-t-lg -mt-0.5" />
                  </div>
                ))}
              </div>

              {/* Right Escalator / Delivery Ramp Stairs */}
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-b from-slate-400 via-slate-500 to-slate-600 border-l-4 border-slate-700 opacity-80 transform skew-y-12 origin-top-right overflow-hidden shadow-lg">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, #334155, #334155 8px, #475569 8px, #475569 16px)',
                  }}
                />
              </div>

              {/* Hanging Ceiling Machinery */}
              <PurbleCeilingMachinery
                isProducing={isConveyorMoving}
                activeGlaze={selectedGlaze}
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

            {/* 3. Stage Conveyor Belt, Modular Counter & Floor Pedal */}
            <div className="relative z-10 w-full mt-auto p-3 flex flex-col space-y-2">
              {/* Conveyor Belt Table with Moving Cakes */}
              <div className="w-full">
                <PurbleConveyor
                  moving={isConveyorMoving}
                  shape={selectedShape}
                  glaze={selectedGlaze}
                />
              </div>

              {/* Modular Counter Drawers & Floor Foot Pedal */}
              <div className="w-full flex items-end justify-between gap-3 pt-1">
                {/* Modular 6-Column Control Counter */}
                <div className="flex-1">
                  <ModularCounterControls
                    selectedShape={selectedShape}
                    onSelectShape={setSelectedShape}
                    selectedGlaze={selectedGlaze}
                    onSelectGlaze={setSelectedGlaze}
                    onBake={() => handlePedalJog(true)}
                    onQuickReorder={onQuickReorder}
                  />
                </div>

                {/* Floor Foot Pedal (Left & Right Green Arrow Buttons) */}
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
        ) : (
          /* ========================================================= */
          /* ALTERNATE MODE: DELUXE APEX BEVERAGES BOTTLING LINE */
          /* ========================================================= */
          <div className="relative w-full min-h-[350px] lg:min-h-[380px] bg-gradient-to-b from-slate-100 via-slate-50 to-white rounded-2xl border-2 border-slate-200 p-4 shadow-inner flex flex-col justify-between flex-shrink-0 overflow-hidden">
            {/* Machinery Stations Row */}
            <div className="grid grid-cols-12 gap-3 items-start relative z-10 pt-1">
              {/* Hopper */}
              <div className="col-span-4 md:col-span-3 flex flex-col items-center">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1 flex items-center space-x-1">
                  <span>🛢 Raw Material Hopper</span>
                </span>
                <div className="relative w-28 h-36 rounded-2xl bg-gradient-to-b from-white/95 to-slate-100 border-2 border-slate-400 shadow-md p-1.5 flex flex-col items-center justify-end overflow-hidden">
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
              </div>

              <div className="hidden md:block col-span-2" />

              {/* Mixing Reservoir */}
              <div className="col-span-8 md:col-span-4 flex flex-col items-center">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1">
                  🧪 Juice Mixing & Reservoir
                </span>
                <div className="relative w-60 h-22 rounded-2xl bg-slate-100 border-2 border-slate-400 shadow-md overflow-hidden flex flex-col justify-end p-1.5">
                  <div
                    className="w-full rounded-xl bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 shadow-inner relative overflow-hidden transition-all duration-500"
                    style={{ height: `${Math.max(30, rawPercentage * 0.75)}%` }}
                  />
                </div>
                {/* Pouring stream */}
                {isProducing ? (
                  <motion.div
                    className="w-2.5 h-7 bg-gradient-to-b from-rose-500 via-rose-600 to-rose-700 rounded-full shadow-md shadow-rose-400/60"
                    animate={{ scaleY: [0.85, 1.08, 0.9], opacity: [0.9, 1, 0.85] }}
                    transition={{ repeat: Infinity, duration: 0.25 }}
                  />
                ) : (
                  <div className="w-2.5 h-7" />
                )}
              </div>

              <div className="hidden md:block col-span-1" />

              {/* Crates */}
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
              </div>
            </div>

            {/* Bottling Conveyor Belt */}
            <div className="relative z-20 mt-1">
              <AnimatedConveyorBelt isProducing={isProducing} speed={speed} />
            </div>
          </div>
        )}

        {/* --- LOWER SECTION: 3 Compact HUD Dashboard Panels --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 flex-shrink-0">
          {/* PANEL 1: Ingredients & Raw Materials */}
          <div className="md:col-span-4 bg-white/95 border-2 border-pink-100 rounded-2xl p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-pink-50 pb-1.5">
              <h3 className="font-black text-slate-800 text-xs flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-500" />
                <span>{themeMode === 'cakes' ? 'Bakery Ingredients & Flour' : 'Raw Material Handling'}</span>
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
                <span className="font-semibold text-slate-600">In-stock supply:</span>
                <span className="font-black font-mono text-indigo-700">{inventory.rawMaterials.quantity.toLocaleString()} un.</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-pink-50/50 border border-pink-100">
                <span className="font-semibold text-slate-600">Baking / Unit overhead:</span>
                <span className="font-bold font-mono text-slate-700">$200/day · $1.50/u</span>
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
                Output: <strong className="text-emerald-700">{production.currentDailyCapacity} u/d</strong>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-pink-100 text-[9px] font-black text-slate-500 uppercase">
                    <th className="py-1 px-1.5">Station</th>
                    <th className="py-1 px-1.5 text-center">{themeMode === 'cakes' ? 'Batter' : 'Mixing'}</th>
                    <th className="py-1 px-1.5 text-center">{themeMode === 'cakes' ? 'Baking' : 'Bottling'}</th>
                    <th className="py-1 px-1.5 text-center">{themeMode === 'cakes' ? 'Icing' : 'Packaging'}</th>
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
                <span className="font-black font-mono text-emerald-700">{inventory.finishedGoods.quantity.toLocaleString()} u.</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-pink-50/50 border border-pink-100">
                <span className="font-semibold text-slate-600">Orders fulfilled:</span>
                <span className="font-black font-mono text-indigo-700">{fulfilledOrders.length} / {orders.length}</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-pink-50/50 border border-pink-100">
                <span className="font-semibold text-slate-600">Price per unit:</span>
                <span className="font-black font-mono text-slate-800">$20.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

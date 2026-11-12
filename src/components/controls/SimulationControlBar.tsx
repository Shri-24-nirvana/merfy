'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Award,
  FastForward,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { SimulationState } from '@/types/simulation';
import Link from 'next/link';

interface SimulationControlBarProps {
  state: SimulationState;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onSetSpeed: (speed: number) => void;
  onRestart: () => void;
  onManualTick?: () => void;
}

export const SimulationControlBar: React.FC<SimulationControlBarProps> = ({
  state,
  onStart,
  onPause,
  onResume,
  onSetSpeed,
  onRestart,
  onManualTick,
}) => {
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);

  const isRunning = state.status === 'RUNNING';
  const isPaused = state.status === 'PAUSED';
  const isTerminated = state.status === 'COMPLETED' || state.status === 'FAILED';

  const formattedHour = state.currentHour.toString().padStart(2, '0');
  const isProfitPositive = state.business.profit >= 0;

  // Timeline progress percentage (maxDays * 24 hours)
  const maxHours = (state.objectives.maxDays || 7) * (state.ticksPerDay || 24);
  const currentHourElapsed = (state.currentDay - 1) * 24 + state.currentHour;
  const progressPercent = Math.min(100, Math.round((currentHourElapsed / maxHours) * 100));

  return (
    <>
      <header className="w-full bg-[#101722]/95 backdrop-blur-md border-b border-[#263447] px-4 lg:px-6 py-2.5 flex items-center justify-between z-30 select-none shadow-card-industrial">
        {/* Left: Brand Identity & Scenario Identifier */}
        <div className="flex items-center space-x-3.5">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2.5 text-[#9AA9BB] hover:text-[#28D7F2] transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#28D7F2] to-[#9875FF] flex items-center justify-center font-black text-[#080B12] text-xs shadow-glow-cyan group-hover:scale-105 transition-transform">
              CP
            </div>
            <div className="hidden md:flex flex-col">
              <span className="font-extrabold text-[#F3F7FC] text-xs tracking-tight leading-none">
                CAREER SIM
              </span>
              <span className="text-[9px] font-mono text-[#28D7F2] tracking-wider mt-0.5">
                EXECUTIVE SUITE
              </span>
            </div>
          </Link>

          <div className="h-5 w-px bg-[#263447] hidden md:block" />

          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#28D7F2]/10 border border-[#28D7F2]/30 text-[#28D7F2] font-mono font-bold text-xs tracking-wide">
              {state.scenarioName}
            </span>
            <span className="text-[10px] text-[#627387] font-mono hidden sm:inline">
              v{state.scenarioVersion}
            </span>
          </div>
        </div>

        {/* Center: Real-Time Simulation Clock & Timeline Progress */}
        <div className="flex items-center space-x-4 lg:space-x-8">
          {/* Main Simulation Clock Widget with Progress Indicator */}
          <div className="flex items-center space-x-3 bg-[#080B12] border border-[#263447] px-3.5 py-1.5 rounded-xl shadow-inner">
            <Clock
              className={`w-4 h-4 ${
                isRunning ? 'text-[#28D7F2] animate-spin' : 'text-[#627387]'
              }`}
              style={{ animationDuration: isRunning ? '6s' : undefined }}
            />
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-1.5 font-mono">
                <span className="text-[10px] text-[#9AA9BB] uppercase">Day</span>
                <span className="text-sm font-bold text-[#F3F7FC]">{state.currentDay}</span>
                <span className="text-[#627387] text-xs">/ {state.objectives.maxDays}</span>
                <span className="text-xs text-[#28D7F2] font-bold ml-1.5">
                  {formattedHour}:00
                </span>
              </div>
              {/* Mini Timeline Progress Bar */}
              <div className="w-24 bg-[#151F2D] rounded-full h-1 mt-1 overflow-hidden">
                <div
                  className="bg-[#28D7F2] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cash Gauge */}
          <div className="flex items-center space-x-2 bg-[#080B12] border border-[#263447] px-3.5 py-1.5 rounded-xl">
            <DollarSign className="w-4 h-4 text-[#39E58C]" />
            <div className="flex flex-col">
              <span className="text-[9px] text-[#9AA9BB] uppercase font-mono tracking-wider">
                Liquid Cash
              </span>
              <span className="text-sm font-bold font-mono text-[#39E58C] leading-tight">
                ${Math.round(state.business.cash).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Net Profit Gauge */}
          <div className="hidden lg:flex items-center space-x-2 bg-[#080B12] border border-[#263447] px-3.5 py-1.5 rounded-xl">
            <TrendingUp
              className={`w-4 h-4 ${
                isProfitPositive ? 'text-[#39E58C]' : 'text-[#FF5F6D]'
              }`}
            />
            <div className="flex flex-col">
              <span className="text-[9px] text-[#9AA9BB] uppercase font-mono tracking-wider">
                Net Operating Profit
              </span>
              <span
                className={`text-sm font-bold font-mono leading-tight ${
                  isProfitPositive ? 'text-[#39E58C]' : 'text-[#FF5F6D]'
                }`}
              >
                ${Math.round(state.business.profit).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Simulation Controls (Speed, Start, Pause, Resume, Restart) */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Speed Multipliers */}
          <div className="flex items-center bg-[#080B12] border border-[#263447] rounded-lg p-0.5">
            {[1, 2, 5].map(spd => (
              <button
                key={spd}
                onClick={() => onSetSpeed(spd)}
                disabled={isTerminated}
                className={`px-2 py-1 text-xs font-mono font-bold rounded transition-colors ${
                  state.speed === spd
                    ? 'bg-[#28D7F2] text-[#080B12] shadow-sm'
                    : 'text-[#9AA9BB] hover:text-[#F3F7FC] disabled:opacity-30'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Primary Action Button */}
          {!isTerminated ? (
            isRunning ? (
              <button
                onClick={onPause}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#FFB547]/15 hover:bg-[#FFB547]/25 text-[#FFB547] border border-[#FFB547]/40 text-xs font-bold transition-all shadow-sm"
              >
                <Pause className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pause</span>
              </button>
            ) : (
              <button
                onClick={isPaused ? onResume : onStart}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#28D7F2] hover:bg-[#28D7F2]/90 text-[#080B12] font-black text-xs transition-all shadow-glow-cyan"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isPaused ? 'Resume Shift' : 'Start Simulation'}</span>
              </button>
            )
          ) : (
            <Link
              href="/simulation/results"
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#39E58C] hover:bg-[#39E58C]/90 text-[#080B12] font-black text-xs transition-all shadow-glow-green"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Review Performance</span>
            </Link>
          )}

          {/* Restart Button with Modal Guard */}
          <button
            onClick={() => setShowRestartConfirm(true)}
            title="Restart Scenario"
            className="p-1.5 rounded-lg text-[#9AA9BB] hover:text-[#F3F7FC] hover:bg-[#151F2D] transition-colors border border-transparent hover:border-[#263447]"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Restart Confirmation Modal */}
      {showRestartConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#151F2D] border border-[#263447] rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-[#FFB547]/15 text-[#FFB547] flex items-center justify-center mx-auto border border-[#FFB547]/30">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-[#F3F7FC]">Restart Simulation Shift?</h3>
              <p className="text-xs text-[#9AA9BB] mt-1.5 leading-relaxed">
                This will re-initialize the factory floor, resetting treasury cash, machinery, and decision history to Day 1.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowRestartConfirm(false)}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold text-[#9AA9BB] bg-[#1B2838] hover:bg-[#263447] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRestartConfirm(false);
                  onRestart();
                }}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#FF5F6D] hover:bg-[#FF5F6D]/90 transition-colors shadow-glow-coral"
              >
                Confirm Reset
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

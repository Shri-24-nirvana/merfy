'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Clock,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Award,
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

  return (
    <>
      <header className="w-full bg-surface/95 backdrop-blur-md border-b border-slate-800 px-4 lg:px-6 py-2.5 flex items-center justify-between z-30 select-none shadow-md">
        {/* Left: Brand & Scenario Info */}
        <div className="flex items-center space-x-3">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 text-slate-400 hover:text-sky-400 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center font-bold text-sky-400 text-xs shadow-inner">
              CP
            </div>
            <span className="font-bold text-slate-100 hidden md:inline text-sm">
              Career Sim
            </span>
          </Link>

          <div className="h-5 w-px bg-slate-800 hidden md:block" />

          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-950/60 border border-sky-600/40 text-sky-300 font-medium text-xs">
              {state.scenarioName}
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              v{state.scenarioVersion}
            </span>
          </div>
        </div>

        {/* Center: Live Clock & Financial Counters */}
        <div className="flex items-center space-x-4 lg:space-x-8">
          {/* Clock Widget */}
          <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-700/80 px-3.5 py-1.5 rounded-xl">
            <Clock
              className={`w-4 h-4 ${
                isRunning ? 'text-sky-400 animate-spin' : 'text-slate-400'
              }`}
              style={{ animationDuration: isRunning ? '6s' : undefined }}
            />
            <div className="flex items-baseline space-x-1.5 font-mono">
              <span className="text-xs text-slate-400">Day</span>
              <span className="text-sm font-bold text-slate-100">{state.currentDay}</span>
              <span className="text-slate-500">/ {state.objectives.maxDays}</span>
              <span className="text-xs text-sky-400 font-semibold ml-1">
                {formattedHour}:00
              </span>
            </div>
          </div>

          {/* Cash Gauge */}
          <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-700/80 px-3.5 py-1.5 rounded-xl">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 leading-none">Available Cash</span>
              <span className="text-sm font-bold font-mono text-emerald-400 leading-tight">
                ${Math.round(state.business.cash).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Net Profit Gauge (Hidden on mobile) */}
          <div className="hidden lg:flex items-center space-x-2 bg-slate-900/90 border border-slate-700/80 px-3.5 py-1.5 rounded-xl">
            <TrendingUp
              className={`w-4 h-4 ${
                isProfitPositive ? 'text-emerald-400' : 'text-red-400'
              }`}
            />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 leading-none">Net Profit</span>
              <span
                className={`text-sm font-bold font-mono leading-tight ${
                  isProfitPositive ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                ${Math.round(state.business.profit).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Simulation Controls (Play, Pause, Speed, Restart, Finish) */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Speed Selectors */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-lg p-0.5">
            {[1, 2, 5].map(spd => (
              <button
                key={spd}
                onClick={() => onSetSpeed(spd)}
                disabled={isTerminated}
                className={`px-2 py-1 text-xs font-mono font-bold rounded transition-colors ${
                  state.speed === spd
                    ? 'bg-sky-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 disabled:opacity-30'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Play / Pause Toggle */}
          {!isTerminated ? (
            isRunning ? (
              <button
                onClick={onPause}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all shadow-sm"
              >
                <Pause className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pause</span>
              </button>
            ) : (
              <button
                onClick={isPaused ? onResume : onStart}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-sky-500/20"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isPaused ? 'Resume' : 'Start'}</span>
              </button>
            )
          ) : (
            <Link
              href="/simulation/results"
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20"
            >
              <Award className="w-3.5 h-3.5" />
              <span>View Results</span>
            </Link>
          )}

          {/* Restart Button with Modal Guard */}
          <button
            onClick={() => setShowRestartConfirm(true)}
            title="Restart Simulation"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Restart Confirmation Modal */}
      {showRestartConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-100">Restart Simulation?</h3>
              <p className="text-xs text-slate-400 mt-1">
                This will reset your factory, cash, production lines, and decision history to initial Day 1 state.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowRestartConfirm(false)}
                className="py-2 px-4 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRestartConfirm(false);
                  onRestart();
                }}
                className="py-2 px-4 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-500 transition-colors"
              >
                Confirm Restart
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

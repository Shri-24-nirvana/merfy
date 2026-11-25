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
  ChevronRight,
  Zap,
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

  const maxHours = (state.objectives.maxDays || 7) * (state.ticksPerDay || 24);
  const currentHourElapsed = (state.currentDay - 1) * 24 + state.currentHour;
  const progressPercent = Math.min(100, Math.round((currentHourElapsed / maxHours) * 100));

  return (
    <>
      <header className="w-full bg-white border-b-2 border-indigo-100 px-4 lg:px-6 py-2.5 flex items-center justify-between z-30 select-none shadow-sm">
        {/* Left: Brand + Scenario */}
        <div className="flex items-center space-x-3.5">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2.5 text-slate-500 hover:text-indigo-600 transition-colors group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-black text-white text-xs shadow-md group-hover:scale-105 transition-transform">
              CS
            </div>
            <div className="hidden md:flex flex-col">
              <span className="font-extrabold text-slate-800 text-xs tracking-tight leading-none">
                CAREER SIM
              </span>
              <span className="text-[9px] font-mono text-indigo-500 tracking-wider mt-0.5">
                MANAGEMENT SUITE
              </span>
            </div>
          </Link>

          <div className="h-5 w-px bg-slate-200 hidden md:block" />

          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono font-bold text-xs tracking-wide">
              {state.scenarioName}
            </span>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
              v{state.scenarioVersion}
            </span>
          </div>
        </div>

        {/* Center: Clock + Progress + Cash */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          {/* Clock widget */}
          <div className="flex items-center space-x-2.5 bg-indigo-50 border border-indigo-200 px-3.5 py-1.5 rounded-xl shadow-inner">
            <Clock
              className={`w-4 h-4 ${isRunning ? 'text-indigo-500 animate-spin' : 'text-slate-400'}`}
              style={{ animationDuration: isRunning ? '6s' : undefined }}
            />
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-1.5 font-mono">
                <span className="text-[10px] text-slate-500 uppercase">Day</span>
                <span className="text-sm font-bold text-slate-800">{state.currentDay}</span>
                <span className="text-slate-400 text-xs">/ {state.objectives.maxDays}</span>
                <span className="text-xs text-indigo-600 font-bold ml-1.5">
                  {formattedHour}:00
                </span>
              </div>
              <div className="w-24 bg-indigo-100 rounded-full h-1.5 mt-1 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cash badge */}
          <div className="hidden sm:flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-slate-500 uppercase">Cash</span>
              <span className="text-sm font-bold font-mono text-emerald-700 leading-tight">
                ${Math.round(state.business.cash).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Profit badge */}
          <div className={`hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl border ${isProfitPositive ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
            <TrendingUp className={`w-3.5 h-3.5 ${isProfitPositive ? 'text-emerald-600' : 'text-red-500'}`} />
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-slate-500 uppercase">Profit</span>
              <span className={`text-sm font-bold font-mono leading-tight ${isProfitPositive ? 'text-emerald-700' : 'text-red-600'}`}>
                ${Math.round(state.business.profit).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Speed pills */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-0.5">
            {[1, 2, 5].map(spd => (
              <button
                key={spd}
                onClick={() => onSetSpeed(spd)}
                disabled={isTerminated}
                className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-colors ${
                  state.speed === spd
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 disabled:opacity-30'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Primary action */}
          {!isTerminated ? (
            isRunning ? (
              <button
                onClick={onPause}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold transition-all shadow-sm"
              >
                <Pause className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pause</span>
              </button>
            ) : (
              <button
                onClick={isPaused ? onResume : onStart}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-black text-xs transition-all shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isPaused ? 'Resume' : 'Start Simulation'}</span>
              </button>
            )
          ) : (
            <Link
              href="/simulation/results"
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs transition-all shadow-md"
            >
              <Award className="w-3.5 h-3.5" />
              <span>View Results</span>
            </Link>
          )}

          {/* Restart */}
          <button
            onClick={() => setShowRestartConfirm(true)}
            title="Restart Scenario"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Restart Confirmation Modal */}
      {showRestartConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-2 border-slate-200 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto border-2 border-amber-200">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-800">Restart Simulation?</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                This will re-initialize the factory floor, resetting treasury cash, machinery, and decision history to Day 1.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowRestartConfirm(false)}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRestartConfirm(false);
                  onRestart();
                }}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 transition-colors shadow-md"
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

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppNavbar } from '@/components/shared/AppNavbar';
import {
  Compass,
  Play,
  Award,
  Layers,
  Clock,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Lock,
  Sparkles,
  Filter,
} from 'lucide-react';
import { SCENARIO_CATALOG } from '@/scenarios/registry';

export default function StudentDashboardPage() {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

  const domains = [
    'All',
    'Manufacturing',
    'Retail',
    'Marketing',
    'Human Resources',
    'Finance',
    'Logistics',
    'Hospitality',
    'Operations',
    'Sales',
  ];

  const filteredScenarios = selectedDomain === 'All'
    ? SCENARIO_CATALOG
    : SCENARIO_CATALOG.filter(s => s.domain === selectedDomain);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Banner & Student Progression Overview */}
        <div className="bg-gradient-to-r from-surface to-surface-secondary border border-slate-700/80 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Operations & Executive Leadership Track</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              Welcome back, Student Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Step into high-stakes operational roles. Your decisions directly drive plant throughput,
              inventory balance sheets, and real-time enterprise solvency.
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex-1 lg:w-36 text-center">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Level</div>
              <div className="text-xl font-bold font-mono text-sky-400 mt-0.5">Associate</div>
              <div className="text-[10px] text-slate-500">Tier 1 Track</div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex-1 lg:w-36 text-center">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Scenarios</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">1 Ready</div>
              <div className="text-[10px] text-slate-500">8 In Pipeline</div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex-1 lg:w-36 text-center">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Target Rank</div>
              <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">Ops Mgr</div>
              <div className="text-[10px] text-slate-500">B-School Core</div>
            </div>
          </div>
        </div>

        {/* Domain Filter Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Management Simulation Library</h2>
              <p className="text-xs text-slate-400">
                Choose a business domain to test strategic and operational decision-making.
              </p>
            </div>
          </div>

          {/* Horizontal scroll domain pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {domains.map(d => (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDomain === d
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                    : 'bg-surface hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Simulation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenarios.map(scenario => {
            const isPlayable = scenario.status === 'PLAYABLE';

            return (
              <div
                key={scenario.id}
                className={`bg-surface border rounded-2xl p-6 flex flex-col justify-between transition-all relative overflow-hidden group ${
                  isPlayable
                    ? 'border-slate-700 hover:border-sky-500/60 hover:shadow-xl hover:shadow-sky-500/5'
                    : 'border-slate-800/80 opacity-80'
                }`}
              >
                {/* Top Tags */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                      {scenario.domain}
                    </span>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        scenario.difficulty === 'Easy'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : scenario.difficulty === 'Medium'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-purple-950 text-purple-400 border border-purple-800'
                      }`}
                    >
                      {scenario.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                    {scenario.name}
                  </h3>

                  <div className="text-xs text-sky-400 font-medium mt-0.5">
                    Role: {scenario.role}
                  </div>

                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed line-clamp-3">
                    {scenario.description}
                  </p>
                </div>

                {/* Card Meta & CTA */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-slate-500" />
                      {scenario.duration}
                    </span>
                    <span className="text-slate-300 font-semibold">{scenario.keyMetric}</span>
                  </div>

                  {isPlayable ? (
                    <Link
                      href={`/scenarios/${scenario.id}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-sky-500/20"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Simulation</span>
                    </Link>
                  ) : (
                    <div className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 font-medium text-xs flex items-center justify-center space-x-1.5 cursor-not-allowed">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Future Scenario Track</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

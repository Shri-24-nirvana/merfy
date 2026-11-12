'use client';

import React from 'react';
import Link from 'next/link';
import { AppNavbar } from '@/components/shared/AppNavbar';
import {
  Play,
  ArrowLeft,
  Briefcase,
  DollarSign,
  Gauge,
  Calendar,
  Layers,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Target,
  Compass,
} from 'lucide-react';
import { ApexBeveragesScenario } from '@/scenarios/definitions/apex-beverages';

export default function ScenarioBriefingPage() {
  const scenario = ApexBeveragesScenario;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Simulation Library</span>
          </Link>

          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
            Scenario ID: {scenario.id} • v{scenario.version}
          </span>
        </div>

        {/* Hero Briefing Card */}
        <div className="bg-gradient-to-br from-surface via-surface-secondary to-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              {scenario.domain}
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold">
              Difficulty: {scenario.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono">
              7 Virtual Days (168 Ticks)
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
              {scenario.name}
            </h1>
            <div className="flex items-center space-x-2 text-sm text-sky-400 font-semibold">
              <Briefcase className="w-4 h-4" />
              <span>Assigned Executive Role: {scenario.role}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-2">
              {scenario.description}
            </p>
          </div>

          {/* Key Initial Baseline Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Starting Capital</span>
              </div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                ${scenario.initialBusiness.startingCash.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Initial Treasury</div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                <Gauge className="w-3.5 h-3.5 text-sky-400" />
                <span>Base Capacity</span>
              </div>
              <div className="text-xl font-bold font-mono text-sky-400 mt-1">
                {scenario.productionParams.baseProductionCapacity}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">bottles / day (1 line)</div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Raw Inventory</span>
              </div>
              <div className="text-xl font-bold font-mono text-indigo-300 mt-1">
                {scenario.inventoryParams.initialRawMaterials.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">preform units on hand</div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                <span>Anchor Contract</span>
              </div>
              <div className="text-xl font-bold font-mono text-amber-400 mt-1">
                5,000 units
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Due by Day 5 ($60k)</div>
            </div>
          </div>
        </div>

        {/* Detailed Situation & Strategic Paths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Situation Narrative */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-surface border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
                <Compass className="w-4 h-4 text-sky-400" />
                <span>The Operating Situation</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {scenario.overview}
              </p>

              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="font-semibold text-slate-200">Key Operating Constraints & Cost Rules:</div>
                <ul className="space-y-1.5 text-slate-400 list-disc list-inside">
                  <li>Additional bottling line machine cost: <strong className="text-slate-200">$20,000 CapEx</strong> (+200 bottles/day output).</li>
                  <li>Variable production cost: <strong className="text-slate-200">$1.50 per bottle produced</strong> (energy, labor, water).</li>
                  <li>Raw materials replenishment: <strong className="text-slate-200">$2.00 per unit</strong> (reorder before safety stock depletes).</li>
                  <li>Facility overhead: <strong className="text-slate-200">$200 per day</strong> + $50/day per active machine maintenance.</li>
                  <li>Bankruptcy condition: Cash falling below <strong className="text-red-400">-$10,000</strong> triggers insolvency.</li>
                </ul>
              </div>
            </div>

            {/* Strategic Pathways */}
            <div className="bg-surface border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Available Strategic Pathways</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {scenario.strategicPaths.map((path, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-sky-300">{path.name}</div>
                      <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                        {path.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500">
                      Focus: {path.focus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Learning Objectives & Launch Action */}
          <div className="space-y-6">
            <div className="bg-surface border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Learning Objectives</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {scenario.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-sky-400 font-bold">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ready to launch box */}
            <div className="bg-gradient-to-b from-sky-950/40 to-slate-900 border border-sky-500/30 rounded-2xl p-6 text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto border border-sky-500/40">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-100">Ready to Take the Shift?</h4>
                <p className="text-xs text-slate-400 mt-1">
                  The simulation will advance automatically. Maintain cash flow, calibrate equipment, and fulfill contracts.
                </p>
              </div>

              <Link
                href="/simulation/apex-beverages"
                className="w-full py-3.5 px-6 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-sky-500/25 hover:scale-102"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Enter Live Simulation</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

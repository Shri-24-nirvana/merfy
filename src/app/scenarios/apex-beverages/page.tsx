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
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { ApexBeveragesScenario } from '@/scenarios/definitions/apex-beverages';

export default function ScenarioBriefingPage() {
  const scenario = ApexBeveragesScenario;

  return (
    <div className="min-h-screen flex flex-col bg-[#080B12] text-[#F3F7FC]">
      <AppNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-[#9AA9BB] hover:text-[#28D7F2] transition-colors font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Command Deck</span>
          </Link>

          <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#101722] border border-[#263447] text-[#9AA9BB]">
            MISSION PROTOCOL #{scenario.id.toUpperCase()} • V{scenario.version}
          </span>
        </div>

        {/* Futuristic Mission Briefing Hero Card */}
        <div className="bg-gradient-to-br from-[#101722] via-[#151F2D] to-[#1B2838] border border-[#28D7F2]/40 rounded-3xl p-6 sm:p-10 shadow-glow-cyan space-y-6 relative overflow-hidden">
          {/* Subtle Industrial Grid */}
          <div className="absolute inset-0 industrial-grid-dense opacity-20 pointer-events-none" />

          <div className="flex flex-wrap items-center gap-3 relative z-10">
            <span className="px-3 py-1 rounded-full bg-[#39E58C]/15 border border-[#39E58C]/30 text-[#39E58C] text-xs font-mono font-black uppercase tracking-wider">
              {scenario.domain} Domain
            </span>
            <span className="px-3 py-1 rounded-full bg-[#28D7F2]/15 border border-[#28D7F2]/30 text-[#28D7F2] text-xs font-mono font-bold">
              Difficulty: {scenario.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#080B12] border border-[#263447] text-[#9AA9BB] text-xs font-mono">
              7 Virtual Days (168 Ticks)
            </span>
          </div>

          <div className="space-y-2 relative z-10">
            <h1 className="text-3xl sm:text-5xl font-black text-[#F3F7FC] tracking-tight">
              Mission Briefing: {scenario.name}
            </h1>
            <div className="flex items-center space-x-2 text-sm text-[#28D7F2] font-mono font-bold">
              <Briefcase className="w-4 h-4" />
              <span>Assigned Executive Role: Factory Manager ({scenario.role})</span>
            </div>
            <p className="text-sm sm:text-base text-[#9AA9BB] leading-relaxed pt-2">
              {scenario.description}
            </p>
          </div>

          {/* Key Initial Baseline Telemetry */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#263447] relative z-10">
            <div className="bg-[#080B12]/80 border border-[#263447] rounded-2xl p-4 shadow-card-industrial">
              <div className="text-[10px] text-[#9AA9BB] uppercase tracking-wider font-mono flex items-center space-x-1">
                <DollarSign className="w-3.5 h-3.5 text-[#39E58C]" />
                <span>Treasury Capital</span>
              </div>
              <div className="text-xl font-black font-mono text-[#39E58C] mt-1">
                ${scenario.initialBusiness.startingCash.toLocaleString()}
              </div>
              <div className="text-[10px] text-[#627387] font-mono mt-0.5">Initial Liquid Cash</div>
            </div>

            <div className="bg-[#080B12]/80 border border-[#263447] rounded-2xl p-4 shadow-card-industrial">
              <div className="text-[10px] text-[#9AA9BB] uppercase tracking-wider font-mono flex items-center space-x-1">
                <Gauge className="w-3.5 h-3.5 text-[#28D7F2]" />
                <span>Base Capacity</span>
              </div>
              <div className="text-xl font-black font-mono text-[#28D7F2] mt-1">
                {scenario.productionParams.baseProductionCapacity}
              </div>
              <div className="text-[10px] text-[#627387] font-mono mt-0.5">bottles/day (1 Line)</div>
            </div>

            <div className="bg-[#080B12]/80 border border-[#263447] rounded-2xl p-4 shadow-card-industrial">
              <div className="text-[10px] text-[#9AA9BB] uppercase tracking-wider font-mono flex items-center space-x-1">
                <Layers className="w-3.5 h-3.5 text-[#9875FF]" />
                <span>Raw Inventory</span>
              </div>
              <div className="text-xl font-black font-mono text-[#9875FF] mt-1">
                {scenario.inventoryParams.initialRawMaterials.toLocaleString()}
              </div>
              <div className="text-[10px] text-[#627387] font-mono mt-0.5">preform units on hand</div>
            </div>

            <div className="bg-[#080B12]/80 border border-[#263447] rounded-2xl p-4 shadow-card-industrial">
              <div className="text-[10px] text-[#9AA9BB] uppercase tracking-wider font-mono flex items-center space-x-1">
                <Target className="w-3.5 h-3.5 text-[#FFB547]" />
                <span>Anchor Contract</span>
              </div>
              <div className="text-xl font-black font-mono text-[#FFB547] mt-1">
                5,000 units
              </div>
              <div className="text-[10px] text-[#627387] font-mono mt-0.5">Due Day 5 ($60,000)</div>
            </div>
          </div>
        </div>

        {/* Detailed Operational Situation & Strategic Paths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#151F2D] border border-[#263447] rounded-2xl p-6 space-y-4 shadow-card-industrial">
              <h3 className="text-base font-bold text-[#F3F7FC] flex items-center space-x-2 font-mono">
                <Compass className="w-4 h-4 text-[#28D7F2]" />
                <span>Operational Context & Scenario Narrative</span>
              </h3>
              <p className="text-xs text-[#9AA9BB] leading-relaxed">
                {scenario.overview}
              </p>

              <div className="bg-[#080B12] rounded-xl p-4 border border-[#263447] text-xs space-y-2 font-mono">
                <div className="font-bold text-[#F3F7FC] text-xs">Financial Rules & Constraints:</div>
                <ul className="space-y-1.5 text-[#9AA9BB] list-disc list-inside">
                  <li>Additional machine purchase: <strong className="text-[#F3F7FC]">$20,000 CapEx</strong> (+200 bottles/day output).</li>
                  <li>Variable bottling cost: <strong className="text-[#F3F7FC]">$1.50 per bottle produced</strong> (energy, labor, bottling).</li>
                  <li>Raw materials replenishment: <strong className="text-[#F3F7FC]">$2.00 per unit</strong> (reorder before stock drops to 0).</li>
                  <li>Plant overhead: <strong className="text-[#F3F7FC]">$200 per day</strong> + $50/day per active line maintenance.</li>
                  <li>Solvency condition: Cash falling below <strong className="text-[#FF5F6D]">-$10,000</strong> triggers plant liquidation.</li>
                </ul>
              </div>
            </div>

            {/* Strategic Pathways */}
            <div className="bg-[#151F2D] border border-[#263447] rounded-2xl p-6 space-y-4 shadow-card-industrial">
              <h3 className="text-base font-bold text-[#F3F7FC] flex items-center space-x-2 font-mono">
                <TrendingUp className="w-4 h-4 text-[#39E58C]" />
                <span>Available Strategic Pathways</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {scenario.strategicPaths.map((path, idx) => (
                  <div
                    key={idx}
                    className="bg-[#101722] border border-[#263447] rounded-xl p-3.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#28D7F2] font-mono">{path.name}</div>
                      <p className="text-[11px] text-[#9AA9BB] mt-1.5 leading-relaxed">
                        {path.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#263447] text-[10px] font-mono text-[#627387]">
                      Focus: {path.focus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Objectives & Start Simulation CTA */}
          <div className="space-y-6">
            <div className="bg-[#151F2D] border border-[#263447] rounded-2xl p-6 space-y-4 shadow-card-industrial">
              <h3 className="text-base font-bold text-[#F3F7FC] flex items-center space-x-2 font-mono">
                <CheckCircle2 className="w-4 h-4 text-[#39E58C]" />
                <span>Executive Objectives</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-[#9AA9BB]">
                {scenario.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-[#28D7F2] font-bold">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Launch Box */}
            <div className="bg-gradient-to-b from-[#151F2D] to-[#101722] border border-[#28D7F2]/40 rounded-2xl p-6 text-center space-y-4 shadow-glow-cyan">
              <div className="w-12 h-12 rounded-2xl bg-[#28D7F2]/20 text-[#28D7F2] flex items-center justify-center mx-auto border border-[#28D7F2]/40">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#F3F7FC]">Ready to Enter the Plant?</h4>
                <p className="text-xs text-[#9AA9BB] mt-1">
                  The manufacturing suite runs in continuous hourly cycles. Monitor cash, balance inventory, and fulfill contracts.
                </p>
              </div>

              <Link
                href="/simulation/apex-beverages"
                className="w-full py-3.5 px-6 rounded-xl bg-[#28D7F2] hover:bg-[#28D7F2]/90 text-[#080B12] font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-glow-cyan hover:scale-105"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>START SIMULATION</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

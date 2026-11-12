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
  Zap,
  Target,
  Shield,
  Activity,
  Flame,
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

  const featuredScenario = SCENARIO_CATALOG.find(s => s.id === 'apex-beverages')!;

  return (
    <div className="min-h-screen flex flex-col bg-[#080B12] text-[#F3F7FC]">
      <AppNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Futuristic Command Center Welcome Banner */}
        <div className="relative bg-gradient-to-r from-[#101722] via-[#151F2D] to-[#1B2838] border border-[#263447] rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 overflow-hidden shadow-2xl">
          {/* Ambient Lighting Orbs */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#28D7F2]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#9875FF]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-2.5 max-w-2xl relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#28D7F2]/10 border border-[#28D7F2]/30 text-[#28D7F2] text-xs font-mono font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SIMULATION COMMAND CENTER • TIER 1 MANAGEMENT</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#F3F7FC] tracking-tight">
              Executive Flight Deck
            </h1>
            <p className="text-xs sm:text-sm text-[#9AA9BB] leading-relaxed max-w-xl">
              Experience the realities of business leadership. Balance plant throughput, manage working capital, evaluate machinery CapEx, and deliver real customer commitments.
            </p>
          </div>

          {/* Live Command Center Telemetry Modules */}
          <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto relative z-10">
            <div className="bg-[#080B12]/80 border border-[#263447] rounded-2xl p-4 flex-1 lg:w-36 text-center shadow-card-industrial">
              <div className="text-[10px] text-[#9AA9BB] uppercase tracking-wider font-mono">Rank Level</div>
              <div className="text-lg font-black font-mono text-[#28D7F2] mt-0.5">Associate</div>
              <div className="text-[10px] text-[#627387] font-mono">Operations Track</div>
            </div>

            <div className="bg-[#080B12]/80 border border-[#263447] rounded-2xl p-4 flex-1 lg:w-36 text-center shadow-card-industrial">
              <div className="text-[10px] text-[#9AA9BB] uppercase tracking-wider font-mono">Catalog</div>
              <div className="text-lg font-black font-mono text-[#39E58C] mt-0.5">1 Active</div>
              <div className="text-[10px] text-[#627387] font-mono">8 In Pipeline</div>
            </div>

            <div className="bg-[#080B12]/80 border border-[#263447] rounded-2xl p-4 flex-1 lg:w-36 text-center shadow-card-industrial">
              <div className="text-[10px] text-[#9AA9BB] uppercase tracking-wider font-mono">Readiness</div>
              <div className="text-lg font-black font-mono text-[#FFB547] mt-0.5">Certified</div>
              <div className="text-[10px] text-[#627387] font-mono">B-School Core</div>
            </div>
          </div>
        </div>

        {/* Featured Scenario Hero Highlight (Apex Beverages) */}
        <div className="bg-gradient-to-br from-[#151F2D] via-[#1B2838] to-[#101722] border border-[#28D7F2]/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-glow-cyan relative overflow-hidden">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 rounded-full bg-[#39E58C]/15 border border-[#39E58C]/30 text-[#39E58C] text-xs font-mono font-bold uppercase tracking-wider">
                ★ FEATURED PLAYABLE SCENARIO
              </span>
              <span className="text-xs font-mono text-[#9AA9BB]">Manufacturing Domain</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#F3F7FC]">
              {featuredScenario.name}
            </h2>

            <p className="text-xs sm:text-sm text-[#9AA9BB] leading-relaxed">
              Take command of a high-speed beverage bottling plant. Deploy capital to expand from 800 to 1,200 bottles/day, balance raw preforms, and deliver anchor client contracts on strict deadlines.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#9AA9BB] pt-1">
              <span>Capital: <strong className="text-[#39E58C]">$100,000</strong></span>
              <span>•</span>
              <span>Output: <strong className="text-[#28D7F2]">800 b/d</strong></span>
              <span>•</span>
              <span>Duration: <strong className="text-[#FFB547]">7 Virtual Days</strong></span>
            </div>
          </div>

          <div>
            <Link
              href="/scenarios/apex-beverages"
              className="px-6 py-3.5 rounded-xl bg-[#28D7F2] hover:bg-[#28D7F2]/90 text-[#080B12] font-black text-xs flex items-center space-x-2 transition-all shadow-glow-cyan hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Mission Briefing</span>
            </Link>
          </div>
        </div>

        {/* Domain Filter Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#F3F7FC] font-mono">Scenario Catalog by Domain</h3>
              <p className="text-xs text-[#9AA9BB]">
                Filter business simulations across commercial and operational disciplines.
              </p>
            </div>
          </div>

          {/* Domain Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {domains.map(d => (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all font-mono ${
                  selectedDomain === d
                    ? 'bg-[#28D7F2] text-[#080B12] font-black shadow-glow-cyan'
                    : 'bg-[#151F2D] hover:bg-[#1B2838] text-[#9AA9BB] hover:text-[#F3F7FC] border border-[#263447]'
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
                className={`bg-[#151F2D] border rounded-2xl p-6 flex flex-col justify-between transition-all relative overflow-hidden group shadow-card-industrial ${
                  isPlayable
                    ? 'border-[#28D7F2]/40 hover:border-[#28D7F2] hover:shadow-glow-cyan'
                    : 'border-[#263447] opacity-80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#080B12] border border-[#263447] text-[#9AA9BB]">
                      {scenario.domain}
                    </span>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md font-mono ${
                        scenario.difficulty === 'Easy'
                          ? 'bg-[#39E58C]/15 text-[#39E58C] border border-[#39E58C]/30'
                          : scenario.difficulty === 'Medium'
                          ? 'bg-[#FFB547]/15 text-[#FFB547] border border-[#FFB547]/30'
                          : 'bg-[#9875FF]/15 text-[#9875FF] border border-[#9875FF]/30'
                      }`}
                    >
                      {scenario.difficulty}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-[#F3F7FC] group-hover:text-[#28D7F2] transition-colors">
                    {scenario.name}
                  </h4>

                  <div className="text-xs text-[#28D7F2] font-semibold mt-0.5 font-mono">
                    Role: {scenario.role}
                  </div>

                  <p className="text-xs text-[#9AA9BB] mt-2.5 leading-relaxed line-clamp-3">
                    {scenario.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#263447] space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#9AA9BB] font-mono">
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-[#627387]" />
                      {scenario.duration}
                    </span>
                    <span className="text-[#F3F7FC] font-semibold">{scenario.keyMetric}</span>
                  </div>

                  {isPlayable ? (
                    <Link
                      href={`/scenarios/${scenario.id}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#28D7F2] hover:bg-[#28D7F2]/90 text-[#080B12] font-black text-xs flex items-center justify-center space-x-2 transition-all shadow-glow-cyan"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Simulation</span>
                    </Link>
                  ) : (
                    <div className="w-full py-2.5 px-4 rounded-xl bg-[#080B12] border border-[#263447] text-[#627387] font-semibold text-xs flex items-center justify-center space-x-1.5 cursor-not-allowed font-mono">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Coming Soon • Pipeline</span>
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

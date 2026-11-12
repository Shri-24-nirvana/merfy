import React from 'react';
import Link from 'next/link';
import { AppNavbar } from '@/components/shared/AppNavbar';
import {
  Play,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Award,
  CheckCircle2,
  Users,
  Compass,
  Building2,
  Sparkles,
  Zap,
  Gauge,
  Activity,
} from 'lucide-react';
import { SCENARIO_CATALOG } from '@/scenarios/registry';

export default function LandingPage() {
  const playableScenario = SCENARIO_CATALOG.find(s => s.id === 'apex-beverages')!;

  return (
    <div className="min-h-screen flex flex-col bg-[#080B12] text-[#F3F7FC] selection:bg-[#28D7F2] selection:text-[#080B12]">
      <AppNavbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center text-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-[#28D7F2]/15 to-[#9875FF]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#101722] border border-[#263447] text-[#28D7F2] text-xs font-mono font-bold mb-6 shadow-glow-cyan">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FUTURISTIC INDUSTRIAL MANAGEMENT SIMULATOR • V1.0</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#F3F7FC] tracking-tight max-w-4xl leading-tight sm:leading-none">
          Stop answering test questions.{' '}
          <span className="bg-gradient-to-r from-[#28D7F2] via-[#9875FF] to-[#39E58C] bg-clip-text text-transparent">
            Take command of the plant.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-[#9AA9BB] max-w-2xl leading-relaxed">
          An immersive, game-like business simulation where management and commerce students operate virtual manufacturing lines, balance working capital, make CapEx decisions, and experience real-time financial consequences.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/scenarios/apex-beverages"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#28D7F2] hover:bg-[#28D7F2]/90 text-[#080B12] font-black text-sm flex items-center justify-center space-x-2 shadow-glow-cyan transition-all hover:scale-105"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Apex Beverages Simulation</span>
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#151F2D] hover:bg-[#1B2838] text-[#F3F7FC] border border-[#263447] font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-card-industrial"
          >
            <Compass className="w-4 h-4" />
            <span>Enter Command Deck</span>
          </Link>
        </div>

        {/* Target Audience Tags */}
        <div className="mt-12 pt-8 border-t border-[#263447] flex flex-wrap items-center justify-center gap-3 text-xs text-[#9AA9BB] font-mono">
          <span className="font-bold text-[#F3F7FC]">Targeted For:</span>
          {['B-School MBA Students', 'Operations & Supply Chain', 'Finance & Treasury', 'Placement Preparation', 'Executive Demonstrations'].map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-lg bg-[#101722] border border-[#263447] text-[#9AA9BB] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Experiential Management Loop Grid */}
      <section className="py-16 bg-[#101722]/50 border-y border-[#263447] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#F3F7FC] tracking-tight font-mono">
              The Experiential Executive Loop
            </h2>
            <p className="mt-2 text-sm text-[#9AA9BB]">
              Observe reality, execute management commands, inspect SCADA telemetry, and build business acumen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#151F2D] border border-[#263447] rounded-2xl p-6 relative shadow-card-industrial">
              <div className="w-10 h-10 rounded-xl bg-[#28D7F2]/10 border border-[#28D7F2]/30 text-[#28D7F2] flex items-center justify-center font-black text-sm mb-4 font-mono">
                01
              </div>
              <h3 className="text-base font-bold text-[#F3F7FC]">Observe Factory Operations</h3>
              <p className="text-xs text-[#9AA9BB] mt-2 leading-relaxed">
                Watch a live bottling facility humming with discrete hourly ticks. Inspect machine speeds, raw material tanks, and finished goods warehouse inventory.
              </p>
            </div>

            <div className="bg-[#151F2D] border border-[#263447] rounded-2xl p-6 relative shadow-card-industrial">
              <div className="w-10 h-10 rounded-xl bg-[#39E58C]/10 border border-[#39E58C]/30 text-[#39E58C] flex items-center justify-center font-black text-sm mb-4 font-mono">
                02
              </div>
              <h3 className="text-base font-bold text-[#F3F7FC]">Intervene & Allocate Capital</h3>
              <p className="text-xs text-[#9AA9BB] mt-2 leading-relaxed">
                Authorize $20,000 machinery CapEx, accept tight-deadline customer contracts, and replenish bulk inventory to prevent fatal plant bottlenecks.
              </p>
            </div>

            <div className="bg-[#151F2D] border border-[#263447] rounded-2xl p-6 relative shadow-card-industrial">
              <div className="w-10 h-10 rounded-xl bg-[#FFB547]/10 border border-[#FFB547]/30 text-[#FFB547] flex items-center justify-center font-black text-sm mb-4 font-mono">
                03
              </div>
              <h3 className="text-base font-bold text-[#F3F7FC]">Deterministic Events</h3>
              <p className="text-xs text-[#9AA9BB] mt-2 leading-relaxed">
                Respond to deterministic spot market opportunities, incoming rush orders, supply shortages, and cash burn rate fluctuations.
              </p>
            </div>

            <div className="bg-[#151F2D] border border-[#263447] rounded-2xl p-6 relative shadow-card-industrial">
              <div className="w-10 h-10 rounded-xl bg-[#9875FF]/10 border border-[#9875FF]/30 text-[#9875FF] flex items-center justify-center font-black text-sm mb-4 font-mono">
                04
              </div>
              <h3 className="text-base font-bold text-[#F3F7FC]">Objective Assessment</h3>
              <p className="text-xs text-[#9AA9BB] mt-2 leading-relaxed">
                Receive performance scorecards analyzing fulfillment rates, return on capital, margin preservation, and strategic risk ratings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Scenario Highlight Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-[#101722] via-[#151F2D] to-[#1B2838] border border-[#28D7F2]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-glow-cyan">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-[#39E58C]/15 border border-[#39E58C]/30 text-[#39E58C] text-xs font-mono font-black uppercase tracking-wider">
                ★ PLAYABLE MISSION
              </span>
              <span className="text-xs font-mono text-[#9AA9BB]">Manufacturing Domain</span>
            </div>

            <h3 className="text-3xl font-black text-[#F3F7FC]">{playableScenario.name}</h3>

            <p className="text-sm text-[#9AA9BB] leading-relaxed">
              Step into the role of <strong className="text-[#28D7F2]">{playableScenario.role}</strong> with $100,000 treasury and 1 bottling line. Deliver 5,000 units to Global Supermarkets by Day 5 while handling unexpected Day 3 surge orders.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 text-xs font-mono">
              <div className="bg-[#080B12]/80 p-2.5 rounded-xl border border-[#263447]">
                <div className="text-[#9AA9BB] text-[10px] uppercase">Starting Capital</div>
                <div className="text-[#39E58C] font-black mt-0.5">$100,000</div>
              </div>
              <div className="bg-[#080B12]/80 p-2.5 rounded-xl border border-[#263447]">
                <div className="text-[#9AA9BB] text-[10px] uppercase">Base Output</div>
                <div className="text-[#28D7F2] font-black mt-0.5">800 b/d</div>
              </div>
              <div className="bg-[#080B12]/80 p-2.5 rounded-xl border border-[#263447]">
                <div className="text-[#9AA9BB] text-[10px] uppercase">Duration</div>
                <div className="text-[#FFB547] font-black mt-0.5">7 Virtual Days</div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/scenarios/apex-beverages"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#28D7F2] hover:bg-[#28D7F2]/90 text-[#080B12] font-black text-xs shadow-glow-cyan transition-all hover:scale-105"
              >
                <span>Read Mission Briefing & Enter Facility</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Interactive World Graphic Preview */}
          <div className="w-full md:w-96 h-64 bg-[#080B12] rounded-2xl border border-[#263447] p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between text-xs border-b border-[#263447] pb-2 font-mono">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#39E58C] shadow-glow-green animate-pulse" />
                <span className="text-[#F3F7FC] font-bold">Apex Bottler Line 01</span>
              </div>
              <span className="text-[#28D7F2] font-black">800 b/d</span>
            </div>

            {/* Conveyor graphic */}
            <div className="my-auto py-3 bg-[#101722] border-y border-[#263447] rounded-lg flex items-center justify-around px-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-1.5 h-1 bg-[#FFB547] rounded-t-sm" />
                  <div className="w-3.5 h-5 bg-[#28D7F2]/80 rounded-sm border border-[#28D7F2] shadow-sm" />
                </div>
              ))}
            </div>

            <div className="text-[11px] text-[#9AA9BB] flex items-center justify-between border-t border-[#263447] pt-2 font-mono">
              <span>Mode: RUNNING</span>
              <span className="text-[#39E58C] font-bold">100% Efficiency</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-[#263447] px-4 text-center text-xs text-[#627387] font-mono">
        <p>
          Career Progression Simulator • Engineered for B-School Students, Business Administration, and Management Leadership Placements.
        </p>
      </footer>
    </div>
  );
}

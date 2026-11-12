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
} from 'lucide-react';
import { SCENARIO_CATALOG } from '@/scenarios/registry';

export default function LandingPage() {
  const playableScenario = SCENARIO_CATALOG.find(s => s.id === 'apex-beverages')!;

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-sky-500 selection:text-slate-950">
      <AppNavbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center text-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-sky-500/15 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-sky-400 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Business Simulation Platform 1.0</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-100 tracking-tight max-w-4xl leading-tight sm:leading-none">
          Stop answering business questions.{' '}
          <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-sky-200 bg-clip-text text-transparent">
            Run an actual business.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
          An immersive, game-like simulation where MBA and management students develop practical
          operational judgment: deploy factory capital, manage supply chains, negotiate deadlines,
          and witness real-time financial consequences.
        </p>

        {/* CTA Group */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/scenarios/apex-beverages"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 shadow-xl shadow-sky-500/20 transition-all hover:scale-105"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Apex Beverages Simulation</span>
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-surface hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center justify-center space-x-2 transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Student Dashboard</span>
          </Link>
        </div>

        {/* Target Audience Badges */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Tailored For:</span>
          {['B-School Students', 'Operations & Supply Chain', 'Finance & Commerce', 'Campus Placements', 'Corporate Training'].map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Product Philosophy & Methodology Grid */}
      <section className="py-16 bg-surface/50 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              The Experiential Management Loop
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Observe reality, execute commands, analyze telemetry, and build instinctual business acumen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-slate-100">Observe Operations</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Watch a live bottling facility humming with discrete hourly ticks. Inspect machine speeds, raw material tanks, and finished goods inventory.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-slate-100">Intervene & Direct</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Authorize $20,000 machinery CapEx, accept tight-deadline customer contracts, and replenish bulk inventory to prevent fatal plant bottlenecks.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-slate-100">Dynamic Events</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Respond to deterministic spot market opportunities, incoming rush orders, supply shortages, and cash burn rate fluctuations.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm mb-4">
                04
              </div>
              <h3 className="text-base font-bold text-slate-100">Objective Assessment</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Receive performance scorecards analyzing fulfillment rates, return on capital, margin preservation, and strategic risk ratings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Playable Scenario Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-surface-secondary/60 border border-slate-700/80 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wide">
                Playable Scenario
              </span>
              <span className="text-xs font-mono text-slate-400">Manufacturing Domain</span>
            </div>

            <h3 className="text-3xl font-black text-slate-100">{playableScenario.name}</h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              Step into the role of <strong className="text-sky-300">{playableScenario.role}</strong> with $100,000 treasury and 1 bottling line. Deliver 5,000 units to Global Supermarkets by Day 5 while handling unexpected Day 3 surge orders.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase">Starting Capital</div>
                <div className="text-slate-100 font-mono font-bold mt-0.5">$100,000</div>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase">Base Output</div>
                <div className="text-sky-400 font-mono font-bold mt-0.5">800 bottles/day</div>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase">Trial Duration</div>
                <div className="text-slate-100 font-mono font-bold mt-0.5">7 Virtual Days</div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/scenarios/apex-beverages"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/20 transition-all hover:scale-105"
              >
                <span>Read Briefing & Enter Factory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Interactive World Graphic Teaser */}
          <div className="w-full md:w-96 h-64 bg-slate-950 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-slate-300">Apex Bottler Line 01</span>
              </div>
              <span className="text-emerald-400 font-mono font-bold">800 b/d</span>
            </div>

            {/* Conveyor graphic */}
            <div className="my-auto py-3 bg-slate-900 border-y border-slate-800 rounded flex items-center justify-around px-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-1.5 h-1 bg-amber-400 rounded-t-sm" />
                  <div className="w-3 h-5 bg-sky-400/80 rounded-sm border border-sky-300 shadow-sm" />
                </div>
              ))}
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800 pt-2 font-mono">
              <span>Status: RUNNING</span>
              <span className="text-sky-400 font-bold">100% Efficiency</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-slate-800 px-4 text-center text-xs text-slate-500">
        <p>
          Career Progression Simulator • Designed for B-School Students, Business Administration, and Management Leadership Placements.
        </p>
      </footer>
    </div>
  );
}

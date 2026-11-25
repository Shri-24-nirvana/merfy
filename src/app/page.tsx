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
  Flame,
} from 'lucide-react';
import { SCENARIO_CATALOG } from '@/scenarios/registry';

export default function LandingPage() {
  const playableScenario = SCENARIO_CATALOG.find(s => s.id === 'apex-beverages')!;

  const features = [
    { icon: Cpu, title: 'Live Simulation Engine', desc: 'Real business rules, real consequences. Every decision matters.', color: 'from-indigo-400 to-purple-400', bg: 'from-indigo-50 to-purple-50', border: 'border-indigo-200' },
    { icon: Gauge, title: 'Performance Analytics', desc: 'Track KPIs, profitability and operational efficiency in real time.', color: 'from-emerald-400 to-teal-400', bg: 'from-emerald-50 to-teal-50', border: 'border-emerald-200' },
    { icon: Activity, title: '9 Business Domains', desc: 'Manufacturing, Retail, HR, Finance, Logistics and more.', color: 'from-orange-400 to-amber-400', bg: 'from-orange-50 to-amber-50', border: 'border-orange-200' },
    { icon: Award, title: 'Grade & Rank System', desc: 'Get scored like a real exam. Compete on the global leaderboard.', color: 'from-pink-400 to-rose-400', bg: 'from-pink-50 to-rose-50', border: 'border-pink-200' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-indigo-50/40 to-purple-50/20">
      <AppNavbar />

      {/* Hero */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-50 border-2 border-indigo-200 text-indigo-700 text-xs font-bold shadow-sm">
          <Sparkles className="w-4 h-4" />
          <span>LeetCode-style · For Business Managers</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-800 leading-tight">
          Learn Management by{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            Doing It
          </span>
        </h1>

        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Solve real business challenges every day. Run virtual companies, make decisions, 
          see the consequences — and get graded like a pro.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-black text-sm shadow-lg hover:shadow-xl transition-all"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Start Practicing</span>
          </Link>
          <Link
            href={`/scenarios/${playableScenario.id}`}
            className="flex items-center space-x-2 px-6 py-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-bold text-sm hover:border-indigo-300 hover:text-indigo-700 transition-all shadow-sm"
          >
            <Building2 className="w-4 h-4" />
            <span>Try Demo: Apex Beverages</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 pt-4">
          {[
            { value: '9', label: 'Simulations' },
            { value: '6', label: 'Business Domains' },
            { value: '19', label: 'Engine Tests' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-black text-indigo-700">{stat.value}</div>
              <div className="text-xs text-slate-400 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map(f => (
            <div key={f.title} className={`bg-gradient-to-br ${f.bg} border-2 ${f.border} rounded-3xl p-6 space-y-3`}>
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-r ${f.color} flex items-center justify-center shadow-md`}>
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-black text-slate-800">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-500 py-16 px-4 text-center text-white">
        <h2 className="text-3xl font-black mb-4">Ready to run your first simulation?</h2>
        <p className="text-indigo-100 mb-8 max-w-md mx-auto">Join thousands of management students mastering business decisions.</p>
        <Link
          href="/dashboard"
          className="inline-flex items-center space-x-2 px-8 py-4 rounded-2xl bg-white text-indigo-700 font-black text-sm shadow-lg hover:shadow-xl transition-all"
        >
          <Flame className="w-5 h-5 text-orange-500" />
          <span>Go to Dashboard</span>
        </Link>
      </section>
    </div>
  );
}

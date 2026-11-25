'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSimulationStore } from '@/application/simulation-session/simulation-store';
import { AppNavbar } from '@/components/shared/AppNavbar';
import confetti from 'canvas-confetti';
import {
  Award,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Layers,
  Gauge,
  CheckCircle2,
  XCircle,
  RotateCcw,
  LayoutDashboard,
  ShieldAlert,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Target,
  Clock,
  Briefcase,
  History,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export default function SimulationResultsPage() {
  const router = useRouter();
  const { getResults, restartSimulation } = useSimulationStore();
  const [results, setResults] = useState(getResults());

  useEffect(() => {
    const res = getResults();
    if (res) {
      setResults(res);
      if (res.performanceAssessment.grade === 'A+' || res.performanceAssessment.grade === 'A') {
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
      }
    }
  }, []);

  const handlePlayAgain = () => {
    restartSimulation();
    router.push('/simulation/apex-beverages');
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-white border-2 border-indigo-200 shadow-md flex items-center justify-center">
          <Clock className="w-7 h-7 text-indigo-500" />
        </div>
        <h2 className="text-xl font-black text-slate-800">No Results Yet</h2>
        <p className="text-sm text-slate-500 max-w-sm">
          Run a simulation first to see your performance scorecard.
        </p>
        <Link
          href="/simulation/apex-beverages"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-black text-sm shadow-md hover:shadow-lg transition-all"
        >
          Go to Simulation →
        </Link>
      </div>
    );
  }

  const { performanceAssessment: assessment } = results;
  const isSuccess = results.finalStatus === 'COMPLETED';

  const chartData = (results.historySnapshots ?? []).slice(-24).map((s: any) => ({
    name: `D${s.day}`,
    cash: s.cash,
    profit: s.profit,
  }));

  const gradeStyles: Record<string, string> = {
    'A+': 'from-emerald-400 to-teal-400 shadow-emerald-200',
    'A': 'from-green-400 to-emerald-400 shadow-green-200',
    'B': 'from-blue-400 to-indigo-400 shadow-blue-200',
    'C': 'from-amber-400 to-orange-400 shadow-amber-200',
    'D': 'from-orange-400 to-red-400 shadow-orange-200',
    'F': 'from-red-400 to-rose-500 shadow-red-200',
  };
  const gradeGrad = gradeStyles[assessment.grade] || gradeStyles['C'];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20">
      <AppNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Result Card */}
        <div className={`rounded-3xl p-6 sm:p-10 border-2 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
          isSuccess
            ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-lg shadow-emerald-100'
            : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200 shadow-lg shadow-red-100'
        }`}>
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border-2 ${
                isSuccess ? 'bg-emerald-100 text-emerald-700 border-emerald-300' : 'bg-red-100 text-red-700 border-red-300'
              }`}>
                {isSuccess ? '🎉 Objectives Completed!' : '⚠ Simulation Failed'}
              </span>
              <span className="text-xs text-slate-500 font-semibold">{results.scenarioName}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Your Performance Scorecard
            </h1>

            <p className="text-sm text-slate-500 leading-relaxed">
              {results.completionReason} {assessment.feedback}
            </p>
          </div>

          {/* Grade Badge */}
          <div className="flex items-center space-x-4 bg-white border-2 border-slate-100 rounded-3xl p-6 shadow-md flex-shrink-0">
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${gradeGrad} shadow-xl flex flex-col items-center justify-center text-white`}>
              <span className="text-3xl font-black">{assessment.grade}</span>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-800">{assessment.overallScore}<span className="text-sm font-semibold text-slate-400">/100</span></div>
              <div className="text-xs text-slate-400 font-semibold">Performance Score</div>
              <div className={`text-sm font-bold mt-1 ${isSuccess ? 'text-emerald-600' : 'text-red-600'}`}>
                {isSuccess ? '✓ Passed' : '✗ Failed'}
              </div>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Final Cash', value: `$${Math.round(results.finalCash).toLocaleString()}`, color: 'from-emerald-50 to-teal-50 border-emerald-200', text: 'text-emerald-700', icon: DollarSign },
            { label: 'Net Profit', value: `$${Math.round(results.profit).toLocaleString()}`, color: results.profit >= 0 ? 'from-blue-50 to-indigo-50 border-blue-200' : 'from-red-50 to-rose-50 border-red-200', text: results.profit >= 0 ? 'text-blue-700' : 'text-red-700', icon: TrendingUp },
            { label: 'Fulfillment', value: `${assessment.metrics.orderFulfillmentRate}%`, color: 'from-indigo-50 to-purple-50 border-indigo-200', text: 'text-indigo-700', icon: Target },
            { label: 'Utilization', value: `${assessment.metrics.machineUtilizationAvg}%`, color: 'from-amber-50 to-orange-50 border-amber-200', text: 'text-amber-700', icon: Gauge },
          ].map(kpi => (
            <div key={kpi.label} className={`bg-gradient-to-br ${kpi.color} border-2 rounded-2xl p-4 space-y-2`}>
              <div className="text-[11px] text-slate-500 font-semibold flex items-center space-x-1">
                <kpi.icon className="w-3.5 h-3.5" />
                <span>{kpi.label}</span>
              </div>
              <div className={`text-lg font-black ${kpi.text}`}>{kpi.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white border-2 border-slate-100 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="font-black text-slate-800">Cash Trajectory</h3>
            <div className="h-40 w-full">
              {chartData.length > 1 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="resultsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#94A3B8" fontSize={9} tickLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={9} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#E2E8F0', borderRadius: '12px', fontSize: '11px' }} />
                    <Area type="monotone" dataKey="cash" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#resultsGrad)" name="Cash ($)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-400">No snapshot data</div>
              )}
            </div>

            {/* Operational stats */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { label: 'Orders Fulfilled', value: results.completedOrdersCount, color: 'text-emerald-700' },
                { label: 'Orders Failed', value: results.failedOrdersCount, color: 'text-red-600' },
                { label: 'Bottles Produced', value: results.totalBottlesProduced?.toLocaleString(), color: 'text-indigo-700' },
                { label: 'Machines Deployed', value: results.machinesCount, color: 'text-purple-700' },
              ].map(stat => (
                <div key={stat.label} className="bg-slate-50 border-2 border-slate-100 rounded-2xl p-3">
                  <div className="text-[10px] text-slate-400 font-semibold">{stat.label}</div>
                  <div className={`text-base font-black ${stat.color}`}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 space-y-3 shadow-sm">
            <h3 className="font-black text-slate-800">What Next?</h3>
            <button
              onClick={handlePlayAgain}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-black text-sm flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>

            <Link
              href="/dashboard"
              className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center space-x-2 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>

            <Link
              href="/leaderboard"
              className="w-full py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 text-amber-700 font-bold text-sm flex items-center justify-center space-x-2 transition-colors"
            >
              <Award className="w-4 h-4" />
              <span>View Leaderboard</span>
            </Link>
          </div>
        </div>

        {/* Decision Audit */}
        <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-800 flex items-center space-x-2">
              <History className="w-5 h-5 text-indigo-500" />
              <span>Decision Audit Trail</span>
            </h3>
            <span className="text-xs text-slate-400 font-semibold">{results.decisionHistory.length} actions</span>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-2">
            {results.decisionHistory.map((rec: any) => (
              <div key={rec.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center space-x-3">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${rec.result === 'SUCCESS' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  <span className="text-slate-400 font-mono">D{rec.day} {rec.hour.toString().padStart(2, '0')}:00</span>
                  <span className="font-bold text-slate-800">{rec.commandType.replace(/_/g, ' ')}</span>
                  <span className="text-slate-400 hidden sm:inline truncate max-w-xs">{rec.message}</span>
                </div>
                {rec.financialImpact !== undefined && (
                  <span className={`font-black flex-shrink-0 ${rec.financialImpact >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                    {rec.financialImpact >= 0 ? '+' : ''}${Math.round(rec.financialImpact).toLocaleString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

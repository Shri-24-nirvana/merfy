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
      // Trigger confetti celebration if high grade
      if (res.performanceAssessment.grade === 'A+' || res.performanceAssessment.grade === 'A') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  }, []);

  const handlePlayAgain = () => {
    restartSimulation();
    router.push('/simulation/apex-beverages');
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
          <Clock className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-200">No Completed Simulation Found</h2>
        <p className="text-xs text-slate-400 max-w-sm">
          Run the simulation through its scheduled timeline or review your active shift.
        </p>
        <Link
          href="/simulation/apex-beverages"
          className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-sky-500/20"
        >
          Launch Simulation
        </Link>
      </div>
    );
  }

  const { performanceAssessment: assessment } = results;
  const isSuccess = results.finalStatus === 'COMPLETED';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Header Card */}
        <div
          className={`rounded-3xl p-6 sm:p-10 border shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
            isSuccess
              ? 'bg-gradient-to-br from-surface via-slate-900 to-emerald-950/30 border-emerald-500/30'
              : 'bg-gradient-to-br from-surface via-slate-900 to-red-950/30 border-red-500/30'
          }`}
        >
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-2">
              <span
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                  isSuccess
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-red-500/10 text-red-400 border border-red-500/30'
                }`}
              >
                {isSuccess ? 'Scenario Completed' : 'Liquidation Terminated'}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {results.scenarioName}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
              Executive Performance Scorecard
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {results.completionReason} {assessment.feedback}
            </p>
          </div>

          {/* Grade Badge */}
          <div className="flex items-center space-x-4 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-inner">
            <div
              className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-black text-3xl shadow-lg ${
                assessment.grade === 'A+' || assessment.grade === 'A'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-emerald-500/10'
                  : assessment.grade === 'B'
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                  : assessment.grade === 'C'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-red-500/20 text-red-400 border border-red-500/40'
              }`}
            >
              <span>{assessment.grade}</span>
              <span className="text-[10px] font-mono tracking-normal text-slate-400 font-normal">
                {assessment.overallScore}/100
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">
                Strategic Rating
              </span>
              <span className="text-sm font-bold text-slate-100 max-w-[140px]">
                {assessment.strategicRating}
              </span>
              <span className="text-[10px] text-slate-500 mt-1">Formative Assessment</span>
            </div>
          </div>
        </div>

        {/* Primary Business Financials Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-surface border border-slate-800 rounded-2xl p-4">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center space-x-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Final Treasury Cash</span>
            </div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
              ${results.finalCash.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Liquid Solvency</div>
          </div>

          <div className="bg-surface border border-slate-800 rounded-2xl p-4">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
              <span>Gross Revenue</span>
            </div>
            <div className="text-xl font-bold font-mono text-sky-400 mt-1">
              ${results.revenue.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {results.fulfilledBottlesCount.toLocaleString()} bottles sold
            </div>
          </div>

          <div className="bg-surface border border-slate-800 rounded-2xl p-4">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center space-x-1">
              <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
              <span>Total Expenses</span>
            </div>
            <div className="text-xl font-bold font-mono text-amber-400 mt-1">
              ${results.expenses.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">OpEx + Materials</div>
          </div>

          <div className="bg-surface border border-slate-800 rounded-2xl p-4">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center space-x-1">
              <Target className="w-3.5 h-3.5 text-indigo-400" />
              <span>Net Profit</span>
            </div>
            <div
              className={`text-xl font-bold font-mono mt-1 ${
                results.profit >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              ${results.profit.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {assessment.metrics.profitMargin}% Operating Margin
            </div>
          </div>
        </div>

        {/* Operational Performance & Telemetry Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Strengths & Improvement Areas */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-surface border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Observed Strategic Strengths</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {assessment.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start space-x-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2 pt-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Areas for Operational Optimization</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {assessment.areasForImprovement.map((imp, idx) => (
                  <li key={idx} className="flex items-start space-x-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>

              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                <strong className="text-slate-300">Provisional Scoring Note:</strong> {assessment.provisionalNote}
              </div>
            </div>

            {/* Run History Trend Chart */}
            <div className="bg-surface border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-100">
                  Full Shift Financial Telemetry
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  {results.totalDays} Sim Days ({results.totalTicks} Ticks)
                </span>
              </div>

              <div className="h-48 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.historySnapshots} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="resCash" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="resProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="#64748B" fontSize={10} tickLine={false} tickFormatter={v => `Day ${v}`} />
                    <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#151B23',
                        borderColor: '#334155',
                        borderRadius: '8px',
                        fontSize: '11px',
                      }}
                    />
                    <Area type="monotone" dataKey="cash" stroke="#38BDF8" strokeWidth={2} fillOpacity={1} fill="url(#resCash)" name="Cash ($)" />
                    <Area type="monotone" dataKey="profit" stroke="#22C55E" strokeWidth={2} fillOpacity={1} fill="url(#resProfit)" name="Profit ($)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column: Operations Summary & Actions */}
          <div className="space-y-6">
            <div className="bg-surface border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
                <Gauge className="w-4 h-4 text-sky-400" />
                <span>Plant Metrics Summary</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Contracts Completed:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {results.completedOrdersCount} / {results.totalOrdersCount}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Contracts Defaulted:</span>
                  <span className="font-mono font-bold text-red-400">
                    {results.failedOrdersCount}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Fulfillment Success Rate:</span>
                  <span className="font-mono font-bold text-sky-400">
                    {assessment.metrics.orderFulfillmentRate}%
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Total Output Produced:</span>
                  <span className="font-mono font-bold text-slate-100">
                    {results.totalBottlesProduced.toLocaleString()} bottles
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Installed Machinery:</span>
                  <span className="font-mono font-bold text-slate-100">
                    {results.machinesCount} Bottling Line(s)
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Remaining Finished Stock:</span>
                  <span className="font-mono font-bold text-slate-100">
                    {results.remainingFinishedGoods.toLocaleString()} bottles
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-400">Remaining Raw Stock:</span>
                  <span className="font-mono font-bold text-slate-100">
                    {results.remainingRawMaterial.toLocaleString()} units
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Box */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-3">
              <button
                onClick={handlePlayAgain}
                className="w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-sky-500/20"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Scenario Again (Try New Strategy)</span>
              </button>

              <Link
                href="/dashboard"
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center space-x-2 transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Return to Student Dashboard</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Interventions Audit Trail */}
        <div className="bg-surface border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
              <History className="w-4 h-4 text-sky-400" />
              <span>Chronological Decision Audit Log</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {results.decisionHistory.length} Recorded Actions
            </span>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-2">
            {results.decisionHistory.map(rec => (
              <div
                key={rec.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs"
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      rec.result === 'SUCCESS' ? 'bg-emerald-400' : 'bg-red-400'
                    }`}
                  />
                  <span className="font-mono text-slate-400">
                    Day {rec.day}, {rec.hour.toString().padStart(2, '0')}:00
                  </span>
                  <span className="font-semibold text-slate-200">
                    {rec.commandType.replace(/_/g, ' ')}
                  </span>
                  <span className="text-slate-400 hidden sm:inline truncate max-w-sm">
                    {rec.message}
                  </span>
                </div>

                {rec.financialImpact !== undefined && (
                  <span
                    className={`font-mono font-bold ${
                      rec.financialImpact >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {rec.financialImpact >= 0 ? '+' : ''}$
                    {Math.round(rec.financialImpact).toLocaleString()}
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

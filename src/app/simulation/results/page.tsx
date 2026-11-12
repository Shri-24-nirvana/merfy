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
        confetti({
          particleCount: 90,
          spread: 80,
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
      <div className="min-h-screen bg-[#080B12] flex flex-col items-center justify-center text-center p-6 space-y-4 text-[#F3F7FC]">
        <div className="w-12 h-12 rounded-2xl bg-[#151F2D] border border-[#263447] flex items-center justify-center text-[#9AA9BB]">
          <Clock className="w-6 h-6 text-[#28D7F2]" />
        </div>
        <h2 className="text-xl font-bold font-mono">No Active Result Available</h2>
        <p className="text-xs text-[#9AA9BB] max-w-sm">
          Please run a simulation shift to observe final financial outcomes and assessment.
        </p>
        <Link
          href="/simulation/apex-beverages"
          className="px-6 py-2.5 rounded-xl bg-[#28D7F2] hover:bg-[#28D7F2]/90 text-[#080B12] font-black text-xs transition-all shadow-glow-cyan"
        >
          Enter Live Plant
        </Link>
      </div>
    );
  }

  const { performanceAssessment: assessment } = results;
  const isSuccess = results.finalStatus === 'COMPLETED';

  return (
    <div className="min-h-screen flex flex-col bg-[#080B12] text-[#F3F7FC]">
      <AppNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Header Card */}
        <div
          className={`rounded-3xl p-6 sm:p-10 border shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
            isSuccess
              ? 'bg-gradient-to-br from-[#101722] via-[#151F2D] to-[#1B2838] border-[#39E58C]/40 shadow-glow-green'
              : 'bg-gradient-to-br from-[#101722] via-[#151F2D] to-[#1B2838] border-[#FF5F6D]/40 shadow-glow-coral'
          }`}
        >
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-2">
              <span
                className={`text-xs font-mono font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                  isSuccess
                    ? 'bg-[#39E58C]/15 text-[#39E58C] border border-[#39E58C]/30'
                    : 'bg-[#FF5F6D]/15 text-[#FF5F6D] border border-[#FF5F6D]/30'
                }`}
              >
                {isSuccess ? '★ SCENARIO OBJECTIVES COMPLETED' : '⚠ PLANT LIQUIDATION OCCURRED'}
              </span>
              <span className="text-xs font-mono text-[#9AA9BB]">
                {results.scenarioName}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#F3F7FC] tracking-tight">
              Executive Evaluation Scorecard
            </h1>

            <p className="text-xs sm:text-sm text-[#9AA9BB] leading-relaxed">
              {results.completionReason} {assessment.feedback}
            </p>
          </div>

          {/* Letter Grade Hero Badge */}
          <div className="flex items-center space-x-4 bg-[#080B12] border border-[#263447] rounded-2xl p-5 shadow-card-industrial">
            <div
              className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-black text-3xl shadow-lg ${
                assessment.grade === 'A+' || assessment.grade === 'A'
                  ? 'bg-[#39E58C]/20 text-[#39E58C] border border-[#39E58C]/40 shadow-glow-green'
                  : assessment.grade === 'B'
                  ? 'bg-[#28D7F2]/20 text-[#28D7F2] border border-[#28D7F2]/40'
                  : assessment.grade === 'C'
                  ? 'bg-[#FFB547]/20 text-[#FFB547] border border-[#FFB547]/40'
                  : 'bg-[#FF5F6D]/20 text-[#FF5F6D] border border-[#FF5F6D]/40'
              }`}
            >
              <span>{assessment.grade}</span>
              <span className="text-[10px] font-mono tracking-normal text-[#9AA9BB] font-normal">
                {assessment.overallScore}/100
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono text-[#627387] tracking-wider">
                Strategic Rating
              </span>
              <span className="text-sm font-bold text-[#F3F7FC] max-w-[150px]">
                {assessment.strategicRating}
              </span>
              <span className="text-[10px] text-[#28D7F2] font-mono mt-1">Formative Feedback</span>
            </div>
          </div>
        </div>

        {/* Primary Business Metrics 4-Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#151F2D] border border-[#263447] rounded-2xl p-4 shadow-card-industrial">
            <div className="text-[10px] text-[#9AA9BB] uppercase tracking-wider font-mono flex items-center space-x-1">
              <DollarSign className="w-3.5 h-3.5 text-[#39E58C]" />
              <span>Final Treasury Cash</span>
            </div>
            <div className="text-xl font-black font-mono text-[#39E58C] mt-1">
              ${results.finalCash.toLocaleString()}
            </div>
            <div className="text-[10px] text-[#627387] font-mono mt-0.5">Liquid Balance</div>
          </div>

          <div className="bg-[#151F2D] border border-[#263447] rounded-2xl p-4 shadow-card-industrial">
            <div className="text-[10px] text-[#9AA9BB] uppercase tracking-wider font-mono flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#28D7F2]" />
              <span>Gross Revenue</span>
            </div>
            <div className="text-xl font-black font-mono text-[#28D7F2] mt-1">
              ${results.revenue.toLocaleString()}
            </div>
            <div className="text-[10px] text-[#627387] font-mono mt-0.5">
              {results.fulfilledBottlesCount.toLocaleString()} bottles dispatched
            </div>
          </div>

          <div className="bg-[#151F2D] border border-[#263447] rounded-2xl p-4 shadow-card-industrial">
            <div className="text-[10px] text-[#9AA9BB] uppercase tracking-wider font-mono flex items-center space-x-1">
              <TrendingDown className="w-3.5 h-3.5 text-[#FFB547]" />
              <span>Total Expenses</span>
            </div>
            <div className="text-xl font-black font-mono text-[#FFB547] mt-1">
              ${results.expenses.toLocaleString()}
            </div>
            <div className="text-[10px] text-[#627387] font-mono mt-0.5">OpEx + Materials</div>
          </div>

          <div className="bg-[#151F2D] border border-[#263447] rounded-2xl p-4 shadow-card-industrial">
            <div className="text-[10px] text-[#9AA9BB] uppercase tracking-wider font-mono flex items-center space-x-1">
              <Target className="w-3.5 h-3.5 text-[#9875FF]" />
              <span>Net Profit</span>
            </div>
            <div
              className={`text-xl font-black font-mono mt-1 ${
                results.profit >= 0 ? 'text-[#39E58C]' : 'text-[#FF5F6D]'
              }`}
            >
              ${results.profit.toLocaleString()}
            </div>
            <div className="text-[10px] text-[#627387] font-mono mt-0.5">
              {assessment.metrics.profitMargin}% Operating Margin
            </div>
          </div>
        </div>

        {/* Operational Analysis & Telemetry Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#151F2D] border border-[#263447] rounded-2xl p-6 space-y-4 shadow-card-industrial">
              <h3 className="text-base font-bold text-[#F3F7FC] flex items-center space-x-2 font-mono">
                <CheckCircle2 className="w-4 h-4 text-[#39E58C]" />
                <span>Observed Strategic Strengths</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-[#9AA9BB]">
                {assessment.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start space-x-2 bg-[#101722] p-3 rounded-xl border border-[#263447]">
                    <CheckCircle2 className="w-4 h-4 text-[#39E58C] flex-shrink-0 mt-0.5" />
                    <span className="text-[#F3F7FC]">{str}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-base font-bold text-[#F3F7FC] flex items-center space-x-2 pt-2 font-mono">
                <AlertTriangle className="w-4 h-4 text-[#FFB547]" />
                <span>Areas for Operational Optimization</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-[#9AA9BB]">
                {assessment.areasForImprovement.map((imp, idx) => (
                  <li key={idx} className="flex items-start space-x-2 bg-[#101722] p-3 rounded-xl border border-[#263447]">
                    <AlertTriangle className="w-4 h-4 text-[#FFB547] flex-shrink-0 mt-0.5" />
                    <span className="text-[#F3F7FC]">{imp}</span>
                  </li>
                ))}
              </ul>

              <div className="p-3 bg-[#101722] rounded-xl border border-[#263447] text-[11px] text-[#9AA9BB]">
                <strong className="text-[#28D7F2]">Provisional Scoring Model:</strong> {assessment.provisionalNote}
              </div>
            </div>

            {/* Run History Trend Chart */}
            <div className="bg-[#151F2D] border border-[#263447] rounded-2xl p-6 space-y-3 shadow-card-industrial">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#F3F7FC] font-mono">
                  Full Shift Financial Trajectory
                </h3>
                <span className="text-xs font-mono text-[#9AA9BB]">
                  {results.totalDays} Sim Days ({results.totalTicks} Ticks)
                </span>
              </div>

              <div className="h-48 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.historySnapshots} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="resGlowCash" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#28D7F2" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#28D7F2" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="resGlowProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#39E58C" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#39E58C" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="#627387" fontSize={10} tickLine={false} tickFormatter={v => `Day ${v}`} />
                    <YAxis stroke="#627387" fontSize={10} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#151F2D',
                        borderColor: '#263447',
                        borderRadius: '8px',
                        fontSize: '11px',
                        color: '#F3F7FC',
                      }}
                    />
                    <Area type="monotone" dataKey="cash" stroke="#28D7F2" strokeWidth={2} fillOpacity={1} fill="url(#resGlowCash)" name="Cash ($)" />
                    <Area type="monotone" dataKey="profit" stroke="#39E58C" strokeWidth={2} fillOpacity={1} fill="url(#resGlowProfit)" name="Profit ($)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column: Operations Summary & Actions */}
          <div className="space-y-6">
            <div className="bg-[#151F2D] border border-[#263447] rounded-2xl p-6 space-y-4 shadow-card-industrial">
              <h3 className="text-base font-bold text-[#F3F7FC] flex items-center space-x-2 font-mono">
                <Gauge className="w-4 h-4 text-[#28D7F2]" />
                <span>Manufacturing Summary</span>
              </h3>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between items-center py-1.5 border-b border-[#263447]">
                  <span className="text-[#9AA9BB]">Contracts Fulfilled:</span>
                  <span className="font-bold text-[#39E58C]">
                    {results.completedOrdersCount} / {results.totalOrdersCount}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-[#263447]">
                  <span className="text-[#9AA9BB]">Contracts Defaulted:</span>
                  <span className="font-bold text-[#FF5F6D]">
                    {results.failedOrdersCount}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-[#263447]">
                  <span className="text-[#9AA9BB]">Fulfillment Success Rate:</span>
                  <span className="font-bold text-[#28D7F2]">
                    {assessment.metrics.orderFulfillmentRate}%
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-[#263447]">
                  <span className="text-[#9AA9BB]">Total Bottles Produced:</span>
                  <span className="font-bold text-[#F3F7FC]">
                    {results.totalBottlesProduced.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-[#263447]">
                  <span className="text-[#9AA9BB]">Machinery Deployed:</span>
                  <span className="font-bold text-[#F3F7FC]">
                    {results.machinesCount} Bottling Line(s)
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5">
                  <span className="text-[#9AA9BB]">Remaining Raw Preforms:</span>
                  <span className="font-bold text-[#F3F7FC]">
                    {results.remainingRawMaterial.toLocaleString()} units
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-[#101722] border border-[#263447] rounded-2xl p-6 space-y-3 shadow-card-industrial">
              <button
                onClick={handlePlayAgain}
                className="w-full py-3.5 px-4 rounded-xl bg-[#28D7F2] hover:bg-[#28D7F2]/90 text-[#080B12] font-black text-xs flex items-center justify-center space-x-2 transition-all shadow-glow-cyan"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Scenario Again (Try New Strategy)</span>
              </button>

              <Link
                href="/dashboard"
                className="w-full py-3 px-4 rounded-xl bg-[#1B2838] hover:bg-[#263447] text-[#F3F7FC] font-semibold text-xs flex items-center justify-center space-x-2 transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Return to Command Deck</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Interventions Audit Trail */}
        <div className="bg-[#151F2D] border border-[#263447] rounded-2xl p-6 space-y-4 shadow-card-industrial">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#F3F7FC] flex items-center space-x-2 font-mono">
              <History className="w-4 h-4 text-[#28D7F2]" />
              <span>Full Decision Audit Trail</span>
            </h3>
            <span className="text-xs font-mono text-[#9AA9BB]">
              {results.decisionHistory.length} Actions Recorded
            </span>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-2">
            {results.decisionHistory.map(rec => (
              <div
                key={rec.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#101722] border border-[#263447] text-xs font-mono"
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      rec.result === 'SUCCESS' ? 'bg-[#39E58C]' : 'bg-[#FF5F6D]'
                    }`}
                  />
                  <span className="text-[#627387]">
                    Day {rec.day}, {rec.hour.toString().padStart(2, '0')}:00
                  </span>
                  <span className="font-bold text-[#F3F7FC]">
                    {rec.commandType.replace(/_/g, ' ')}
                  </span>
                  <span className="text-[#9AA9BB] hidden sm:inline truncate max-w-sm">
                    {rec.message}
                  </span>
                </div>

                {rec.financialImpact !== undefined && (
                  <span
                    className={`font-black ${
                      rec.financialImpact >= 0 ? 'text-[#39E58C]' : 'text-[#FF5F6D]'
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

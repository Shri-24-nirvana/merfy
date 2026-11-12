'use client';

import React from 'react';
import { AppNavbar } from '@/components/shared/AppNavbar';
import { History, Play, CheckCircle2, Clock, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
  const simulationRuns = [
    {
      id: 'RUN-APEX-0921',
      scenario: 'Apex Beverages',
      domain: 'Manufacturing',
      date: 'Today',
      duration: '7 Sim Days',
      status: 'COMPLETED',
      profit: '$28,400',
      grade: 'A',
      score: 91,
    },
    {
      id: 'RUN-APEX-0844',
      scenario: 'Apex Beverages',
      domain: 'Manufacturing',
      date: 'Yesterday',
      duration: '7 Sim Days',
      status: 'COMPLETED',
      profit: '$19,200',
      grade: 'B',
      score: 78,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">Simulation Run History</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review past scenarios, decisions, financial audits, and performance progress.
          </p>
        </div>

        <div className="bg-surface border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800 shadow-xl">
          {simulationRuns.map(run => (
            <div key={run.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-900/50 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {run.id}
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> {run.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-100">{run.scenario}</h3>
                <div className="text-xs text-slate-400 flex items-center space-x-3">
                  <span>{run.domain}</span>
                  <span>•</span>
                  <span>{run.duration}</span>
                  <span>•</span>
                  <span>{run.date}</span>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right font-mono">
                  <div className="text-xs text-slate-400">Net Profit</div>
                  <div className="text-sm font-bold text-emerald-400">{run.profit}</div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-xs text-slate-400">Score</div>
                  <div className="text-sm font-bold text-sky-400">{run.score}/100 ({run.grade})</div>
                </div>

                <Link
                  href="/simulation/results"
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center space-x-1"
                >
                  <span>Review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

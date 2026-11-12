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
    <div className="min-h-screen flex flex-col bg-[#080B12] text-[#F3F7FC]">
      <AppNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#F3F7FC]">Historical Shift Logs</h1>
          <p className="text-xs sm:text-sm text-[#9AA9BB] mt-1">
            Review past simulation runs, tactical interventions, P&L statements, and executive evaluations.
          </p>
        </div>

        <div className="bg-[#151F2D] border border-[#263447] rounded-2xl overflow-hidden divide-y divide-[#263447] shadow-card-industrial">
          {simulationRuns.map(run => (
            <div key={run.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#1B2838] transition-colors">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#101722] text-[#28D7F2] border border-[#263447]">
                    {run.id}
                  </span>
                  <span className="text-xs font-semibold text-[#39E58C] flex items-center font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> {run.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#F3F7FC]">{run.scenario}</h3>
                <div className="text-xs text-[#9AA9BB] flex items-center space-x-3 font-mono">
                  <span>{run.domain}</span>
                  <span>•</span>
                  <span>{run.duration}</span>
                  <span>•</span>
                  <span>{run.date}</span>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right font-mono">
                  <div className="text-xs text-[#9AA9BB]">Net Profit</div>
                  <div className="text-sm font-bold text-[#39E58C]">{run.profit}</div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-xs text-[#9AA9BB]">Score</div>
                  <div className="text-sm font-bold text-[#28D7F2]">{run.score}/100 ({run.grade})</div>
                </div>

                <Link
                  href="/simulation/results"
                  className="px-3.5 py-1.5 rounded-xl bg-[#1B2838] hover:bg-[#263447] text-[#F3F7FC] font-semibold text-xs transition-colors flex items-center space-x-1 font-mono border border-[#263447]"
                >
                  <span>Scorecard</span>
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

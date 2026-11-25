'use client';

import React from 'react';
import { AppNavbar } from '@/components/shared/AppNavbar';
import { History, Play, CheckCircle2, Clock, Calendar, ArrowRight, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
  const simulationRuns = [
    { id: 'RUN-APEX-0921', scenario: 'Apex Beverages', domain: 'Manufacturing', date: 'Today', duration: '7 Sim Days', status: 'COMPLETED', profit: '$28,400', grade: 'A', score: 91 },
    { id: 'RUN-APEX-0844', scenario: 'Apex Beverages', domain: 'Manufacturing', date: 'Yesterday', duration: '7 Sim Days', status: 'COMPLETED', profit: '$19,200', grade: 'B', score: 78 },
    { id: 'RUN-APEX-0712', scenario: 'Apex Beverages', domain: 'Manufacturing', date: '2 days ago', duration: '4 Sim Days', status: 'FAILED', profit: '-$3,800', grade: 'D', score: 42 },
  ];

  const gradeColors: Record<string, string> = {
    'A+': 'bg-emerald-100 text-emerald-700',
    'A': 'bg-blue-100 text-blue-700',
    'B': 'bg-indigo-100 text-indigo-700',
    'C': 'bg-amber-100 text-amber-700',
    'D': 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20">
      <AppNavbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border-2 border-indigo-200 text-indigo-700 text-xs font-bold">
            <History className="w-3.5 h-3.5" />
            <span>SIMULATION HISTORY</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800">Your Run History</h1>
          <p className="text-sm text-slate-500">Review past simulations and track your improvement.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Runs', value: '3', color: 'from-indigo-50 to-purple-50', border: 'border-indigo-200', text: 'text-indigo-700' },
            { label: 'Avg Score', value: '70', color: 'from-emerald-50 to-teal-50', border: 'border-emerald-200', text: 'text-emerald-700' },
            { label: 'Best Grade', value: 'A', color: 'from-amber-50 to-orange-50', border: 'border-amber-200', text: 'text-amber-700' },
          ].map(stat => (
            <div key={stat.label} className={`bg-gradient-to-br ${stat.color} border-2 ${stat.border} rounded-2xl p-4 text-center`}>
              <div className={`text-2xl font-black ${stat.text}`}>{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Run List */}
        <div className="space-y-4">
          {simulationRuns.map(run => (
            <div key={run.id} className="bg-white border-2 border-slate-100 rounded-3xl p-5 hover:border-indigo-200 hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 flex-wrap gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-500">{run.id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">{run.domain}</span>
                    {run.status === 'COMPLETED'
                      ? <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Completed</span>
                      : <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 font-semibold flex items-center gap-1"><XCircle className="w-3 h-3" />Failed</span>
                    }
                  </div>
                  <h3 className="text-base font-black text-slate-800">{run.scenario}</h3>
                  <div className="flex items-center space-x-3 text-xs text-slate-400">
                    <span className="flex items-center space-x-1"><Calendar className="w-3.5 h-3.5" /><span>{run.date}</span></span>
                    <span className="flex items-center space-x-1"><Clock className="w-3.5 h-3.5" /><span>{run.duration}</span></span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`text-sm font-black ${parseFloat(run.profit.replace(/[$,]/g, '')) >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>{run.profit}</div>
                    <div className="text-[10px] text-slate-400 font-mono">net profit</div>
                  </div>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black ${gradeColors[run.grade] || 'bg-slate-100 text-slate-700'}`}>
                    {run.grade}
                  </div>
                  <div className="hidden sm:block text-right">
                    <div className="text-lg font-black text-indigo-700">{run.score}</div>
                    <div className="text-[10px] text-slate-400">score</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-black text-sm shadow-md hover:shadow-lg transition-shadow"
          >
            <Play className="w-4 h-4" />
            <span>Start New Simulation</span>
          </Link>
        </div>
      </main>
    </div>
  );
}

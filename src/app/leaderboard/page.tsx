'use client';

import React from 'react';
import { AppNavbar } from '@/components/shared/AppNavbar';
import { Trophy, Medal, Award, Flame, Users, ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LeaderboardPage() {
  const topPerformers = [
    { rank: 1, name: 'Arjun Mehta', school: 'IIM Ahmedabad', scenario: 'Apex Beverages', score: 98, profit: '$34,200', grade: 'A+' },
    { rank: 2, name: 'Sophia Chen', school: 'INSEAD Singapore', scenario: 'Apex Beverages', score: 95, profit: '$31,500', grade: 'A+' },
    { rank: 3, name: 'Rohan Sharma', school: 'FMS Delhi', scenario: 'Apex Beverages', score: 92, profit: '$28,900', grade: 'A' },
    { rank: 4, name: 'Elena Rostova', school: 'London Business School', scenario: 'Apex Beverages', score: 89, profit: '$26,100', grade: 'A' },
    { rank: 5, name: 'Devika Patel', school: 'XLRI Jamshedpur', scenario: 'Apex Beverages', score: 87, profit: '$24,500', grade: 'A' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>Institutional B-School Rankings</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-100">Global Cohort Leaderboard</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Benchmark your operational margin, order fulfillment velocity, and capital discipline against top business school peers.
            </p>
          </div>

          <Link
            href="/scenarios/apex-beverages"
            className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs self-start sm:self-auto transition-all shadow-md shadow-sky-500/20"
          >
            Compete in Apex Beverages
          </Link>
        </div>

        <div className="bg-surface border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 bg-surface-secondary/70 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Rank & Student</span>
            <div className="flex items-center space-x-8">
              <span>B-School</span>
              <span>Net Profit</span>
              <span>Score</span>
            </div>
          </div>

          <div className="divide-y divide-slate-800">
            {topPerformers.map(p => (
              <div key={p.rank} className="px-6 py-4 flex items-center justify-between hover:bg-slate-900/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                    p.rank === 1 ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' :
                    p.rank === 2 ? 'bg-slate-300/20 text-slate-200 border border-slate-300/40' :
                    p.rank === 3 ? 'bg-amber-700/20 text-amber-600 border border-amber-700/40' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    #{p.rank}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{p.name}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">{p.scenario}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-8 text-xs font-mono">
                  <span className="text-slate-400 hidden sm:inline">{p.school}</span>
                  <span className="text-emerald-400 font-bold">{p.profit}</span>
                  <span className="px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 font-bold border border-sky-500/20">
                    {p.score} ({p.grade})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

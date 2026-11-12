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
    <div className="min-h-screen flex flex-col bg-[#080B12] text-[#F3F7FC]">
      <AppNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FFB547]/15 border border-[#FFB547]/30 text-[#FFB547] text-xs font-mono font-bold mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>GLOBAL B-SCHOOL COHORT BENCHMARKS</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#F3F7FC]">Executive Leaderboard</h1>
            <p className="text-xs sm:text-sm text-[#9AA9BB] mt-1">
              Benchmark your operational margin, order fulfillment velocity, and capital discipline against top business school cohorts.
            </p>
          </div>

          <Link
            href="/scenarios/apex-beverages"
            className="px-4 py-2.5 rounded-xl bg-[#28D7F2] hover:bg-[#28D7F2]/90 text-[#080B12] font-black text-xs self-start sm:self-auto transition-all shadow-glow-cyan"
          >
            Compete in Apex Beverages
          </Link>
        </div>

        <div className="bg-[#151F2D] border border-[#263447] rounded-2xl overflow-hidden shadow-card-industrial">
          <div className="px-6 py-4 bg-[#101722] border-b border-[#263447] flex items-center justify-between text-xs font-bold text-[#9AA9BB] uppercase tracking-wider font-mono">
            <span>Rank & Student</span>
            <div className="flex items-center space-x-8">
              <span>B-School</span>
              <span>Net Profit</span>
              <span>Score</span>
            </div>
          </div>

          <div className="divide-y divide-[#263447]">
            {topPerformers.map(p => (
              <div key={p.rank} className="px-6 py-4 flex items-center justify-between hover:bg-[#1B2838] transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs font-mono ${
                    p.rank === 1 ? 'bg-[#FFB547]/20 text-[#FFB547] border border-[#FFB547]/40 shadow-sm' :
                    p.rank === 2 ? 'bg-[#28D7F2]/20 text-[#28D7F2] border border-[#28D7F2]/40' :
                    p.rank === 3 ? 'bg-[#9875FF]/20 text-[#9875FF] border border-[#9875FF]/40' :
                    'bg-[#101722] text-[#9AA9BB] border border-[#263447]'
                  }`}>
                    #{p.rank}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#F3F7FC]">{p.name}</h4>
                    <span className="text-[10px] text-[#627387] font-mono">{p.scenario}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-8 text-xs font-mono">
                  <span className="text-[#9AA9BB] hidden sm:inline">{p.school}</span>
                  <span className="text-[#39E58C] font-black">{p.profit}</span>
                  <span className="px-2.5 py-1 rounded bg-[#28D7F2]/10 text-[#28D7F2] font-black border border-[#28D7F2]/25">
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

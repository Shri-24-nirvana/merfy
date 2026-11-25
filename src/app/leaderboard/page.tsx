'use client';

import React from 'react';
import { AppNavbar } from '@/components/shared/AppNavbar';
import { Trophy, Medal, Award, Flame, Users, ArrowUpRight, Sparkles, Crown } from 'lucide-react';
import Link from 'next/link';

export default function LeaderboardPage() {
  const topPerformers = [
    { rank: 1, name: 'Arjun Mehta', school: 'IIM Ahmedabad', scenario: 'Apex Beverages', score: 98, profit: '$34,200', grade: 'A+' },
    { rank: 2, name: 'Sophia Chen', school: 'INSEAD Singapore', scenario: 'Apex Beverages', score: 95, profit: '$31,500', grade: 'A+' },
    { rank: 3, name: 'Rohan Sharma', school: 'FMS Delhi', scenario: 'Apex Beverages', score: 92, profit: '$28,900', grade: 'A' },
    { rank: 4, name: 'Elena Rostova', school: 'London Business School', scenario: 'Apex Beverages', score: 89, profit: '$26,100', grade: 'A' },
    { rank: 5, name: 'Devika Patel', school: 'XLRI Jamshedpur', scenario: 'Apex Beverages', score: 87, profit: '$24,500', grade: 'A' },
  ];

  const rankColors = ['text-amber-600', 'text-slate-500', 'text-orange-600'];
  const rankBg = ['bg-amber-50 border-amber-200', 'bg-slate-50 border-slate-200', 'bg-orange-50 border-orange-200'];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20">
      <AppNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-50 border-2 border-amber-200 text-amber-700 text-xs font-bold">
            <Trophy className="w-4 h-4" />
            <span>GLOBAL B-SCHOOL COHORT RANKINGS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800">Executive Leaderboard</h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Benchmark your performance against top business school cohorts worldwide.
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4">
          {topPerformers.slice(0, 3).map((p, i) => (
            <div
              key={p.rank}
              className={`rounded-3xl border-2 p-4 text-center space-y-2 ${i === 0 ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 shadow-lg' : rankBg[i]}`}
            >
              <div className={`text-2xl font-black ${rankColors[i]}`}>
                {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
              </div>
              <div>
                <div className="font-black text-slate-800 text-sm">{p.name}</div>
                <div className="text-[11px] text-slate-500">{p.school}</div>
              </div>
              <div className={`text-xl font-black ${rankColors[i]}`}>{p.score}</div>
              <div className="text-xs text-emerald-700 font-bold">{p.profit}</div>
              <div className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-black ${i === 0 ? 'bg-amber-200 text-amber-800' : 'bg-slate-200 text-slate-700'}`}>
                {p.grade}
              </div>
            </div>
          ))}
        </div>

        {/* Full Table */}
        <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b-2 border-slate-100 flex items-center justify-between">
            <h2 className="font-black text-slate-800">All Rankings</h2>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Users className="w-4 h-4" />
              <span>247 students</span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {topPerformers.map((p) => (
              <div key={p.rank} className="flex items-center justify-between px-6 py-4 hover:bg-indigo-50/40 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center ${
                    p.rank === 1 ? 'bg-amber-100 text-amber-700'
                    : p.rank === 2 ? 'bg-slate-100 text-slate-600'
                    : p.rank === 3 ? 'bg-orange-100 text-orange-700'
                    : 'bg-slate-50 text-slate-500'
                  }`}>
                    {p.rank}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">{p.name}</div>
                    <div className="text-xs text-slate-400">{p.school}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="hidden sm:block text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                    {p.scenario}
                  </span>
                  <span className="text-sm font-bold text-emerald-700">{p.profit}</span>
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black ${
                    p.grade === 'A+' ? 'bg-emerald-100 text-emerald-700'
                    : p.grade === 'A' ? 'bg-blue-100 text-blue-700'
                    : 'bg-amber-100 text-amber-700'
                  }`}>
                    {p.grade}
                  </span>
                  <span className="font-black text-indigo-700 w-8 text-right">{p.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-black text-sm shadow-md hover:shadow-lg transition-shadow"
          >
            <Sparkles className="w-4 h-4" />
            <span>Improve Your Ranking</span>
          </Link>
        </div>
      </main>
    </div>
  );
}

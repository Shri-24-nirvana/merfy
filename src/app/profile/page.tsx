'use client';

import React from 'react';
import { AppNavbar } from '@/components/shared/AppNavbar';
import { User, Award, Shield, CheckCircle2, TrendingUp, Sparkles, BookOpen, Layers, Flame, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const competencies = [
    { name: 'Bottleneck Identification & Line Balancing', score: 92, color: 'from-indigo-400 to-purple-400' },
    { name: 'Supply Chain & Raw Material Buffer Control', score: 89, color: 'from-emerald-400 to-teal-400' },
    { name: 'Capital Allocation & CapEx Evaluation', score: 86, color: 'from-blue-400 to-indigo-400' },
    { name: 'Earliest Due Date (EDD) Fulfillment Discipline', score: 95, color: 'from-amber-400 to-orange-400' },
    { name: 'Working Capital & Treasury Solvency Control', score: 82, color: 'from-pink-400 to-rose-400' },
  ];

  const achievements = [
    { icon: '🏆', label: 'First Simulation', desc: 'Completed Apex Beverages', color: 'from-amber-50 to-yellow-50 border-amber-200' },
    { icon: '🔥', label: '7-Day Streak', desc: 'Practiced 7 days in a row', color: 'from-orange-50 to-red-50 border-orange-200' },
    { icon: '💰', label: 'Profit Master', desc: 'Earned $25k+ in one run', color: 'from-emerald-50 to-teal-50 border-emerald-200' },
    { icon: '⚡', label: 'Speed Manager', desc: 'Finished in under 15 min', color: 'from-indigo-50 to-purple-50 border-indigo-200' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20">
      <AppNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Profile Hero */}
        <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-2xl shadow-lg">
              SM
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black text-slate-800">Student Manager</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border-2 border-indigo-200 text-xs font-bold">Level 3 Executive</span>
            </div>
            <p className="text-sm text-slate-500">MBA Candidate · Operations & Supply Chain specialization</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              {[
                { icon: Flame, label: '7 day streak', color: 'text-orange-600 bg-orange-50 border-orange-200' },
                { icon: Zap, label: '1,250 XP', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
                { icon: Award, label: '3 runs', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
              ].map(stat => (
                <div key={stat.label} className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border-2 text-xs font-bold ${stat.color}`}>
                  <stat.icon className="w-3.5 h-3.5" />
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl px-6 py-4">
            <div className="text-3xl font-black text-indigo-700">87</div>
            <div className="text-xs text-slate-500 font-semibold">Avg Score</div>
            <div className="text-sm font-black text-emerald-600 mt-1">Grade A</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Competencies */}
          <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 space-y-4">
            <h2 className="font-black text-slate-800 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              <span>Competency Scores</span>
            </h2>
            <div className="space-y-3">
              {competencies.map(comp => (
                <div key={comp.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-semibold truncate pr-2">{comp.name}</span>
                    <span className="font-black text-slate-800 flex-shrink-0">{comp.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${comp.color} transition-all`}
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 space-y-4">
            <h2 className="font-black text-slate-800 flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Achievements</span>
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map(a => (
                <div key={a.label} className={`bg-gradient-to-br ${a.color} border-2 rounded-2xl p-3 text-center space-y-1`}>
                  <div className="text-2xl">{a.icon}</div>
                  <div className="text-xs font-black text-slate-800">{a.label}</div>
                  <div className="text-[10px] text-slate-500">{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-black text-sm shadow-md hover:shadow-lg transition-shadow"
          >
            <Sparkles className="w-4 h-4" />
            <span>Continue Learning</span>
          </Link>
        </div>
      </main>
    </div>
  );
}

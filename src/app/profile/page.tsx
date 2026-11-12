'use client';

import React from 'react';
import { AppNavbar } from '@/components/shared/AppNavbar';
import { User, Award, Shield, CheckCircle2, TrendingUp, Sparkles, BookOpen, Layers } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const competencies = [
    { name: 'Capacity & Bottleneck Management', score: 88 },
    { name: 'Supply Chain & Raw Material Buffering', score: 92 },
    { name: 'Capital Allocation & CapEx Evaluation', score: 85 },
    { name: 'Order Fulfillment & SLA Discipline', score: 94 },
    { name: 'Working Capital & Solvency Control', score: 79 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-surface border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xl">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-sky-500/20">
            SM
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-bold text-slate-100">Student Manager</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-mono font-bold">
                Operations Associate
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Department of Business Administration • MBA Operations Track
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-300 font-mono">
              <span>Completed Runs: <strong className="text-emerald-400">2</strong></span>
              <span>•</span>
              <span>Avg Efficiency: <strong className="text-sky-400">89%</strong></span>
              <span>•</span>
              <span>Placement Ready: <strong className="text-emerald-400">Yes</strong></span>
            </div>
          </div>
        </div>

        {/* Competencies Breakdown */}
        <div className="bg-surface border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-100 flex items-center space-x-2">
            <Award className="w-4 h-4 text-sky-400" />
            <span>Practical Management Competencies Demonstrated</span>
          </h2>

          <div className="space-y-4 pt-2">
            {competencies.map(c => (
              <div key={c.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">{c.name}</span>
                  <span className="text-sky-400 font-mono font-bold">{c.score}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-sky-500"
                    style={{ width: `${c.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

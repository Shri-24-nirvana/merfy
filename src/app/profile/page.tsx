'use client';

import React from 'react';
import { AppNavbar } from '@/components/shared/AppNavbar';
import { User, Award, Shield, CheckCircle2, TrendingUp, Sparkles, BookOpen, Layers } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const competencies = [
    { name: 'Bottleneck Identification & Line Balancing', score: 92 },
    { name: 'Supply Chain & Raw Material Buffer Control', score: 89 },
    { name: 'Capital Allocation & CapEx Evaluation', score: 86 },
    { name: 'Earliest Due Date (EDD) Fulfillment Discipline', score: 95 },
    { name: 'Working Capital & Treasury Solvency Control', score: 82 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#080B12] text-[#F3F7FC]">
      <AppNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-[#151F2D] border border-[#263447] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-card-industrial">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#28D7F2] to-[#9875FF] flex items-center justify-center text-[#080B12] font-black text-2xl shadow-glow-cyan">
            SM
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black text-[#F3F7FC]">Student Manager</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#28D7F2]/10 text-[#28D7F2] border border-[#28D7F2]/30 text-xs font-mono font-bold">
                Operations Associate • Tier 1
              </span>
            </div>
            <p className="text-xs text-[#9AA9BB]">
              Master of Business Administration (MBA) • Operations & Manufacturing Strategy
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#9AA9BB] font-mono">
              <span>Completed Runs: <strong className="text-[#39E58C]">2</strong></span>
              <span>•</span>
              <span>Avg Efficiency: <strong className="text-[#28D7F2]">91%</strong></span>
              <span>•</span>
              <span>Placement Ready: <strong className="text-[#39E58C]">Certified</strong></span>
            </div>
          </div>
        </div>

        {/* Competencies Breakdown */}
        <div className="bg-[#151F2D] border border-[#263447] rounded-2xl p-6 space-y-4 shadow-card-industrial">
          <h2 className="text-base font-bold text-[#F3F7FC] flex items-center space-x-2 font-mono">
            <Award className="w-4 h-4 text-[#28D7F2]" />
            <span>Practical Management Competencies Demonstrated</span>
          </h2>

          <div className="space-y-4 pt-2">
            {competencies.map(c => (
              <div key={c.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono font-semibold">
                  <span className="text-[#F3F7FC]">{c.name}</span>
                  <span className="text-[#28D7F2]">{c.score}%</span>
                </div>
                <div className="w-full bg-[#080B12] rounded-full h-2.5 overflow-hidden border border-[#263447]">
                  <div
                    className="h-full rounded-full bg-[#28D7F2] transition-all duration-500 shadow-glow-cyan"
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

'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppNavbar } from '@/components/shared/AppNavbar';
import { getScenarioById } from '@/scenarios/registry';
import {
  Clock, Target, Users, BookOpen, Zap, ArrowRight, Play, ChevronLeft,
  Trophy, AlertTriangle, CheckCircle2, Lightbulb, TrendingUp,
} from 'lucide-react';

const DIFFICULTY_CONFIG: Record<string, { color: string; bg: string; border: string; label: string }> = {
  Easy: { color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'EASY' },
  Medium: { color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', label: 'MEDIUM' },
  Hard: { color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', label: 'HARD' },
  Advanced: { color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200', label: 'ADVANCED' },
};

interface ScenarioBriefingClientProps {
  scenarioId: string;
}

export default function ScenarioBriefingClient({ scenarioId }: ScenarioBriefingClientProps) {
  const router = useRouter();
  const scenario = getScenarioById(scenarioId);

  if (!scenario || !scenario.config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center text-slate-500">
        <AlertTriangle className="w-10 h-10 text-red-500 mb-3" />
        <p className="text-sm font-bold text-slate-700">Scenario not found: {scenarioId}</p>
        <Link href="/dashboard" className="mt-4 text-indigo-600 hover:underline text-xs font-bold">← Back to Dashboard</Link>
      </div>
    );
  }

  const cfg = scenario.config;
  const diff = DIFFICULTY_CONFIG[scenario.difficulty] || DIFFICULTY_CONFIG.Medium;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20">
      <AppNavbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">

        {/* Back */}
        <Link href="/dashboard" className="inline-flex items-center space-x-1.5 text-slate-400 hover:text-indigo-600 text-xs font-bold transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back to Scenarios</span>
        </Link>

        {/* Hero Header */}
        <div
          className="relative bg-white border-2 border-slate-100 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-sm"
          style={{ borderColor: `${scenario.imageAccent}40` }}
        >
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-30"
            style={{ background: scenario.imageAccent }}
          />

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${diff.bg} ${diff.color} ${diff.border}`}>
                  {diff.label}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                  {scenario.domain}
                </span>
                {scenario.status === 'PLAYABLE' && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ✓ Playable
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-800">{scenario.name}</h1>
              <p className="text-sm font-semibold" style={{ color: scenario.imageAccent }}>Role: {scenario.role}</p>
              <p className="text-sm text-slate-500 leading-relaxed max-w-lg">{scenario.description}</p>

              <div className="flex items-center space-x-4 text-xs text-slate-400">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{scenario.duration}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Target className="w-3.5 h-3.5" />
                  <span>{scenario.keyMetric}</span>
                </span>
              </div>
            </div>

            <div className="flex-shrink-0">
              {scenario.status === 'PLAYABLE' ? (
                <Link
                  href={`/simulation/${scenarioId}`}
                  className="flex items-center space-x-2 px-6 py-3 rounded-2xl text-white font-black text-sm shadow-lg hover:shadow-xl transition-all"
                  style={{ background: `linear-gradient(135deg, ${scenario.imageAccent}, ${scenario.imageAccent}BB)` }}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Launch Simulation</span>
                </Link>
              ) : (
                <div className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-400 font-bold text-sm border-2 border-slate-200">
                  🔒 Coming Soon
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Learning Objectives */}
          {cfg.learningObjectives && cfg.learningObjectives.length > 0 && (
            <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 space-y-4 shadow-sm">
              <h2 className="font-black text-slate-800 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                <span>Learning Objectives</span>
              </h2>
              <ul className="space-y-2">
                {cfg.learningObjectives.map((obj: string, i: number) => (
                  <li key={i} className="flex items-start space-x-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Strategic Paths */}
          {cfg.strategicPaths && cfg.strategicPaths.length > 0 && (
            <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 space-y-4 shadow-sm">
              <h2 className="font-black text-slate-800 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <span>Strategic Approaches</span>
              </h2>
              <ul className="space-y-3">
                {cfg.strategicPaths.map((path: any, i: number) => (
                  <li key={i} className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-indigo-700 font-black text-xs flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{path.name}</div>
                      <div className="text-xs text-slate-500">{path.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Events Preview */}
          {cfg.scheduledEvents && cfg.scheduledEvents.length > 0 && (
            <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 space-y-4 shadow-sm">
              <h2 className="font-black text-slate-800 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>Expect These Events</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(cfg.scheduledEvents.map(e => e.type))).map((evt, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    {evt.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Supported Actions */}
          {cfg.supportedActions && cfg.supportedActions.length > 0 && (
            <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 space-y-4 shadow-sm">
              <h2 className="font-black text-slate-800 flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Available Strategic Actions</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {cfg.supportedActions.map((action, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {action.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        {scenario.status === 'PLAYABLE' && (
          <div
            className="rounded-3xl p-8 text-center space-y-4 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${scenario.imageAccent}18, ${scenario.imageAccent}08)`, borderColor: `${scenario.imageAccent}30`, borderWidth: 2, borderStyle: 'solid' }}
          >
            <h2 className="text-xl font-black text-slate-800">Ready to Start?</h2>
            <p className="text-sm text-slate-500">Make decisions. See consequences. Build real skills.</p>
            <Link
              href={`/simulation/${scenarioId}`}
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl text-white font-black text-sm shadow-lg hover:shadow-xl transition-all"
              style={{ background: `linear-gradient(135deg, ${scenario.imageAccent}, ${scenario.imageAccent}CC)` }}
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Launch Simulation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

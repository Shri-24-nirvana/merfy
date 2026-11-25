'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppNavbar } from '@/components/shared/AppNavbar';
import {
  Play, Trophy, Clock, Flame, Zap, Target, TrendingUp,
  BookOpen, ChevronRight, Star, Lock, Calendar, Award,
  Filter, Search, CheckCircle2, Circle, Sparkles,
  BarChart2, Users, Package, Truck, DollarSign, Megaphone,
  Building2, Factory, ShoppingBag,
} from 'lucide-react';
import { SCENARIO_CATALOG } from '@/scenarios/registry';

const DOMAIN_ICONS: Record<string, React.FC<{className?: string}>> = {
  Manufacturing: Factory,
  Retail: ShoppingBag,
  Marketing: Megaphone,
  'Human Resources': Users,
  Finance: DollarSign,
  Logistics: Truck,
  Hospitality: Building2,
  Operations: Package,
  Sales: BarChart2,
};

const DOMAIN_COLORS: Record<string, { bg: string; text: string; icon: string; border: string }> = {
  Manufacturing: { bg: '#DBEAFE', text: '#1D4ED8', icon: '#3B82F6', border: '#BFDBFE' },
  Retail:        { bg: '#FCE7F3', text: '#9D174D', icon: '#EC4899', border: '#FBCFE8' },
  Marketing:     { bg: '#FEE2E2', text: '#B91C1C', icon: '#EF4444', border: '#FECACA' },
  'Human Resources': { bg: '#F3E8FF', text: '#6D28D9', icon: '#8B5CF6', border: '#DDD6FE' },
  Finance:       { bg: '#FEF3C7', text: '#92400E', icon: '#F59E0B', border: '#FDE68A' },
  Logistics:     { bg: '#CFFAFE', text: '#0E7490', icon: '#06B6D4', border: '#A5F3FC' },
  Hospitality:   { bg: '#DCFCE7', text: '#065F46', icon: '#10B981', border: '#A7F3D0' },
  Operations:    { bg: '#FFF7ED', text: '#9A3412', icon: '#F97316', border: '#FED7AA' },
  Sales:         { bg: '#EEF2FF', text: '#3730A3', icon: '#6366F1', border: '#C7D2FE' },
};

const DIFF_CONFIG: Record<string, { label: string; cls: string; dot: string }> = {
  Easy:     { label: 'Easy',     cls: 'diff-easy',     dot: '#16A34A' },
  Medium:   { label: 'Medium',   cls: 'diff-medium',   dot: '#D97706' },
  Hard:     { label: 'Hard',     cls: 'diff-hard',     dot: '#DC2626' },
  Advanced: { label: 'Advanced', cls: 'diff-advanced', dot: '#7C3AED' },
};

const DAILY_CHALLENGE = SCENARIO_CATALOG.find(s => s.id === 'apex-beverages')!;

export default function StudentDashboardPage() {
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const domains = ['All', ...Array.from(new Set(SCENARIO_CATALOG.map(s => s.domain)))];

  const filtered = SCENARIO_CATALOG.filter(s => {
    const domainMatch = selectedDomain === 'All' || s.domain === selectedDomain;
    const searchMatch = !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase());
    return domainMatch && searchMatch;
  });

  const stats = [
    { label: 'Problems Solved', value: '3', icon: CheckCircle2, color: '#10B981', bg: '#DCFCE7' },
    { label: 'Current Streak', value: '7 days', icon: Flame, color: '#F97316', bg: '#FFF7ED' },
    { label: 'Total XP', value: '1,240', icon: Zap, color: '#6366F1', bg: '#EEF2FF' },
    { label: 'Rank', value: '#42', icon: Trophy, color: '#F59E0B', bg: '#FEF3C7' },
  ];

  return (
    <div className="min-h-screen bg-game-bg dot-grid">
      <AppNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-2xl">👋</span>
              <h1 className="text-2xl sm:text-3xl font-black text-text-game">Welcome back, Shail!</h1>
            </div>
            <p className="text-text-game-2 text-sm font-semibold">
              You have <span className="text-brand-indigo font-black">3 new problems</span> waiting. Keep your streak going! 🔥
            </p>
          </div>
          <Link href={`/scenarios/${DAILY_CHALLENGE.id}`}
            className="btn-game flex items-center space-x-2 bg-gradient-to-r from-brand-indigo to-brand-purple text-white px-5 py-3 text-sm shadow-btn-3d hover:shadow-game-indigo">
            <Flame className="w-4 h-4" />
            <span>Today's Challenge</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="stat-card">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: stat.bg }}>
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                </div>
                <div className="text-2xl font-black text-text-game">{stat.value}</div>
                <div className="text-xs font-semibold text-text-game-3 mt-0.5">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Daily Challenge Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-indigo via-brand-purple to-brand-pink p-6 sm:p-8 text-white shadow-game-lg">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full text-xs font-black tracking-wider">
                  🌟 DAILY CHALLENGE
                </div>
                <div className="bg-green-400/30 border border-green-300/50 px-3 py-1 rounded-full text-xs font-black text-green-200">
                  FEATURED
                </div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black">{DAILY_CHALLENGE.name}</h2>
                <p className="text-white/80 text-sm font-semibold mt-1">Role: {DAILY_CHALLENGE.role}</p>
              </div>
              <p className="text-white/70 text-sm max-w-xl leading-relaxed">{DAILY_CHALLENGE.description}</p>
              <div className="flex items-center space-x-4 text-xs text-white/70 font-semibold">
                <span className="flex items-center space-x-1"><Clock className="w-3.5 h-3.5" /><span>{DAILY_CHALLENGE.duration}</span></span>
                <span className="flex items-center space-x-1"><Target className="w-3.5 h-3.5" /><span>{DAILY_CHALLENGE.keyMetric}</span></span>
                <span className="flex items-center space-x-1"><Zap className="w-3.5 h-3.5" /><span>+150 XP</span></span>
              </div>
            </div>

            <div className="flex flex-col space-y-3 min-w-[180px]">
              <Link href={`/scenarios/${DAILY_CHALLENGE.id}`}
                className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-white text-brand-indigo font-black rounded-2xl shadow-game-md hover:shadow-game-lg hover:-translate-y-0.5 transition-all text-sm">
                <Play className="w-4 h-4 fill-current" />
                <span>Start Now</span>
              </Link>
              <div className="text-center text-xs text-white/60 font-semibold">
                Resets in 6h 32m 🕐
              </div>
            </div>
          </div>
        </div>

        {/* Problems List — LeetCode style */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-text-game">Problem Set</h2>
              <p className="text-xs text-text-game-3 font-semibold">{SCENARIO_CATALOG.length} business simulations across 9 domains</p>
            </div>

            {/* Search & Filter */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-game-3" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl border-2 border-game-border bg-white text-sm font-semibold text-text-game placeholder:text-text-game-3 focus:outline-none focus:border-brand-indigo transition-colors w-48"
                />
              </div>
            </div>
          </div>

          {/* Domain filter pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {domains.map(d => {
              const DomainIcon = d !== 'All' ? DOMAIN_ICONS[d] : Filter;
              const domClr = d !== 'All' ? DOMAIN_COLORS[d] : null;
              return (
                <button key={d} onClick={() => setSelectedDomain(d)}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border-2 ${
                    selectedDomain === d
                      ? 'border-brand-indigo bg-brand-indigo text-white shadow-game-md'
                      : 'border-game-border bg-white text-text-game-2 hover:border-brand-indigo/40 hover:text-brand-indigo'
                  }`}>
                  {DomainIcon && <DomainIcon className="w-3.5 h-3.5" />}
                  <span>{d}</span>
                </button>
              );
            })}
          </div>

          {/* Problem Table — LeetCode style */}
          <div className="bg-white rounded-3xl border-2 border-game-border shadow-game overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 px-5 py-3 border-b-2 border-game-border bg-game-bg text-[11px] font-black text-text-game-3 uppercase tracking-wider">
              <div className="col-span-1">Status</div>
              <div className="col-span-4">Problem</div>
              <div className="col-span-2">Domain</div>
              <div className="col-span-1">Diff</div>
              <div className="col-span-2 hidden md:block">Duration</div>
              <div className="col-span-2">Action</div>
            </div>

            {/* Problem Rows */}
            {filtered.map((scenario, idx) => {
              const DomClr = DOMAIN_COLORS[scenario.domain];
              const DiffCfg = DIFF_CONFIG[scenario.difficulty];
              const DomainIcon = DOMAIN_ICONS[scenario.domain] || Package;
              const isCompleted = idx === 0; // Mock: first one completed

              return (
                <div key={scenario.id}
                  className="grid grid-cols-12 px-5 py-4 items-center border-b border-game-border/60 hover:bg-game-bg/50 transition-colors group">

                  {/* Status */}
                  <div className="col-span-1">
                    {isCompleted
                      ? <CheckCircle2 className="w-5 h-5 text-brand-green" />
                      : <Circle className="w-5 h-5 text-game-border-strong group-hover:text-brand-indigo/40 transition-colors" />
                    }
                  </div>

                  {/* Problem Name */}
                  <div className="col-span-4 pr-4">
                    <div className="font-black text-text-game text-sm group-hover:text-brand-indigo transition-colors">{scenario.name}</div>
                    <div className="text-[11px] text-text-game-3 font-semibold mt-0.5">Role: {scenario.role}</div>
                  </div>

                  {/* Domain */}
                  <div className="col-span-2">
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-lg text-[11px] font-bold border"
                      style={{ background: DomClr?.bg, color: DomClr?.text, borderColor: DomClr?.border }}>
                      <DomainIcon className="w-3 h-3" />
                      <span className="hidden sm:inline">{scenario.domain}</span>
                    </span>
                  </div>

                  {/* Difficulty */}
                  <div className="col-span-1">
                    <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-lg text-[11px] font-bold ${DiffCfg.cls}`}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: DiffCfg.dot }} />
                      <span className="hidden sm:inline">{DiffCfg.label}</span>
                    </span>
                  </div>

                  {/* Duration */}
                  <div className="col-span-2 hidden md:flex items-center space-x-1 text-[11px] text-text-game-3 font-semibold">
                    <Clock className="w-3 h-3" />
                    <span>{scenario.duration}</span>
                  </div>

                  {/* Action */}
                  <div className="col-span-2 md:col-span-2">
                    <Link href={`/scenarios/${scenario.id}`}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-black bg-brand-indigo/10 text-brand-indigo hover:bg-brand-indigo hover:text-white transition-all border border-brand-indigo/20 hover:border-brand-indigo">
                      <Play className="w-3 h-3 fill-current" />
                      <span>Solve</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

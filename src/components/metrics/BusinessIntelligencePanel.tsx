'use client';

import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Layers,
  Gauge,
  Activity,
  Package,
  Zap,
  Clock,
  Sparkles,
} from 'lucide-react';
import { SimulationState } from '@/types/simulation';

interface BusinessIntelligencePanelProps {
  state: SimulationState;
}

export const BusinessIntelligencePanel: React.FC<BusinessIntelligencePanelProps> = ({ state }) => {
  const { business, production, inventory, orders, snapshots, currentDay, objectives } = state;

  const chartData = useMemo(() => {
    if (!snapshots || snapshots.length === 0) return [];
    return snapshots.slice(-24).map(s => ({
      name: `D${s.day}`,
      cash: s.cash,
      profit: s.profit,
      production: s.productionRate,
      raw: s.inventoryRaw,
      finished: s.inventoryFinished,
    }));
  }, [snapshots]);

  const daysRemaining = Math.max(0, (objectives.maxDays || 7) - currentDay);

  return (
    <div className="w-full bg-white border-t lg:border-t-0 lg:border-l-2 border-slate-100 flex flex-col h-full overflow-y-auto p-4 space-y-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-100 pb-2.5">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center">
            <Activity className="w-4 h-4 text-indigo-600" />
          </div>
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Business Intelligence
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
          ● Live
        </span>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-100 rounded-2xl p-3">
          <div className="text-[10px] text-slate-500 font-semibold flex items-center space-x-1 mb-1">
            <DollarSign className="w-3 h-3 text-emerald-600" />
            <span>Gross Revenue</span>
          </div>
          <div className="text-base font-black text-emerald-700">
            ${Math.round(business.revenue).toLocaleString()}
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-100 rounded-2xl p-3">
          <div className="text-[10px] text-slate-500 font-semibold flex items-center space-x-1 mb-1">
            <TrendingDown className="w-3 h-3 text-amber-600" />
            <span>Total Expenses</span>
          </div>
          <div className="text-base font-black text-amber-700">
            ${Math.round(business.expenses).toLocaleString()}
          </div>
        </div>

        <div className={`border-2 rounded-2xl p-3 ${business.profit >= 0 ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100' : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-100'}`}>
          <div className="text-[10px] text-slate-500 font-semibold flex items-center space-x-1 mb-1">
            <TrendingUp className={`w-3 h-3 ${business.profit >= 0 ? 'text-indigo-600' : 'text-red-500'}`} />
            <span>Net Profit</span>
          </div>
          <div className={`text-base font-black ${business.profit >= 0 ? 'text-indigo-700' : 'text-red-600'}`}>
            ${Math.round(business.profit).toLocaleString()}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-100 rounded-2xl p-3">
          <div className="text-[10px] text-slate-500 font-semibold flex items-center space-x-1 mb-1">
            <Gauge className="w-3 h-3 text-purple-600" />
            <span>Total Assets</span>
          </div>
          <div className="text-base font-black text-purple-700">
            ${Math.round(business.totalAssets).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Utilization gauge */}
      <div className="bg-white border-2 border-slate-100 rounded-2xl p-3.5 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 flex items-center">
            <Zap className="w-3.5 h-3.5 mr-1.5 text-amber-500" /> Capacity Utilization
          </span>
          <span className="font-mono font-black text-indigo-600">
            {production.utilizationRate}%
          </span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              production.utilizationRate > 80
                ? 'bg-gradient-to-r from-emerald-400 to-teal-400'
                : production.utilizationRate > 50
                ? 'bg-gradient-to-r from-indigo-400 to-blue-400'
                : 'bg-gradient-to-r from-amber-400 to-orange-400'
            }`}
            style={{ width: `${production.utilizationRate}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-500">
          <div>
            Output: <strong className="text-slate-800">{production.currentHourlyRate} b/h</strong>
          </div>
          <div>
            Capacity: <strong className="text-slate-800">{production.currentDailyCapacity} b/d</strong>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white border-2 border-slate-100 rounded-2xl p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700">Cash Trajectory</span>
          <span className="text-[10px] text-slate-400 font-mono">24-tick window</span>
        </div>

        <div className="h-28 w-full">
          {chartData.length > 1 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="cashGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={9} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={9} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderColor: '#E2E8F0',
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: '#1E1E2E',
                    boxShadow: '0 4px 16px rgba(99,102,241,0.12)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cash"
                  stroke="#6366F1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#cashGrad)"
                  name="Cash ($)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-slate-400">
              Collecting telemetry…
            </div>
          )}
        </div>
      </div>

      {/* Pipeline health */}
      <div className="bg-white border-2 border-slate-100 rounded-2xl p-3.5 space-y-2 text-xs">
        <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
          Operations Pipeline
        </div>

        {[
          { label: 'Raw Materials', value: `${inventory.rawMaterials.quantity.toLocaleString()} units`, color: 'text-orange-600' },
          { label: 'Finished Bottles', value: `${inventory.finishedGoods.quantity.toLocaleString()} bottles`, color: 'text-emerald-600' },
          { label: 'Total Produced', value: `${production.totalUnitsProduced.toLocaleString()}`, color: 'text-indigo-600' },
          { label: 'Days Remaining', value: `${daysRemaining} days`, color: 'text-amber-600' },
        ].map(item => (
          <div key={item.label} className="flex items-center justify-between text-slate-500">
            <span>{item.label}:</span>
            <span className={`font-bold ${item.color}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

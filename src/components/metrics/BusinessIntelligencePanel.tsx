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
} from 'lucide-react';
import { SimulationState } from '@/types/simulation';

interface BusinessIntelligencePanelProps {
  state: SimulationState;
}

export const BusinessIntelligencePanel: React.FC<BusinessIntelligencePanelProps> = ({ state }) => {
  const { business, production, inventory, orders, snapshots } = state;

  const chartData = useMemo(() => {
    if (!snapshots || snapshots.length === 0) return [];
    return snapshots.slice(-20).map(s => ({
      name: `D${s.day} ${s.tick % 24}h`,
      cash: s.cash,
      profit: s.profit,
      production: s.productionRate,
      raw: s.inventoryRaw,
      finished: s.inventoryFinished,
    }));
  }, [snapshots]);

  return (
    <div className="w-full bg-surface border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col h-full overflow-y-auto p-4 space-y-4 select-none">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-sky-400" />
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Business Intelligence & Telemetry
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
          Autorun Sync
        </span>
      </div>

      {/* Financial Health KPI Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
          <div className="text-[10px] text-slate-400 flex items-center space-x-1 mb-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cumulative Revenue</span>
          </div>
          <div className="text-base font-bold font-mono text-emerald-400">
            ${Math.round(business.revenue).toLocaleString()}
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
          <div className="text-[10px] text-slate-400 flex items-center space-x-1 mb-1">
            <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
            <span>Total Expenses</span>
          </div>
          <div className="text-base font-bold font-mono text-amber-400">
            ${Math.round(business.expenses).toLocaleString()}
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
          <div className="text-[10px] text-slate-400 flex items-center space-x-1 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
            <span>Net Operating Profit</span>
          </div>
          <div
            className={`text-base font-bold font-mono ${
              business.profit >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            ${Math.round(business.profit).toLocaleString()}
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
          <div className="text-[10px] text-slate-400 flex items-center space-x-1 mb-1">
            <Gauge className="w-3.5 h-3.5 text-indigo-400" />
            <span>Total Enterprise Assets</span>
          </div>
          <div className="text-base font-bold font-mono text-indigo-300">
            ${Math.round(business.totalAssets).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Production & Machine Utilization KPIs */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 flex items-center">
            <Zap className="w-3.5 h-3.5 mr-1.5 text-sky-400" /> Plant Capacity Utilization
          </span>
          <span className="font-mono font-bold text-sky-400">
            {production.utilizationRate}%
          </span>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full rounded-full bg-sky-500 transition-all duration-300"
            style={{ width: `${production.utilizationRate}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-mono text-slate-400">
          <div>
            Hourly Output: <span className="text-slate-100">{production.currentHourlyRate} b/h</span>
          </div>
          <div>
            Daily Rated: <span className="text-slate-100">{production.currentDailyCapacity} b/d</span>
          </div>
        </div>
      </div>

      {/* Live Financial History Trend Chart */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300">Cash Flow & Capital Trend</span>
          <span className="text-[10px] text-slate-400 font-mono">Recent 20 Ticks</span>
        </div>

        <div className="h-32 w-full">
          {chartData.length > 1 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748B" fontSize={9} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={9} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#151B23',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cash"
                  stroke="#38BDF8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCash)"
                  name="Cash ($)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-slate-500">
              Gathering simulation runtime telemetry...
            </div>
          )}
        </div>
      </div>

      {/* Inventory & Order Fulfillment Summary */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-2 text-xs">
        <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
          Warehouse & Pipeline Balance
        </div>

        <div className="flex items-center justify-between text-slate-400">
          <span>Raw Stock Ratio:</span>
          <span className="font-mono text-slate-200 font-semibold">
            {inventory.rawMaterials.quantity.toLocaleString()} units
          </span>
        </div>

        <div className="flex items-center justify-between text-slate-400">
          <span>Finished Stock:</span>
          <span className="font-mono text-emerald-400 font-semibold">
            {inventory.finishedGoods.quantity.toLocaleString()} bottles
          </span>
        </div>

        <div className="flex items-center justify-between text-slate-400">
          <span>Active Contracts:</span>
          <span className="font-mono text-sky-400 font-semibold">
            {orders.filter(o => o.status === 'IN_PRODUCTION').length} Active
          </span>
        </div>
      </div>
    </div>
  );
};

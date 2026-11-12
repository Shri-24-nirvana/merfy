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
      name: `D${s.day} ${s.tick % 24}h`,
      cash: s.cash,
      profit: s.profit,
      production: s.productionRate,
      raw: s.inventoryRaw,
      finished: s.inventoryFinished,
    }));
  }, [snapshots]);

  const daysRemaining = Math.max(0, (objectives.maxDays || 7) - currentDay);

  return (
    <div className="w-full bg-[#151F2D] border-t lg:border-t-0 lg:border-l border-[#263447] flex flex-col h-full overflow-y-auto p-4 space-y-4 select-none">
      <div className="flex items-center justify-between border-b border-[#263447] pb-2.5">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-[#28D7F2]" />
          <h4 className="text-xs font-bold text-[#F3F7FC] uppercase tracking-wider font-mono">
            Executive Business Intelligence
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#101722] text-[#39E58C] border border-[#263447]">
          Live SCADA Stream
        </span>
      </div>

      {/* Primary Financial KPI 4-Card Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-[#101722] border border-[#263447] rounded-xl p-3 shadow-card-industrial">
          <div className="text-[10px] text-[#9AA9BB] font-mono flex items-center space-x-1 mb-1">
            <DollarSign className="w-3.5 h-3.5 text-[#39E58C]" />
            <span>Gross Revenue</span>
          </div>
          <div className="text-base font-black font-mono text-[#39E58C]">
            ${Math.round(business.revenue).toLocaleString()}
          </div>
        </div>

        <div className="bg-[#101722] border border-[#263447] rounded-xl p-3 shadow-card-industrial">
          <div className="text-[10px] text-[#9AA9BB] font-mono flex items-center space-x-1 mb-1">
            <TrendingDown className="w-3.5 h-3.5 text-[#FFB547]" />
            <span>Total Expenses</span>
          </div>
          <div className="text-base font-black font-mono text-[#FFB547]">
            ${Math.round(business.expenses).toLocaleString()}
          </div>
        </div>

        <div className="bg-[#101722] border border-[#263447] rounded-xl p-3 shadow-card-industrial">
          <div className="text-[10px] text-[#9AA9BB] font-mono flex items-center space-x-1 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-[#28D7F2]" />
            <span>Net Operating Profit</span>
          </div>
          <div
            className={`text-base font-black font-mono ${
              business.profit >= 0 ? 'text-[#39E58C]' : 'text-[#FF5F6D]'
            }`}
          >
            ${Math.round(business.profit).toLocaleString()}
          </div>
        </div>

        <div className="bg-[#101722] border border-[#263447] rounded-xl p-3 shadow-card-industrial">
          <div className="text-[10px] text-[#9AA9BB] font-mono flex items-center space-x-1 mb-1">
            <Gauge className="w-3.5 h-3.5 text-[#9875FF]" />
            <span>Total Assets</span>
          </div>
          <div className="text-base font-black font-mono text-[#9875FF]">
            ${Math.round(business.totalAssets).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Production Rate & Utilization Gauge Card */}
      <div className="bg-[#101722] border border-[#263447] rounded-xl p-3.5 space-y-2.5 shadow-card-industrial">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#F3F7FC] flex items-center">
            <Zap className="w-3.5 h-3.5 mr-1.5 text-[#28D7F2]" /> Factory Capacity Utilization
          </span>
          <span className="font-mono font-black text-[#28D7F2]">
            {production.utilizationRate}%
          </span>
        </div>

        <div className="w-full bg-[#080B12] rounded-full h-2.5 overflow-hidden border border-[#263447]">
          <div
            className="h-full rounded-full bg-[#28D7F2] transition-all duration-300 shadow-glow-cyan"
            style={{ width: `${production.utilizationRate}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-mono text-[#9AA9BB]">
          <div>
            Hourly Output: <strong className="text-[#F3F7FC]">{production.currentHourlyRate} b/h</strong>
          </div>
          <div>
            Rated Output: <strong className="text-[#F3F7FC]">{production.currentDailyCapacity} b/d</strong>
          </div>
        </div>
      </div>

      {/* Live Financial Trend Area Chart */}
      <div className="bg-[#101722] border border-[#263447] rounded-xl p-3.5 space-y-2 shadow-card-industrial">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#F3F7FC] font-mono">Cash & Profit Trajectory</span>
          <span className="text-[10px] text-[#627387] font-mono">24 Ticks Window</span>
        </div>

        <div className="h-32 w-full">
          {chartData.length > 1 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="chartGlowCash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#28D7F2" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#28D7F2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#627387" fontSize={9} tickLine={false} />
                <YAxis stroke="#627387" fontSize={9} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#151F2D',
                    borderColor: '#263447',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#F3F7FC',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cash"
                  stroke="#28D7F2"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#chartGlowCash)"
                  name="Cash ($)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-[#627387] font-mono">
              Collecting simulation runtime telemetry...
            </div>
          )}
        </div>
      </div>

      {/* Shift Overview & Pipeline Counters */}
      <div className="bg-[#101722] border border-[#263447] rounded-xl p-3.5 space-y-2 text-xs font-mono shadow-card-industrial">
        <div className="text-[11px] font-bold text-[#F3F7FC] uppercase tracking-wider">
          Operations Pipeline Health
        </div>

        <div className="flex items-center justify-between text-[#9AA9BB]">
          <span>Raw Preforms on Hand:</span>
          <span className="font-bold text-[#F3F7FC]">
            {inventory.rawMaterials.quantity.toLocaleString()} units
          </span>
        </div>

        <div className="flex items-center justify-between text-[#9AA9BB]">
          <span>Finished Packaged Bottles:</span>
          <span className="font-bold text-[#39E58C]">
            {inventory.finishedGoods.quantity.toLocaleString()} bottles
          </span>
        </div>

        <div className="flex items-center justify-between text-[#9AA9BB]">
          <span>Lifetime Production:</span>
          <span className="font-bold text-[#28D7F2]">
            {production.totalUnitsProduced.toLocaleString()} bottles
          </span>
        </div>

        <div className="flex items-center justify-between text-[#9AA9BB]">
          <span>Remaining Shift Duration:</span>
          <span className="font-bold text-[#FFB547]">
            {daysRemaining} virtual days
          </span>
        </div>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SimulationState } from '@/types/simulation';
import {
  TrendingUp,
  DollarSign,
  Package,
  Truck,
  Users,
  Building2,
  Cpu,
  Target,
  BarChart3,
  Flame,
  Zap,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  Percent,
} from 'lucide-react';

interface DomainSimulationWorldProps {
  domain: string;
  state: SimulationState;
  onSelectMachine: (id: string) => void;
  selectedMachineId: string | null;
  onQuickAction?: () => void;
}

export const DomainSimulationWorld: React.FC<DomainSimulationWorldProps> = ({
  domain,
  state,
  onSelectMachine,
  selectedMachineId,
  onQuickAction,
}) => {
  const { business, production, inventory, orders, status, currentDay, speed } = state;
  const isRunning = status === 'RUNNING';

  // ==========================================
  // RETAIL SIMULATION: OmniMart Express
  // ==========================================
  if (domain === 'Retail') {
    return (
      <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden border-2 border-emerald-100 shadow-sm flex flex-col p-4 space-y-4">
        {/* Retail Top Status */}
        <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black text-slate-800">OMNIMART STORE #104 — LIVE FLOOR</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-600 font-mono">
            <span>Foot Traffic: <strong className="text-emerald-600">{isRunning ? '142 shoppers/hr' : 'Store Closed'}</strong></span>
            <span>|</span>
            <span>Checkout Lanes: <strong className="text-indigo-600">4 Active</strong></span>
          </div>
        </div>

        {/* Supermarket Aisles & Checkout Simulation */}
        <div className="flex-1 min-h-[300px] bg-gradient-to-b from-emerald-50/40 to-slate-50 rounded-2xl border-2 border-emerald-100 p-4 flex flex-col justify-between relative overflow-hidden">
          {/* Supermarket Aisles with Stock Levels */}
          <div className="grid grid-cols-4 gap-3 z-10">
            {['Beverages & Snacks', 'Fresh Produce', 'Packaged Goods', 'Clearance Endcap'].map((aisle, i) => (
              <div key={aisle} className="bg-white rounded-xl border border-emerald-200 p-2.5 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                  <span>Aisle {i + 1}</span>
                  <span className="text-[9px] text-emerald-600 font-mono">94% Stock</span>
                </div>
                <div className="text-[10px] text-slate-500 font-semibold truncate">{aisle}</div>
                {/* Visual Shelf Display with items */}
                <div className="h-10 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-around px-1">
                  {[...Array(6)].map((_, j) => (
                    <motion.div
                      key={j}
                      className="w-2.5 h-7 rounded-xs bg-emerald-500/80 shadow-xs"
                      animate={isRunning ? { scaleY: [1, 0.9, 1] } : {}}
                      transition={{ duration: 1.5 + (j * 0.2), repeat: Infinity }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Checkout POS Lanes with Moving Shopping Carts */}
          <div className="bg-white rounded-xl border-2 border-emerald-200 p-3 shadow-xs space-y-2 z-10">
            <div className="flex items-center justify-between text-xs font-black text-slate-700">
              <span>🛒 Active Checkout Counter & Barcode Scanners</span>
              <span className="text-emerald-700 font-mono">Scanning Rate: {production.currentHourlyRate} items/hr</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map(lane => (
                <div key={lane} className="bg-emerald-50/60 rounded-lg p-2 border border-emerald-200 flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-500 text-white flex items-center justify-center font-black text-[10px]">
                    L{lane}
                  </div>
                  <div className="flex-1 text-[10px] font-semibold text-slate-600">
                    <div>Basket Size: <strong>$42.50</strong></div>
                    <div className="text-emerald-600 font-mono">Status: {isRunning ? 'Scanning' : 'Standby'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lower Retail Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Store Treasury</div>
            <div className="text-lg font-black text-emerald-600 font-mono">${Math.round(business.cash).toLocaleString()}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Inventory GMROI</div>
            <div className="text-lg font-black text-indigo-600 font-mono">3.4x · Healthy</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Stockout Rate</div>
            <div className="text-lg font-black text-amber-600 font-mono">1.8% · Low Risk</div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // MARKETING SIMULATION: ViralWave Energy
  // ==========================================
  if (domain === 'Marketing') {
    return (
      <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden border-2 border-pink-100 shadow-sm flex flex-col p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-pink-100 pb-2">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
            <span className="text-xs font-black text-slate-800">VIRALWAVE DIGITAL GROWTH TERMINAL</span>
          </div>
          <div className="text-xs font-bold text-pink-600 font-mono">
            Blended ROAS: <strong>3.85x Target</strong>
          </div>
        </div>

        {/* Conversion Funnel Simulation Canvas */}
        <div className="flex-1 min-h-[300px] bg-gradient-to-b from-pink-50/40 to-slate-50 rounded-2xl border-2 border-pink-100 p-4 flex flex-col justify-between">
          <div className="text-xs font-black text-slate-700">📊 Live Omnichannel Acquisition Funnel</div>

          {/* Funnel Stages */}
          <div className="space-y-2 py-2">
            {[
              { stage: '1. Ad Impressions', count: '1,420,000', width: '100%', color: 'from-pink-400 to-rose-400' },
              { stage: '2. Landing Page Clicks', count: '58,400 (4.1% CTR)', width: '75%', color: 'from-pink-500 to-rose-500' },
              { stage: '3. Add to Cart', count: '8,920 (15.2% CVR)', width: '48%', color: 'from-indigo-500 to-purple-500' },
              { stage: '4. Paid Purchases', count: `${inventory.finishedGoods.quantity} Orders`, width: '28%', color: 'from-emerald-500 to-teal-500' },
            ].map(f => (
              <div key={f.stage} className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-700">
                  <span>{f.stage}</span>
                  <span className="font-mono text-slate-900">{f.count}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden border border-slate-200">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${f.color}`}
                    style={{ width: f.width }}
                    animate={isRunning ? { opacity: [0.9, 1, 0.9] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Ad Channel Allocation */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            {[
              { ch: 'Meta Ads', spend: '40%', roas: '4.1x' },
              { ch: 'Google Search', spend: '30%', roas: '4.8x' },
              { ch: 'TikTok Viral', spend: '20%', roas: '3.2x' },
              { ch: 'Influencer Collabs', spend: '10%', roas: '2.9x' },
            ].map(c => (
              <div key={c.ch} className="bg-white rounded-lg p-2 border border-pink-200 text-center">
                <div className="text-[10px] font-black text-slate-700">{c.ch}</div>
                <div className="text-xs font-mono font-bold text-pink-600">{c.spend} budget</div>
                <div className="text-[9px] text-emerald-600 font-mono font-bold">{c.roas} ROAS</div>
              </div>
            ))}
          </div>
        </div>

        {/* Lower Marketing KPIs */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Customer CAC</div>
            <div className="text-lg font-black text-pink-600 font-mono">$18.40</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Customer LTV</div>
            <div className="text-lg font-black text-emerald-600 font-mono">$72.00 (3.9x)</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Marketing Treasury</div>
            <div className="text-lg font-black text-indigo-600 font-mono">${Math.round(business.cash).toLocaleString()}</div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // LOGISTICS SIMULATION: SwiftCargo Fleet
  // ==========================================
  if (domain === 'Logistics') {
    return (
      <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden border-2 border-cyan-100 shadow-sm flex flex-col p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-cyan-100 pb-2">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-black text-slate-800">SWIFTCARGO DISPATCH CONTROL & FLEET HUB</span>
          </div>
          <div className="text-xs font-bold text-cyan-700 font-mono">
            On-Time Delivery Rate: <strong>98.2%</strong>
          </div>
        </div>

        {/* Regional Hub Map Simulation Canvas */}
        <div className="flex-1 min-h-[300px] bg-gradient-to-b from-cyan-50/40 via-slate-50 to-white rounded-2xl border-2 border-cyan-100 p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-black text-slate-700">
            <span>🗺 4-Hub Regional Cross-Dock Network</span>
            <span className="text-cyan-700 font-mono font-bold">Active Fleet: 12 Electric Semis</span>
          </div>

          {/* Regional Hub Nodes on Map */}
          <div className="grid grid-cols-4 gap-3 my-auto">
            {['Hub A: Northern Terminal', 'Hub B: Metro Central', 'Hub C: Coastal Port', 'Hub D: Southern Cross'].map((hub, i) => (
              <div key={hub} className="bg-white rounded-xl border-2 border-cyan-200 p-3 shadow-xs space-y-1.5 relative">
                <div className="w-8 h-8 rounded-lg bg-cyan-500 text-white flex items-center justify-center font-black text-xs">
                  H{i + 1}
                </div>
                <div className="text-xs font-black text-slate-800 truncate">{hub}</div>
                <div className="text-[10px] text-slate-500">Staged Freight: <strong>{420 + i * 180} pallets</strong></div>
                {/* Truck departing animation */}
                {isRunning && (
                  <motion.div
                    className="flex items-center space-x-1 text-[9px] font-bold text-cyan-600 pt-1"
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>In Transit...</span>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Route Status Strip */}
          <div className="bg-white rounded-xl border border-cyan-200 p-2.5 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-600 font-sans font-bold">Active Transit Corridors:</span>
            <span className="text-emerald-600 font-bold">Route 101: Clear</span>
            <span className="text-cyan-600 font-bold">Corridor 4B: On Schedule</span>
            <span className="text-indigo-600 font-bold">Port Rail: Dispatched</span>
          </div>
        </div>

        {/* Lower Fleet KPIs */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Operating Treasury</div>
            <div className="text-lg font-black text-cyan-600 font-mono">${Math.round(business.cash).toLocaleString()}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Fuel / Ton-Mile Cost</div>
            <div className="text-lg font-black text-emerald-600 font-mono">$0.082 · Optimized</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Pending Shipments</div>
            <div className="text-lg font-black text-amber-600 font-mono">{orders.length} Consignments</div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // HUMAN RESOURCES SIMULATION: TalentForge Tech
  // ==========================================
  if (domain === 'Human Resources') {
    return (
      <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden border-2 border-purple-100 shadow-sm flex flex-col p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-purple-100 pb-2">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-xs font-black text-slate-800">TALENTFORGE WORKFORCE & HIRING PIPELINE</span>
          </div>
          <div className="text-xs font-bold text-purple-700 font-mono">
            Engineering Morale: <strong>94% High</strong>
          </div>
        </div>

        {/* Hiring & Org Floor Simulation Canvas */}
        <div className="flex-1 min-h-[300px] bg-gradient-to-b from-purple-50/40 to-slate-50 rounded-2xl border-2 border-purple-100 p-4 flex flex-col justify-between">
          <div className="text-xs font-black text-slate-700">🏢 Department Headcounts & Pod Capacity</div>

          {/* Department Pods */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { dept: 'Platform & Backend', count: '24 / 28', pct: 86, color: 'from-purple-500 to-indigo-500' },
              { dept: 'AI & Machine Learning', count: '18 / 20', pct: 90, color: 'from-indigo-500 to-blue-500' },
              { dept: 'Product & Design', count: '12 / 12', pct: 100, color: 'from-emerald-500 to-teal-500' },
            ].map(p => (
              <div key={p.dept} className="bg-white rounded-xl border border-purple-200 p-3 space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>{p.dept}</span>
                  <span className="font-mono text-purple-700">{p.count}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${p.color}`} style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Recruitment Pipeline Funnel */}
          <div className="bg-white rounded-xl border border-purple-200 p-3 space-y-2">
            <div className="text-xs font-black text-slate-700">🎯 Candidate Pipeline This Quarter</div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-purple-50 rounded-lg p-2"><div className="font-mono font-black text-purple-700 text-sm">240</div><div className="text-[10px] text-slate-500">Screened</div></div>
              <div className="bg-indigo-50 rounded-lg p-2"><div className="font-mono font-black text-indigo-700 text-sm">52</div><div className="text-[10px] text-slate-500">Technical Round</div></div>
              <div className="bg-blue-50 rounded-lg p-2"><div className="font-mono font-black text-blue-700 text-sm">18</div><div className="text-[10px] text-slate-500">Offers Out</div></div>
              <div className="bg-emerald-50 rounded-lg p-2"><div className="font-mono font-black text-emerald-700 text-sm">14</div><div className="text-[10px] text-slate-500">Onboarded</div></div>
            </div>
          </div>
        </div>

        {/* Lower HR KPIs */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Payroll Budget</div>
            <div className="text-lg font-black text-purple-600 font-mono">${Math.round(business.cash).toLocaleString()}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Attrition Risk</div>
            <div className="text-lg font-black text-emerald-600 font-mono">3.2% · Low</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Time to Fill</div>
            <div className="text-lg font-black text-amber-600 font-mono">22 Days</div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // FINANCE SIMULATION: FinCorp Capital
  // ==========================================
  if (domain === 'Finance') {
    return (
      <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden border-2 border-amber-100 shadow-sm flex flex-col p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-amber-100 pb-2">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-black text-slate-800">FINCORP TREASURY & LIQUIDITY MONITOR</span>
          </div>
          <div className="text-xs font-bold text-amber-700 font-mono">
            Quick Ratio: <strong>1.82 (Safe)</strong>
          </div>
        </div>

        {/* Financial Terminal Canvas */}
        <div className="flex-1 min-h-[300px] bg-gradient-to-b from-amber-50/40 to-slate-50 rounded-2xl border-2 border-amber-100 p-4 flex flex-col justify-between">
          <div className="text-xs font-black text-slate-700">💼 Treasury Liquidity Reserve & Cash Runway</div>

          {/* Liquidity Waterfall */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl border border-amber-200 p-3 space-y-1">
              <div className="text-[10px] font-bold text-slate-500">Operating Cash</div>
              <div className="text-xl font-black text-emerald-600 font-mono">${Math.round(business.cash).toLocaleString()}</div>
              <div className="text-[10px] text-emerald-700">Liquid Reserves</div>
            </div>
            <div className="bg-white rounded-xl border border-amber-200 p-3 space-y-1">
              <div className="text-[10px] font-bold text-slate-500">Short-Term Receivables</div>
              <div className="text-xl font-black text-indigo-600 font-mono">${Math.round(business.revenue * 0.4).toLocaleString()}</div>
              <div className="text-[10px] text-slate-400">Due within 30 days</div>
            </div>
            <div className="bg-white rounded-xl border border-amber-200 p-3 space-y-1">
              <div className="text-[10px] font-bold text-slate-500">Current Liabilities</div>
              <div className="text-xl font-black text-amber-600 font-mono">${Math.round(business.expenses * 0.3).toLocaleString()}</div>
              <div className="text-[10px] text-slate-400">Accounts Payable</div>
            </div>
          </div>

          {/* Debt Covenants Monitor */}
          <div className="bg-white rounded-xl border border-amber-200 p-3 space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Debt Service Coverage Ratio (DSCR):</span>
              <span className="font-mono text-emerald-600 font-black">2.45x (Covenant: &gt; 1.35x)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: '85%' }} />
            </div>
          </div>
        </div>

        {/* Lower Treasury KPIs */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Cash Runway</div>
            <div className="text-lg font-black text-emerald-600 font-mono">18.4 Months</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Working Capital</div>
            <div className="text-lg font-black text-indigo-600 font-mono">${Math.round(business.totalAssets * 0.6).toLocaleString()}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Net Profit Margin</div>
            <div className="text-lg font-black text-amber-600 font-mono">{business.revenue > 0 ? Math.round((business.profit / business.revenue) * 100) : 0}%</div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // ENTERPRISE SAAS SIMULATION: CloudScale SaaS
  // ==========================================
  if (domain === 'Sales') {
    return (
      <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden border-2 border-indigo-100 shadow-sm flex flex-col p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-black text-slate-800">CLOUDSCALE ENTERPRISE PIPELINE & ARR</span>
          </div>
          <div className="text-xs font-bold text-indigo-700 font-mono">
            Pipeline Value: <strong>$1.45M ARR</strong>
          </div>
        </div>

        {/* Enterprise Deal Board */}
        <div className="flex-1 min-h-[300px] bg-gradient-to-b from-indigo-50/40 to-slate-50 rounded-2xl border-2 border-indigo-100 p-4 flex flex-col justify-between">
          <div className="text-xs font-black text-slate-700">💼 Opportunity Stages & Deal Velocity</div>

          {/* Deal Stage Columns */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { stage: 'Discovery', deals: 8, arr: '$320k', color: 'border-indigo-200 bg-indigo-50/50' },
              { stage: 'Technical Demo', deals: 5, arr: '$450k', color: 'border-purple-200 bg-purple-50/50' },
              { stage: 'Proposal / Pricing', deals: 4, arr: '$380k', color: 'border-amber-200 bg-amber-50/50' },
              { stage: 'Closed Won', deals: orders.filter(o => o.status === 'FULFILLED').length + 2, arr: '$300k', color: 'border-emerald-200 bg-emerald-50/50' },
            ].map(col => (
              <div key={col.stage} className={`rounded-xl border p-2.5 space-y-1 ${col.color}`}>
                <div className="text-[11px] font-black text-slate-800">{col.stage}</div>
                <div className="text-sm font-black font-mono text-indigo-700">{col.arr}</div>
                <div className="text-[10px] text-slate-500 font-semibold">{col.deals} Opportunities</div>
              </div>
            ))}
          </div>

          {/* Quota Attainment Thermometer */}
          <div className="bg-white rounded-xl border border-indigo-200 p-3 space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Quarterly Sales Quota Attainment:</span>
              <span className="font-mono text-indigo-700 font-black">92% of $1.2M Target</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: '92%' }} />
            </div>
          </div>
        </div>

        {/* Lower SaaS KPIs */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">ARR Revenue</div>
            <div className="text-lg font-black text-indigo-600 font-mono">${Math.round(business.revenue).toLocaleString()}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Win Rate</div>
            <div className="text-lg font-black text-emerald-600 font-mono">38.4%</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Net Retention Rate</div>
            <div className="text-lg font-black text-purple-600 font-mono">118% (Best in Class)</div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // OPERATIONS / STEEL MILL SIMULATION: Vulcan Steelworks
  // ==========================================
  if (domain === 'Operations') {
    const isProducing = isRunning && production.activeMachinesCount > 0;
    return (
      <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden border-2 border-orange-100 shadow-sm flex flex-col p-4 space-y-4">
        {/* Steelworks Top Status */}
        <div className="flex items-center justify-between border-b border-orange-100 pb-2">
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isProducing ? 'bg-orange-500 animate-pulse' : 'bg-slate-300'}`} />
            <span className="text-xs font-black text-slate-800">VULCAN BLAST FURNACE & ROLLING MILL #4</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-bold text-orange-700 font-mono">
            <span>Furnace Core: <strong className="text-red-600">{isProducing ? '1,640°C' : 'Standby 420°C'}</strong></span>
            <span>|</span>
            <span>Casting Speed: <strong className="text-orange-600">1.8 m/min</strong></span>
          </div>
        </div>

        {/* Industrial Steelworks Arena */}
        <div className="flex-1 min-h-[300px] bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 rounded-2xl border-2 border-orange-200 p-4 flex flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(249,115,22,0.15),transparent_60%)] pointer-events-none" />

          {/* Upper Furnace & Continuous Caster Row */}
          <div className="grid grid-cols-12 gap-3 items-center z-10">
            {/* 1. Blast Furnace & Molten Ladle */}
            <div className="col-span-4 bg-slate-800/80 border border-orange-500/30 rounded-xl p-3 flex flex-col items-center relative">
              <span className="text-[10px] font-black text-orange-400 uppercase tracking-wider mb-2">🔥 Blast Furnace Silo</span>
              <div className="relative w-24 h-28 rounded-t-full bg-gradient-to-b from-slate-700 via-slate-800 to-orange-950 border-2 border-orange-500/50 flex flex-col items-center justify-end overflow-hidden p-1 shadow-lg">
                {/* Glowing Molten Iron Pool */}
                <motion.div
                  className="w-full h-14 rounded-b-lg bg-gradient-to-t from-orange-600 via-amber-500 to-yellow-300 shadow-inner"
                  animate={isProducing ? { opacity: [0.85, 1, 0.85], scaleY: [0.95, 1.05, 0.95] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div className="absolute bottom-1 text-[9px] font-mono font-black text-slate-900 bg-amber-200/90 px-1 rounded">
                  Molten Iron
                </div>
              </div>

              {/* Tapping spout with molten flow */}
              {isProducing && (
                <motion.div
                  className="w-2.5 h-6 bg-gradient-to-b from-yellow-300 via-orange-500 to-red-600 rounded-full shadow-md shadow-orange-500/80"
                  animate={{ scaleY: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              )}
            </div>

            {/* 2. Continuous Caster & Rolling Mill */}
            <div className="col-span-5 bg-slate-800/80 border border-slate-700 rounded-xl p-3 flex flex-col justify-between h-full">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>⚙ Continuous Slab Caster</span>
                <span className="text-orange-400 font-mono text-[9px]">Rollers: 4 Active</span>
              </span>

              {/* Glowing Red-Hot Steel Slab moving on rollers */}
              <div className="relative h-14 bg-slate-950 rounded-lg border border-slate-700 flex items-center px-2 overflow-hidden">
                {/* Rollers */}
                <div className="absolute inset-x-0 bottom-1 flex justify-around opacity-40">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full border border-slate-400 bg-slate-600" />
                  ))}
                </div>

                {/* Hot Glowing Steel Slab */}
                <motion.div
                  className="h-6 w-32 rounded bg-gradient-to-r from-red-600 via-orange-500 to-amber-300 shadow-lg shadow-orange-500/50 flex items-center justify-center font-mono font-black text-[9px] text-slate-900"
                  animate={isProducing ? { x: [0, 40, 0] } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  Hot Slab 1,180°C
                </motion.div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-1">
                <span>OEE: <strong className="text-emerald-400">89.4%</strong></span>
                <span>Yield: <strong className="text-orange-400">94.2%</strong></span>
                <span>Thermal: <strong className="text-amber-400">92.1%</strong></span>
              </div>
            </div>

            {/* 3. Finished Rolled Steel Coils */}
            <div className="col-span-3 bg-slate-800/80 border border-slate-700 rounded-xl p-3 flex flex-col items-center">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-wider mb-2">📦 Coils Staged</span>
              <div className="flex flex-col items-center space-y-1 py-1">
                <div className="flex space-x-1">
                  <div className="w-8 h-8 rounded-full border-4 border-slate-400 bg-slate-700 flex items-center justify-center shadow-md">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-4 border-slate-400 bg-slate-700 flex items-center justify-center shadow-md">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border-4 border-slate-400 bg-slate-700 flex items-center justify-center shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                </div>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 font-bold mt-1">
                {inventory.finishedGoods.quantity.toLocaleString()} Tons Ready
              </div>
            </div>
          </div>

          {/* Plant Safety & Thermal Efficiency Banner */}
          <div className="bg-slate-800/90 rounded-xl border border-orange-500/30 p-2.5 flex items-center justify-between text-xs z-10">
            <span className="text-slate-300 font-bold">Safety Compliance: <strong className="text-emerald-400 font-mono">100% Incident Free</strong></span>
            <span className="text-slate-300 font-bold">Scheduled Shutdown: <strong className="text-amber-400 font-mono">Day 14 PM</strong></span>
            <span className="text-slate-300 font-bold">Slag Basicity: <strong className="text-orange-400 font-mono">1.18 B2</strong></span>
          </div>
        </div>

        {/* Lower Steelworks KPIs */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Operating Treasury</div>
            <div className="text-lg font-black text-orange-600 font-mono">${Math.round(business.cash).toLocaleString()}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Finished Coils / Slabs</div>
            <div className="text-lg font-black text-emerald-600 font-mono">{inventory.finishedGoods.quantity.toLocaleString()} Tons</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Raw Iron Ore / Coke</div>
            <div className="text-lg font-black text-slate-700 font-mono">{inventory.rawMaterials.quantity.toLocaleString()} un.</div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // HOSPITALITY SIMULATION: Grand Azure Resort
  // ==========================================
  if (domain === 'Hospitality') {
    return (
      <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden border-2 border-teal-100 shadow-sm flex flex-col p-4 space-y-4">
        {/* Hospitality Top Status */}
        <div className="flex items-center justify-between border-b border-teal-100 pb-2">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-xs font-black text-slate-800">GRAND AZURE RESORT & CONVENTION PALACE</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-bold text-teal-700 font-mono">
            <span>Dynamic RevPAR: <strong className="text-teal-600">$248.50</strong></span>
            <span>|</span>
            <span>Guest NPS: <strong className="text-emerald-600">+74 (World Class)</strong></span>
          </div>
        </div>

        {/* Resort Floor & Suites Simulation Canvas */}
        <div className="flex-1 min-h-[300px] bg-gradient-to-b from-teal-50/40 via-sky-50/20 to-slate-50 rounded-2xl border-2 border-teal-100 p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-black text-slate-700">
            <span>🏨 10-Floor Oceanfront Luxury Tower Occupancy Grid</span>
            <span className="text-teal-700 font-mono font-bold">Occupancy: 88% (264 / 300 Keys)</span>
          </div>

          {/* Interactive Hotel Suite Matrix */}
          <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5 my-2">
            {[...Array(30)].map((_, i) => {
              const isOccupied = i % 7 !== 0 && i % 11 !== 0;
              return (
                <motion.div
                  key={i}
                  className={`h-9 rounded-lg border p-1 flex flex-col justify-between transition-all ${
                    isOccupied
                      ? 'bg-amber-100/80 border-amber-300 text-amber-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                  animate={isRunning && isOccupied ? { opacity: [0.9, 1, 0.9] } : {}}
                  transition={{ duration: 2 + (i * 0.1), repeat: Infinity }}
                >
                  <div className="flex justify-between items-center text-[8px] font-mono font-bold">
                    <span>#{101 + i}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isOccupied ? 'bg-amber-500' : 'bg-slate-300'}`} />
                  </div>
                  <div className="text-[7px] font-black uppercase truncate">
                    {isOccupied ? 'Occupied' : 'Vacant'}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Banquet & Event Spaces */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="bg-white rounded-xl border border-teal-200 p-2 text-center">
              <div className="text-[10px] font-bold text-slate-700">Ocean Ballroom</div>
              <div className="text-xs font-mono font-black text-teal-600">Tech Gala Summit</div>
              <div className="text-[9px] text-emerald-600 font-bold font-mono">100% Booked · $42k</div>
            </div>
            <div className="bg-white rounded-xl border border-teal-200 p-2 text-center">
              <div className="text-[10px] font-bold text-slate-700">Palm Grand Pavilion</div>
              <div className="text-xs font-mono font-black text-indigo-600">Wedding Banquet</div>
              <div className="text-[9px] text-emerald-600 font-bold font-mono">92% Booked · $28k</div>
            </div>
            <div className="bg-white rounded-xl border border-teal-200 p-2 text-center">
              <div className="text-[10px] font-bold text-slate-700">Azure Infinity Lounge</div>
              <div className="text-xs font-mono font-black text-amber-600">F&B Poolside Bar</div>
              <div className="text-[9px] text-emerald-600 font-bold font-mono">84% Capacity</div>
            </div>
          </div>
        </div>

        {/* Lower Hospitality KPIs */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Resort Treasury</div>
            <div className="text-lg font-black text-teal-600 font-mono">${Math.round(business.cash).toLocaleString()}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Average Daily Rate (ADR)</div>
            <div className="text-lg font-black text-indigo-600 font-mono">$282.00 / night</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Guest Satisfaction</div>
            <div className="text-lg font-black text-emerald-600 font-mono">4.9 / 5.0 (98%)</div>
          </div>
        </div>
      </div>
    );
  }

  // Default fallback for any other domain
  return null;
};

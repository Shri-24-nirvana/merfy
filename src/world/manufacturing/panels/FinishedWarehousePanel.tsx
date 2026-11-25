'use client';

import React from 'react';
import { Package, ChevronLeft, Layers, DollarSign, BarChart2, Archive } from 'lucide-react';
import { SimulationState } from '@/types/simulation';

interface FinishedWarehousePanelProps {
  state: SimulationState;
  onBack: () => void;
}

export const FinishedWarehousePanel: React.FC<FinishedWarehousePanelProps> = ({ state, onBack }) => {
  const { inventory, orders, production } = state;
  const fg = inventory.finishedGoods;

  const activeOrders = orders.filter(o => o.status === 'IN_PRODUCTION');
  const totalReserved = activeOrders.reduce((sum, o) => sum + Math.max(0, o.quantity - o.fulfilledQuantity), 0);
  const unallocated = Math.max(0, fg.quantity - totalReserved);
  const fgMax = 6000;
  const fgPercent = Math.min(100, Math.max(0, Math.round((fg.quantity / fgMax) * 100)));
  const inventoryValue = fg.quantity * fg.unitCost;

  return (
    <div className="flex flex-col h-full text-[#F3F7FC] overflow-y-auto">
      {/* Header */}
      <div className="px-4 py-3 bg-[#101722] border-b border-[#263447] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-[#39E58C]/15 border border-[#39E58C]/30 text-[#39E58C]">
            <Package className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#F3F7FC] font-mono tracking-tight">Finished Goods ASRS</h3>
            <p className="text-[10px] text-[#9AA9BB]">Automated Climate-Controlled Storage Rack</p>
          </div>
        </div>
        <button onClick={onBack} className="flex items-center space-x-1 text-[11px] font-mono text-[#9AA9BB] hover:text-[#28D7F2] transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Main Stock Display */}
        <div className="bg-[#0D1420] border border-[#263447] rounded-xl p-4">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-[10px] font-mono text-[#627387] uppercase tracking-wider">Total Stock</div>
              <div className="text-3xl font-black font-mono text-[#39E58C]">
                {fg.quantity.toLocaleString()}
                <span className="text-sm text-[#9AA9BB] font-normal ml-2">bottles</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-[#627387]">Bay Utilization</div>
              <div className="text-xl font-black font-mono text-[#F3F7FC]">{fgPercent}%</div>
            </div>
          </div>

          <div className="w-full bg-[#080B12] rounded-full h-3 border border-[#263447] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#39E58C] transition-all duration-500"
              style={{ width: `${fgPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] font-mono text-[#627387] mt-1">
            <span>Empty</span>
            <span>Max: {fgMax.toLocaleString()} bottles</span>
          </div>
        </div>

        {/* Allocation Breakdown */}
        <div className="bg-[#0D1420] border border-[#263447] rounded-xl p-3.5">
          <div className="flex items-center space-x-2 mb-3">
            <BarChart2 className="w-3.5 h-3.5 text-[#9875FF]" />
            <span className="text-xs font-bold font-mono text-[#F3F7FC]">Stock Allocation</span>
          </div>

          {/* Visual bars */}
          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-[11px] font-mono mb-1">
                <span className="text-[#9AA9BB]">Reserved for Orders</span>
                <span className="font-bold text-[#FFB547]">{Math.min(totalReserved, fg.quantity).toLocaleString()} bottles</span>
              </div>
              <div className="w-full bg-[#080B12] rounded-full h-2 border border-[#263447] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#FFB547]"
                  style={{ width: `${fg.quantity > 0 ? Math.min(100, (Math.min(totalReserved, fg.quantity) / fg.quantity) * 100) : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-mono mb-1">
                <span className="text-[#9AA9BB]">Unallocated Stock</span>
                <span className="font-bold text-[#39E58C]">{unallocated.toLocaleString()} bottles</span>
              </div>
              <div className="w-full bg-[#080B12] rounded-full h-2 border border-[#263447] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#39E58C]"
                  style={{ width: `${fg.quantity > 0 ? Math.min(100, (unallocated / fg.quantity) * 100) : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry */}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: 'Unit Cost', value: `$${fg.unitCost.toFixed(2)}`, color: '#28D7F2', Icon: DollarSign },
            { label: 'Inventory Value', value: `$${inventoryValue.toLocaleString()}`, color: '#39E58C', Icon: DollarSign },
            { label: 'Active Order Allocations', value: activeOrders.length.toString(), color: '#FFB547', Icon: Layers },
            { label: 'Production Rate', value: `${production.currentHourlyRate} b/h`, color: '#9875FF', Icon: Archive },
          ].map(item => (
            <div key={item.label} className="bg-[#0D1420] border border-[#263447] rounded-lg p-2.5">
              <div className="flex items-center space-x-1 mb-1">
                <item.Icon className="w-3 h-3" style={{ color: item.color }} />
                <span className="text-[9px] font-mono text-[#627387] uppercase tracking-wider">{item.label}</span>
              </div>
              <div className="text-sm font-black font-mono" style={{ color: item.color }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Active Orders Consuming Inventory */}
        {activeOrders.length > 0 && (
          <div className="bg-[#0D1420] border border-[#263447] rounded-xl p-3.5">
            <div className="text-[10px] font-mono text-[#627387] uppercase tracking-wider mb-2">Active Order Consumption</div>
            <div className="space-y-2">
              {activeOrders.map(order => {
                const remaining = order.quantity - order.fulfilledQuantity;
                const pct = Math.round((order.fulfilledQuantity / order.quantity) * 100);
                return (
                  <div key={order.id} className="text-xs font-mono">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[#F3F7FC] font-bold truncate max-w-[140px]">{order.customer}</span>
                      <span className="text-[#FFB547]">{remaining.toLocaleString()} needed</span>
                    </div>
                    <div className="w-full bg-[#080B12] h-1.5 rounded-full border border-[#263447] overflow-hidden">
                      <div className="h-full bg-[#9875FF] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


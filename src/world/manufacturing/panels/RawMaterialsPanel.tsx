'use client';

import React, { useState } from 'react';
import { Droplets, AlertTriangle, ShoppingCart, TrendingDown, ChevronLeft, Package } from 'lucide-react';
import { SimulationState } from '@/types/simulation';

interface RawMaterialsPanelProps {
  state: SimulationState;
  onDispatch: (cmd: { type: string; quantity?: number }) => void;
  onBack: () => void;
}

const REORDER_OPTIONS = [
  { label: '1,000 units', quantity: 1000, cost: 2000 },
  { label: '2,000 units', quantity: 2000, cost: 4000 },
  { label: '5,000 units', quantity: 5000, cost: 10000 },
];

export const RawMaterialsPanel: React.FC<RawMaterialsPanelProps> = ({ state, onDispatch, onBack }) => {
  const { inventory, production, business } = state;
  const rm = inventory.rawMaterials;
  const [orderQty, setOrderQty] = useState<number | null>(null);

  const rawMax = 8000;
  const rawPercent = Math.min(100, Math.max(0, Math.round((rm.quantity / rawMax) * 100)));
  const isLow = rm.quantity <= rm.reorderThreshold;
  const isCritical = rm.quantity <= rm.reorderThreshold * 0.5;

  // Estimate hours remaining at current production rate
  const hourlyConsumption = production.currentHourlyRate; // 1 raw material unit per bottle
  const hoursRemaining = hourlyConsumption > 0 ? Math.floor(rm.quantity / hourlyConsumption) : null;

  const handleOrder = (qty: number) => {
    const cost = qty * rm.unitCost;
    if (business.cash < cost) return;
    onDispatch({ type: 'ORDER_RAW_MATERIALS', quantity: qty });
  };

  return (
    <div className="flex flex-col h-full text-[#F3F7FC] overflow-y-auto">
      {/* Header */}
      <div className="px-4 py-3 bg-[#101722] border-b border-[#263447] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-[#28D7F2]/15 text-[#28D7F2]">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#F3F7FC] font-mono tracking-tight">Raw Materials Silo</h3>
            <p className="text-[10px] text-[#9AA9BB]">Natural Syrup · Citric Concentrate · PET Preforms</p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="flex items-center space-x-1 text-[11px] font-mono text-[#9AA9BB] hover:text-[#28D7F2] transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Alert Banner */}
        {isLow && (
          <div
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg border text-xs font-bold font-mono ${
              isCritical
                ? 'bg-[#FF5F6D]/15 border-[#FF5F6D]/50 text-[#FF5F6D] animate-pulse'
                : 'bg-[#FFB547]/15 border-[#FFB547]/50 text-[#FFB547]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{isCritical ? 'CRITICAL: Supply near depletion — reorder immediately!' : 'LOW STOCK: Below reorder threshold — reorder soon.'}</span>
          </div>
        )}

        {/* Silo Gauge */}
        <div className="bg-[#0D1420] border border-[#263447] rounded-xl p-3.5">
          <div className="flex items-end justify-between mb-2">
            <span className="text-[11px] font-mono text-[#9AA9BB] uppercase tracking-wider">Supply Reserve</span>
            <span className={`text-lg font-black font-mono ${isCritical ? 'text-[#FF5F6D]' : isLow ? 'text-[#FFB547]' : 'text-[#28D7F2]'}`}>
              {rm.quantity.toLocaleString()}
              <span className="text-xs font-normal text-[#9AA9BB] ml-1">{rm.unit}</span>
            </span>
          </div>

          <div className="w-full bg-[#080B12] rounded-full h-3 overflow-hidden border border-[#263447]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                rawPercent < 15 ? 'bg-[#FF5F6D]' : rawPercent < 35 ? 'bg-[#FFB547]' : 'bg-[#28D7F2]'
              }`}
              style={{ width: `${rawPercent}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] font-mono text-[#627387] mt-1">
            <span>0</span>
            <span>Reorder: {rm.reorderThreshold.toLocaleString()}</span>
            <span>{rawMax.toLocaleString()}</span>
          </div>
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: 'Unit Cost', value: `$${rm.unitCost.toFixed(2)}`, color: '#9AA9BB' },
            { label: 'Reorder Threshold', value: `${rm.reorderThreshold.toLocaleString()} ${rm.unit}`, color: '#FFB547' },
            {
              label: 'Hours Remaining',
              value: hoursRemaining !== null ? `~${hoursRemaining}h` : 'N/A (idle)',
              color: hoursRemaining !== null && hoursRemaining < 4 ? '#FF5F6D' : '#39E58C',
            },
            { label: 'Consumption Rate', value: hourlyConsumption > 0 ? `${hourlyConsumption} units/h` : 'Idle', color: '#28D7F2' },
          ].map(item => (
            <div key={item.label} className="bg-[#0D1420] border border-[#263447] rounded-lg p-2.5">
              <div className="text-[9px] font-mono text-[#627387] uppercase tracking-wider mb-1">{item.label}</div>
              <div className="text-xs font-bold font-mono" style={{ color: item.color }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Reorder Section */}
        <div className="bg-[#0D1420] border border-[#263447] rounded-xl p-3.5">
          <div className="flex items-center space-x-2 mb-3">
            <ShoppingCart className="w-3.5 h-3.5 text-[#28D7F2]" />
            <span className="text-xs font-bold font-mono text-[#F3F7FC]">Place Supply Order</span>
          </div>

          <div className="space-y-2">
            {REORDER_OPTIONS.map(opt => {
              const canAfford = business.cash >= opt.cost;
              return (
                <button
                  key={opt.quantity}
                  onClick={() => handleOrder(opt.quantity)}
                  disabled={!canAfford}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-mono transition-all ${
                    canAfford
                      ? 'bg-[#28D7F2]/10 border-[#28D7F2]/40 hover:bg-[#28D7F2]/20 text-[#28D7F2] cursor-pointer'
                      : 'bg-[#101722] border-[#263447]/50 text-[#627387] cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Package className="w-3 h-3" />
                    <span className="font-bold">{opt.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={canAfford ? 'text-[#39E58C]' : 'text-[#FF5F6D]'}>${opt.cost.toLocaleString()}</span>
                    {!canAfford && <span className="text-[9px] text-[#FF5F6D]">Insufficient</span>}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3 text-[10px] font-mono text-[#627387] flex items-center justify-between">
            <span>Available Cash:</span>
            <span className="text-[#39E58C] font-bold">${business.cash.toLocaleString()}</span>
          </div>
        </div>

        {/* Cost Analysis */}
        <div className="bg-[#0D1420] border border-[#263447] rounded-lg px-3 py-2.5 flex items-center space-x-2">
          <TrendingDown className="w-3.5 h-3.5 text-[#9875FF] flex-shrink-0" />
          <div>
            <div className="text-[10px] font-mono text-[#9AA9BB]">Inventory Carrying Value</div>
            <div className="text-xs font-bold text-[#9875FF] font-mono">
              ${(rm.quantity * rm.unitCost).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


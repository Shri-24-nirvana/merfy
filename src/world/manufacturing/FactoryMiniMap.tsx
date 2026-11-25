'use client';

import React, { useState } from 'react';
import { Map, ChevronDown, ChevronUp, Layers, Droplets, Zap, Wrench, Box, Package, Truck, Activity } from 'lucide-react';
import { SimulationState } from '@/types/simulation';

interface FactoryMiniMapProps {
  state: SimulationState;
  selectedStationId: string | null;
  onSelectStation: (stationId: string) => void;
}

export const FactoryMiniMap: React.FC<FactoryMiniMapProps> = ({
  state,
  selectedStationId,
  onSelectStation,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const { inventory, production, machines, orders, status } = state;

  const isRunning = status === 'RUNNING';
  const hasOutput = isRunning && production.currentHourlyRate > 0;
  const isRawLow = inventory.rawMaterials.quantity <= inventory.rawMaterials.reorderThreshold;

  const areas = [
    {
      id: 'raw_materials',
      name: 'Raw Silo',
      icon: Droplets,
      status: isRawLow ? 'warning' : 'ok',
      gridArea: 'col-span-2 row-span-1',
    },
    {
      id: 'bottle_supply',
      name: 'Preforms',
      icon: Activity,
      status: 'ok',
      gridArea: 'col-span-2 row-span-1',
    },
    {
      id: 'filling_line',
      name: 'Fill Lines',
      icon: Zap,
      status: hasOutput ? 'ok' : 'idle',
      gridArea: 'col-span-2 row-span-1',
    },
    {
      id: 'capping_station',
      name: 'Capper',
      icon: Wrench,
      status: hasOutput ? 'ok' : 'idle',
      gridArea: 'col-span-2 row-span-1',
    },
    {
      id: 'labelling_station',
      name: 'Labeler',
      icon: Layers,
      status: hasOutput ? 'ok' : 'idle',
      gridArea: 'col-span-2 row-span-1',
    },
    {
      id: 'packaging_unit',
      name: 'Packaging',
      icon: Box,
      status: hasOutput ? 'ok' : 'idle',
      gridArea: 'col-span-2 row-span-1',
    },
    {
      id: 'finished_warehouse',
      name: 'Warehouse',
      icon: Package,
      status: 'ok',
      gridArea: 'col-span-3 row-span-1',
    },
    {
      id: 'dispatch_dock',
      name: 'Freight Bay',
      icon: Truck,
      status: orders.some(o => o.status === 'IN_PRODUCTION') ? 'ok' : 'idle',
      gridArea: 'col-span-3 row-span-1',
    },
  ];

  const getStatusColor = (st: string) => {
    switch (st) {
      case 'ok':
        return 'bg-[#39E58C] shadow-glow-green';
      case 'warning':
        return 'bg-[#FFB547] animate-pulse';
      case 'error':
        return 'bg-[#FF5F6D] animate-pulse';
      default:
        return 'bg-[#627387]';
    }
  };

  return (
    <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start select-none">
      <div className="bg-[#101722]/95 backdrop-blur-md border border-[#263447] rounded-xl shadow-card-industrial overflow-hidden w-64">
        {/* MiniMap Title Bar */}
        <div
          onClick={() => setCollapsed(!collapsed)}
          className="px-3 py-2 bg-[#151F2D] flex items-center justify-between cursor-pointer border-b border-[#263447] text-xs font-mono font-bold text-[#F3F7FC]"
        >
          <div className="flex items-center space-x-2">
            <Map className="w-3.5 h-3.5 text-[#28D7F2]" />
            <span>Factory Mini-Map</span>
          </div>

          <button className="text-[#9AA9BB] hover:text-[#F3F7FC]">
            {collapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* MiniMap Floorplan Grid */}
        {!collapsed && (
          <div className="p-2.5 space-y-2">
            <div className="grid grid-cols-6 gap-1.5 h-28 bg-[#080B12] rounded-lg p-1.5 border border-[#263447] relative">
              {/* Production Flow Path Accent */}
              <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-0.5 bg-[#28D7F2]/20 pointer-events-none" />

              {areas.map(a => {
                const Icon = a.icon;
                const isSelected = selectedStationId === a.id;

                return (
                  <button
                    key={a.id}
                    onClick={() => onSelectStation(a.id)}
                    className={`${a.gridArea} p-1 rounded-md border flex flex-col items-center justify-center relative transition-all ${
                      isSelected
                        ? 'bg-[#1B2838] border-[#28D7F2] shadow-glow-cyan'
                        : 'bg-[#151F2D]/80 border-[#263447] hover:border-[#28D7F2]/50'
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(a.status)}`} />
                      <Icon className="w-2.5 h-2.5 text-[#28D7F2]" />
                    </div>
                    <span className="text-[8px] font-mono font-bold text-[#F3F7FC] mt-0.5 truncate w-full text-center">
                      {a.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-[#627387] px-1">
              <span className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#39E58C] mr-1" /> Active
              </span>
              <span className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB547] mr-1" /> Warning
              </span>
              <span className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#627387] mr-1" /> Standby
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench,
  ShoppingCart,
  Layers,
  History,
  Plus,
  Check,
  X,
  Truck,
  AlertTriangle,
  ArrowUpRight,
  DollarSign,
  PackageCheck,
  Bell,
  Sparkles,
  Zap,
  TrendingDown,
  Info,
} from 'lucide-react';
import { SimulationState, Order } from '@/types/simulation';
import { PlayerCommand, CommandExecutionResult } from '@/types/commands';

interface ManagementControlsPanelProps {
  state: SimulationState;
  onDispatch: (command: PlayerCommand) => CommandExecutionResult;
  onSelectMachine: (machineId: string) => void;
}

export const ManagementControlsPanel: React.FC<ManagementControlsPanelProps> = ({
  state,
  onDispatch,
  onSelectMachine,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'machinery' | 'inventory' | 'events' | 'history'>('orders');
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const [showPurchaseConfirm, setShowPurchaseConfirm] = useState(false);

  const { business, machines, orders, inventory, production, history, events, status } = state;
  const isTerminated = status === 'COMPLETED' || status === 'FAILED';

  const triggerCommand = (command: PlayerCommand) => {
    const res = onDispatch(command);
    setFeedbackMsg({
      text: res.message || res.error || 'Action executed',
      isError: !res.success,
    });
    setTimeout(() => {
      setFeedbackMsg(null);
    }, 4000);
  };

  const pendingOrders = orders.filter(o => o.status === 'PENDING');
  const activeOrders = orders.filter(o => o.status === 'IN_PRODUCTION');

  return (
    <div className="w-full bg-[#151F2D] border-t lg:border-t-0 lg:border-l border-[#263447] flex flex-col h-full overflow-hidden select-none">
      {/* Control Tabs Header */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2 border-b border-[#263447] bg-[#101722]/80 overflow-x-auto scrollbar-none">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all relative flex items-center space-x-1.5 ${
              activeTab === 'orders'
                ? 'bg-[#28D7F2] text-[#080B12] shadow-glow-cyan'
                : 'text-[#9AA9BB] hover:text-[#F3F7FC] hover:bg-[#1B2838]'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Orders</span>
            {pendingOrders.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#FFB547] text-[#080B12] text-[10px] font-black flex items-center justify-center animate-pulse">
                {pendingOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('machinery')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'machinery'
                ? 'bg-[#28D7F2] text-[#080B12] shadow-glow-cyan'
                : 'text-[#9AA9BB] hover:text-[#F3F7FC] hover:bg-[#1B2838]'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Equipment</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'inventory'
                ? 'bg-[#28D7F2] text-[#080B12] shadow-glow-cyan'
                : 'text-[#9AA9BB] hover:text-[#F3F7FC] hover:bg-[#1B2838]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Supply</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'events'
                ? 'bg-[#28D7F2] text-[#080B12] shadow-glow-cyan'
                : 'text-[#9AA9BB] hover:text-[#F3F7FC] hover:bg-[#1B2838]'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Events</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'history'
                ? 'bg-[#28D7F2] text-[#080B12] shadow-glow-cyan'
                : 'text-[#9AA9BB] hover:text-[#F3F7FC] hover:bg-[#1B2838]'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Decisions</span>
          </button>
        </div>
      </div>

      {/* Action Notification Alert Bar */}
      <AnimatePresence>
        {feedbackMsg && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`px-4 py-2 text-xs font-semibold flex items-center justify-between border-b ${
              feedbackMsg.isError
                ? 'bg-[#FF5F6D]/20 text-[#FF5F6D] border-[#FF5F6D]/40'
                : 'bg-[#39E58C]/20 text-[#39E58C] border-[#39E58C]/40'
            }`}
          >
            <span className="truncate">{feedbackMsg.text}</span>
            <button
              onClick={() => setFeedbackMsg(null)}
              className="text-[#9AA9BB] hover:text-[#F3F7FC] ml-2"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Tab Content Viewport */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#F3F7FC] uppercase tracking-wider font-mono">
                Customer Sales Commitments
              </h4>
              <span className="text-[11px] font-mono text-[#9AA9BB]">
                {orders.filter(o => o.status === 'FULFILLED').length} Completed / {orders.length} Total
              </span>
            </div>

            {/* Pending Proposals Waiting for Executive Decision */}
            {pendingOrders.length > 0 && (
              <div className="space-y-3">
                <div className="text-[11px] font-bold text-[#FFB547] uppercase tracking-wider flex items-center space-x-1.5 font-mono">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Awaiting Contract Decision</span>
                </div>

                {pendingOrders.map(order => (
                  <div
                    key={order.id}
                    className="bg-[#101722] border border-[#FFB547]/40 rounded-xl p-3.5 space-y-3 shadow-lg shadow-[#FFB547]/5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FFB547]/15 text-[#FFB547] border border-[#FFB547]/30">
                          {order.id}
                        </span>
                        <h5 className="text-sm font-bold text-[#F3F7FC] mt-1">{order.customer}</h5>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-black text-[#39E58C]">
                          ${(order.quantity * order.pricePerUnit).toLocaleString()}
                        </div>
                        <div className="text-[10px] text-[#9AA9BB] font-mono">
                          {order.quantity.toLocaleString()} @ ${order.pricePerUnit}/ea
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#9AA9BB] bg-[#080B12] px-3 py-2 rounded-lg border border-[#263447]">
                      <span>Delivery Deadline:</span>
                      <span className="font-mono font-bold text-[#FFB547]">
                        Day {order.deadlineDay} (in {Math.max(0, order.deadlineDay - state.currentDay)} days)
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => triggerCommand({ type: 'ACCEPT_ORDER', orderId: order.id })}
                        disabled={isTerminated}
                        className="py-2.5 px-3 rounded-xl bg-[#39E58C] hover:bg-[#39E58C]/90 text-[#080B12] font-black text-xs flex items-center justify-center space-x-1.5 transition-all disabled:opacity-40 shadow-glow-green"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept Contract</span>
                      </button>

                      <button
                        onClick={() => triggerCommand({ type: 'REJECT_ORDER', orderId: order.id })}
                        disabled={isTerminated}
                        className="py-2.5 px-3 rounded-xl bg-[#1B2838] hover:bg-[#263447] text-[#9AA9BB] hover:text-[#F3F7FC] font-semibold text-xs flex items-center justify-center space-x-1.5 transition-all disabled:opacity-40"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Active Contracts In Production */}
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-[#F3F7FC] uppercase tracking-wider font-mono">
                Active Contracts In Production
              </div>

              {activeOrders.length === 0 ? (
                <div className="text-xs text-[#627387] text-center py-5 bg-[#101722]/50 rounded-xl border border-[#263447]">
                  No active orders in production. Accept incoming proposals above.
                </div>
              ) : (
                activeOrders.map(order => {
                  const progressPct = Math.min(
                    100,
                    Math.round((inventory.finishedGoods.quantity / order.quantity) * 100)
                  );
                  const isReadyToDispatch = inventory.finishedGoods.quantity >= order.remainingQuantity;

                  return (
                    <div
                      key={order.id}
                      className="bg-[#101722] border border-[#263447] rounded-xl p-3.5 space-y-3 shadow-card-industrial"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#28D7F2]/10 text-[#28D7F2] border border-[#28D7F2]/25">
                            {order.id}
                          </span>
                          <span className="text-xs font-bold text-[#F3F7FC]">{order.customer}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#28D7F2]">
                          ${(order.quantity * order.pricePerUnit).toLocaleString()}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-[11px] text-[#9AA9BB] mb-1 font-mono">
                          <span>Finished Goods Ready:</span>
                          <span className="text-[#F3F7FC] font-bold">
                            {inventory.finishedGoods.quantity.toLocaleString()} / {order.quantity.toLocaleString()} ({progressPct}%)
                          </span>
                        </div>
                        <div className="w-full bg-[#080B12] rounded-full h-2 overflow-hidden border border-[#263447]">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isReadyToDispatch ? 'bg-[#39E58C]' : 'bg-[#28D7F2]'
                            }`}
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#9AA9BB] font-mono">
                        <span>Due Day {order.deadlineDay}</span>
                        {isReadyToDispatch ? (
                          <span className="text-[#39E58C] font-bold flex items-center">
                            <PackageCheck className="w-3.5 h-3.5 mr-1" /> Ready for Automated Dispatch
                          </span>
                        ) : (
                          <span className="text-[#FFB547] font-semibold">Bottling In Progress</span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MACHINERY & CAPEX INVESTMENTS */}
        {activeTab === 'machinery' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#F3F7FC] uppercase tracking-wider font-mono">
                Production Floor Machinery & CapEx
              </h4>
              <span className="text-[11px] font-mono text-[#28D7F2]">
                {machines.length} / 5 Lines Deployed
              </span>
            </div>

            {/* CapEx Procurement Card */}
            <div className="bg-[#101722] border border-[#28D7F2]/40 rounded-xl p-4 space-y-3 shadow-card-industrial">
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="text-sm font-bold text-[#F3F7FC]">Add Automated Bottling Line</h5>
                  <p className="text-xs text-[#9AA9BB] mt-0.5">
                    High-throughput rotary bottling system (+200 bottles/day)
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-black text-[#FFB547]">$20,000</div>
                  <div className="text-[10px] text-[#9AA9BB] font-mono">CapEx Investment</div>
                </div>
              </div>

              <div className="bg-[#080B12] rounded-lg p-2.5 border border-[#263447] text-[11px] font-mono space-y-1 text-[#9AA9BB]">
                <div className="flex justify-between">
                  <span>Current Daily Capacity:</span>
                  <span className="font-bold text-[#28D7F2]">
                    {production.currentDailyCapacity} bottles/day
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Post-Acquisition Capacity:</span>
                  <span className="font-bold text-[#39E58C]">
                    {production.currentDailyCapacity + 200} bottles/day
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Treasury Reserves:</span>
                  <span className="font-bold text-[#F3F7FC]">${Math.round(business.cash).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setShowPurchaseConfirm(true)}
                disabled={isTerminated || business.cash < 20000 || machines.length >= 5}
                className="w-full py-2.5 px-4 rounded-xl bg-[#28D7F2] hover:bg-[#28D7F2]/90 text-[#080B12] font-black text-xs flex items-center justify-center space-x-2 transition-all disabled:opacity-40 shadow-glow-cyan"
              >
                <Plus className="w-4 h-4" />
                <span>
                  {machines.length >= 5
                    ? 'Maximum Line Limit Reached (5)'
                    : business.cash < 20000
                    ? 'Insufficient Capital ($20,000 Required)'
                    : 'Deploy Bottling Line ($20,000)'}
                </span>
              </button>
            </div>

            {/* Active Lines List */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-[#9AA9BB] uppercase tracking-wider font-mono">
                Installed Machinery Telemetry
              </div>
              {machines.map(m => (
                <div
                  key={m.id}
                  onClick={() => onSelectMachine(m.id)}
                  className="cursor-pointer bg-[#101722] hover:bg-[#1B2838] border border-[#263447] hover:border-[#28D7F2]/60 rounded-xl p-3 flex items-center justify-between transition-all"
                >
                  <div className="flex items-center space-x-2.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        m.operating ? 'bg-[#39E58C] shadow-glow-green' : 'bg-[#627387]'
                      }`}
                    />
                    <div>
                      <div className="text-xs font-bold text-[#F3F7FC]">{m.name}</div>
                      <div className="text-[10px] text-[#9AA9BB] font-mono">
                        {m.productionCapacity} b/d • {Math.round(m.efficiency * 100)}% Reliability
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 bg-[#1B2838] text-[#28D7F2] rounded-md font-mono font-bold border border-[#263447]">
                    Inspect
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INVENTORY & SUPPLY CHAIN */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#F3F7FC] uppercase tracking-wider font-mono">
                Supply Chain & Storage Telemetry
              </h4>
            </div>

            {/* Raw Inventory Stock Card */}
            <div className="bg-[#101722] border border-[#263447] rounded-xl p-4 space-y-3 shadow-card-industrial">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-[#F3F7FC]">Raw Ingredients & Preforms</h5>
                  <p className="text-xs text-[#9AA9BB] mt-0.5">Syrup concentrates and bottle preforms</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-black text-[#28D7F2]">
                    {inventory.rawMaterials.quantity.toLocaleString()} units
                  </div>
                  <div className="text-[10px] text-[#9AA9BB] font-mono">
                    ${(inventory.rawMaterials.quantity * inventory.rawMaterials.unitCost).toLocaleString()} Valued
                  </div>
                </div>
              </div>

              {inventory.rawMaterials.quantity < inventory.rawMaterials.reorderThreshold && (
                <div className="p-3 rounded-lg bg-[#FFB547]/15 border border-[#FFB547]/40 text-[#FFB547] text-xs flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>Buffer stock below safety threshold! Reorder immediately to avoid line throttling.</span>
                </div>
              )}

              {/* Replenishment Action Batches */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-bold text-[#9AA9BB] uppercase tracking-wider font-mono">
                  Authorize Replenishment Batches
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => triggerCommand({ type: 'ORDER_RAW_MATERIALS', quantity: 2000 })}
                    disabled={isTerminated || business.cash < 4000}
                    className="py-2.5 px-3 rounded-xl bg-[#1B2838] hover:bg-[#263447] border border-[#263447] text-[#F3F7FC] text-xs font-bold flex flex-col items-center justify-center transition-all disabled:opacity-40 shadow-sm"
                  >
                    <span>+2,000 Units</span>
                    <span className="text-[10px] font-mono text-[#39E58C] mt-0.5">$4,000</span>
                  </button>

                  <button
                    onClick={() => triggerCommand({ type: 'ORDER_RAW_MATERIALS', quantity: 4000 })}
                    disabled={isTerminated || business.cash < 8000}
                    className="py-2.5 px-3 rounded-xl bg-[#1B2838] hover:bg-[#263447] border border-[#263447] text-[#F3F7FC] text-xs font-bold flex flex-col items-center justify-center transition-all disabled:opacity-40 shadow-sm"
                  >
                    <span>+4,000 Units (Bulk)</span>
                    <span className="text-[10px] font-mono text-[#39E58C] mt-0.5">$8,000</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Finished Warehouse Goods Card */}
            <div className="bg-[#101722] border border-[#263447] rounded-xl p-4 space-y-2 shadow-card-industrial">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-[#F3F7FC]">Finished Bottled Beverage Inventory</h5>
                  <p className="text-xs text-[#9AA9BB]">Bottled, labeled, and ready for dispatch</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-black text-[#39E58C]">
                    {inventory.finishedGoods.quantity.toLocaleString()} bottles
                  </div>
                  <div className="text-[10px] text-[#9AA9BB] font-mono">
                    ${Math.round(inventory.finishedGoods.quantity * inventory.finishedGoods.unitCost).toLocaleString()} Valued
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LIVE EVENTS STREAM */}
        {activeTab === 'events' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#F3F7FC] uppercase tracking-wider font-mono">
                Real-Time Operational Domain Events
              </h4>
              <span className="text-[11px] font-mono text-[#9AA9BB]">
                {events.length} Logged
              </span>
            </div>

            {events.length === 0 ? (
              <div className="text-xs text-[#627387] text-center py-6 bg-[#101722]/50 rounded-xl border border-[#263447]">
                No business events recorded yet.
              </div>
            ) : (
              <div className="space-y-2">
                {[...events].reverse().map(e => (
                  <div
                    key={e.id}
                    className="bg-[#101722] border border-[#263447] rounded-xl p-3 space-y-1 text-xs shadow-card-industrial"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#28D7F2]">
                        {e.type.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[10px] font-mono text-[#627387]">
                        Day {e.day} • Tick #{e.tick}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#9AA9BB] leading-relaxed">{e.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: DECISION AUDIT HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#F3F7FC] uppercase tracking-wider font-mono">
                Executive Action Audit Trail
              </h4>
              <span className="text-[11px] font-mono text-[#9AA9BB]">
                {history.length} Interventions
              </span>
            </div>

            {history.length === 0 ? (
              <div className="text-xs text-[#627387] text-center py-6 bg-[#101722]/50 rounded-xl border border-[#263447]">
                No recorded interventions yet. Actions executed on the factory floor will be logged here.
              </div>
            ) : (
              <div className="space-y-2">
                {[...history].reverse().map(record => (
                  <div
                    key={record.id}
                    className="bg-[#101722] border border-[#263447] rounded-xl p-3 space-y-1 text-xs shadow-card-industrial"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            record.result === 'SUCCESS' ? 'bg-[#39E58C]' : 'bg-[#FF5F6D]'
                          }`}
                        />
                        <span className="font-mono font-bold text-[#F3F7FC]">
                          {record.commandType.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#627387]">
                        Day {record.day}, {record.hour.toString().padStart(2, '0')}:00
                      </span>
                    </div>

                    <p className="text-[11px] text-[#9AA9BB]">{record.message}</p>

                    {record.financialImpact !== undefined && (
                      <div className="text-[10px] font-mono font-semibold pt-1">
                        Treasury Delta:{' '}
                        <span
                          className={
                            record.financialImpact >= 0 ? 'text-[#39E58C]' : 'text-[#FF5F6D]'
                          }
                        >
                          {record.financialImpact >= 0 ? '+' : ''}$
                          {Math.round(record.financialImpact).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* CapEx Investment Confirmation Dialog */}
      {showPurchaseConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#151F2D] border border-[#263447] rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-[#28D7F2]/15 text-[#28D7F2] flex items-center justify-center mx-auto border border-[#28D7F2]/30">
              <Wrench className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-[#F3F7FC]">Confirm Machinery Investment</h3>
              <p className="text-xs text-[#9AA9BB] mt-1.5 leading-relaxed">
                Authorize <strong className="text-[#FFB547]">$20,000 CapEx</strong> to procure an additional automated bottling line. This permanently expands factory throughput by <strong className="text-[#39E58C]">+200 bottles/day</strong>.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowPurchaseConfirm(false)}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold text-[#9AA9BB] bg-[#1B2838] hover:bg-[#263447] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowPurchaseConfirm(false);
                  triggerCommand({ type: 'PURCHASE_MACHINE' });
                }}
                className="py-2.5 px-4 rounded-xl text-xs font-black text-[#080B12] bg-[#28D7F2] hover:bg-[#28D7F2]/90 transition-colors shadow-glow-cyan"
              >
                Confirm ($20,000)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

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
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const pendingOrders = orders.filter(o => o.status === 'PENDING');
  const activeOrders = orders.filter(o => o.status === 'IN_PRODUCTION');

  const tabs = [
    { id: 'orders' as const, label: 'Orders', icon: ShoppingCart, badge: pendingOrders.length },
    { id: 'machinery' as const, label: 'Equipment', icon: Wrench },
    { id: 'inventory' as const, label: 'Supply', icon: Layers },
    { id: 'events' as const, label: 'Events', icon: Bell },
    { id: 'history' as const, label: 'History', icon: History },
  ];

  return (
    <div className="w-full bg-white border-t lg:border-t-0 lg:border-l-2 border-slate-100 flex flex-col h-full overflow-hidden select-none">
      {/* Tabs */}
      <div className="flex items-center px-3 pt-3 pb-2 border-b-2 border-slate-100 overflow-x-auto scrollbar-none gap-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
            {tab.badge && tab.badge > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-400 text-white text-[9px] font-black flex items-center justify-center animate-bounce">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Feedback bar */}
      <AnimatePresence>
        {feedbackMsg && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`px-4 py-2 text-xs font-semibold flex items-center justify-between border-b-2 ${
              feedbackMsg.isError
                ? 'bg-red-50 text-red-700 border-red-100'
                : 'bg-emerald-50 text-emerald-700 border-emerald-100'
            }`}
          >
            <span className="truncate">{feedbackMsg.text}</span>
            <button onClick={() => setFeedbackMsg(null)} className="ml-2 opacity-60 hover:opacity-100">
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Customer Orders</h4>
              <span className="text-[11px] text-slate-400">
                {orders.filter(o => o.status === 'FULFILLED').length}/{orders.length} fulfilled
              </span>
            </div>

            {/* Pending */}
            {pendingOrders.length > 0 && (
              <div className="space-y-3">
                <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider flex items-center space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>⚡ Awaiting Your Decision</span>
                </div>

                {pendingOrders.map(order => (
                  <div
                    key={order.id}
                    className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-3.5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg bg-amber-100 text-amber-700 border border-amber-200">
                          {order.id}
                        </span>
                        <h5 className="text-sm font-bold text-slate-800 mt-1">{order.customer}</h5>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-black text-emerald-700">
                          ${(order.quantity * order.pricePerUnit).toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {order.quantity.toLocaleString()} × ${order.pricePerUnit}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 bg-white/70 px-3 py-2 rounded-xl border border-amber-100">
                      <span>Deadline:</span>
                      <span className="font-mono font-bold text-amber-700">
                        Day {order.deadlineDay} ({Math.max(0, order.deadlineDay - state.currentDay)}d left)
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => triggerCommand({ type: 'ACCEPT_ORDER', orderId: order.id })}
                        disabled={isTerminated}
                        className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs flex items-center justify-center space-x-1.5 transition-all disabled:opacity-40 shadow-md hover:shadow-lg"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => triggerCommand({ type: 'REJECT_ORDER', orderId: order.id })}
                        disabled={isTerminated}
                        className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs flex items-center justify-center space-x-1.5 transition-all disabled:opacity-40"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Active orders */}
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">In Production</div>
              {activeOrders.length === 0 ? (
                <div className="text-xs text-slate-400 text-center py-5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  No active orders. Accept proposals above.
                </div>
              ) : (
                activeOrders.map(order => {
                  const progressPct = Math.min(100, Math.round((inventory.finishedGoods.quantity / order.quantity) * 100));
                  const isReady = inventory.finishedGoods.quantity >= order.remainingQuantity;
                  return (
                    <div key={order.id} className="bg-white border-2 border-indigo-100 rounded-2xl p-3.5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {order.id}
                          </span>
                          <span className="text-xs font-bold text-slate-800">{order.customer}</span>
                        </div>
                        <span className="text-xs font-mono font-black text-indigo-700">
                          ${(order.quantity * order.pricePerUnit).toLocaleString()}
                        </span>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-500 mb-1 font-mono">
                          <span>Progress:</span>
                          <span className="font-bold text-slate-700">{inventory.finishedGoods.quantity.toLocaleString()} / {order.quantity.toLocaleString()} ({progressPct}%)</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${isReady ? 'bg-gradient-to-r from-emerald-400 to-teal-400' : 'bg-gradient-to-r from-indigo-400 to-blue-400'}`}
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Due Day {order.deadlineDay}</span>
                        {isReady ? (
                          <span className="text-emerald-600 font-bold flex items-center">
                            <PackageCheck className="w-3.5 h-3.5 mr-1" /> Ready to Ship!
                          </span>
                        ) : (
                          <span className="text-indigo-500 font-semibold">Bottling in progress…</span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* MACHINERY TAB */}
        {activeTab === 'machinery' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Production Equipment</h4>
              <span className="text-[11px] text-indigo-600 font-bold">{machines.length}/5 Lines</span>
            </div>

            {/* CapEx card */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="text-sm font-bold text-slate-800">Add Bottling Line</h5>
                  <p className="text-xs text-slate-500 mt-0.5">High-throughput rotary system (+200 b/day)</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-black text-amber-700">$20,000</div>
                  <div className="text-[10px] text-slate-400 font-mono">CapEx</div>
                </div>
              </div>

              <div className="bg-white/80 rounded-xl p-2.5 border border-indigo-100 text-[11px] font-mono space-y-1 text-slate-500">
                <div className="flex justify-between">
                  <span>Current capacity:</span>
                  <span className="font-bold text-indigo-700">{production.currentDailyCapacity} b/day</span>
                </div>
                <div className="flex justify-between">
                  <span>After upgrade:</span>
                  <span className="font-bold text-emerald-700">{production.currentDailyCapacity + 200} b/day</span>
                </div>
                <div className="flex justify-between">
                  <span>Treasury:</span>
                  <span className="font-bold text-slate-700">${Math.round(business.cash).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setShowPurchaseConfirm(true)}
                disabled={isTerminated || business.cash < 20000 || machines.length >= 5}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-black text-xs flex items-center justify-center space-x-2 transition-all disabled:opacity-40 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>
                  {machines.length >= 5
                    ? 'Maximum 5 Lines Reached'
                    : business.cash < 20000
                    ? 'Insufficient Funds ($20k needed)'
                    : 'Deploy Bottling Line — $20,000'}
                </span>
              </button>
            </div>

            {/* Machine list */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Installed Lines</div>
              {machines.map(m => (
                <div
                  key={m.id}
                  onClick={() => onSelectMachine(m.id)}
                  className="cursor-pointer bg-white hover:bg-indigo-50 border-2 border-slate-100 hover:border-indigo-200 rounded-xl p-3 flex items-center justify-between transition-all"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${m.operating ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                    <div>
                      <div className="text-xs font-bold text-slate-800">{m.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {m.productionCapacity} b/d · {Math.round(m.efficiency * 100)}% health
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-bold border border-indigo-200">
                    Inspect →
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INVENTORY TAB */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Supply Chain</h4>

            {/* Raw materials */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-slate-800">Raw Ingredients</h5>
                  <p className="text-xs text-slate-500">Syrup concentrates & preforms</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-black text-orange-700">{inventory.rawMaterials.quantity.toLocaleString()} units</div>
                  <div className="text-[10px] text-slate-400 font-mono">${(inventory.rawMaterials.quantity * inventory.rawMaterials.unitCost).toLocaleString()} value</div>
                </div>
              </div>

              {inventory.rawMaterials.quantity < inventory.rawMaterials.reorderThreshold && (
                <div className="p-3 rounded-xl bg-red-50 border-2 border-red-200 text-red-700 text-xs flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>⚠ Below safety threshold! Reorder now.</span>
                </div>
              )}

              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Order Batch</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => triggerCommand({ type: 'ORDER_RAW_MATERIALS', quantity: 2000 })}
                    disabled={isTerminated || business.cash < 4000}
                    className="py-2.5 px-3 rounded-xl bg-white hover:bg-orange-50 border-2 border-orange-200 text-slate-700 text-xs font-bold flex flex-col items-center justify-center transition-all disabled:opacity-40"
                  >
                    <span>+2,000 Units</span>
                    <span className="text-[10px] font-mono text-emerald-700 mt-0.5">$4,000</span>
                  </button>
                  <button
                    onClick={() => triggerCommand({ type: 'ORDER_RAW_MATERIALS', quantity: 4000 })}
                    disabled={isTerminated || business.cash < 8000}
                    className="py-2.5 px-3 rounded-xl bg-white hover:bg-orange-50 border-2 border-orange-200 text-slate-700 text-xs font-bold flex flex-col items-center justify-center transition-all disabled:opacity-40"
                  >
                    <span>+4,000 Bulk</span>
                    <span className="text-[10px] font-mono text-emerald-700 mt-0.5">$8,000</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Finished goods */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-slate-800">Finished Bottles</h5>
                  <p className="text-xs text-slate-500">Bottled, labeled, dispatch-ready</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-black text-emerald-700">{inventory.finishedGoods.quantity.toLocaleString()} bottles</div>
                  <div className="text-[10px] text-slate-400 font-mono">${Math.round(inventory.finishedGoods.quantity * inventory.finishedGoods.unitCost).toLocaleString()} value</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === 'events' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Live Event Feed</h4>
              <span className="text-[11px] text-slate-400">{events.length} logged</span>
            </div>
            {events.length === 0 ? (
              <div className="text-xs text-slate-400 text-center py-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                No events yet. Start the simulation to see live events.
              </div>
            ) : (
              <div className="space-y-2">
                {[...events].reverse().map(e => (
                  <div key={e.id} className="bg-white border-2 border-slate-100 rounded-xl p-3 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-700">{e.type.replace(/_/g, ' ')}</span>
                      <span className="text-[10px] font-mono text-slate-400">Day {e.day} · #{e.tick}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{e.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Decision Audit</h4>
              <span className="text-[11px] text-slate-400">{history.length} actions</span>
            </div>
            {history.length === 0 ? (
              <div className="text-xs text-slate-400 text-center py-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                No decisions yet. Your actions will appear here.
              </div>
            ) : (
              <div className="space-y-2">
                {[...history].reverse().map(record => (
                  <div key={record.id} className="bg-white border-2 border-slate-100 rounded-xl p-3 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${record.result === 'SUCCESS' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        <span className="font-bold text-slate-800">{record.commandType.replace(/_/g, ' ')}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">D{record.day} {record.hour.toString().padStart(2, '0')}:00</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{record.message}</p>
                    {record.financialImpact !== undefined && (
                      <div className="text-[10px] font-mono font-semibold">
                        Impact:{' '}
                        <span className={record.financialImpact >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                          {record.financialImpact >= 0 ? '+' : ''}${Math.round(record.financialImpact).toLocaleString()}
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

      {/* CapEx Confirm Modal */}
      {showPurchaseConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-2 border-indigo-100 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto border-2 border-indigo-200">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Confirm CapEx Investment</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Authorize <strong className="text-amber-700">$20,000</strong> to add an automated bottling line. Throughput increases by{' '}
                <strong className="text-emerald-700">+200 bottles/day</strong>.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button onClick={() => setShowPurchaseConfirm(false)} className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                Cancel
              </button>
              <button
                onClick={() => { setShowPurchaseConfirm(false); triggerCommand({ type: 'PURCHASE_MACHINE' }); }}
                className="py-2.5 px-4 rounded-xl text-xs font-black text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-colors shadow-md"
              >
                Confirm ($20k)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

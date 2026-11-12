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
  TrendingDown,
  DollarSign,
  PackageCheck,
  ShieldAlert,
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
  const [activeTab, setActiveTab] = useState<'machinery' | 'orders' | 'inventory' | 'history'>('orders');
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const { business, machines, orders, inventory, production, history, status } = state;
  const isTerminated = status === 'COMPLETED' || status === 'FAILED';

  const triggerCommand = (command: PlayerCommand) => {
    const res = onDispatch(command);
    setFeedbackMsg({
      text: res.message || res.error || 'Action executed',
      isError: !res.success,
    });
    setTimeout(() => {
      setFeedbackMsg(null);
    }, 3500);
  };

  const pendingOrders = orders.filter(o => o.status === 'PENDING');
  const activeOrders = orders.filter(o => o.status === 'IN_PRODUCTION');

  return (
    <div className="w-full bg-surface border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col h-full overflow-hidden select-none">
      {/* Control Tabs Header */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2 border-b border-slate-800 bg-surface-secondary/50">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all relative flex items-center space-x-1.5 ${
              activeTab === 'orders'
                ? 'bg-sky-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Orders</span>
            {pendingOrders.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold flex items-center justify-center animate-pulse">
                {pendingOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('machinery')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'machinery'
                ? 'bg-sky-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Equipment</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'inventory'
                ? 'bg-sky-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Supply</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'history'
                ? 'bg-sky-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
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
            className={`px-4 py-2 text-xs font-medium flex items-center justify-between border-b ${
              feedbackMsg.isError
                ? 'bg-red-950/60 text-red-300 border-red-800/60'
                : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
            }`}
          >
            <span className="truncate">{feedbackMsg.text}</span>
            <button
              onClick={() => setFeedbackMsg(null)}
              className="text-slate-400 hover:text-slate-100 ml-2"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Tab Content Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Customer Sales Pipeline
              </h4>
              <span className="text-[11px] font-mono text-slate-400">
                {orders.filter(o => o.status === 'FULFILLED').length} Completed / {orders.length} Total
              </span>
            </div>

            {/* Pending Orders Waiting for Decision */}
            {pendingOrders.length > 0 && (
              <div className="space-y-3">
                <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wide flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Awaiting Contract Decision</span>
                </div>

                {pendingOrders.map(order => (
                  <div
                    key={order.id}
                    className="bg-slate-900/90 border border-amber-500/40 rounded-xl p-3.5 space-y-3 shadow-lg shadow-amber-500/5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          {order.id}
                        </span>
                        <h5 className="text-sm font-bold text-slate-100 mt-1">{order.customer}</h5>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-emerald-400">
                          ${(order.quantity * order.pricePerUnit).toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {order.quantity.toLocaleString()} @ ${order.pricePerUnit}/ea
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
                      <span>Delivery Deadline:</span>
                      <span className="font-mono font-bold text-amber-400">
                        Day {order.deadlineDay} (in {Math.max(0, order.deadlineDay - state.currentDay)} days)
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => triggerCommand({ type: 'ACCEPT_ORDER', orderId: order.id })}
                        disabled={isTerminated}
                        className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1 transition-all disabled:opacity-40"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept Contract</span>
                      </button>

                      <button
                        onClick={() => triggerCommand({ type: 'REJECT_ORDER', orderId: order.id })}
                        disabled={isTerminated}
                        className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center space-x-1 transition-all disabled:opacity-40"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Active Orders In Production */}
            <div className="space-y-3">
              <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wide">
                Active Contracts In Production
              </div>

              {activeOrders.length === 0 ? (
                <div className="text-xs text-slate-500 text-center py-4 bg-slate-900/40 rounded-xl border border-slate-800">
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
                      className="bg-slate-900/90 border border-slate-700 rounded-xl p-3.5 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                              {order.id}
                            </span>
                            <span className="text-xs font-bold text-slate-200">{order.customer}</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-sky-400">
                          ${(order.quantity * order.pricePerUnit).toLocaleString()}
                        </span>
                      </div>

                      {/* Fulfillment Progress Bar */}
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                          <span>Finished Inventory Available:</span>
                          <span className="font-mono text-slate-200">
                            {inventory.finishedGoods.quantity} / {order.quantity} bottles ({progressPct}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isReadyToDispatch ? 'bg-emerald-500' : 'bg-sky-500'
                            }`}
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Deadline: Day {order.deadlineDay}</span>
                        {isReadyToDispatch ? (
                          <span className="text-emerald-400 font-bold flex items-center">
                            <PackageCheck className="w-3.5 h-3.5 mr-1" /> Ready for Dispatch
                          </span>
                        ) : (
                          <span className="text-amber-400 font-medium">Bottling In Progress</span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Fulfilled Orders History */}
            {orders.some(o => o.status === 'FULFILLED' || o.status === 'EXPIRED') && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                  Historical Contracts
                </div>
                {orders
                  .filter(o => o.status === 'FULFILLED' || o.status === 'EXPIRED' || o.status === 'REJECTED')
                  .map(o => (
                    <div
                      key={o.id}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            o.status === 'FULFILLED'
                              ? 'bg-emerald-400'
                              : o.status === 'EXPIRED'
                              ? 'bg-red-400'
                              : 'bg-slate-500'
                          }`}
                        />
                        <span className="font-mono text-slate-300">{o.id}</span>
                        <span className="text-slate-400 truncate max-w-[120px]">{o.customer}</span>
                      </div>
                      <span
                        className={`font-mono font-bold text-[11px] ${
                          o.status === 'FULFILLED'
                            ? 'text-emerald-400'
                            : o.status === 'EXPIRED'
                            ? 'text-red-400'
                            : 'text-slate-500'
                        }`}
                      >
                        {o.status}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MACHINERY & EQUIPMENT */}
        {activeTab === 'machinery' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Production Floor Expansion
              </h4>
              <span className="text-[11px] font-mono text-slate-400">
                {machines.length} / 5 Lines Deployed
              </span>
            </div>

            {/* Purchase Machine Action Card */}
            <div className="bg-slate-900/90 border border-sky-500/40 rounded-xl p-4 space-y-3 shadow-lg shadow-sky-500/5">
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="text-sm font-bold text-slate-100">Add Bottling Line</h5>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Automated Rotary Bottler (+200 bottles/day)
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-amber-400">$20,000</div>
                  <div className="text-[10px] text-slate-400">CapEx Investment</div>
                </div>
              </div>

              <div className="bg-slate-950/60 rounded-lg p-2.5 border border-slate-800 text-[11px] space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span>Current Daily Output:</span>
                  <span className="font-mono font-bold text-sky-400">
                    {production.currentDailyCapacity} bottles/day
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Post-Purchase Capacity:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {production.currentDailyCapacity + 200} bottles/day
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Available Treasury:</span>
                  <span className="font-mono">${Math.round(business.cash).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => triggerCommand({ type: 'PURCHASE_MACHINE' })}
                disabled={isTerminated || business.cash < 20000 || machines.length >= 5}
                className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-all disabled:opacity-40 shadow-md shadow-sky-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>
                  {machines.length >= 5
                    ? 'Max Machine Limit Reached'
                    : business.cash < 20000
                    ? 'Insufficient Cash ($20,000 Required)'
                    : 'Deploy Bottling Line ($20,000)'}
                </span>
              </button>
            </div>

            {/* Active Lines Roster */}
            <div className="space-y-2">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                Installed Lines
              </div>
              {machines.map(m => (
                <div
                  key={m.id}
                  onClick={() => onSelectMachine(m.id)}
                  className="cursor-pointer bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-3 flex items-center justify-between transition-all"
                >
                  <div className="flex items-center space-x-2.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        m.operating ? 'bg-emerald-400' : 'bg-slate-600'
                      }`}
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-200">{m.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {m.productionCapacity} bottles/day • {Math.round(m.efficiency * 100)}% Health
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-1 bg-slate-800 text-sky-400 rounded font-mono font-medium">
                    Inspect
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INVENTORY & SUPPLY */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Supply Chain & Stock Management
              </h4>
            </div>

            {/* Raw Material Inventory Card */}
            <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-slate-100">Raw Beverage Concentrates</h5>
                  <p className="text-xs text-slate-400 mt-0.5">Preforms, Natural Syrup & Purified Base</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-sky-400">
                    {inventory.rawMaterials.quantity.toLocaleString()} units
                  </div>
                  <div className="text-[10px] text-slate-400">
                    ${(inventory.rawMaterials.quantity * inventory.rawMaterials.unitCost).toLocaleString()} Valued
                  </div>
                </div>
              </div>

              {inventory.rawMaterials.quantity < inventory.rawMaterials.reorderThreshold && (
                <div className="p-2.5 rounded-lg bg-amber-950/50 border border-amber-600/40 text-amber-300 text-xs flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>Inventory below reorder buffer threshold. Bottling lines risk throttling!</span>
                </div>
              )}

              {/* Quick Procurement Buttons */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                  Order Replenishment Batches
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => triggerCommand({ type: 'ORDER_RAW_MATERIALS', quantity: 2000 })}
                    disabled={isTerminated || business.cash < 4000}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 text-xs font-semibold flex flex-col items-center justify-center transition-all disabled:opacity-40"
                  >
                    <span>+2,000 Units</span>
                    <span className="text-[10px] font-mono text-emerald-400 mt-0.5">$4,000</span>
                  </button>

                  <button
                    onClick={() => triggerCommand({ type: 'ORDER_RAW_MATERIALS', quantity: 4000 })}
                    disabled={isTerminated || business.cash < 8000}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 text-xs font-semibold flex flex-col items-center justify-center transition-all disabled:opacity-40"
                  >
                    <span>+4,000 Units (Bulk)</span>
                    <span className="text-[10px] font-mono text-emerald-400 mt-0.5">$8,000</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Finished Goods Inventory Card */}
            <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-slate-100">Finished Bottles In Warehouse</h5>
                  <p className="text-xs text-slate-400">Bottled, labeled and palletized</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-emerald-400">
                    {inventory.finishedGoods.quantity.toLocaleString()} bottles
                  </div>
                  <div className="text-[10px] text-slate-400">
                    ${Math.round(inventory.finishedGoods.quantity * inventory.finishedGoods.unitCost).toLocaleString()} Valued
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DECISION HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Management Audit Trail
              </h4>
              <span className="text-[11px] font-mono text-slate-400">
                {history.length} Interventions
              </span>
            </div>

            {history.length === 0 ? (
              <div className="text-xs text-slate-500 text-center py-6 bg-slate-900/40 rounded-xl border border-slate-800">
                No recorded interventions yet. Actions executed on the factory floor will be logged here.
              </div>
            ) : (
              <div className="space-y-2">
                {[...history].reverse().map(record => (
                  <div
                    key={record.id}
                    className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            record.result === 'SUCCESS' ? 'bg-emerald-400' : 'bg-red-400'
                          }`}
                        />
                        <span className="font-mono font-bold text-slate-200">
                          {record.commandType.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        Day {record.day}, {record.hour.toString().padStart(2, '0')}:00
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400">{record.message}</p>

                    {record.financialImpact !== undefined && (
                      <div className="text-[10px] font-mono font-semibold pt-1">
                        Financial Impact:{' '}
                        <span
                          className={
                            record.financialImpact >= 0 ? 'text-emerald-400' : 'text-red-400'
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
    </div>
  );
};

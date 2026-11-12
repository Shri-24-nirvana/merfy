'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DomainEvent } from '@/types/events';
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  X,
  Sparkles,
} from 'lucide-react';

interface ToastAlertProps {
  event: DomainEvent | null;
  onDismiss: () => void;
}

export const ToastAlert: React.FC<ToastAlertProps> = ({ event, onDismiss }) => {
  if (!event) return null;

  const isSuccess = event.severity === 'success';
  const isDanger = event.severity === 'danger';
  const isWarning = event.severity === 'warning';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="fixed top-16 right-4 z-50 max-w-sm w-full"
      >
        <div
          className={`rounded-2xl p-4 shadow-2xl border backdrop-blur-xl flex items-start space-x-3 ${
            isSuccess
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100 shadow-emerald-500/10'
              : isDanger
              ? 'bg-red-950/90 border-red-500/50 text-red-100 shadow-red-500/10'
              : isWarning
              ? 'bg-amber-950/90 border-amber-500/50 text-amber-100 shadow-amber-500/10'
              : 'bg-slate-900/90 border-slate-700 text-slate-100'
          }`}
        >
          <div className="mt-0.5 flex-shrink-0">
            {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            {isDanger && <XCircle className="w-5 h-5 text-red-400" />}
            {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
            {!isSuccess && !isDanger && !isWarning && <Sparkles className="w-5 h-5 text-sky-400" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold uppercase tracking-wider">{event.title}</h5>
              <span className="text-[10px] font-mono opacity-60">Day {event.day}</span>
            </div>
            <p className="text-xs mt-1 opacity-90 leading-relaxed">{event.description}</p>
          </div>

          <button
            onClick={onDismiss}
            className="text-slate-400 hover:text-slate-200 transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

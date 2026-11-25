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

  const styles = isDanger
    ? 'bg-red-50 border-red-200 text-red-700'
    : isWarning
    ? 'bg-amber-50 border-amber-200 text-amber-700'
    : isSuccess
    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
    : 'bg-indigo-50 border-indigo-200 text-indigo-700';

  const Icon = isDanger ? XCircle : isWarning ? AlertTriangle : isSuccess ? CheckCircle2 : Sparkles;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="fixed top-16 right-4 z-50 max-w-sm w-full select-none"
      >
        <div className={`rounded-2xl p-4 shadow-xl border-2 backdrop-blur-sm flex items-start space-x-3.5 ${styles}`}>
          <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold uppercase tracking-wider">{event.title}</h5>
              <span className="text-[10px] font-mono opacity-70 ml-2">Day {event.day}</span>
            </div>
            <p className="text-xs mt-1 opacity-80 leading-relaxed">{event.description}</p>
          </div>

          <button onClick={onDismiss} className="opacity-60 hover:opacity-100 transition-opacity p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

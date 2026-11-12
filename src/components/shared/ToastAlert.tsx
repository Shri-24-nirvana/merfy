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
        className="fixed top-16 right-4 z-50 max-w-sm w-full select-none"
      >
        <div
          className={`rounded-2xl p-4 shadow-2xl border backdrop-blur-xl flex items-start space-x-3.5 ${
            isSuccess
              ? 'bg-[#151F2D]/95 border-[#39E58C]/50 text-[#F3F7FC] shadow-glow-green'
              : isDanger
              ? 'bg-[#151F2D]/95 border-[#FF5F6D]/50 text-[#F3F7FC] shadow-glow-coral'
              : isWarning
              ? 'bg-[#151F2D]/95 border-[#FFB547]/50 text-[#F3F7FC] shadow-sm'
              : 'bg-[#151F2D]/95 border-[#28D7F2]/50 text-[#F3F7FC] shadow-glow-cyan'
          }`}
        >
          <div className="mt-0.5 flex-shrink-0">
            {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#39E58C]" />}
            {isDanger && <XCircle className="w-5 h-5 text-[#FF5F6D]" />}
            {isWarning && <AlertTriangle className="w-5 h-5 text-[#FFB547]" />}
            {!isSuccess && !isDanger && !isWarning && <Sparkles className="w-5 h-5 text-[#28D7F2]" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold uppercase tracking-wider font-mono text-[#F3F7FC]">
                {event.title}
              </h5>
              <span className="text-[10px] font-mono text-[#28D7F2]">Day {event.day}</span>
            </div>
            <p className="text-xs mt-1 text-[#9AA9BB] leading-relaxed">{event.description}</p>
          </div>

          <button
            onClick={onDismiss}
            className="text-[#9AA9BB] hover:text-[#F3F7FC] transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

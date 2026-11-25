'use client';

import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Move, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface FactoryCameraControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onPan: (dx: number, dy: number) => void;
}

export const FactoryCameraControls: React.FC<FactoryCameraControlsProps> = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
  onPan,
}) => {
  return (
    <div className="absolute top-4 left-4 z-20 flex flex-col items-start space-y-2 select-none">
      {/* Zoom and Reset Controls Bar */}
      <div className="flex items-center space-x-1 bg-[#101722]/90 backdrop-blur-md border border-[#263447] p-1 rounded-xl shadow-card-industrial">
        <button
          onClick={onZoomIn}
          title="Zoom In (+)"
          disabled={zoom >= 1.6}
          className="p-1.5 rounded-lg text-[#9AA9BB] hover:text-[#28D7F2] hover:bg-[#1B2838] disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <span className="text-[10px] font-mono font-bold text-[#F3F7FC] px-1.5 min-w-[36px] text-center">
          {Math.round(zoom * 100)}%
        </span>

        <button
          onClick={onZoomOut}
          title="Zoom Out (-)"
          disabled={zoom <= 0.7}
          className="p-1.5 rounded-lg text-[#9AA9BB] hover:text-[#28D7F2] hover:bg-[#1B2838] disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-[#263447] mx-0.5" />

        <button
          onClick={onReset}
          title="Reset Camera View (100%)"
          className="p-1.5 rounded-lg text-[#9AA9BB] hover:text-[#28D7F2] hover:bg-[#1B2838] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Directional Pan D-Pad */}
      <div className="grid grid-cols-3 gap-0.5 bg-[#101722]/90 backdrop-blur-md border border-[#263447] p-1 rounded-xl shadow-card-industrial">
        <div />
        <button
          onClick={() => onPan(0, 50)}
          title="Pan Up"
          className="p-1 rounded text-[#9AA9BB] hover:text-[#28D7F2] hover:bg-[#1B2838] flex items-center justify-center transition-colors"
        >
          <ArrowUp className="w-3 h-3" />
        </button>
        <div />

        <button
          onClick={() => onPan(50, 0)}
          title="Pan Left"
          className="p-1 rounded text-[#9AA9BB] hover:text-[#28D7F2] hover:bg-[#1B2838] flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
        </button>

        <button
          onClick={onReset}
          title="Center Plant"
          className="p-1 rounded text-[#627387] hover:text-[#28D7F2] hover:bg-[#1B2838] flex items-center justify-center text-[9px] font-mono font-bold"
        >
          •
        </button>

        <button
          onClick={() => onPan(-50, 0)}
          title="Pan Right"
          className="p-1 rounded text-[#9AA9BB] hover:text-[#28D7F2] hover:bg-[#1B2838] flex items-center justify-center transition-colors"
        >
          <ArrowRight className="w-3 h-3" />
        </button>

        <div />
        <button
          onClick={() => onPan(0, -50)}
          title="Pan Down"
          className="p-1 rounded text-[#9AA9BB] hover:text-[#28D7F2] hover:bg-[#1B2838] flex items-center justify-center transition-colors"
        >
          <ArrowDown className="w-3 h-3" />
        </button>
        <div />
      </div>
    </div>
  );
};


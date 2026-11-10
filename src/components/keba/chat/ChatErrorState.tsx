/**
 * KEBA AI — Chat Error State Component
 * 
 * Displays friendly, non-technical error notifications with a Retry action.
 */

'use client';

import { AlertCircle, RotateCcw } from 'lucide-react';

interface ChatErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ChatErrorState({ error, onRetry }: ChatErrorStateProps) {
  return (
    <div className="mx-4 my-3 p-3.5 bg-red-50/90 border border-red-200 rounded-xl flex items-start justify-between gap-3 text-red-900 text-xs shadow-sm">
      <div className="flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
        <span className="leading-relaxed">{error}</span>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="flex items-center gap-1 px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-900 rounded-md font-mono text-[11px] font-semibold transition-colors shrink-0 cursor-pointer"
      >
        <RotateCcw className="w-3 h-3" />
        Retry
      </button>
    </div>
  );
}


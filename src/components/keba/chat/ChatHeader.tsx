/**
 * KEBA AI — Chat Drawer Header
 * 
 * Displays Keba's genuine photo avatar, representative title,
 * online status indicator, Clear Conversation button, and Close button.
 */

'use client';

import Image from 'next/image';
import { X, Trash2, Sparkles } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
  onClearHistory: () => void;
  messageCount: number;
}

export function ChatHeader({ onClose, onClearHistory, messageCount }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 py-4 bg-[#191B1E] text-[#F5F3ED] border-b-2 border-[#191B1E] rounded-t-xl select-none">
      {/* Identity & Status */}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 aspect-square rounded-full overflow-hidden border border-[#F5F3ED]/30 shrink-0">
          <Image
            src="/images/keba/keba-red-jacket.jpg"
            alt="Keba Avatar"
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display font-bold text-sm tracking-wide text-[#F5F3ED]">
              KEBA AI
            </h2>
            <span className="flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#D36B4D] text-[#191B1E] font-semibold">
              <Sparkles className="w-2.5 h-2.5 stroke-[2.5]" />
              OFFSCRIPT
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-[#F5F3ED]/70 tracking-wider">
              ONLINE · TECHNICAL REPRESENTATIVE
            </span>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-1">
        {messageCount > 0 && (
          <button
            type="button"
            onClick={onClearHistory}
            title="Clear conversation history"
            aria-label="Clear conversation history"
            className="p-2 rounded-lg text-[#F5F3ED]/70 hover:text-[#D36B4D] hover:bg-[#F5F3ED]/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={onClose}
          title="Close chat (Esc)"
          aria-label="Close KEBA AI chat"
          className="p-2 rounded-lg text-[#F5F3ED]/70 hover:text-[#F5F3ED] hover:bg-[#F5F3ED]/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
        >
          <X className="w-5 h-5 stroke-[2]" />
        </button>
      </div>
    </header>
  );
}


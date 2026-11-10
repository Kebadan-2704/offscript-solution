/**
 * KEBA AI — Chat Input Bar
 * 
 * Provides keyboard-first input with Enter-to-send, Shift+Enter for newlines,
 * character counting, and clean accessible actions.
 */

'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Send, CornerDownLeft } from 'lucide-react';
import { MAX_MESSAGE_LENGTH } from '@/lib/keba/ai/responseValidator';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Focus input automatically on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    onSendMessage(trimmed);
    setText('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const remainingChars = MAX_MESSAGE_LENGTH - text.length;
  const isOverLimit = remainingChars < 0;

  return (
    <footer className="p-4 bg-[#F5F3ED] border-t-2 border-[#191B1E] rounded-b-xl select-none">
      <div className="relative flex items-center bg-white border border-[#191B1E]/20 focus-within:border-[#191B1E] focus-within:ring-2 focus-within:ring-[#191B1E]/10 rounded-xl overflow-hidden shadow-inner transition-all">
        <textarea
          ref={textareaRef}
          value={text}
          disabled={isLoading}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Keba anything about OFFSCRIPT..."
          rows={1}
          maxLength={MAX_MESSAGE_LENGTH}
          aria-label="Message KEBA AI"
          className="w-full py-3.5 pl-4 pr-12 text-sm text-[#191B1E] placeholder-[#191B1E]/40 bg-transparent resize-none focus:outline-none max-h-32 min-h-[48px]"
        />

        {/* Send Action Button */}
        <button
          type="button"
          disabled={!text.trim() || isLoading || isOverLimit}
          onClick={handleSend}
          title="Send message"
          aria-label="Send message"
          className="absolute right-2 p-2 rounded-lg bg-[#191B1E] text-[#F5F3ED] hover:bg-[#D36B4D] hover:text-[#191B1E] transition-all disabled:opacity-30 disabled:hover:bg-[#191B1E] disabled:hover:text-[#F5F3ED] cursor-pointer disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
        >
          <Send className="w-4 h-4 stroke-[2]" />
        </button>
      </div>

      {/* Input Metadata Bar */}
      <div className="flex items-center justify-between mt-2 px-1 text-[11px] font-mono text-[#191B1E]/50">
        <div className="flex items-center gap-1">
          <CornerDownLeft className="w-3 h-3" />
          <span>Press Enter to send, Shift+Enter for new line</span>
        </div>
        <span className={isOverLimit ? 'text-red-500 font-bold' : ''}>
          {text.length}/{MAX_MESSAGE_LENGTH}
        </span>
      </div>
    </footer>
  );
}


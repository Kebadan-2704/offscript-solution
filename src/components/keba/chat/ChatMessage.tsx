/**
 * KEBA AI — Chat Message Bubble
 * 
 * Renders individual user and assistant messages with
 * editorial typographic hierarchy, safe text formatting,
 * and interactive allowlisted action cards.
 */

'use client';

import { ChatMessage as ChatMessageType } from '@/lib/keba/ai/aiTypes';
import { ActionProposal } from '@/lib/keba/actions/actionTypes';
import Image from 'next/image';

interface ChatMessageProps {
  message: ChatMessageType;
  onExecuteAction?: (action: ActionProposal) => void;
}

export function ChatMessage({ message, onExecuteAction }: ChatMessageProps) {
  const isUser = message.role === 'user';

  // Format time nicely
  const timeString =
    message.timestamp > 0
      ? new Date(message.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'Online';

  return (
    <div
      className={`flex items-start gap-2.5 my-3 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Assistant Avatar Thumbnail */}
      {!isUser && (
        <div className="relative w-7 h-7 aspect-square rounded-full overflow-hidden border border-[#191B1E]/20 shrink-0 mt-0.5">
          <Image
            src="/images/keba/keba-red-jacket.jpg"
            alt="Keba"
            fill
            sizes="28px"
            className="object-cover"
          />
        </div>
      )}

      {/* Bubble Container */}
      <div
        className={`max-w-[85%] sm:max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-[#191B1E] text-[#F5F3ED] rounded-tr-none shadow-[2px_2px_0px_rgba(25,27,30,0.15)]'
            : 'bg-[#F5F3ED] text-[#191B1E] border border-[#191B1E]/15 rounded-tl-none shadow-[2px_2px_0px_#191B1E]/10'
        }`}
      >
        {/* Message Content with basic Markdown paragraph handling */}
        <div className="space-y-2 whitespace-pre-wrap break-words">
          {message.content}
        </div>

        {/* Allowlisted Action Suggestion Card */}
        {message.actionProposal && onExecuteAction && (
          <div className="mt-3 pt-2.5 border-t border-[#191B1E]/10 flex flex-col gap-1.5 animate-in fade-in duration-300">
            <span className="text-[10px] font-mono text-[#191B1E]/60 uppercase tracking-wider">
              Recommended Navigation
            </span>
            <button
              type="button"
              onClick={() => onExecuteAction(message.actionProposal!)}
              className="inline-flex items-center justify-between gap-2 px-3 py-2 bg-[#191B1E] text-[#F5F3ED] hover:bg-[#D36B4D] hover:text-[#191B1E] rounded-lg font-mono text-xs font-semibold transition-all shadow-xs cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
            >
              <span>{message.actionProposal.label}</span>
              <span className="text-[10px] opacity-70 group-hover:opacity-100 font-normal">
                {message.actionProposal.targetSelector || ''}
              </span>
            </button>
            <p className="text-[11px] text-[#191B1E]/70 font-sans">
              {message.actionProposal.description}
            </p>
          </div>
        )}

        {/* Timestamp */}
        <div
          className={`text-[10px] font-mono mt-1.5 flex items-center ${
            isUser ? 'text-[#F5F3ED]/60 justify-end' : 'text-[#191B1E]/50 justify-start'
          }`}
        >
          <span>{timeString}</span>
        </div>
      </div>
    </div>
  );
}

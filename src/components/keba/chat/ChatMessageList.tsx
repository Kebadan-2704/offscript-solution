/**
 * KEBA AI — Chat Message List
 * 
 * Scrollable list of chat messages with auto-scroll anchoring,
 * initial greeting, and accessible log attributes.
 */

'use client';

import { useEffect, useRef } from 'react';
import { ChatMessage as ChatMessageType } from '@/lib/keba/ai/aiTypes';
import { ChatMessage } from './ChatMessage';
import { ChatTypingIndicator } from './ChatTypingIndicator';
import { ChatErrorState } from './ChatErrorState';

import { ActionProposal } from '@/lib/keba/actions/actionTypes';

interface ChatMessageListProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  onExecuteAction?: (action: ActionProposal) => void;
}

const INITIAL_WELCOME_MESSAGE: ChatMessageType = {
  id: 'initial-welcome',
  role: 'assistant',
  content:
    "Hey! I'm Keba, the AI virtual representative of OFFSCRIPT SOLUTION. Ask me anything about our software engineering services, studio methodology, case studies, or scheduling a technical consultation.",
  timestamp: 0,
};

export function ChatMessageList({
  messages,
  isLoading,
  error,
  onRetry,
  onExecuteAction,
}: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to latest message or indicator
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, error]);

  return (
    <div
      role="log"
      aria-label="Conversation with Keba AI"
      aria-live="polite"
      className="flex-1 overflow-y-auto px-4 py-3 space-y-1 overscroll-contain [scrollbar-width:thin] [scrollbar-color:#D36B4D_transparent]"
    >
      {/* Default Initial Welcome Message if empty */}
      {messages.length === 0 && <ChatMessage message={INITIAL_WELCOME_MESSAGE} />}

      {/* Render all historical messages */}
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          message={msg}
          onExecuteAction={onExecuteAction}
        />
      ))}

      {/* Loading Thinking Indicator */}
      {isLoading && <ChatTypingIndicator />}

      {/* Error State with Retry */}
      {error && <ChatErrorState error={error} onRetry={onRetry} />}

      <div ref={bottomRef} />
    </div>
  );
}

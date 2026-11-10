/**
 * KEBA AI — Master Chat Drawer Component
 * 
 * Houses the conversational interface, coordinates API requests to /api/keba/chat,
 * executes allowlisted website actions, hosts the business enquiry flow,
 * and synchronizes Keba's 3D animation states.
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useKebaStore } from '../state/kebaStore';
import { ChatMessage as ChatMessageType } from '@/lib/keba/ai/aiTypes';
import { ActionProposal } from '@/lib/keba/actions/actionTypes';
import { executeAllowlistedAction } from '@/lib/keba/actions/actionRouter';
import { ChatHeader } from './ChatHeader';
import { ChatMessageList } from './ChatMessageList';
import { ChatSuggestions } from './ChatSuggestions';
import { ChatInput } from './ChatInput';
import { ChatEnquiryFlow } from './ChatEnquiryFlow';

export function KebaChatDrawer() {
  const isChatOpen = useKebaStore((s) => s.isChatOpen);
  const closeChat = useKebaStore((s) => s.closeChat);
  const setCharacterState = useKebaStore((s) => s.setCharacterState);

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const lastFailedMessageRef = useRef<string | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isChatOpen) {
        closeChat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isChatOpen, closeChat]);

  // Execute Allowlisted Website Action (Navigation or Tour)
  const handleExecuteAction = useCallback(
    (action: ActionProposal) => {
      executeAllowlistedAction(action, {
        onStartTour: () => {
          closeChat();
          useKebaStore.getState().setTourStage('TOUR_INTRO');
        },
        onCloseChat: () => {
          // Optional: close or keep open
        },
      });
    },
    [closeChat]
  );

  // Send message handler
  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: ChatMessageType = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text.trim(),
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);
      lastFailedMessageRef.current = text.trim();

      // Trigger 3D character THINKING animation
      setCharacterState('THINKING');

      try {
        // Send history turns (excluding initial greeting placeholder)
        const historyPayload = messages
          .filter((m) => m.id !== 'initial-welcome')
          .slice(-4)
          .map((m) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content.slice(0, 2000),
          }));

        const res = await fetch('/api/keba/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text.trim(),
            history: historyPayload,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to receive response from Keba');
        }

        const assistantMessage: ChatMessageType = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.answer,
          timestamp: data.timestamp || Date.now(),
          actionProposal: data.actionProposal || null,
        };

        setMessages((prev) => [...prev, assistantMessage]);
        lastFailedMessageRef.current = null;

        // Trigger 3D character TALKING animation, then return to IDLE
        setCharacterState('TALKING');
        setTimeout(() => {
          setCharacterState('IDLE');
        }, 3200);
      } catch (err: unknown) {
        const msg =
          err instanceof Error
            ? err.message
            : 'Unable to reach Keba right now. Please try again.';
        setError(msg);
        setCharacterState('IDLE');
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, setCharacterState]
  );

  const handleRetry = useCallback(() => {
    if (lastFailedMessageRef.current) {
      handleSendMessage(lastFailedMessageRef.current);
    }
  }, [handleSendMessage]);

  const handleClearHistory = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const handleEnquirySuccess = useCallback(
    (summary: string) => {
      setIsEnquiryOpen(false);
      const confirmMessage: ChatMessageType = {
        id: `assistant-confirm-${Date.now()}`,
        role: 'assistant',
        content: `✓ ${summary}\n\nOur studio principals have logged your consultation brief and will review your operational requirements. Is there anything else you'd like to explore in the meantime?`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, confirmMessage]);
    },
    []
  );

  if (!isChatOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="KEBA AI Assistant"
      className="fixed z-[50] pointer-events-auto inset-x-0 bottom-0 sm:inset-x-auto sm:right-6 sm:bottom-6 w-full sm:w-[440px] max-w-full sm:max-w-[calc(100vw-32px)] h-[85vh] sm:h-[620px] max-h-[85vh] sm:max-h-[calc(100vh-80px)] flex flex-col bg-[#F5F3ED] border-t-2 sm:border-2 border-[#191B1E] rounded-t-2xl sm:rounded-2xl shadow-2xl sm:shadow-[8px_8px_0px_#191B1E] animate-in fade-in slide-in-from-bottom-6 duration-300 overflow-hidden"
    >
      {/* 1. Header with Avatar, Title, Clear, Close */}
      <ChatHeader
        onClose={closeChat}
        onClearHistory={handleClearHistory}
        messageCount={messages.length}
      />

      {/* 2. Optional Business Enquiry Intake Wizard */}
      {isEnquiryOpen ? (
        <div className="flex-1 overflow-y-auto">
          <ChatEnquiryFlow
            onClose={() => setIsEnquiryOpen(false)}
            onSuccess={handleEnquirySuccess}
          />
        </div>
      ) : (
        <>
          {/* 3. Message History with Auto-scroll & Action Buttons */}
          <ChatMessageList
            messages={messages}
            isLoading={isLoading}
            error={error}
            onRetry={handleRetry}
            onExecuteAction={handleExecuteAction}
          />

          {/* 4. Quick Suggestion Chips (visible when history is short) */}
          {messages.length <= 1 && (
            <ChatSuggestions
              onSelectPrompt={handleSendMessage}
              disabled={isLoading}
            />
          )}
        </>
      )}

      {/* 5. Business Enquiry Entry Pill */}
      {!isEnquiryOpen && (
        <div className="px-4 py-1.5 bg-[#F5F3ED] border-t border-[#191B1E]/10 flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#191B1E]/60">
            Have a project in mind?
          </span>
          <button
            type="button"
            onClick={() => setIsEnquiryOpen(true)}
            className="text-[11px] font-mono font-semibold text-[#D36B4D] hover:underline cursor-pointer"
          >
            Start Consultation Brief →
          </button>
        </div>
      )}

      {/* 6. Keyboard-first Input Bar */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}

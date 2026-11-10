/**
 * KEBA AI — Conversational AI Types & Schema Definitions
 * 
 * Defines domain models for chat sessions, message histories,
 * provider contracts, and normalized API responses.
 */

import { ActionProposal } from '../actions/actionTypes';

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  actionProposal?: ActionProposal | null;
}

export interface ChatRequestPayload {
  message: string;
  history?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export interface ChatResponsePayload {
  answer: string;
  timestamp: number;
  actionProposal?: ActionProposal | null;
}

export interface ChatErrorPayload {
  error: string;
  code?: 'RATE_LIMIT_EXCEEDED' | 'TIMEOUT' | 'INVALID_INPUT' | 'PROVIDER_ERROR';
}

export interface IAIProvider {
  name: string;
  generateResponse(
    userMessage: string,
    history: Array<{ role: 'user' | 'assistant'; content: string }>,
    signal?: AbortSignal
  ): Promise<string>;
}


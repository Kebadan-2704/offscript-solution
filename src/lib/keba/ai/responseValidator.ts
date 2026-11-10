/**
 * KEBA AI — Request & Response Validator and Sanitizer
 * 
 * Enforces Zod schemas on incoming visitor requests and outgoing AI responses,
 * strictly sanitizing provider artifacts, telegram handles, and unsafe HTML.
 */

import { z } from 'zod';

export const MAX_MESSAGE_LENGTH = 500;
export const MAX_HISTORY_TURNS = 6;

// Incoming Chat Request Schema
export const ChatRequestSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, 'Message cannot be empty')
    .max(MAX_MESSAGE_LENGTH, `Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters`),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().trim().max(4000),
      })
    )
    .max(MAX_HISTORY_TURNS, `History cannot exceed ${MAX_HISTORY_TURNS} turns`)
    .optional()
    .default([]),
});

// External CodexAPI Raw Response Schema
export const CodexApiResponseSchema = z.object({
  answer: z.string().optional(),
  join: z.string().optional(),
  error: z.string().optional(),
});

/**
 * Sanitizes the raw answer text from the external AI provider:
 * 1. Strips third-party promotional handles (e.g. @nepcodexcc, join promotions).
 * 2. Strips raw HTML tags to prevent XSS injection.
 * 3. Trims whitespace.
 */
export function sanitizeAiResponse(rawText: string): string {
  if (!rawText) return '';

  let sanitized = rawText;

  // 1. Remove telegram/channel promotion mentions like @nepcodexcc or Join @...
  sanitized = sanitized.replace(/(?:join\s*:?\s*)?@\w+/gi, '');
  sanitized = sanitized.replace(/join\s+our\s+channel\s*:?/gi, '');

  // 2. Strip dangerous HTML tags
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  sanitized = sanitized.replace(/<[^>]+>/g, '');

  // 3. Normalize multiple consecutive newlines
  sanitized = sanitized.replace(/\n{3,}/g, '\n\n').trim();

  return sanitized;
}

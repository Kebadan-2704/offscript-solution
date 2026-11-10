/**
 * KEBA AI — Conversational API Route
 * POST /api/keba/chat
 * 
 * Handles incoming chat messages from the frontend drawer,
 * applies rate limiting, Zod validation, and PII protection,
 * queries the configured AI provider, detects allowlisted action proposals,
 * and returns safe, sanitized responses with rate limit headers.
 */

import { NextRequest, NextResponse } from 'next/server';
import { ChatRequestSchema } from '@/lib/keba/ai/responseValidator';
import { getAiProvider } from '@/lib/keba/ai/aiProvider';
import { extractProposedAction } from '@/lib/keba/actions/actionRouter';
import { scrubVisitorInput } from '@/lib/keba/ai/piiScrubber';

// Rate Limiter: In-memory sliding window (12 requests per minute per IP)
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 12;

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

function checkRateLimit(clientIp: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = rateLimitMap.get(clientIp);

  if (!record || now > record.resetAt) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitMap.set(clientIp, {
      count: 1,
      resetAt,
    });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetAt };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count, resetAt: record.resetAt };
}

// Cleanup stale rate limit records every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000).unref();

export async function POST(req: NextRequest) {
  try {
    // 1. Identify Client IP & Apply Rate Limiting
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'anonymous-client';

    const { allowed, remaining, resetAt } = checkRateLimit(clientIp);

    const rateLimitHeaders = {
      'X-RateLimit-Limit': String(MAX_REQUESTS_PER_WINDOW),
      'X-RateLimit-Remaining': String(remaining),
      'X-RateLimit-Reset': String(Math.ceil(resetAt / 1000)),
    };

    if (!allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Maximum 12 queries per minute. Please wait a moment before sending another message.',
          code: 'RATE_LIMIT_EXCEEDED',
        },
        {
          status: 429,
          headers: rateLimitHeaders,
        }
      );
    }

    // 2. Parse & Validate Payload
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload provided', code: 'INVALID_INPUT' },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const validationResult = ChatRequestSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message || 'Invalid request format';
      return NextResponse.json(
        { error: firstError, code: 'INVALID_INPUT' },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const { message, history } = validationResult.data;

    // 3. Scrub Visitor PII before passing to provider layer
    const scrubbed = scrubVisitorInput(message);

    // 4. Delegate to AI Provider
    const provider = getAiProvider();
    const rawAnswer = await provider.generateResponse(scrubbed.scrubbedText, history || []);

    // 5. Extract & Validate Allowlisted Action Proposals (with user query intent fallback)
    const { cleanText, proposedAction } = extractProposedAction(rawAnswer, message);

    return NextResponse.json(
      {
        answer: cleanText,
        actionProposal: proposedAction,
        timestamp: Date.now(),
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          ...rateLimitHeaders,
        },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';

    if (errorMessage.includes('timed out')) {
      return NextResponse.json(
        {
          error: 'Keba took a little longer than usual to think. Please ask again.',
          code: 'TIMEOUT',
        },
        { status: 504 }
      );
    }

    return NextResponse.json(
      {
        error: 'Unable to connect to Keba right now. Please try again shortly.',
        code: 'PROVIDER_ERROR',
      },
      { status: 502 }
    );
  }
}

import { describe, it, expect, vi } from 'vitest';
import {
  ChatRequestSchema,
  sanitizeAiResponse,
  CodexApiResponseSchema,
} from '../ai/responseValidator';
import { CodexApiProvider } from '../ai/codexApiProvider';

describe('KEBA AI — Response Validator & Sanitizer', () => {
  it('validates a correct user message', () => {
    const valid = ChatRequestSchema.safeParse({
      message: 'What services do you offer?',
      history: [{ role: 'user', content: 'Hi' }, { role: 'assistant', content: 'Hello!' }],
    });
    expect(valid.success).toBe(true);
  });

  it('rejects an empty message', () => {
    const invalid = ChatRequestSchema.safeParse({ message: '   ' });
    expect(invalid.success).toBe(false);
  });

  it('rejects a message exceeding max length', () => {
    const longMessage = 'A'.repeat(501);
    const invalid = ChatRequestSchema.safeParse({ message: longMessage });
    expect(invalid.success).toBe(false);
  });

  it('strips provider join tags and promotional handles', () => {
    const raw = 'Hello! @nepcodexcc join: @nepcodexcc We build software.';
    const clean = sanitizeAiResponse(raw);
    expect(clean).not.toContain('@nepcodexcc');
    expect(clean).toContain('We build software.');
  });

  it('strips dangerous HTML tags', () => {
    const raw = 'Text <script>alert("xss")</script> and <iframe src="evil.com"></iframe> safe.';
    const clean = sanitizeAiResponse(raw);
    expect(clean).not.toContain('<script>');
    expect(clean).not.toContain('alert');
    expect(clean).not.toContain('<iframe');
    expect(clean).toContain('Text  and  safe.');
  });

  it('validates CodexAPI raw response schema', () => {
    const valid = CodexApiResponseSchema.safeParse({
      answer: 'Hello from Keba',
      join: '@nepcodexcc',
    });
    expect(valid.success).toBe(true);
  });
});

describe('KEBA AI — CodexApiProvider Prompt Construction & Timeout', () => {
  it('instantiates cleanly with defaults', () => {
    const provider = new CodexApiProvider();
    expect(provider.name).toContain('CodexAPI');
  });

  it('handles timeout rejection gracefully', async () => {
    const provider = new CodexApiProvider({ timeoutMs: 10 }); // 10ms timeout
    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn(
      (_url, init?: RequestInit) =>
        new Promise((_, reject) => {
          if (init?.signal) {
            init.signal.addEventListener('abort', () => {
              const abortErr = new Error('The operation was aborted');
              abortErr.name = 'AbortError';
              reject(abortErr);
            });
          }
        })
    ) as unknown as typeof fetch;

    await expect(
      provider.generateResponse('Hello', [])
    ).rejects.toThrow('timed out');

    globalThis.fetch = originalFetch;
  });
});

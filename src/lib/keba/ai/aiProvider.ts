/**
 * KEBA AI — AI Provider Abstraction Interface with Resilient Fallback
 * 
 * Provides an adaptive interface that queries the configured AI provider
 * with a tight timeout, seamlessly falling back to the canonical deterministic
 * Knowledge Engine if the external provider is slow or unreachable.
 */

import { IAIProvider } from './aiTypes';
import { CodexApiProvider } from './codexApiProvider';
import { KnowledgeFallbackProvider } from './knowledgeFallbackProvider';

export type { IAIProvider };

class ResilientHybridProvider implements IAIProvider {
  public readonly name = 'Hybrid (CodexAPI + Local Knowledge Engine)';
  private remoteProvider: IAIProvider;
  private localProvider: IAIProvider;

  constructor() {
    this.remoteProvider = new CodexApiProvider({ timeoutMs: 3500 });
    this.localProvider = new KnowledgeFallbackProvider();
  }

  public async generateResponse(
    userMessage: string,
    history: Array<{ role: 'user' | 'assistant'; content: string }> = [],
    signal?: AbortSignal
  ): Promise<string> {
    try {
      // Attempt remote LLM inference with 3.5s SLA
      const remotePromise = this.remoteProvider.generateResponse(userMessage, history, signal);
      const res = await Promise.race([
        remotePromise,
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Remote provider latency budget exceeded')), 3500)
        ),
      ]);
      return res;
    } catch {
      // Deterministic immediate fallback with zero user-visible error
      return this.localProvider.generateResponse(userMessage, history, signal);
    }
  }
}

let currentProvider: IAIProvider | null = null;

export function getAiProvider(): IAIProvider {
  if (!currentProvider) {
    currentProvider = new ResilientHybridProvider();
  }
  return currentProvider;
}

export function setAiProvider(provider: IAIProvider): void {
  currentProvider = provider;
}

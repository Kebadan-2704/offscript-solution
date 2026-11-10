/**
 * KEBA AI — Chat Suggestions Chips
 * 
 * Interactive starter questions that allow visitors to immediately
 * discover OFFSCRIPT SOLUTION capabilities with a single click.
 */

'use client';

import { Sparkles } from 'lucide-react';

interface ChatSuggestionsProps {
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

const SUGGESTIONS = [
  'What services does OFFSCRIPT SOLUTION provide?',
  'How do you approach bespoke software engineering?',
  'Can you tell me about your case studies?',
  'How do I schedule a technical consultation?',
];

export function ChatSuggestions({ onSelectPrompt, disabled = false }: ChatSuggestionsProps) {
  return (
    <div className="p-4 bg-[#F5F3ED]/80 border-t border-[#191B1E]/10 select-none">
      <div className="flex items-center gap-1.5 mb-2.5 text-[11px] font-mono text-[#191B1E]/70 uppercase tracking-wider">
        <Sparkles className="w-3 h-3 text-[#D36B4D]" />
        <span>Suggested Explorations</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            disabled={disabled}
            onClick={() => onSelectPrompt(prompt)}
            className="text-left text-xs px-3 py-1.5 rounded-lg bg-white border border-[#191B1E]/15 text-[#191B1E] hover:border-[#D36B4D] hover:bg-[#F5F3ED] transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}


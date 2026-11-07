'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  language: string;
  filename?: string;
  code: string;
}

export function CodeBlock({ language, filename, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="my-8 border border-[#191B1E] bg-[#191B1E] text-[#F5F3ED] overflow-hidden">
      {/* Code Header Rail */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/10 font-mono text-xs">
        <span className="text-[#92938D]">
          {filename || language.toUpperCase()}
        </span>
        <button
          type="button"
          onClick={copyToClipboard}
          className="inline-flex items-center gap-1.5 text-xs text-[#E6E2D9] hover:text-[#D36B4D] transition-colors cursor-pointer focus-visible:outline-1 focus-visible:outline-[#D36B4D]"
          aria-label={copied ? 'Code copied' : 'Copy code to clipboard'}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#D36B4D]" />
              <span className="text-[#D36B4D]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Preformatted Body */}
      <pre className="p-4 sm:p-6 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-[#F5F3ED]">
        <code>{code}</code>
      </pre>
    </div>
  );
}


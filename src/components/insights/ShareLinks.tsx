'use client';

import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';

interface ShareLinksProps {
  title: string;
  url: string;
}

export function ShareLinks({ title, url }: ShareLinksProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const mailUrl = `mailto:?subject=${encodedTitle}&body=Check out this article from OFFSCRIPT SOLUTION: ${encodedUrl}`;

  return (
    <div className="py-6 border-y border-[#E6E2D9] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
      <div className="flex items-center gap-2 text-[#92938D]">
        <Share2 className="w-3.5 h-3.5" />
        <span className="uppercase tracking-widest font-semibold">Share Technical Essay:</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#E6E2D9] bg-white text-[#191B1E] hover:border-[#191B1E] transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#D36B4D]" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Link'}</span>
        </button>

        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 border border-[#E6E2D9] bg-white text-[#191B1E] hover:border-[#191B1E] hover:text-[#D36B4D] transition-colors"
        >
          LinkedIn
        </a>

        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 border border-[#E6E2D9] bg-white text-[#191B1E] hover:border-[#191B1E] hover:text-[#D36B4D] transition-colors"
        >
          X (Twitter)
        </a>

        <a
          href={mailUrl}
          className="px-3 py-1.5 border border-[#E6E2D9] bg-white text-[#191B1E] hover:border-[#191B1E] hover:text-[#D36B4D] transition-colors"
        >
          Email
        </a>
      </div>
    </div>
  );
}


/**
 * KEBA AI — Chat Typing & Thinking Indicator
 * 
 * Displayed while awaiting an AI response, synchronized with
 * Keba's 3D THINKING character animation.
 */

'use client';

import Image from 'next/image';

export function ChatTypingIndicator() {
  return (
    <div className="flex items-start gap-2.5 my-3 animate-in fade-in duration-300">
      <div className="relative w-7 h-7 aspect-square rounded-full overflow-hidden border border-[#191B1E]/20 shrink-0 mt-0.5">
        <Image
          src="/images/keba/keba-red-jacket.jpg"
          alt="Keba"
          fill
          sizes="28px"
          className="object-cover"
        />
      </div>

      <div className="bg-[#F5F3ED] border border-[#191B1E]/15 rounded-xl rounded-tl-none px-4 py-3 shadow-[2px_2px_0px_#191B1E]/10">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#D36B4D] animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 rounded-full bg-[#D36B4D] animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 rounded-full bg-[#D36B4D] animate-bounce" />
          <span className="text-xs font-mono text-[#191B1E]/70 ml-2 tracking-wide">
            Keba is thinking...
          </span>
        </div>
      </div>
    </div>
  );
}


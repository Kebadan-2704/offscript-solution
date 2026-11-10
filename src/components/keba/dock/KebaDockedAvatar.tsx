/**
 * KEBA AI — Docked Companion Avatar
 * 
 * Floating interactive representative avatar docked in the bottom-right corner.
 * Rendered when Keba is in DOCKED state. Provides click target for future chat interactions.
 */

'use client';

import Image from 'next/image';
import { useKebaStore } from '../state/kebaStore';
import { MessageSquare } from 'lucide-react';

interface KebaDockedAvatarProps {
  onOpenChat?: () => void;
}

export function KebaDockedAvatar({ onOpenChat }: KebaDockedAvatarProps) {
  const isChatOpen = useKebaStore((s) => s.isChatOpen);
  const tourStage = useKebaStore((s) => s.tourStage);
  const openChat = useKebaStore((s) => s.openChat);

  const isTourActive = tourStage !== 'INACTIVE';

  // Render whenever chat is not open and guided tour HUD is not active
  if (isChatOpen || isTourActive) {
    return null;
  }

  const handleClick = () => {
    if (onOpenChat) {
      onOpenChat();
    } else {
      openChat();
    }
  };

  return (
    <div
      className="pointer-events-auto fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[48] flex items-center gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 duration-400"
    >
      {/* Tooltip speech pill (hidden on small mobile screens to prevent text overlap) */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#191B1E] text-[#F5F3ED] border border-[#E6E2D9]/30 shadow-md font-mono text-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>KEBA AI · ONLINE</span>
      </div>

      {/* Interactive Avatar Button */}
      <button
        type="button"
        onClick={handleClick}
        aria-label="Open KEBA AI chat representative"
        className="relative group w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F5F3ED] border-2 border-[#191B1E] shadow-lg shadow-[#191B1E]/20 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
      >
        <div className="relative w-8 h-8 sm:w-10 sm:h-10 aspect-square rounded-full overflow-hidden border border-[#191B1E]/20">
          <Image
            src="/images/keba/keba-red-jacket.jpg"
            alt="Keba AI"
            fill
            sizes="40px"
            className="object-cover group-hover:scale-110 transition-transform"
          />
        </div>

        {/* Small badge icon */}
        <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#D36B4D] text-[#191B1E] border border-[#191B1E] flex items-center justify-center">
          <MessageSquare className="w-2 h-2 sm:w-2.5 sm:h-2.5 stroke-[2.5]" />
        </span>
      </button>
    </div>
  );
}

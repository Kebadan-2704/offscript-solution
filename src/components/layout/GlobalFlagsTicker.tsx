'use client';

import React from 'react';

interface FlagData {
  code: string;
  name: string;
  timezone?: string;
  svg: React.ReactNode;
}

export const GLOBAL_FLAGS: FlagData[] = [
  {
    code: 'US',
    name: 'United States',
    timezone: 'EST / PST',
    svg: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden" aria-hidden="true">
        <rect width="24" height="16" fill="#B22234" />
        <path d="M0,2.46h24M0,4.92h24M0,7.38h24M0,9.85h24M0,12.3h24M0,14.77h24" stroke="#FFFFFF" strokeWidth="1.23" />
        <rect width="9.6" height="8.6" fill="#3C3B6E" />
        <circle cx="2" cy="2" r="0.6" fill="#FFF" />
        <circle cx="4.8" cy="2" r="0.6" fill="#FFF" />
        <circle cx="7.6" cy="2" r="0.6" fill="#FFF" />
        <circle cx="3.4" cy="4.3" r="0.6" fill="#FFF" />
        <circle cx="6.2" cy="4.3" r="0.6" fill="#FFF" />
        <circle cx="2" cy="6.6" r="0.6" fill="#FFF" />
        <circle cx="4.8" cy="6.6" r="0.6" fill="#FFF" />
        <circle cx="7.6" cy="6.6" r="0.6" fill="#FFF" />
      </svg>
    ),
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    timezone: 'GMT / BST',
    svg: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden" aria-hidden="true">
        <rect width="24" height="16" fill="#012169" />
        <path d="M0,0 L24,16 M24,0 L0,16" stroke="#FFF" strokeWidth="2.4" />
        <path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="1.2" />
        <path d="M12,0 V16 M0,8 H24" stroke="#FFF" strokeWidth="4" />
        <path d="M12,0 V16 M0,8 H24" stroke="#C8102E" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    code: 'EU',
    name: 'European Union',
    timezone: 'CET',
    svg: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden" aria-hidden="true">
        <rect width="24" height="16" fill="#003399" />
        <circle cx="12" cy="3.5" r="0.6" fill="#FFCC00" />
        <circle cx="15.2" cy="4.3" r="0.6" fill="#FFCC00" />
        <circle cx="16.5" cy="8" r="0.6" fill="#FFCC00" />
        <circle cx="15.2" cy="11.7" r="0.6" fill="#FFCC00" />
        <circle cx="12" cy="12.5" r="0.6" fill="#FFCC00" />
        <circle cx="8.8" cy="11.7" r="0.6" fill="#FFCC00" />
        <circle cx="7.5" cy="8" r="0.6" fill="#FFCC00" />
        <circle cx="8.8" cy="4.3" r="0.6" fill="#FFCC00" />
      </svg>
    ),
  },
  {
    code: 'AE',
    name: 'UAE',
    timezone: 'GST',
    svg: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden" aria-hidden="true">
        <rect width="24" height="5.33" y="0" fill="#00732F" />
        <rect width="24" height="5.33" y="5.33" fill="#FFFFFF" />
        <rect width="24" height="5.34" y="10.66" fill="#000000" />
        <rect width="6" height="16" fill="#FF0000" />
      </svg>
    ),
  },
  {
    code: 'SG',
    name: 'Singapore',
    timezone: 'SGT',
    svg: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden" aria-hidden="true">
        <rect width="24" height="8" fill="#ED2939" />
        <rect width="24" height="8" y="8" fill="#FFFFFF" />
        <circle cx="4.5" cy="4" r="2.2" fill="#FFFFFF" />
        <circle cx="5.2" cy="4" r="2" fill="#ED2939" />
      </svg>
    ),
  },
  {
    code: 'JP',
    name: 'Japan',
    timezone: 'JST',
    svg: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-[#E6E2D9]" aria-hidden="true">
        <rect width="24" height="16" fill="#FFFFFF" />
        <circle cx="12" cy="8" r="4.2" fill="#BC002D" />
      </svg>
    ),
  },
  {
    code: 'AU',
    name: 'Australia',
    timezone: 'AEST',
    svg: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden" aria-hidden="true">
        <rect width="24" height="16" fill="#00008B" />
        <rect width="10" height="7" fill="#012169" />
        <path d="M0,0 L10,7 M10,0 L0,7" stroke="#FFF" strokeWidth="1.2" />
        <path d="M0,0 L10,7 M10,0 L0,7" stroke="#C8102E" strokeWidth="0.6" />
        <path d="M5,0 V7 M0,3.5 H10" stroke="#FFF" strokeWidth="1.8" />
        <path d="M5,0 V7 M0,3.5 H10" stroke="#C8102E" strokeWidth="1" />
        <polygon points="5,10 5.4,11.2 6.6,11.2 5.6,12 6,13.2 5,12.4 4,13.2 4.4,12 3.4,11.2 4.6,11.2" fill="#FFF" />
        <circle cx="18" cy="4" r="0.7" fill="#FFF" />
        <circle cx="16" cy="7" r="0.7" fill="#FFF" />
        <circle cx="20" cy="7" r="0.7" fill="#FFF" />
        <circle cx="17.5" cy="11" r="0.7" fill="#FFF" />
      </svg>
    ),
  },
  {
    code: 'CA',
    name: 'Canada',
    timezone: 'EST',
    svg: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden" aria-hidden="true">
        <rect width="6" height="16" fill="#FF0000" />
        <rect width="12" height="16" x="6" fill="#FFFFFF" />
        <rect width="6" height="16" x="18" fill="#FF0000" />
        <polygon points="12,4 13,6.5 15.5,6.5 13.5,8 14.5,10.5 12,9 9.5,10.5 10.5,8 8.5,6.5 11,6.5" fill="#FF0000" />
      </svg>
    ),
  },
  {
    code: 'CH',
    name: 'Switzerland',
    timezone: 'CET',
    svg: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden" aria-hidden="true">
        <rect width="24" height="16" fill="#D52B1E" />
        <rect width="3.2" height="9.6" x="10.4" y="3.2" fill="#FFFFFF" />
        <rect width="9.6" height="3.2" x="7.2" y="6.4" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    code: 'DE',
    name: 'Germany',
    timezone: 'CET',
    svg: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden" aria-hidden="true">
        <rect width="24" height="5.33" y="0" fill="#000000" />
        <rect width="24" height="5.33" y="5.33" fill="#DD0000" />
        <rect width="24" height="5.34" y="10.66" fill="#FFCE00" />
      </svg>
    ),
  },
  {
    code: 'IN',
    name: 'India',
    timezone: 'IST',
    svg: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden" aria-hidden="true">
        <rect width="24" height="5.33" y="0" fill="#FF9933" />
        <rect width="24" height="5.33" y="5.33" fill="#FFFFFF" />
        <rect width="24" height="5.34" y="10.66" fill="#128807" />
        <circle cx="12" cy="8" r="2" fill="none" stroke="#000080" strokeWidth="0.6" />
        <circle cx="12" cy="8" r="0.5" fill="#000080" />
      </svg>
    ),
  },
  {
    code: 'FR',
    name: 'France',
    timezone: 'CET',
    svg: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden" aria-hidden="true">
        <rect width="8" height="16" fill="#0055A4" />
        <rect width="8" height="16" x="8" fill="#FFFFFF" />
        <rect width="8" height="16" x="16" fill="#EF4135" />
      </svg>
    ),
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    timezone: 'AST',
    svg: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden" aria-hidden="true">
        <rect width="24" height="16" fill="#006C35" />
        <line x1="6" y1="11" x2="18" y2="11" stroke="#FFF" strokeWidth="1" />
        <text x="12" y="8" fill="#FFF" fontSize="5" textAnchor="middle" fontFamily="sans-serif">🇸🇦</text>
      </svg>
    ),
  },
  {
    code: 'NL',
    name: 'Netherlands',
    timezone: 'CET',
    svg: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden" aria-hidden="true">
        <rect width="24" height="5.33" y="0" fill="#AE1C28" />
        <rect width="24" height="5.33" y="5.33" fill="#FFFFFF" />
        <rect width="24" height="5.34" y="10.66" fill="#21468B" />
      </svg>
    ),
  },
  {
    code: 'SE',
    name: 'Sweden',
    timezone: 'CET',
    svg: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden" aria-hidden="true">
        <rect width="24" height="16" fill="#006AA7" />
        <rect width="3.2" height="16" x="7" fill="#FECC00" />
        <rect width="24" height="3.2" y="6.4" fill="#FECC00" />
      </svg>
    ),
  },
  {
    code: 'BR',
    name: 'Brazil',
    timezone: 'BRT',
    svg: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden" aria-hidden="true">
        <rect width="24" height="16" fill="#009C3B" />
        <polygon points="12,2 21,8 12,14 3,8" fill="#FFDF00" />
        <circle cx="12" cy="8" r="2.8" fill="#002776" />
      </svg>
    ),
  },
];

interface GlobalFlagsTickerProps {
  variant?: 'compact' | 'full';
  className?: string;
}

/**
 * Continuous running flag ticker bar for Global Availability.
 * Uses crisp vector SVGs (rendering flawlessly on all platforms including Windows).
 */
export function GlobalFlagsTicker({ variant = 'full', className = '' }: GlobalFlagsTickerProps) {
  // Triple the list to ensure zero gap during continuous loop
  const list = [...GLOBAL_FLAGS, ...GLOBAL_FLAGS, ...GLOBAL_FLAGS];

  if (variant === 'compact') {
    return (
      <div
        className={`relative w-full overflow-hidden border border-[#E6E2D9] bg-[#EAE7DF]/70 rounded-xs py-1.5 ${className}`}
        aria-label="Global Availability: Serving clients worldwide across major timezones"
      >
        {/* Ambient fade masks for edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#EAE7DF] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#EAE7DF] to-transparent z-10" />

        <div className="flex w-max animate-flags-loop hover:[animation-play-state:paused] cursor-default select-none">
          {list.map((flag, idx) => (
            <div
              key={`${flag.code}-${idx}`}
              className="inline-flex items-center gap-1.5 px-3 font-mono text-[11px] text-[#191B1E] shrink-0"
              title={flag.name}
            >
              {flag.svg}
              <span className="font-semibold">{flag.code}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-[#E6E2D9] bg-[#EFECE4]/50 py-2.5 my-0 ${className}`}
      aria-label="Global Client Availability across all continents"
    >
      {/* Edge gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#F5F3ED] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#F5F3ED] to-transparent z-10" />

      <div className="flex w-max animate-flags-loop hover:[animation-play-state:paused] cursor-default select-none items-center">
        {list.map((flag, idx) => (
          <div
            key={`${flag.code}-${idx}`}
            className="inline-flex items-center gap-2.5 px-4 font-mono text-xs text-[#52534E] shrink-0"
          >
            {flag.svg}
            <span className="font-medium text-[#191B1E] uppercase tracking-wider">{flag.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D36B4D]/70 mx-3 select-none shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}


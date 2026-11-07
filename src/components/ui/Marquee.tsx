'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MarqueeProps {
  items: string[];
  speedSeconds?: number;
  className?: string;
}

/**
 * Continuous running typographic marquee in Syne font with pause-on-hover and aria-hidden duplicate.
 */
export function Marquee({
  items,
  speedSeconds = 32,
  className = '',
}: MarqueeProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      aria-label="Studio disciplines and capabilities"
      className={`border-y border-[#E6E2D9] overflow-hidden py-5 sm:py-6 select-none bg-[#F5F3ED] group ${className}`}
    >
      <div
        className={`flex whitespace-nowrap will-change-transform ${
          prefersReduced ? 'overflow-x-auto' : 'group-hover:[animation-play-state:paused]'
        }`}
        style={{
          animation: prefersReduced ? 'none' : `marquee ${speedSeconds}s linear infinite`,
        }}
      >
        {/* Track 1 */}
        <div className="flex items-center gap-10 sm:gap-14 pr-10 sm:pr-14 shrink-0">
          {items.map((item, idx) => (
            <span
              key={idx}
              className={`font-syne text-xl sm:text-2xl md:text-3xl font-medium tracking-tight ${
                idx % 2 === 1 ? 'text-[#9B3F27]' : 'text-[#191B1E]'
              }`}
            >
              {item}
              <span className="inline-block ml-10 sm:ml-14 text-[#5A5B56]" aria-hidden="true">
                /
              </span>
            </span>
          ))}
        </div>

        {/* Track 2 (aria-hidden duplicate for seamless infinite loop) */}
        {!prefersReduced && (
          <div
            aria-hidden="true"
            className="flex items-center gap-10 sm:gap-14 pr-10 sm:pr-14 shrink-0"
          >
            {items.map((item, idx) => (
              <span
                key={`dup-${idx}`}
                className={`font-syne text-xl sm:text-2xl md:text-3xl font-medium tracking-tight ${
                  idx % 2 === 1 ? 'text-[#9B3F27]' : 'text-[#191B1E]'
                }`}
              >
                {item}
                <span className="inline-block ml-10 sm:ml-14 text-[#5A5B56]">
                  /
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}


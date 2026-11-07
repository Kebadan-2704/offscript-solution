import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ScrollWords } from '@/components/animations/ScrollWords';

/**
 * Section 03: Carbon Ink Brand Statement with progressive scroll-driven text illumination.
 */
export function BrandStatementSection() {
  const statement =
    'Most technology agencies default to pre-packaged templates and rigid SaaS subscriptions that force your operations into artificial compromises. OFFSCRIPT SOLUTION exists to engineer bespoke digital architectures designed around the exact shape of your hardest problems.';

  return (
    <section className="relative bg-[#191B1E] text-[#F5F3ED] py-24 sm:py-32 lg:py-44 overflow-hidden border-y border-[#191B1E]">
      {/* Ghosted 3D symbol accent in background (7% opacity) */}
      <div
        aria-hidden="true"
        className="absolute -right-16 top-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] lg:w-[680px] aspect-square pointer-events-none opacity-[0.07] select-none"
      >
        <Image
          src="/brand/logo-symbol-3d.png"
          alt=""
          width={680}
          height={680}
          className="w-full h-full object-contain filter grayscale"
        />
      </div>

      <Container className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Eyebrow dark>Studio Statement</Eyebrow>
          <span className="font-mono text-xs tracking-widest text-[#92938D]">
            03 // 11
          </span>
        </div>

        <div className="max-w-4xl">
          <ScrollWords
            text={statement}
            className="font-space text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.12]"
            wordClassName="transition-opacity duration-200"
          />

          <p className="mt-12 text-[#92938D] text-base sm:text-lg max-w-xl leading-relaxed font-normal">
            No cookie-cutter code. No bloated agency overhead. Just senior technical discipline
            dedicated to building software that matters.
          </p>
        </div>
      </Container>
    </section>
  );
}


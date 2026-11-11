import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ScrollWords } from '@/components/animations/ScrollWords';

/**
 * Section 03: Carbon Ink Brand Statement with progressive scroll-driven text illumination.
 */
export function BrandStatementSection() {
  const statement =
    'Most agencies default to rigid templates. OFFSCRIPT SOLUTION engineers bespoke digital architectures built for your hardest problems.';

  return (
    <section id="statement" className="relative bg-[#191B1E] text-[#F5F3ED] py-12 sm:py-16 lg:py-20 overflow-hidden border-y border-[#191B1E]">
      <Container className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Eyebrow dark>Studio Statement</Eyebrow>
          <span className="font-mono text-xs tracking-widest text-[#E6E2D9]/70 font-semibold">
            03
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Statement Typography */}
          <div className="lg:col-span-7 xl:col-span-8">
            <ScrollWords
              text={statement}
              className="font-space text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold tracking-[-0.035em] leading-[1.12]"
              wordClassName="transition-opacity duration-200"
            />

            <p className="mt-6 text-[#E6E2D9]/90 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
              No cookie-cutter code. No bloated agency overhead. Just senior technical discipline
              dedicated to building software that matters.
            </p>
          </div>

          {/* Right Column: Interactive 3D Emblem (Dark by default, bursts into vibrant color on hover) */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-[4/3] flex items-center justify-center cursor-pointer select-none group/emblem py-2"
              title="OFFSCRIPT SOLUTION Monogram"
            >
              {/* Ambient Warm Halo Bloom on Hover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-radial from-[#D36B4D]/50 via-[#D36B4D]/15 to-transparent blur-3xl rounded-full opacity-0 group-hover/emblem:opacity-100 transition-all duration-700 pointer-events-none scale-75 group-hover/emblem:scale-125"
              />

              <div className="relative w-full h-full flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover/emblem:scale-105">
                <Image
                  src="/brand/hero-emblem-3d.png"
                  alt="OFFSCRIPT 3D emblem accent"
                  width={857}
                  height={542}
                  priority
                  className="w-full h-auto object-contain filter grayscale contrast-125 brightness-75 opacity-25 group-hover/emblem:opacity-100 group-hover/emblem:grayscale-0 group-hover/emblem:brightness-110 group-hover/emblem:saturate-150 group-hover/emblem:drop-shadow-[0_25px_60px_rgba(211,107,77,0.45)] transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.1,1)]"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


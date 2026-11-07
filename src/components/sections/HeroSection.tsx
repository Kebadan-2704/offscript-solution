'use client';

import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { SplitHeading } from '@/components/animations/SplitHeading';
import { Parallax } from '@/components/animations/Parallax';
import { DrawPath } from '@/components/animations/DrawPath';

/**
 * Editorial Hero Section with asymmetric typography and bespoke SVG OS symbol composition.
 */
export function HeroSection() {
  return (
    <section className="relative min-h-[92svh] pt-36 sm:pt-40 lg:pt-48 pb-20 flex flex-col justify-between overflow-hidden bg-[#F5F3ED]">
      <Container className="my-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-start">
            <Eyebrow>Independent Technology & Digital Solutions Studio</Eyebrow>

            <SplitHeading
              lines={['WE THINK', 'BEYOND THE', 'EXPECTED.']}
              as="h1"
              className="text-5xl sm:text-7xl md:text-8xl xl:text-[104px] font-bold tracking-[-0.045em] leading-[0.92] text-[#191B1E]"
            />

            <p className="mt-8 text-lg sm:text-xl text-[#6B6C67] max-w-xl leading-relaxed">
              We engineer bespoke software, intelligent systems, and scalable digital platforms
              designed to solve complex operational bottlenecks with uncompromising technical craft.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
              <Button href="#contact" variant="primary">
                Start a Project
              </Button>
              <Button href="#work" variant="secondary">
                Explore Our Work
              </Button>
            </div>
          </div>

          {/* Right Column: Art-Directed SVG Composition */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
            <Parallax maxOffset={18} className="w-full max-w-[340px] sm:max-w-[420px] aspect-square">
              <div className="relative w-full h-full p-6 sm:p-8 flex items-center justify-center">
                <svg
                  viewBox="0 0 400 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full overflow-visible"
                >
                  {/* Outer subtle guide hexagon */}
                  <DrawPath
                    d="M 200,40 L 340,120 L 340,280 L 200,360 L 60,280 L 60,120 Z"
                    stroke="#E6E2D9"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    durationMs={2200}
                    delayMs={200}
                  />

                  {/* Left "O" Ring Form (Carbon Ink) */}
                  <g className="animate-[float_7s_ease-in-out_infinite_alternate]">
                    <DrawPath
                      d="M 170,120 L 100,165 C 80,180 80,220 100,235 L 170,280 C 190,292 215,280 215,255 L 215,145 C 215,120 190,108 170,120 Z"
                      stroke="#191B1E"
                      strokeWidth="24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      durationMs={2400}
                      delayMs={300}
                    />
                  </g>

                  {/* Top Right Orange Parallelogram Accent */}
                  <g className="animate-[float_6s_ease-in-out_infinite_alternate_-2s]">
                    <DrawPath
                      d="M 250,110 L 305,110 L 285,145 L 230,145 Z"
                      stroke="#D36B4D"
                      strokeWidth="6"
                      fill="#D36B4D"
                      durationMs={1800}
                      delayMs={600}
                    />
                  </g>

                  {/* Intersecting "S" Streamers (Terracotta Ribbon) */}
                  <g className="animate-[float_8s_ease-in-out_infinite_alternate_-4s]">
                    <DrawPath
                      d="M 160,280 L 290,280 C 315,280 325,255 310,240 L 205,175 C 190,165 200,140 220,140 L 320,140"
                      stroke="#D36B4D"
                      strokeWidth="22"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      durationMs={2800}
                      delayMs={500}
                    />
                  </g>

                  {/* Diagonal Node-to-Node Slash */}
                  <DrawPath
                    d="M 90,320 L 310,80"
                    stroke="#D36B4D"
                    strokeWidth="3"
                    strokeDasharray="6 6"
                    durationMs={2000}
                    delayMs={800}
                  />

                  {/* Accent Nodes */}
                  <circle cx="90" cy="320" r="5" fill="#191B1E" />
                  <circle cx="310" cy="80" r="5" fill="#D36B4D" />
                </svg>
              </div>
            </Parallax>
          </div>
        </div>
      </Container>

      {/* Scroll Cue Hairline indicator */}
      <div className="wrap w-full flex items-center justify-between pt-12 border-t border-[#E6E2D9]">
        <div className="flex items-center gap-4 text-xs font-mono text-[#6B6C67] uppercase tracking-widest">
          <div className="relative w-px h-8 bg-[#E6E2D9] overflow-hidden">
            <div className="absolute inset-0 bg-[#D36B4D] animate-[scrollCue_2s_infinite]" />
          </div>
          <span>Scroll to explore</span>
        </div>
        <div className="font-mono text-xs text-[#6B6C67] tracking-widest">
          STUDIO // 2026
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(10px, -12px, 0);
          }
        }
        @keyframes scrollCue {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </section>
  );
}

'use client';

import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { SplitHeading } from '@/components/animations/SplitHeading';
import { Magnetic } from '@/components/animations/Magnetic';

/**
 * Section 10: Final Studio CTA with oversized headline, floating 3D symbol, and quick consultation intake.
 */
export function FinalCtaSection() {
  return (
    <section
      id="contact"
      className="relative bg-[#191B1E] text-[#F5F3ED] py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Floating 3D symbol in background */}
      <div
        aria-hidden="true"
        className="absolute -right-12 top-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] lg:w-[600px] aspect-square pointer-events-none opacity-30 select-none animate-[floatSlow_8s_ease-in-out_infinite_alternate]"
      >
        <Image
          src="/brand/logo-symbol-3d.png"
          alt=""
          width={600}
          height={600}
          className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        />
      </div>

      <Container className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Eyebrow dark>Initiate Engagement</Eyebrow>
          <span className="font-mono text-xs tracking-widest text-[#92938D]">
            10 // 11
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          {/* Left Column: Big Headline */}
          <div className="lg:col-span-8">
            <SplitHeading
              lines={["LET'S BUILD", 'SOMETHING THAT', 'MATTERS.']}
              as="h2"
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#F5F3ED] leading-[0.94] uppercase"
            />

            <p className="mt-8 text-lg sm:text-xl text-[#92938D] max-w-xl leading-relaxed">
              Whether you need to architect a custom platform from scratch, deploy applied AI, or
              resolve deep infrastructure bottlenecks — let&apos;s have an honest engineering
              conversation.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Magnetic strength={10}>
                <Button href="/contact" variant="primary">
                  Schedule a Consultation
                </Button>
              </Magnetic>
              <a
                href="mailto:hello@offscriptsolution.com"
                className="font-mono text-xs text-[#E6E2D9] uppercase tracking-wider border-b border-[#E6E2D9] pb-1 hover:text-[#D36B4D] hover:border-[#D36B4D] transition-colors"
              >
                hello@offscriptsolution.com
              </a>
            </div>
          </div>

          {/* Right Column: Direct SLA box */}
          <div className="lg:col-span-4 p-8 border border-[#E6E2D9]/20 bg-[#191B1E]/60 backdrop-blur-sm">
            <span className="font-mono text-xs text-[#D36B4D] uppercase tracking-widest block mb-4">
              Engagement Protocol
            </span>
            <ul className="space-y-4 font-mono text-xs text-[#92938D]">
              <li className="flex items-start gap-3">
                <span className="text-[#D36B4D] font-bold">01</span>
                <span>Direct consultation with senior technical architects.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D36B4D] font-bold">02</span>
                <span>Feasibility audit & architectural outline within 48h.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D36B4D] font-bold">03</span>
                <span>Transparent milestones, fixed sprints, clean delivery.</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes floatSlow {
          0% {
            transform: translate3d(0, -50%, 0) rotate(0deg);
          }
          100% {
            transform: translate3d(15px, calc(-50% - 15px), 0) rotate(-4deg);
          }
        }
      `}</style>
    </section>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Marquee } from '@/components/ui/Marquee';
import { SplitHeading } from '@/components/animations/SplitHeading';
import { ScrollWords } from '@/components/animations/ScrollWords';
import { Counter } from '@/components/animations/Counter';
import { Parallax } from '@/components/animations/Parallax';
import { DrawPath } from '@/components/animations/DrawPath';
import { StaggerGroup } from '@/components/animations/StaggerGroup';
import { KebaDevSandbox } from '@/components/keba/KebaDevSandbox';

export const metadata: Metadata = {
  title: 'Animation Sandbox (Dev Only)',
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Development-only animation testing harness.
 * Excluded from search index and sitemaps via robots metadata.
 */
export default function MotionDevPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  const sampleMarquee = [
    'SOFTWARE ENGINEERING',
    'ARTIFICIAL INTELLIGENCE',
    'INTELLIGENT AUTOMATION',
    'CLOUD ARCHITECTURE',
    'DIGITAL EXPERIENCES',
  ];

  return (
    <div className="pt-32 pb-24 space-y-24 bg-[#F5F3ED]">
      <Container>
        <SectionHeading
          index="DEV / 01"
          eyebrow="Motion & Interaction Sandbox"
          title="Animation Primitives & Verification"
          description="Testing ground for the 10+ custom animation primitives defined in PART 5. Test under both normal motion and prefers-reduced-motion: reduce."
        />

        {/* 1. MaskReveal & SplitHeading */}
        <div className="p-8 border border-[#E6E2D9] bg-white mb-12">
          <Eyebrow>01 / Mask Reveal & Split Heading</Eyebrow>
          <SplitHeading
            lines={['WE ENGINEER', 'WHAT OTHERS DEEM', 'OFF SCRIPT.']}
            as="h2"
            className="text-4xl md:text-6xl my-6"
          />
          <p className="text-sm text-[#6B6C67]">
            Each line animates with an overflow-hidden mask sliding from translateY(110%) to translateY(0).
          </p>
        </div>

        {/* 2. ScrollWords Scrub */}
        <div className="p-12 bg-[#191B1E] text-[#F5F3ED] border border-[#191B1E] mb-12">
          <Eyebrow dark>02 / Scroll-Scrubbed Words (18% to 100% opacity)</Eyebrow>
          <div className="my-8">
            <ScrollWords
              text="Most studios ship templates disguised as bespoke work. We engineer deliberate digital architectures designed to solve complex business bottlenecks with uncompromising craft."
              className="font-space text-3xl sm:text-4xl md:text-5xl leading-tight font-semibold"
            />
          </div>
          <p className="font-mono text-xs text-[#92938D]">
            Scroll up and down to observe progressive token illumination.
          </p>
        </div>

        {/* 3. Numerical Counters */}
        <div className="p-8 border border-[#E6E2D9] bg-white mb-12">
          <Eyebrow>03 / Staggered Metric Counters</Eyebrow>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-8">
            <div>
              <Counter
                value={99}
                suffix="%"
                className="font-space text-5xl md:text-6xl font-bold text-[#D36B4D]"
              />
              <p className="font-mono text-xs text-[#6B6C67] mt-2">TEST COVERAGE</p>
            </div>
            <div>
              <Counter
                value={100}
                suffix="ms"
                className="font-space text-5xl md:text-6xl font-bold text-[#191B1E]"
              />
              <p className="font-mono text-xs text-[#6B6C67] mt-2">TTFB PERFORMANCE</p>
            </div>
            <div>
              <Counter
                value={0}
                suffix=""
                className="font-space text-5xl md:text-6xl font-bold text-[#D36B4D]"
              />
              <p className="font-mono text-xs text-[#6B6C67] mt-2">TECHNICAL DEBT</p>
            </div>
            <div>
              <Counter
                value={24}
                suffix="/7"
                className="font-space text-5xl md:text-6xl font-bold text-[#191B1E]"
              />
              <p className="font-mono text-xs text-[#6B6C67] mt-2">CLOUD RESILIENCE</p>
            </div>
          </div>
        </div>

        {/* 4. DrawPath SVG Stroke Animation */}
        <div className="p-8 border border-[#E6E2D9] bg-white mb-12">
          <Eyebrow>04 / SVG Stroke Draw-In</Eyebrow>
          <div className="w-48 h-48 mx-auto my-6">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#D36B4D] fill-none stroke-2">
              <DrawPath
                d="M 50,5 L 90,28 L 90,72 L 50,95 L 10,72 L 10,28 Z"
                durationMs={2000}
                delayMs={200}
              />
            </svg>
          </div>
          <p className="text-center font-mono text-xs text-[#6B6C67]">
            Hexagonal ring path drawn dynamically via strokeDashoffset
          </p>
        </div>

        {/* 5. Interactive Buttons & Magnetic Hover */}
        <div className="p-8 border border-[#E6E2D9] bg-white mb-12">
          <Eyebrow>05 / Buttons with Wipe Fill & Arrow Translate</Eyebrow>
          <div className="flex flex-wrap gap-4 my-6">
            <Button variant="primary">Start a Project</Button>
            <Button variant="secondary">Explore Services</Button>
            <Button variant="dark">Dark Variant</Button>
          </div>
        </div>

        {/* 6. Stagger Group */}
        <div className="p-8 border border-[#E6E2D9] bg-white mb-12">
          <Eyebrow>06 / Staggered Card Entrance</Eyebrow>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            <div className="p-6 border border-[#E6E2D9] bg-[#F5F3ED]">
              <span className="font-mono text-xs text-[#D36B4D]">01 · STAGGER</span>
              <h3 className="font-space text-xl font-semibold mt-2">First Card</h3>
              <p className="text-sm text-[#6B6C67] mt-2">Enters at base delay.</p>
            </div>
            <div className="p-6 border border-[#E6E2D9] bg-[#F5F3ED]">
              <span className="font-mono text-xs text-[#D36B4D]">02 · STAGGER</span>
              <h3 className="font-space text-xl font-semibold mt-2">Second Card</h3>
              <p className="text-sm text-[#6B6C67] mt-2">Enters after 90ms offset.</p>
            </div>
            <div className="p-6 border border-[#E6E2D9] bg-[#F5F3ED]">
              <span className="font-mono text-xs text-[#D36B4D]">03 · STAGGER</span>
              <h3 className="font-space text-xl font-semibold mt-2">Third Card</h3>
              <p className="text-sm text-[#6B6C67] mt-2">Enters after 180ms offset.</p>
            </div>
          </StaggerGroup>
        </div>

        {/* 7. Mouse Parallax (24px max) */}
        <div className="p-8 border border-[#E6E2D9] bg-white mb-12 overflow-hidden">
          <Eyebrow>07 / Mouse Parallax Container (Bounded to 24px)</Eyebrow>
          <Parallax maxOffset={24} className="my-8 text-center">
            <div className="inline-block p-8 bg-[#DCE3DD] border border-[#191B1E]">
              <span className="font-space text-2xl font-bold text-[#191B1E]">
                Hover and move your mouse across the viewport
              </span>
            </div>
          </Parallax>
        </div>

        {/* 08. KEBA AI — Core 3D Engine & Character Harness (Milestone 1) */}
        <div className="mb-12">
          <div className="mb-4">
            <Eyebrow>08 / KEBA AI — 3D Character Engine & Animation Sandbox</Eyebrow>
          </div>
          <KebaDevSandbox />
        </div>
      </Container>

      {/* 8. Running Marquee */}
      <div>
        <div className="wrap mb-4">
          <Eyebrow>08 / Running Marquee with Pause on Hover</Eyebrow>
        </div>
        <Marquee items={sampleMarquee} />
      </div>
    </div>
  );
}

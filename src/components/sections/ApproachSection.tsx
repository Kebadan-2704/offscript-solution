'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { APPROACH_STAGES } from '@/content/approach';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  Compass,
  Layers,
  Cpu,
  Activity,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

interface StageMetaItem {
  icon: LucideIcon;
  phase: string;
  deliverable: string;
  timeline: string;
  status: string;
}

const STAGE_META: StageMetaItem[] = [
  {
    icon: Compass,
    phase: 'PHASE 01',
    deliverable: 'System Topology & Risk Map',
    timeline: '1–2 WEEKS',
    status: 'DISCOVERY PROTOCOL',
  },
  {
    icon: Layers,
    phase: 'PHASE 02',
    deliverable: 'Formal Architecture Blueprint',
    timeline: '2 WEEKS',
    status: 'SYSTEM SPECIFICATION',
  },
  {
    icon: Cpu,
    phase: 'PHASE 03',
    deliverable: 'Production Runtime & CI/CD',
    timeline: '4–8 WEEKS',
    status: 'SPRINT EXECUTION',
  },
  {
    icon: Activity,
    phase: 'PHASE 04',
    deliverable: 'Telemetry & Auto-Scaling',
    timeline: 'CONTINUOUS',
    status: 'TELEMETRY LIFECYCLE',
  },
];

const DEFAULT_META: StageMetaItem = STAGE_META[0] as StageMetaItem;

/**
 * Section 05: The Studio Method.
 * Redesigned with scroll-driven telemetry, synchronized timeline scrubbing,
 * laser pipeline rail, and staggered architectural Bento cards.
 */
export function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardsRef, { once: false, margin: '-15% 0px' });
  const prefersReduced = useReducedMotion();

  const [activeStage, setActiveStage] = useState<number>(0);
  const [isManualOverride, setIsManualOverride] = useState<boolean>(false);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll tracking across this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 30%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const railWidth = useTransform(smoothProgress, [0, 1], ['12%', '100%']);

  // Automatically scrub active stage as user scrolls through the section
  useEffect(() => {
    if (prefersReduced) return;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (isManualOverride) return;

      if (latest < 0.28) {
        setActiveStage(0);
      } else if (latest < 0.52) {
        setActiveStage(1);
      } else if (latest < 0.76) {
        setActiveStage(2);
      } else {
        setActiveStage(3);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isManualOverride, prefersReduced]);

  const handleStageSelect = (idx: number) => {
    setActiveStage(idx);
    setIsManualOverride(true);
    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    manualTimeoutRef.current = setTimeout(() => {
      setIsManualOverride(false);
    }, 2800);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-pad bg-[#E6E2D9] border-b border-[#191B1E]/15 relative overflow-hidden"
    >
      {/* Subtle blueprint coordinate grid backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #191B1E 1px, transparent 1px), linear-gradient(to bottom, #191B1E 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <Container className="relative z-10">
        <SectionHeading
          index="05"
          eyebrow="The Studio Method"
          title="Engineering by deliberate design, not assumption."
          description="A four-stage methodology forged through production systems to eliminate risk and ensure technical longevity."
        />

        {/* Scroll-Driven Top Ribbon Selector & Progress Rail */}
        <div className="mt-8 mb-6 sm:mb-8">
          {/* Interactive Phase Buttons */}
          <div className="w-full bg-[#F5F3ED]/85 backdrop-blur-md p-1.5 sm:p-2 rounded-xl border border-[#191B1E]/10 grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2 shadow-sm">
            {APPROACH_STAGES.map((stage, idx) => {
              const meta: StageMetaItem = STAGE_META[idx] ?? DEFAULT_META;
              const Icon = meta.icon;
              const isActive = activeStage === idx;

              return (
                <button
                  key={`tab-${stage.number}`}
                  type="button"
                  onClick={() => handleStageSelect(idx)}
                  className={`group relative text-left px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg transition-all duration-300 flex items-center justify-between cursor-pointer select-none ${
                    isActive
                      ? 'bg-[#191B1E] text-[#F5F3ED] shadow-md scale-[1.01]'
                      : 'hover:bg-[#191B1E]/5 text-[#52534E] hover:text-[#191B1E]'
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-[#D36B4D] text-[#F5F3ED] shadow-[0_0_12px_rgba(211,107,77,0.5)] rotate-3'
                          : 'bg-[#191B1E]/8 text-[#191B1E] group-hover:bg-[#D36B4D]/15 group-hover:text-[#D36B4D]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                    <div>
                      <div
                        className={`font-mono text-[10px] tracking-widest uppercase transition-colors ${
                          isActive ? 'text-[#D36B4D]' : 'text-[#7B7D76]'
                        }`}
                      >
                        PHASE 0{idx + 1}
                      </div>
                      <div className="font-syne text-xs sm:text-sm font-bold tracking-tight">
                        {stage.name}
                      </div>
                    </div>
                  </div>

                  {isActive && (
                    <motion.span
                      layoutId="activeBeacon"
                      className="w-2 h-2 rounded-full bg-[#D36B4D] shadow-[0_0_8px_#D36B4D]"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Real-time Scroll Laser Rail */}
          <div className="hidden lg:block relative w-full h-[3px] bg-[#191B1E]/10 rounded-full mt-3 overflow-hidden">
            {/* Scroll progress background trace */}
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#D36B4D] via-[#E88A6E] to-[#D36B4D] rounded-full shadow-[0_0_10px_rgba(211,107,77,0.7)]"
              style={{
                width: prefersReduced ? `${(activeStage + 1) * 25}%` : railWidth,
              }}
            />

            {/* Glowing moving energy photon pulse */}
            <motion.div
              aria-hidden="true"
              className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
              animate={{
                left: ['-5%', '105%'],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>

        {/* 4 Architectural Spec Cards with Staggered Scroll Entrance */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {APPROACH_STAGES.map((stage, idx) => {
            const meta: StageMetaItem = STAGE_META[idx] ?? DEFAULT_META;
            const Icon = meta.icon;
            const isSelected = activeStage === idx;

            return (
              <motion.div
                key={stage.number}
                initial={prefersReduced ? false : { opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
                transition={{
                  duration: 0.65,
                  delay: prefersReduced ? 0 : idx * 0.12,
                  ease: [0.2, 0.7, 0.1, 1],
                }}
                whileHover={prefersReduced ? {} : { y: -6 }}
                onMouseEnter={() => handleStageSelect(idx)}
                className={`group relative flex flex-col justify-between bg-[#F5F3ED] rounded-xl p-5 sm:p-6 transition-all duration-500 border ${
                  isSelected
                    ? 'border-[#D36B4D] shadow-[0_20px_45px_-12px_rgba(211,107,77,0.24)] ring-1 ring-[#D36B4D]/30'
                    : 'border-[#191B1E]/10 hover:border-[#191B1E]/30 hover:shadow-lg'
                }`}
              >
                {/* Active Indicator Top Laser Hairline */}
                <div
                  aria-hidden="true"
                  className={`absolute top-0 left-5 right-5 h-[2px] transition-all duration-500 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#D36B4D] via-[#E88A6E] to-[#D36B4D] opacity-100 shadow-[0_0_8px_#D36B4D]'
                      : 'bg-transparent opacity-0'
                  }`}
                />

                {/* Subtle Ambient Radial Glow on Active */}
                {isSelected && (
                  <div
                    aria-hidden="true"
                    className="absolute -top-10 -right-10 w-44 h-44 bg-radial from-[#D36B4D]/15 to-transparent rounded-full blur-2xl pointer-events-none"
                  />
                )}

                <div>
                  {/* Card Header: Phase badge & Icon */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#191B1E]/10">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wider text-[#D36B4D]">
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          isSelected ? 'bg-[#D36B4D] scale-125 shadow-[0_0_6px_#D36B4D]' : 'bg-[#D36B4D]/60'
                        }`}
                      />
                      {meta.phase}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[#7B7D76] uppercase tracking-wider">
                        {meta.timeline}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#D36B4D] text-[#F5F3ED] shadow-sm'
                            : 'bg-[#191B1E]/5 text-[#191B1E] group-hover:text-[#D36B4D]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Stage Title & Number Lockup */}
                  <div className="flex items-baseline justify-between mb-2">
                    <h3
                      className={`font-syne text-2xl font-bold tracking-tight transition-colors duration-300 ${
                        isSelected ? 'text-[#191B1E]' : 'text-[#191B1E] group-hover:text-[#D36B4D]'
                      }`}
                    >
                      {stage.name}
                    </h3>
                    <span
                      className={`font-mono text-xs font-bold transition-all duration-300 ${
                        isSelected
                          ? 'text-[#D36B4D] scale-110'
                          : 'text-[#191B1E]/30 group-hover:text-[#D36B4D]/60'
                      }`}
                    >
                      0{stage.number}
                    </span>
                  </div>

                  {/* Technical Discipline Subhead */}
                  <p className="font-mono text-[11px] text-[#9B3F27] uppercase tracking-wider font-semibold mb-3 leading-relaxed">
                    {stage.tagline}
                  </p>

                  {/* Narrative Body */}
                  <p className="text-[#3A3C38] text-xs sm:text-sm leading-relaxed mb-5">
                    {stage.description}
                  </p>

                  {/* Deliverables / Activity Matrix */}
                  <div className="pt-4 border-t border-[#191B1E]/10">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[#7B7D76] mb-2.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span>Key Protocols & Output</span>
                        <ArrowRight className="w-2.5 h-2.5 text-[#D36B4D]" />
                      </span>
                      {isSelected && (
                        <span className="text-[9px] text-[#D36B4D] font-bold flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>ACTIVE</span>
                        </span>
                      )}
                    </div>
                    <ul className="space-y-1.5">
                      {stage.activities.map((act) => (
                        <li
                          key={act}
                          className="flex items-start gap-2 text-xs font-mono text-[#191B1E] group/item"
                        >
                          <CheckCircle2
                            className={`w-3.5 h-3.5 shrink-0 mt-0.5 transition-colors duration-300 ${
                              isSelected ? 'text-[#D36B4D]' : 'text-[#7B7D76] group-hover/item:text-[#D36B4D]'
                            }`}
                          />
                          <span
                            className={`leading-tight transition-colors duration-200 ${
                              isSelected ? 'text-[#191B1E] font-medium' : 'text-[#2B2D29]'
                            }`}
                          >
                            {act}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Spec Badge */}
                <div className="mt-5 pt-3.5 border-t border-[#191B1E]/10 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#7B7D76] truncate max-w-[140px] font-medium">
                    {meta.deliverable}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-wider uppercase transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#D36B4D] text-[#F5F3ED] shadow-sm'
                        : 'bg-[#191B1E]/5 text-[#52534E]'
                    }`}
                  >
                    {isSelected ? 'IN FOCUS' : 'VERIFIED'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

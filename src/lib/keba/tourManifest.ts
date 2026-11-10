/**
 * KEBA AI — Guided Tour Manifest
 * 
 * Defines the 5 verified tour stops, selectors, dialogue copy, and 3D character transforms.
 * All dialogue is grounded strictly in verified company content from src/content/.
 */

export interface TourStop {
  index: number;
  id: string;
  selector: string;
  stepLabel: string;
  sectionTitle: string;
  dialogue: string;
  characterPosition: [number, number, number];
  characterScale: number;
  characterState: 'GREETING' | 'TALKING' | 'HAPPY' | 'IDLE';
}

export const TOUR_STOPS: TourStop[] = [
  {
    index: 0,
    id: 'identity',
    selector: '#main-content',
    stepLabel: '01 OF 05',
    sectionTitle: 'Studio Identity & Philosophy',
    dialogue:
      "Welcome to OFFSCRIPT SOLUTION! We're an independent technology studio engineering bespoke software, scalable platforms, and intelligent systems tailored to your business.",
    characterPosition: [1.32, -0.72, 0.1],
    characterScale: 0.52,
    characterState: 'GREETING',
  },
  {
    index: 1,
    id: 'services',
    selector: '#services',
    stepLabel: '02 OF 05',
    sectionTitle: 'Core Capabilities & Disciplines',
    dialogue:
      'Our capabilities span full-stack software, mobile apps, applied AI, automated workflows, and high-performance cloud architecture.',
    characterPosition: [1.32, -0.72, 0.1],
    characterScale: 0.52,
    characterState: 'TALKING',
  },
  {
    index: 2,
    id: 'approach',
    selector: '#about',
    stepLabel: '03 OF 05',
    sectionTitle: 'Studio Methodology & Delivery',
    dialogue:
      'We work directly with you: senior architecture, iterative development, empirical testing, and 100% intellectual property ownership.',
    characterPosition: [1.32, -0.72, 0.1],
    characterScale: 0.52,
    characterState: 'TALKING',
  },
  {
    index: 3,
    id: 'work',
    selector: '#work',
    stepLabel: '04 OF 05',
    sectionTitle: 'Selected Production Case Studies',
    dialogue:
      'Take a look at our deployed client solutions—from real-time fleet logistics to enterprise web platforms and IoT device telemetry.',
    characterPosition: [1.32, -0.72, 0.1],
    characterScale: 0.52,
    characterState: 'TALKING',
  },
  {
    index: 4,
    id: 'contact',
    selector: '#contact',
    stepLabel: '05 OF 05',
    sectionTitle: 'Direct Principal Consultation',
    dialogue:
      'Ready to build? Reach out directly below to discuss your project roadmap and architectural requirements with our team.',
    characterPosition: [1.32, -0.72, 0.1],
    characterScale: 0.52,
    characterState: 'HAPPY',
  },
];


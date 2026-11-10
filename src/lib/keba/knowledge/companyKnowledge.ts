/**
 * KEBA AI — Canonical Company Knowledge Engine
 * 
 * Aggregates verified studio information directly from content modules.
 * Strictly separates known facts, service disciplines, and verified case studies
 * from explicitly UNKNOWN / NON-DISCLOSED domains (e.g. pricing, private client names).
 */

import { SITE_CONFIG } from '../../../content/site';
import { SERVICES } from '../../../content/services';
import { APPROACH_STAGES } from '../../../content/approach';
import { WHY_OFFSCRIPT } from '../../../content/why';
import { TECH_ECOSYSTEM } from '../../../content/tech';

export interface KnowledgeFact {
  category: 'identity' | 'service' | 'methodology' | 'technology' | 'case_study' | 'policy' | 'boundary';
  topic: string;
  verifiedContent: string;
}

export interface CompanyFAQ {
  question: string;
  answer: string;
  category: string;
}

// 1. Explicitly Unknown / Non-Disclosed Boundaries
export const KNOWLEDGE_BOUNDARIES = {
  pricing:
    'OFFSCRIPT SOLUTION engineers bespoke software systems from first principles. We do not offer fixed price packages, commodity rate cards, or off-the-shelf tiers. Every investment is scoped during technical discovery based on system topology, performance SLAs, and operational complexity.',
  clients:
    'Enterprise client identities and production credentials are strictly protected under non-disclosure agreements (NDAs). Case studies demonstrate architectural archetypes (e.g. Autonomous Vision Inspector, Connected Telemetry, Campus Intelligence) without violating client confidentiality.',
  founderBio:
    'Studio technical leadership is led by Studio Principals and Senior Software Architects. Keba is the AI virtual representative of the company.',
  certifications:
    'We do not claim vanity certifications or unverified third-party badges. Our technical validation comes from automated testing, production uptime, sub-second latency, and verified CI/CD pipelines.',
  guarantees:
    'We never guarantee speculative business outcomes, viral metrics, or arbitrary completion dates without comprehensive architectural discovery and engineering specifications.',
};

// 2. Canonical Studio FAQs
export const COMPANY_FAQS: CompanyFAQ[] = [
  {
    category: 'General',
    question: 'What is OFFSCRIPT SOLUTION?',
    answer: `${SITE_CONFIG.name} is an independent technology and digital solutions studio. Our tagline is "${SITE_CONFIG.tagline}". We engineer bespoke software, intelligent systems, and scalable digital platforms designed to solve complex operational bottlenecks with uncompromising technical craft.`,
  },
  {
    category: 'Contact',
    question: 'How do I contact OFFSCRIPT SOLUTION?',
    answer: `You can reach studio principals directly at ${SITE_CONFIG.contact.email}. Our team responds within ${SITE_CONFIG.contact.responseTime}.`,
  },
  {
    category: 'Services',
    question: 'What services does the studio offer?',
    answer: SERVICES.map((s) => `• ${s.title}: ${s.tagline}`).join('\n'),
  },
  {
    category: 'Methodology',
    question: 'How does your delivery process work?',
    answer: APPROACH_STAGES.map((a) => `Stage ${a.number} (${a.name}): ${a.tagline} ${a.description}`).join('\n'),
  },
  {
    category: 'Philosophy',
    question: 'What does "Engineered Differently" mean?',
    answer: WHY_OFFSCRIPT.map((w) => `• ${w.title}: ${w.description}`).join('\n'),
  },
  {
    category: 'Pricing',
    question: 'How much does a project cost?',
    answer: KNOWLEDGE_BOUNDARIES.pricing,
  },
];

// 3. Formatter for System Prompt Injection
export function generateSystemKnowledgePrompt(): string {
  const servicesList = SERVICES.map(
    (s) => `- ${s.title} (${s.slug}): ${s.tagline}\n  Key Capabilities: ${s.capabilities.slice(0, 4).join(', ')}`
  ).join('\n');

  const approachList = APPROACH_STAGES.map(
    (a) => `Stage ${a.number} [${a.name}]: ${a.tagline}`
  ).join(' -> ');

  const whyList = WHY_OFFSCRIPT.map((w) => `- ${w.title}: ${w.description}`).join('\n');

  const techSummary = Object.entries(TECH_ECOSYSTEM)
    .map(([cat, items]) => `${cat}: ${items.join(', ')}`)
    .join(' | ');

  return `
=== VERIFIED COMPANY KNOWLEDGE (OFFSCRIPT SOLUTION) ===
Name: ${SITE_CONFIG.name}
Tagline: "${SITE_CONFIG.tagline}"
Description: ${SITE_CONFIG.description}
Contact Email: ${SITE_CONFIG.contact.email} (Response SLA: ${SITE_CONFIG.contact.responseTime})
Location: ${SITE_CONFIG.contact.location}

=== CORE SERVICES & DISCIPLINES ===
${servicesList}

=== METHODOLOGY & DELIVERY ===
Process: ${approachList}

=== CORE PILLARS (WHY OFFSCRIPT) ===
${whyList}

=== PRODUCTION TECH STACK ===
${techSummary}

=== STRICT BOUNDARIES & NON-DISCLOSED TOPICS ===
1. PRICING: ${KNOWLEDGE_BOUNDARIES.pricing}
2. CLIENT CONFIDENTIALITY: ${KNOWLEDGE_BOUNDARIES.clients}
3. IDENTITY: You are Keba, the AI virtual representative. Never pretend to be the human founder or human individual.
4. CLAIMS & TIMELINES: ${KNOWLEDGE_BOUNDARIES.guarantees}
5. UNLISTED SERVICES: Never invent services or products not listed above. If a user asks for something outside our capabilities, politely clarify that OFFSCRIPT specializes in software engineering, intelligent systems, and digital platforms.

=== ACTIONS CAPABILITY ===
When a user expresses a clear intent to view a section of the website or start the tour, recommend the appropriate navigation action:
- To view services: [ACTION:navigate_to_services]
- To learn about our approach/methodology: [ACTION:navigate_to_about]
- To view selected case studies: [ACTION:navigate_to_work]
- To contact or schedule a consultation: [ACTION:navigate_to_contact]
- To take the guided tour: [ACTION:start_website_tour]
=== END COMPANY KNOWLEDGE ===
`.trim();
}

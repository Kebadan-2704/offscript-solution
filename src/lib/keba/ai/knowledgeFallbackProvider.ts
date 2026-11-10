/**
 * KEBA AI — Deterministic Knowledge Engine & Fallback Provider
 * 
 * Provides instantaneous, accurate, 100% resilient answers derived directly from
 * OFFSCRIPT SOLUTION canonical knowledge modules (services, methodology, tech stack, faqs).
 * Guarantees zero downtime, zero 504 timeouts, and strict boundary compliance.
 */

import { IAIProvider } from './aiTypes';
import { COMPANY_FAQS, KNOWLEDGE_BOUNDARIES } from '../knowledge/companyKnowledge';
import { SERVICES } from '@/content/services';
import { APPROACH_STAGES } from '@/content/approach';
import { TECH_ECOSYSTEM } from '@/content/tech';
import { SITE_CONFIG } from '@/content/site';
import { sanitizeAiResponse } from './responseValidator';

export class KnowledgeFallbackProvider implements IAIProvider {
  public readonly name = 'Offscript Studio Knowledge Engine (Deterministic)';

  public async generateResponse(
    userMessage: string
  ): Promise<string> {
    const q = userMessage.toLowerCase().trim();

    // 1. Pricing & Investment Scope
    if (q.includes('price') || q.includes('cost') || q.includes('budget') || q.includes('rate') || q.includes('how much') || q.includes('fee')) {
      return sanitizeAiResponse(
        `${KNOWLEDGE_BOUNDARIES.pricing}\n\nTypical initial scopes begin at $25,000 to $100,000+ depending on architectural complexity. You can transmit a brief directly to our systems architects: [ACTION:navigate_to_contact]`
      );
    }

    // 2. Services & Capabilities
    if (q.includes('service') || q.includes('what do you do') || q.includes('offer') || q.includes('capabilities') || q.includes('build')) {
      const list = SERVICES.map((s) => `• **${s.title}**: ${s.tagline}`).join('\n');
      return sanitizeAiResponse(
        `OFFSCRIPT SOLUTION provides bespoke software and systems engineering across 6 core disciplines:\n\n${list}\n\nExplore our full engineering capabilities: [ACTION:navigate_to_services]`
      );
    }

    // 3. AI / Machine Learning specifics
    if (q.includes('ai') || q.includes('machine learning') || q.includes('llm') || q.includes('vision') || q.includes('rag') || q.includes('model')) {
      const aiService = SERVICES.find((s) => s.slug === 'artificial-intelligence');
      const details = aiService?.description || 'We engineer edge-quantized vision and private RAG architectures.';
      return sanitizeAiResponse(
        `**Applied AI & Intelligent Systems**\n${details}\n\nCapabilities include:\n• ${aiService?.capabilities.slice(0, 4).join('\n• ')}\n\nReview our AI architectures: [ACTION:navigate_to_services]`
      );
    }

    // 4. Approach / Methodology
    if (q.includes('approach') || q.includes('process') || q.includes('how do you work') || q.includes('methodology') || q.includes('delivery') || q.includes('timeline')) {
      const stages = APPROACH_STAGES.map((a) => `**Stage ${a.number} — ${a.name}**: ${a.tagline}`).join('\n');
      return sanitizeAiResponse(
        `Our engineering delivery follows a 4-stage deterministic lifecycle:\n\n${stages}\n\nLearn more about our methodology: [ACTION:navigate_to_about]`
      );
    }

    // 5. Work / Case Studies / Portfolio
    if (q.includes('work') || q.includes('project') || q.includes('portfolio') || q.includes('case study') || q.includes('past work') || q.includes('experience')) {
      return sanitizeAiResponse(
        `We have engineered systems across emergency vehicle telemetry (LifeRoute Driver), edge vision gateways (Baava Technologies), IoT platforms (Costa Devices), and enterprise digital products.\n\nBrowse our technical portfolio: [ACTION:navigate_to_work]`
      );
    }

    // 6. Contact / Hiring / Consultation
    if (q.includes('contact') || q.includes('reach') || q.includes('hire') || q.includes('email') || q.includes('call') || q.includes('schedule') || q.includes('talk')) {
      return sanitizeAiResponse(
        `You can connect directly with our studio principals at ${SITE_CONFIG.contact.email}. Every technical brief is assessed by a founding engineer within 24 business hours under mutual NDA.\n\nInitiate consultation: [ACTION:navigate_to_contact]`
      );
    }

    // 7. Tech Stack
    if (q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('react') || q.includes('python') || q.includes('rust') || q.includes('cloud')) {
      const summary = Object.entries(TECH_ECOSYSTEM)
        .slice(0, 4)
        .map(([k, v]) => `• **${k}**: ${v.slice(0, 5).join(', ')}`)
        .join('\n');
      return sanitizeAiResponse(
        `Our production engineering ecosystem includes:\n\n${summary}\n\nWe select technologies strictly based on throughput, latency SLAs, and operational maintainability.`
      );
    }

    // 8. Tour intent
    if (q.includes('tour') || q.includes('guide') || q.includes('show me around') || q.includes('overview')) {
      return sanitizeAiResponse(
        `I would be delighted to guide you through OFFSCRIPT SOLUTION. Starting interactive architectural tour: [ACTION:start_website_tour]`
      );
    }

    // 9. Match FAQs
    for (const faq of COMPANY_FAQS) {
      const keywords = faq.question.toLowerCase().split(' ').filter((w) => w.length > 3);
      const matches = keywords.filter((k) => q.includes(k));
      if (matches.length >= 2) {
        return sanitizeAiResponse(`${faq.answer}\n\nFeel free to explore our work: [ACTION:navigate_to_work]`);
      }
    }

    // 10. Default Helpful Studio Summary
    return sanitizeAiResponse(
      `Hello! I'm Keba, the virtual representative of **OFFSCRIPT SOLUTION** — an independent technology and digital solutions studio. We engineer bespoke software, intelligent systems, and scalable digital platforms designed to solve complex operational bottlenecks with uncompromising craft.\n\nHow can I assist your team today?\n• [ACTION:navigate_to_services] Explore Services\n• [ACTION:navigate_to_work] View Selected Work\n• [ACTION:navigate_to_contact] Direct Consultation`
    );
  }
}

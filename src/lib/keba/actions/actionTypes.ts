/**
 * KEBA AI — Allowlisted Website Action Types & Schemas
 * 
 * Defines strictly allowlisted actions that Keba can propose to the visitor.
 * AI output NEVER executes arbitrary JavaScript or unapproved operations.
 */

import { z } from 'zod';

export const AllowlistedActionNameSchema = z.enum([
  'navigate_to_services',
  'navigate_to_about',
  'navigate_to_work',
  'navigate_to_contact',
  'start_website_tour',
]);

export type AllowlistedActionName = z.infer<typeof AllowlistedActionNameSchema>;

export const ActionProposalSchema = z.object({
  action: AllowlistedActionNameSchema,
  targetSelector: z.string().optional(),
  label: z.string(),
  description: z.string(),
});

export type ActionProposal = z.infer<typeof ActionProposalSchema>;

export interface ActionMetadata {
  name: AllowlistedActionName;
  targetSelector: string;
  label: string;
  description: string;
  type: 'navigation' | 'tour';
}

export const ALLOWLISTED_ACTIONS: Record<AllowlistedActionName, ActionMetadata> = {
  navigate_to_services: {
    name: 'navigate_to_services',
    targetSelector: '#services',
    label: 'Explore Services ↗',
    description: 'Jump to software engineering, AI, and cloud capabilities',
    type: 'navigation',
  },
  navigate_to_about: {
    name: 'navigate_to_about',
    targetSelector: '#about',
    label: 'View Methodology ↗',
    description: 'Explore the 4-stage delivery process (Discover -> Evolve)',
    type: 'navigation',
  },
  navigate_to_work: {
    name: 'navigate_to_work',
    targetSelector: '#work',
    label: 'View Selected Work ↗',
    description: 'Browse production case studies and technical architectures',
    type: 'navigation',
  },
  navigate_to_contact: {
    name: 'navigate_to_contact',
    targetSelector: '#contact',
    label: 'Schedule Consultation ↗',
    description: 'Direct collaboration inquiry with studio principals',
    type: 'navigation',
  },
  start_website_tour: {
    name: 'start_website_tour',
    targetSelector: '#main-content',
    label: 'Start Guided Tour ↗',
    description: 'Let Keba guide you through the website step-by-step',
    type: 'tour',
  },
};


/**
 * KEBA AI — Action Router & Safe Executor
 * 
 * Safely parses proposed action tags from assistant output,
 * with deterministic intent fallback matching to ensure model compliance.
 * Validates against allowlisted schemas, and executes client navigation via Lenis.
 */

import {
  AllowlistedActionName,
  ActionProposal,
  ActionProposalSchema,
  ALLOWLISTED_ACTIONS,
} from './actionTypes';

const ACTION_TAG_REGEX = /\[ACTION:([a-z_]+)\]/i;

/**
 * Extracts and validates any allowlisted action embedded in the AI text response,
 * with deterministic user query intent fallback.
 * Strips internal action tags so the displayed answer remains clean.
 */
export function extractProposedAction(
  rawText: string,
  userQuery?: string
): {
  cleanText: string;
  proposedAction: ActionProposal | null;
} {
  let candidateActionName: AllowlistedActionName | null = null;
  const match = rawText.match(ACTION_TAG_REGEX);

  if (match && match[1]) {
    candidateActionName = match[1].toLowerCase() as AllowlistedActionName;
  }

  // Deterministic intent fallback (since prompt instructions alone cannot guarantee model compliance)
  if (!candidateActionName && userQuery) {
    const q = userQuery.toLowerCase();
    if (
      q.includes('case stud') ||
      q.includes('selected work') ||
      q.includes('portfolio') ||
      (q.includes('work') && (q.includes('see') || q.includes('show') || q.includes('view') || q.includes('where')))
    ) {
      candidateActionName = 'navigate_to_work';
    } else if (
      q.includes('tour') ||
      q.includes('show me around') ||
      q.includes('guided tour')
    ) {
      candidateActionName = 'start_website_tour';
    } else if (
      (q.includes('service') && (q.includes('see') || q.includes('show') || q.includes('explore') || q.includes('view'))) ||
      q.includes('what services') ||
      q.includes('what capabilities')
    ) {
      candidateActionName = 'navigate_to_services';
    } else if (
      q.includes('contact') ||
      q.includes('consultation') ||
      q.includes('get in touch') ||
      q.includes('hire')
    ) {
      candidateActionName = 'navigate_to_contact';
    } else if (
      q.includes('methodology') ||
      q.includes('approach') ||
      q.includes('how do you work') ||
      q.includes('delivery process')
    ) {
      candidateActionName = 'navigate_to_about';
    }
  }

  const cleanText = rawText
    .replace(ACTION_TAG_REGEX, '')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();

  if (!candidateActionName || !ALLOWLISTED_ACTIONS[candidateActionName]) {
    return { cleanText, proposedAction: null };
  }

  const metadata = ALLOWLISTED_ACTIONS[candidateActionName];
  const proposal: ActionProposal = {
    action: metadata.name,
    targetSelector: metadata.targetSelector,
    label: metadata.label,
    description: metadata.description,
  };

  const parsed = ActionProposalSchema.safeParse(proposal);
  return {
    cleanText,
    proposedAction: parsed.success ? parsed.data : null,
  };
}

/**
 * Safely executes an allowlisted action on the client.
 * Strictly checks the allowlist before any DOM operation.
 */
export function executeAllowlistedAction(
  proposal: ActionProposal,
  callbacks?: {
    onStartTour?: () => void;
    onCloseChat?: () => void;
  }
): boolean {
  const metadata = ALLOWLISTED_ACTIONS[proposal.action];
  if (!metadata) {
    console.warn(`[KebaAction] Rejected unallowlisted action: ${proposal.action}`);
    return false;
  }

  if (metadata.type === 'tour') {
    callbacks?.onCloseChat?.();
    callbacks?.onStartTour?.();
    return true;
  }

  if (metadata.type === 'navigation') {
    const selector = metadata.targetSelector;
    const targetElement = document.querySelector(selector);

    if (!targetElement) {
      console.warn(`[KebaAction] Target element not found: ${selector}`);
      return false;
    }

    // Scroll using the application Lenis instance if available
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: Element | string, opts: { offset: number }) => void } }).__lenis;

    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(selector, { offset: -84 });
    } else {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }

    return true;
  }

  return false;
}

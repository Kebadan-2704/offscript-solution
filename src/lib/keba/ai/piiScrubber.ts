/**
 * KEBA AI — Privacy Protection & PII Scrubber
 * 
 * Enforces strict data privacy by redacting visitor personal contact info
 * (emails, phone numbers, identifiers) before sending prompts to the external AI provider.
 * Also cleans prompt injection attempts and system delimiter overrides.
 */

// Email regex matching standard emails while avoiding false positives
const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

// Phone regex matching international & local phone number formats
const PHONE_REGEX = /\b(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}\b/g;

// Known prompt injection override tokens
const INJECTION_PATTERNS = [
  /ignore\s+(?:all\s+)?(?:previous|prior)\s+instructions/gi,
  /disregard\s+(?:all\s+)?(?:previous|prior)\s+instructions/gi,
  /you\s+are\s+now\s+(?:DAN|unfiltered|jailbroken)/gi,
  /bypass\s+(?:all\s+)?rules/gi,
  /system\s*:\s*/gi,
  /\[SYSTEM\]/gi,
  /<\/?system>/gi,
  /<\/?assistant>/gi,
  /<\/?visitor_message>/gi,
];

export interface ScrubberResult {
  scrubbedText: string;
  hasRedactedPii: boolean;
  redactedEmails: string[];
  hasInjectionAttempt: boolean;
}

/**
 * Scrubs visitor personal details and sanitizes injection delimiters.
 * Ensures external unauthenticated providers never receive confidential visitor PII.
 */
export function scrubVisitorInput(rawInput: string): ScrubberResult {
  let text = rawInput;
  let hasRedactedPii = false;
  let hasInjectionAttempt = false;
  const redactedEmails: string[] = [];

  // 1. Redact Emails
  text = text.replace(EMAIL_REGEX, (match) => {
    // Preserve official company email if mentioned in prompt
    if (match.toLowerCase() === 'hello@offscriptsolution.com') {
      return match;
    }
    hasRedactedPii = true;
    redactedEmails.push(match);
    return '[REDACTED_EMAIL]';
  });

  // 2. Redact Phone numbers (minimum 7 digits to prevent redacting single numbers)
  text = text.replace(PHONE_REGEX, (match) => {
    const digitsOnly = match.replace(/\D/g, '');
    if (digitsOnly.length >= 7 && digitsOnly.length <= 15) {
      hasRedactedPii = true;
      return '[REDACTED_PHONE]';
    }
    return match;
  });

  // 3. Neutralize Prompt Injection patterns
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(text)) {
      hasInjectionAttempt = true;
      text = text.replace(pattern, '[FILTERED_INSTRUCTION]');
    }
  }

  return {
    scrubbedText: text,
    hasRedactedPii,
    redactedEmails,
    hasInjectionAttempt,
  };
}


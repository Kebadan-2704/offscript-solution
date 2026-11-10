/**
 * KEBA AI — Business Enquiry Flow Component
 * 
 * Guides visitors through structuring a project brief without ever sending
 * confidential contact details to the external CodexAPI provider.
 * Hands off directly to the verified internal /api/contact endpoint or direct email.
 */

'use client';

import { useState } from 'react';
import { Send, CheckCircle2, ArrowRight, ShieldCheck, Mail, X } from 'lucide-react';
import { SITE_CONFIG } from '../../../content/site';

interface ChatEnquiryFlowProps {
  onClose: () => void;
  onSuccess: (summary: string) => void;
}

const DISCIPLINES = [
  { id: 'software-engineering', label: 'Software Engineering' },
  { id: 'artificial-intelligence', label: 'AI & Automation' },
  { id: 'web-mobile', label: 'Web & Mobile Platforms' },
  { id: 'cloud-infrastructure', label: 'Cloud & DevOps' },
  { id: 'ui-ux-design', label: 'Technical Product Design' },
  { id: 'other', label: 'Bespoke / Consulting' },
];

export function ChatEnquiryFlow({ onClose, onSuccess }: ChatEnquiryFlowProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [discipline, setDiscipline] = useState('software-engineering');
  const [scope, setScope] = useState('');
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!workEmail || !fullName || !scope) {
      setSubmitError('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Direct call to internal Next.js /api/contact — NEVER sent to CodexAPI
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          workEmail,
          company: company || 'Independent Inquiry',
          discipline,
          budget: 'scope-dependent',
          timeline: 'flexible',
          projectScope: scope,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit consultation brief.');
      }

      setStep(4);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed. Please email hello@offscriptsolution.com directly.';
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-4 my-3 p-4 bg-white border-2 border-[#191B1E] rounded-xl shadow-[4px_4px_0px_#191B1E] text-[#191B1E] text-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#191B1E]/15 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D36B4D]" />
          <h4 className="font-display font-bold text-xs uppercase tracking-wider">
            Project Consultation Intake
          </h4>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cancel project intake"
          className="p-1 rounded text-[#191B1E]/60 hover:text-[#191B1E] hover:bg-[#F5F3ED] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Privacy Notice Badge */}
      <div className="flex items-center gap-1.5 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] text-emerald-900 mb-3 font-mono">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Strict Privacy: Contact details are never sent to third-party AI models.</span>
      </div>

      {/* Step 1: Discipline Selection */}
      {step === 1 && (
        <div className="space-y-3">
          <label className="block font-mono text-[11px] text-[#191B1E]/70 uppercase tracking-wider">
            1. Select Primary Discipline:
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {DISCIPLINES.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDiscipline(d.id)}
                className={`p-2 rounded-lg border text-left font-mono text-[11px] transition-all cursor-pointer ${
                  discipline === d.id
                    ? 'bg-[#191B1E] text-[#F5F3ED] border-[#191B1E]'
                    : 'bg-[#F5F3ED] text-[#191B1E] border-[#191B1E]/15 hover:border-[#191B1E]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full mt-2 py-2 px-3 bg-[#191B1E] text-[#F5F3ED] hover:bg-[#D36B4D] hover:text-[#191B1E] rounded-lg font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Next: Describe Scope</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Step 2: Project Scope */}
      {step === 2 && (
        <div className="space-y-3">
          <label className="block font-mono text-[11px] text-[#191B1E]/70 uppercase tracking-wider">
            2. Describe the Challenge or Scope (min 20 chars):
          </label>
          <textarea
            rows={3}
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            placeholder="Outline your operational bottleneck, target system architecture, or core features..."
            className="w-full p-2.5 bg-[#F5F3ED] border border-[#191B1E]/20 rounded-lg text-xs text-[#191B1E] placeholder-[#191B1E]/40 focus:outline-none focus:border-[#191B1E] resize-none"
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="py-2 px-3 bg-[#F5F3ED] border border-[#191B1E]/20 text-[#191B1E] rounded-lg font-mono text-xs cursor-pointer"
            >
              Back
            </button>
            <button
              type="button"
              disabled={scope.trim().length < 20}
              onClick={() => setStep(3)}
              className="flex-1 py-2 px-3 bg-[#191B1E] text-[#F5F3ED] hover:bg-[#D36B4D] hover:text-[#191B1E] disabled:opacity-40 rounded-lg font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Next: Contact Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Direct Contact Details */}
      {step === 3 && (
        <div className="space-y-2.5">
          <label className="block font-mono text-[11px] text-[#191B1E]/70 uppercase tracking-wider">
            3. Where should studio principals reply?
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your Full Name *"
            className="w-full p-2 bg-[#F5F3ED] border border-[#191B1E]/20 rounded-lg text-xs"
          />

          <input
            type="email"
            value={workEmail}
            onChange={(e) => setWorkEmail(e.target.value)}
            placeholder="Work Email Address *"
            className="w-full p-2 bg-[#F5F3ED] border border-[#191B1E]/20 rounded-lg text-xs"
          />

          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company / Organization Name"
            className="w-full p-2 bg-[#F5F3ED] border border-[#191B1E]/20 rounded-lg text-xs"
          />

          {submitError && (
            <p className="text-red-600 text-[11px]">{submitError}</p>
          )}

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="py-2 px-3 bg-[#F5F3ED] border border-[#191B1E]/20 text-[#191B1E] rounded-lg font-mono text-xs cursor-pointer"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!workEmail || !fullName || isSubmitting}
              onClick={handleSubmit}
              className="flex-1 py-2 px-3 bg-[#191B1E] text-[#F5F3ED] hover:bg-[#D36B4D] hover:text-[#191B1E] disabled:opacity-40 rounded-lg font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit to Studio'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Submission Confirmation */}
      {step === 4 && (
        <div className="text-center py-3 space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
          <h4 className="font-display font-bold text-sm">Brief Transmitted!</h4>
          <p className="text-xs text-[#191B1E]/70">
            Studio principals review briefs directly. Response SLA:{' '}
            <strong className="text-[#191B1E]">{SITE_CONFIG.contact.responseTime}</strong>.
          </p>
          <div className="pt-2">
            <a
              href={`mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent(`Project Brief: ${discipline}`)}`}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-[#D36B4D] hover:underline"
            >
              <Mail className="w-3 h-3" />
              <span>Direct mail: {SITE_CONFIG.contact.email}</span>
            </a>
          </div>
          <button
            type="button"
            onClick={() => {
              onSuccess(
                `Consultation brief submitted for ${fullName} (${discipline}). Response SLA: ${SITE_CONFIG.contact.responseTime}.`
              );
              onClose();
            }}
            className="w-full mt-2 py-1.5 bg-[#191B1E] text-[#F5F3ED] hover:bg-[#D36B4D] hover:text-[#191B1E] rounded-lg font-mono text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Form
          </button>
        </div>
      )}
    </div>
  );
}

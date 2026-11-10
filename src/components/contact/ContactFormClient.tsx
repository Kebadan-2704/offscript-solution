'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, RotateCcw } from 'lucide-react';
import {
  ContactFormSchema,
  type ContactFormData,
} from '@/lib/schemas/contact';

const DISCIPLINES: { key: ContactFormData['discipline']; label: string }[] = [
  { key: 'software-engineering', label: 'Software Engineering' },
  { key: 'artificial-intelligence', label: 'Applied AI & ML' },
  { key: 'cloud-infrastructure', label: 'Cloud & Infrastructure' },
  { key: 'intelligent-automation', label: 'Intelligent Automation' },
  { key: 'web-mobile', label: 'Web & Mobile Systems' },
  { key: 'ui-ux-design', label: 'UI/UX & Digital Product' },
  { key: 'other', label: 'Other Architecture Scope' },
];

const BUDGETS: { key: ContactFormData['budget']; label: string }[] = [
  { key: 'under-25k', label: '< $25,000 · < ₹20 Lakhs' },
  { key: '25k-50k', label: '$25,000 – $50,000 · ₹20L – ₹40L' },
  { key: '50k-100k', label: '$50,000 – $100,000 · ₹40L – ₹85L' },
  { key: '100k-plus', label: '$100,000+ · ₹85 Lakhs+' },
  { key: 'scope-dependent', label: 'To Be Scoped' },
];

const TIMELINES: { key: ContactFormData['timeline']; label: string }[] = [
  { key: 'immediate', label: 'Immediate · Under 1 Mo' },
  { key: 'one-to-three-months', label: '1 – 3 Months' },
  { key: 'three-to-six-months', label: '3 – 6 Months' },
  { key: 'flexible', label: 'Flexible Roadmap' },
];

export function ContactFormClient() {
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [submissionId, setSubmissionId] = useState<string>('');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      fullName: '',
      workEmail: '',
      company: '',
      discipline: 'software-engineering',
      budget: '25k-50k',
      timeline: 'one-to-three-months',
      projectScope: '',
      preferredStack: '',
      website: '', // honeypot
    },
  });

  const selectedDiscipline = useWatch({ control, name: 'discipline' });
  const selectedBudget = useWatch({ control, name: 'budget' });
  const selectedTimeline = useWatch({ control, name: 'timeline' });
  const currentScope = useWatch({ control, name: 'projectScope' }) || '';

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit consultation brief. Please retry.');
      }

      setSubmissionSuccess(true);
      setSubmissionId(result.submissionId || 'OS-CONFIRMED');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError('An unexpected error occurred. Please email hello@offscriptsolution.com directly.');
      }
    }
  };

  const handleReset = () => {
    reset();
    setSubmissionSuccess(false);
    setSubmissionId('');
    setServerError(null);
  };

  if (submissionSuccess) {
    return (
      <div
        data-testid="contact-success-state"
        className="p-8 sm:p-14 bg-white border border-[#191B1E] animate-[fadeIn_0.3s_ease]"
      >
        <div className="flex items-center gap-3 text-[#D36B4D] mb-6">
          <CheckCircle2 className="w-8 h-8" />
          <span className="font-mono text-xs uppercase tracking-widest font-semibold text-[#191B1E]">
            Transmission Verified · SLA Protocol Initiated
          </span>
        </div>

        <h3 className="font-space text-3xl sm:text-5xl font-bold tracking-tight text-[#191B1E] mb-4">
          Architectural Brief Received<span className="text-[#D36B4D]">.</span>
        </h3>

        <p className="font-inter text-base sm:text-lg text-[#6B6C67] leading-relaxed max-w-2xl mb-8">
          Thank you for outlining your mandate. Your brief has been routed directly to our studio
          principals. We bypass sales representatives and middleman account managers.
        </p>

        <div className="p-6 bg-[#F5F3ED] border border-[#E6E2D9] max-w-xl mb-10 font-mono text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-[#52534E]">Reference ID:</span>
            <span className="font-bold text-[#191B1E]">{submissionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#52534E]">Review SLA:</span>
            <span className="font-bold text-[#D36B4D]">Within 24 Business Hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#52534E]">Reviewer:</span>
            <span className="font-medium text-[#191B1E]">Principal Systems Architect</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-6 py-3 border border-[#191B1E] text-[#191B1E] hover:bg-[#191B1E] hover:text-[#F5F3ED] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Submit Another Brief</span>
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="p-8 sm:p-12 lg:p-14 bg-white border border-[#E6E2D9] space-y-12 sm:space-y-14"
    >
      {/* Honeypot field (hidden from users, targeted by bots) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      {serverError && (
        <div
          role="alert"
          className="p-4 bg-[#D36B4D]/10 border-l-4 border-[#D36B4D] flex items-start gap-3 font-mono text-xs text-[#191B1E]"
        >
          <AlertCircle className="w-5 h-5 text-[#D36B4D] shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      {/* 1. Discipline Selection */}
      <div>
        <label className="font-mono text-sm uppercase tracking-wider text-[#191B1E] font-bold block mb-4">
          1. Primary Engineering Discipline <span className="text-[#D36B4D]">*</span>
        </label>
        <div
          role="radiogroup"
          aria-label="Select primary engineering discipline"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5"
        >
          {DISCIPLINES.map((d) => {
            const isSelected = selectedDiscipline === d.key;
            return (
              <button
                key={d.key}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setValue('discipline', d.key, { shouldValidate: true })}
                className={`text-left px-5 py-4 border font-mono text-xs sm:text-sm min-h-[50px] flex items-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#191B1E] bg-[#191B1E] text-[#F5F3ED] font-semibold'
                    : 'border-[#E6E2D9] bg-[#F5F3ED]/40 text-[#191B1E] hover:border-[#191B1E]'
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>
        {errors.discipline && (
          <p role="alert" className="font-mono text-xs text-[#D36B4D] mt-2">
            {errors.discipline.message}
          </p>
        )}
      </div>

      {/* 2. Budget Scope */}
      <div>
        <label className="font-mono text-sm uppercase tracking-wider text-[#191B1E] font-bold block mb-4">
          2. Anticipated Capital / Budget Range <span className="text-[#D36B4D]">*</span>
        </label>
        <div
          role="radiogroup"
          aria-label="Select budget range"
          className="flex flex-wrap gap-2.5 sm:gap-3"
        >
          {BUDGETS.map((b) => {
            const isSelected = selectedBudget === b.key;
            return (
              <button
                key={b.key}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setValue('budget', b.key, { shouldValidate: true })}
                className={`px-5 py-3 border font-mono text-xs sm:text-[13px] min-h-[46px] inline-flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#D36B4D] bg-[#D36B4D] text-[#191B1E] font-bold'
                    : 'border-[#E6E2D9] bg-white text-[#6B6C67] hover:border-[#191B1E] hover:text-[#191B1E]'
                }`}
              >
                {b.label}
              </button>
            );
          })}
        </div>
        {errors.budget && (
          <p role="alert" className="font-mono text-xs text-[#D36B4D] mt-2">
            {errors.budget.message}
          </p>
        )}
      </div>

      {/* 3. Timeline Scope */}
      <div>
        <label className="font-mono text-sm uppercase tracking-wider text-[#191B1E] font-bold block mb-4">
          3. Deployment Timeline <span className="text-[#D36B4D]">*</span>
        </label>
        <div
          role="radiogroup"
          aria-label="Select target timeline"
          className="flex flex-wrap gap-2.5 sm:gap-3"
        >
          {TIMELINES.map((t) => {
            const isSelected = selectedTimeline === t.key;
            return (
              <button
                key={t.key}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setValue('timeline', t.key, { shouldValidate: true })}
                className={`px-5 py-3 border font-mono text-xs sm:text-[13px] min-h-[46px] inline-flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#191B1E] bg-[#191B1E] text-[#F5F3ED] font-semibold'
                    : 'border-[#E6E2D9] bg-white text-[#6B6C67] hover:border-[#191B1E] hover:text-[#191B1E]'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        {errors.timeline && (
          <p role="alert" className="font-mono text-xs text-[#D36B4D] mt-2">
            {errors.timeline.message}
          </p>
        )}
      </div>

      {/* 4. Contact Information Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#E6E2D9]">
        <div>
          <label
            htmlFor="fullName"
            className="font-mono text-xs sm:text-[13px] uppercase tracking-wider text-[#191B1E] block mb-2.5 font-bold"
          >
            Your Full Name <span className="text-[#D36B4D]">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="e.g. Elena Vance"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            className={`w-full min-h-[52px] px-4.5 py-3.5 bg-[#F5F3ED]/40 border font-inter text-base sm:text-[15px] text-[#191B1E] placeholder:text-[#6B6C67] focus:bg-white focus:outline-hidden focus:border-[#191B1E] transition-colors ${
              errors.fullName ? 'border-[#D36B4D]' : 'border-[#E6E2D9]'
            }`}
            {...register('fullName')}
          />
          {errors.fullName && (
            <p id="fullName-error" role="alert" className="font-mono text-xs text-[#D36B4D] mt-1.5">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="workEmail"
            className="font-mono text-xs sm:text-[13px] uppercase tracking-wider text-[#191B1E] block mb-2.5 font-bold"
          >
            Work Email <span className="text-[#D36B4D]">*</span>
          </label>
          <input
            id="workEmail"
            type="email"
            placeholder="elena@enterprise.com"
            aria-invalid={!!errors.workEmail}
            aria-describedby={errors.workEmail ? 'workEmail-error' : undefined}
            className={`w-full min-h-[52px] px-4.5 py-3.5 bg-[#F5F3ED]/40 border font-inter text-base sm:text-[15px] text-[#191B1E] placeholder:text-[#6B6C67] focus:bg-white focus:outline-hidden focus:border-[#191B1E] transition-colors ${
              errors.workEmail ? 'border-[#D36B4D]' : 'border-[#E6E2D9]'
            }`}
            {...register('workEmail')}
          />
          {errors.workEmail && (
            <p id="workEmail-error" role="alert" className="font-mono text-xs text-[#D36B4D] mt-1.5">
              {errors.workEmail.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="font-mono text-xs sm:text-[13px] uppercase tracking-wider text-[#191B1E] block mb-2.5 font-bold"
          >
            Company / Organization <span className="text-[#D36B4D]">*</span>
          </label>
          <input
            id="company"
            type="text"
            placeholder="e.g. Apex Dynamics"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'company-error' : undefined}
            className={`w-full min-h-[52px] px-4.5 py-3.5 bg-[#F5F3ED]/40 border font-inter text-base sm:text-[15px] text-[#191B1E] placeholder:text-[#6B6C67] focus:bg-white focus:outline-hidden focus:border-[#191B1E] transition-colors ${
              errors.company ? 'border-[#D36B4D]' : 'border-[#E6E2D9]'
            }`}
            {...register('company')}
          />
          {errors.company && (
            <p id="company-error" role="alert" className="font-mono text-xs text-[#D36B4D] mt-1.5">
              {errors.company.message}
            </p>
          )}
        </div>
      </div>

      {/* 5. Project Brief Scope */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label
            htmlFor="projectScope"
            className="font-mono text-xs sm:text-[13px] uppercase tracking-wider text-[#191B1E] font-bold"
          >
            Technical Mandate & Architecture Context <span className="text-[#D36B4D]">*</span>
          </label>
          <span className="font-mono text-xs text-[#52534E]">
            {currentScope.length} / 3000 chars · min 20
          </span>
        </div>
        <textarea
          id="projectScope"
          rows={6}
          placeholder="Outline the operational bottleneck, data volumes, existing tech stack, or engineering goal you need architected..."
          aria-invalid={!!errors.projectScope}
          aria-describedby={errors.projectScope ? 'projectScope-error' : undefined}
          className={`w-full min-h-[160px] p-4.5 bg-[#F5F3ED]/40 border font-inter text-base sm:text-[15px] text-[#191B1E] placeholder:text-[#6B6C67] focus:bg-white focus:outline-hidden focus:border-[#191B1E] transition-colors leading-relaxed ${
            errors.projectScope ? 'border-[#D36B4D]' : 'border-[#E6E2D9]'
          }`}
          {...register('projectScope')}
        />
        {errors.projectScope && (
          <p id="projectScope-error" role="alert" className="font-mono text-xs text-[#D36B4D] mt-1.5">
            {errors.projectScope.message}
          </p>
        )}
      </div>

      {/* 6. Preferred Tech Stack (Optional) */}
      <div>
        <label
          htmlFor="preferredStack"
          className="font-mono text-xs sm:text-[13px] uppercase tracking-wider text-[#191B1E] block mb-2.5 font-bold"
        >
          Existing Infrastructure / Preferred Stack <span className="text-[#52534E] font-normal">· Optional</span>
        </label>
        <input
          id="preferredStack"
          type="text"
          placeholder="e.g. AWS ECS, Rust, PostgreSQL, PyTorch, Next.js"
          className="w-full min-h-[52px] px-4.5 py-3.5 bg-[#F5F3ED]/40 border border-[#E6E2D9] font-inter text-base sm:text-[15px] text-[#191B1E] placeholder:text-[#6B6C67] focus:bg-white focus:outline-hidden focus:border-[#191B1E] transition-colors"
          {...register('preferredStack')}
        />
      </div>

      {/* 7. Action Button & SLA Notice */}
      <div className="pt-6 border-t border-[#E6E2D9] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="font-mono text-xs text-[#6B6C67] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D36B4D]" aria-hidden="true" />
          <span>SLA Commitment: Principal engineer review within 24 business hours.</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-3 min-h-[52px] px-8 py-4 bg-[#D36B4D] text-[#191B1E] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#191B1E] hover:text-[#F5F3ED] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Brief...</span>
            </>
          ) : (
            <>
              <span>Transmit Technical Brief</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}


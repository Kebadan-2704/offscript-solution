'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SplitHeading } from '@/components/animations/SplitHeading';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface FormState {
  fullName: string;
  workEmail: string;
  company: string;
  discipline: string;
  budget: string;
  timeline: string;
  projectScope: string;
  website: string; // Honeypot
}

const INITIAL_FORM: FormState = {
  fullName: '',
  workEmail: '',
  company: '',
  discipline: 'other',
  budget: 'scope-dependent',
  timeline: 'one-to-three-months',
  projectScope: '',
  website: '',
};

/**
 * Section 10: Final Studio CTA with oversized headline, floating 3D symbol,
 * engagement protocol, and fully functional interactive enquiry brief form.
 */
export function FinalCtaSection() {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit brief. Please retry shortly.');
        return;
      }

      setStatus('success');
      setSuccessMessage(
        data.message || 'Consultation brief received by studio principals. Response SLA: 24 business hours.'
      );
      setFormData(INITIAL_FORM);
    } catch {
      setStatus('error');
      setErrorMessage('A network error occurred. Please contact hello@offscriptsolution.com directly.');
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[#191B1E] text-[#F5F3ED] py-12 sm:py-16 lg:py-20 overflow-hidden scroll-mt-20"
    >
      {/* Interactive 3D Sculptural Emblem (Dark by default, bursts into vibrant color on hover) */}
      <div
        className="absolute -right-12 top-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] lg:w-[600px] aspect-square pointer-events-auto select-none cursor-pointer group/emblem z-0 animate-[floatSlow_8s_ease-in-out_infinite_alternate]"
        title="OFFSCRIPT SOLUTION Monogram"
      >
        {/* Ambient Warm Halo Bloom on Hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-radial from-[#D36B4D]/45 via-[#D36B4D]/15 to-transparent blur-3xl rounded-full opacity-0 group-hover/emblem:opacity-100 transition-all duration-700 pointer-events-none scale-75 group-hover/emblem:scale-125"
        />

        <div className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover/emblem:scale-105">
          <Image
            src="/brand/logo-symbol-3d.png"
            alt="OFFSCRIPT 3D emblem accent"
            role="presentation"
            width={600}
            height={600}
            className="w-full h-full object-contain filter grayscale contrast-125 brightness-90 opacity-25 group-hover/emblem:opacity-100 group-hover/emblem:grayscale-0 group-hover/emblem:brightness-110 group-hover/emblem:saturate-125 group-hover/emblem:drop-shadow-[0_25px_60px_rgba(211,107,77,0.45)] transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.1,1)]"
          />
        </div>
      </div>

      <Container className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-4">
          <Eyebrow dark>Initiate Engagement</Eyebrow>
          <span className="font-mono text-xs tracking-widest text-[#E6E2D9]/70 font-semibold">
            10
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Big Headline & Protocol Box */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5">
            <div>
              <SplitHeading
                lines={["LET'S BUILD", 'SOMETHING THAT', 'MATTERS.']}
                as="h2"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F3ED] leading-[0.95] uppercase"
              />

              <p className="mt-6 text-base sm:text-lg text-[#E6E2D9]/90 max-w-lg leading-relaxed">
                Whether you need to architect a custom platform from scratch, deploy applied AI, or
                resolve deep infrastructure bottlenecks — let&apos;s have an honest engineering
                conversation with studio principals.
              </p>

              <div className="mt-6">
                <a
                  href="mailto:hello@offscriptsolution.com"
                  className="font-mono text-sm text-[#F5F3ED] uppercase tracking-wider border-b border-[#D36B4D] pb-1 hover:text-[#D36B4D] transition-colors"
                >
                  hello@offscriptsolution.com
                </a>
              </div>
            </div>

            {/* Engagement Protocol Box with High Contrast and >=12px font */}
            <div className="p-6 sm:p-7 border border-[#E6E2D9]/25 bg-[#191B1E]/80 backdrop-blur-md">
              <span className="font-mono text-xs text-[#D36B4D] uppercase tracking-widest block mb-4 font-bold">
                Engagement Protocol
              </span>
              <ul className="space-y-4 font-mono text-xs sm:text-[13px] text-[#F5F3ED]/90">
                <li className="flex items-start gap-3">
                  <span className="text-[#D36B4D] font-bold text-sm">01</span>
                  <span>Direct consultation with senior technical architects without sales intermediaries.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D36B4D] font-bold text-sm">02</span>
                  <span>Feasibility audit & architectural outline delivered within 48 business hours.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D36B4D] font-bold text-sm">03</span>
                  <span>Deterministic milestones, fixed 2-week sprints, and 100% IP transfer upon completion.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Inline Consultation Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 border border-[#E6E2D9]/20 bg-[#191B1E]/90 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E6E2D9]/15">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D36B4D] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#F5F3ED] font-bold">
                  PROJECT INTAKE BRIEF
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#E6E2D9]/60">SLA: 24h Business Response</span>
            </div>

            {status === 'success' ? (
              <div className="py-10 text-center space-y-4 animate-in fade-in">
                <div className="inline-flex p-3 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-space text-2xl font-bold text-[#F5F3ED]">Brief Received</h3>
                <p className="font-inter text-sm text-[#E6E2D9]/90 max-w-md mx-auto leading-relaxed">
                  {successMessage}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="btn-studio text-xs py-2.5 px-6 border-[#F5F3ED] text-[#F5F3ED] hover:bg-[#F5F3ED] hover:text-[#191B1E] cursor-pointer"
                  >
                    Submit Another Brief
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Honeypot field (hidden from real users) */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                {/* Error Banner */}
                {status === 'error' && (
                  <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-200 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block font-mono text-xs text-[#E6E2D9]/80 uppercase tracking-wider mb-1.5 font-medium">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="e.g. Alex Vance"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-3.5 py-3 min-h-[44px] bg-[#191B1E] border border-[#E6E2D9]/25 text-sm text-[#F5F3ED] placeholder:text-[#E6E2D9]/30 focus:border-[#D36B4D] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="workEmail" className="block font-mono text-xs text-[#E6E2D9]/80 uppercase tracking-wider mb-1.5 font-medium">
                      Work Email *
                    </label>
                    <input
                      id="workEmail"
                      name="workEmail"
                      type="email"
                      required
                      placeholder="alex@enterprise.com"
                      value={formData.workEmail}
                      onChange={handleChange}
                      className="w-full px-3.5 py-3 min-h-[44px] bg-[#191B1E] border border-[#E6E2D9]/25 text-sm text-[#F5F3ED] placeholder:text-[#E6E2D9]/30 focus:border-[#D36B4D] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Company & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block font-mono text-xs text-[#E6E2D9]/80 uppercase tracking-wider mb-1.5 font-medium">
                      Company / Organization *
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      placeholder="Acme Technologies Inc."
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-3.5 py-3 min-h-[44px] bg-[#191B1E] border border-[#E6E2D9]/25 text-sm text-[#F5F3ED] placeholder:text-[#E6E2D9]/30 focus:border-[#D36B4D] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block font-mono text-xs text-[#E6E2D9]/80 uppercase tracking-wider mb-1.5 font-medium">
                      Target Timeline *
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-3.5 py-3 min-h-[44px] bg-[#191B1E] border border-[#E6E2D9]/25 text-sm text-[#F5F3ED] focus:border-[#D36B4D] focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="immediate">Immediate / Urgent</option>
                      <option value="one-to-three-months">1 – 3 Months</option>
                      <option value="three-to-six-months">3 – 6 Months</option>
                      <option value="flexible">Flexible Exploration</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Scope Textarea */}
                <div>
                  <label htmlFor="projectScope" className="block font-mono text-xs text-[#E6E2D9]/80 uppercase tracking-wider mb-1.5 font-medium">
                    Technical Mandate / Problem Description *
                  </label>
                  <textarea
                    id="projectScope"
                    name="projectScope"
                    required
                    rows={3}
                    placeholder="Describe your architecture requirements, operational bottlenecks, or delivery objectives..."
                    value={formData.projectScope}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 min-h-[88px] bg-[#191B1E] border border-[#E6E2D9]/25 text-sm text-[#F5F3ED] placeholder:text-[#E6E2D9]/30 focus:border-[#D36B4D] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] text-[#E6E2D9]/60">
                    Encrypted submission. No sales intermediaries.
                  </span>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-studio btn-studio-primary text-xs py-3 px-6 flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span className="font-mono font-medium">Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span className="font-mono font-medium">Transmit Brief</span>
                        <ArrowRight className="w-3.5 h-3.5 arrow-icon" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes floatSlow {
          0% {
            transform: translate3d(0, -50%, 0) rotate(0deg);
          }
          100% {
            transform: translate3d(15px, calc(-50% - 15px), 0) rotate(-4deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\[floatSlow_8s_ease-in-out_infinite_alternate\] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

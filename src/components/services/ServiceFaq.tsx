'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { type ServiceFAQ } from '@/content/services';

interface ServiceFaqProps {
  faqs: ServiceFAQ[];
}

export function ServiceFaq({ faqs }: ServiceFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section aria-labelledby="faq-heading" className="py-14 sm:py-20 border-b border-[#E6E2D9]">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-[#D36B4D]" aria-hidden="true" />
        <h2
          id="faq-heading"
          className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold"
        >
          Frequently Addressed Questions
        </h2>
      </div>

      <h3 className="font-space text-2xl sm:text-4xl font-semibold tracking-tight text-[#191B1E] max-w-3xl mb-10">
        Direct technical answers on scoping, delivery, and integration.
      </h3>

      <div className="space-y-4 max-w-4xl" role="region" aria-label="FAQ items">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const buttonId = `faq-btn-${idx}`;
          const panelId = `faq-panel-${idx}`;

          return (
            <div
              key={idx}
              className={`border transition-colors duration-200 ${
                isOpen ? 'border-[#191B1E] bg-white' : 'border-[#E6E2D9] bg-white/60 hover:border-[#191B1E]/40'
              }`}
            >
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(idx)}
                className="w-full p-6 sm:p-7 flex items-center justify-between text-left gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
              >
                <span className="font-space text-lg sm:text-xl font-semibold text-[#191B1E]">
                  {faq.question}
                </span>
                <span
                  className="w-8 h-8 rounded-full border border-[#E6E2D9] flex items-center justify-center text-[#191B1E] shrink-0"
                  aria-hidden="true"
                >
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-6 pb-6 sm:px-7 sm:pb-7 text-base text-[#6B6C67] leading-relaxed border-t border-[#E6E2D9]/60 pt-4"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}


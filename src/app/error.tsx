'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log unexpected client-side runtime errors
    console.error('[OFFSCRIPT SYSTEM EXCEPTION]:', error);
  }, [error]);

  return (
    <div className="pt-40 pb-28 bg-[#F5F3ED] min-h-[80vh] flex flex-col justify-center text-[#191B1E]">
      <Container>
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-[#D36B4D] mb-4">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-mono text-xs text-[#D36B4D] tracking-widest uppercase font-semibold">
              500 // Runtime Exception
            </span>
          </div>

          <h1 className="font-syne text-5xl sm:text-7xl font-bold tracking-tight text-[#191B1E] leading-none mb-6">
            System Fault Detected<span className="text-[#D36B4D]">.</span>
          </h1>

          <p className="font-inter text-base sm:text-lg text-[#6B6C67] leading-relaxed mb-6">
            An unexpected state occurred while rendering this interface. Our architecture isolation
            contained the error. You can attempt to re-execute the segment or return to safe navigation.
          </p>

          {error.digest && (
            <div className="p-4 bg-white border border-[#E6E2D9] font-mono text-xs text-[#92938D] mb-8">
              <span>Exception Digest: </span>
              <code className="text-[#191B1E] font-bold">{error.digest}</code>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D36B4D] text-[#191B1E] font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#191B1E] hover:text-[#F5F3ED] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Execution</span>
            </button>

            <Button href="/" variant="secondary">
              Return Home
            </Button>

            <Button href="/contact" variant="dark">
              Report Incident
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}


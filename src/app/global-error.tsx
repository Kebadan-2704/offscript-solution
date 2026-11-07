'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('[OFFSCRIPT GLOBAL ROOT EXCEPTION]:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#191B1E] text-[#F5F3ED] min-h-screen flex items-center justify-center p-6 font-sans antialiased">
        <div className="max-w-xl p-8 sm:p-12 border border-white/20 bg-black/40">
          <span className="font-mono text-xs text-[#D36B4D] tracking-widest uppercase block mb-3 font-semibold">
            Fatal Runtime Interruption
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            System Failure<span className="text-[#D36B4D]">.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#92938D] leading-relaxed mb-6">
            A root-level exception prevented the application shell from rendering. Attempting to
            reboot the application state below:
          </p>

          {error.digest && (
            <p className="font-mono text-xs text-white/50 mb-8">
              Digest: {error.digest}
            </p>
          )}

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-3 bg-[#D36B4D] text-[#191B1E] font-mono text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors cursor-pointer"
            >
              Reboot Application
            </button>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.reload();
                }
              }}
              className="px-6 py-3 border border-white/30 text-white font-mono text-xs uppercase tracking-wider hover:border-white transition-colors cursor-pointer"
            >
              Reload Base
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}


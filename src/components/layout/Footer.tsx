import Link from 'next/link';
import Image from 'next/image';
import { FOOTER_NAV } from '@/content/nav';
import { GlobalFlagsTicker } from './GlobalFlagsTicker';

/**
 * Editorial site footer with service directories, studio links, and legal metadata.
 */
export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#F5F3ED] border-t border-[#E6E2D9] pt-10 pb-8 sm:pb-10">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-6 border-b border-[#E6E2D9]">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex items-center mb-6 min-h-[44px]">
                <Image
                  src="/brand/logo-lockup.png"
                  alt="OFFSCRIPT SOLUTION"
                  width={210}
                  height={42}
                  className="w-auto h-9 object-contain"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </Link>
              <p className="text-[#52534E] text-[15px] max-w-sm mb-6 leading-relaxed">
                An independent technology and digital solutions studio engineering software,
                intelligent systems and bespoke digital platforms.
              </p>
            </div>
          </div>

          {/* Col 2: Services Directory */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#52534E] mb-5 font-semibold">
              Services
            </h3>
            <ul className="space-y-1 text-[15px]">
              {FOOTER_NAV.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center min-h-[44px] py-1 text-[#191B1E] hover:text-[#9B3F27] transition-colors focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Studio Directory */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#52534E] mb-5 font-semibold">
              Studio
            </h3>
            <ul className="space-y-1 text-[15px]">
              {FOOTER_NAV.studio.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center min-h-[44px] py-1 text-[#191B1E] hover:text-[#9B3F27] transition-colors focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Direct Channel */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#52534E] mb-5 font-semibold">
                Direct Inquiry
              </h3>
              <p className="text-[#52534E] text-sm mb-3">
                Have a project or technical challenge in mind?
              </p>
              <a
                href="mailto:hello@offscriptsolution.com"
                className="font-mono text-sm text-[#191B1E] font-medium hover:text-[#9B3F27] transition-colors inline-flex items-center min-h-[44px] mb-4 focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
              >
                hello@offscriptsolution.com
              </a>
            </div>
          </div>
        </div>

        {/* Global Client Availability Running Ticker Bar */}
        <div className="py-2.5 border-b border-[#E6E2D9]">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#191B1E] font-semibold">
              Global Availability · Active Client Coverage
            </span>
          </div>
          <GlobalFlagsTicker variant="full" className="my-0" />
        </div>

        {/* Bottom row: Legal & meta */}
        <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs text-[#52534E]">
          <div>
            &copy; {currentYear} OFFSCRIPT SOLUTION. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#191B1E] transition-colors min-h-[44px] inline-flex items-center py-2 focus-visible:outline-2 focus-visible:outline-[#D36B4D]">
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="text-[#92938D]">·</span>
            <Link href="/terms" className="hover:text-[#191B1E] transition-colors min-h-[44px] inline-flex items-center py-2 focus-visible:outline-2 focus-visible:outline-[#D36B4D]">
              Terms of Engagement
            </Link>
            <span aria-hidden="true" className="text-[#92938D]">·</span>
            <a href="#main-content" className="hover:text-[#191B1E] transition-colors min-h-[44px] inline-flex items-center py-2 focus-visible:outline-2 focus-visible:outline-[#D36B4D]">
              Back to top &uarr;
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

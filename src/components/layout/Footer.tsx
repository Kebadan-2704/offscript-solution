import Link from 'next/link';
import Image from 'next/image';
import { FOOTER_NAV } from '@/content/nav';

/**
 * Editorial site footer with service directories, studio links, and legal metadata.
 */
export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#F5F3ED] border-t border-[#E6E2D9] pt-20 pb-12">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#E6E2D9]">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/brand/logo-lockup.png"
                  alt="OFFSCRIPT SOLUTION"
                  width={210}
                  height={42}
                  className="w-auto h-9 object-contain"
                />
              </Link>
              <p className="text-[#6B6C67] text-[15px] max-w-sm mb-6 leading-relaxed">
                An independent technology and digital solutions studio engineering software,
                intelligent systems and bespoke digital platforms.
              </p>
            </div>
            <div className="font-mono text-xs text-[#6B6C67] tracking-wider uppercase">
              Tagline: Engineered Differently.
            </div>
          </div>

          {/* Col 2: Services Directory */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#6B6C67] mb-5 font-semibold">
              Services
            </h3>
            <ul className="space-y-3 text-[15px]">
              {FOOTER_NAV.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#191B1E] hover:text-[#D36B4D] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Studio Directory */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#6B6C67] mb-5 font-semibold">
              Studio
            </h3>
            <ul className="space-y-3 text-[15px]">
              {FOOTER_NAV.studio.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#191B1E] hover:text-[#D36B4D] transition-colors"
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
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#6B6C67] mb-5 font-semibold">
                Direct Inquiry
              </h3>
              <p className="text-[#6B6C67] text-sm mb-3">
                Have a project or technical challenge in mind?
              </p>
              <a
                href="mailto:hello@offscriptsolution.com"
                className="font-mono text-sm text-[#191B1E] font-medium hover:text-[#D36B4D] transition-colors block mb-4"
              >
                hello@offscriptsolution.com
              </a>
            </div>

            <div className="space-y-2 text-xs text-[#6B6C67] font-mono">
              <p>RESPONSE WINDOW: 24–48H</p>
              <p>GLOBAL AVAILABILITY</p>
            </div>
          </div>
        </div>

        {/* Bottom row: Legal & meta */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#6B6C67]">
          <div>
            &copy; {currentYear} OFFSCRIPT SOLUTION. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#191B1E] transition-colors">
              Privacy Policy
            </Link>
            <span aria-hidden="true">{'//'}</span>
            <Link href="/terms" className="hover:text-[#191B1E] transition-colors">
              Terms of Engagement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

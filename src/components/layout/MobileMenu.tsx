'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MAIN_NAV } from '@/content/nav';
import { ArrowUpRight, X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Full-screen circle clip-path mobile menu overlay with focus management and ESC key support.
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[65] bg-[#191B1E] text-[#F5F3ED] flex flex-col justify-between p-6 sm:p-12 transition-[clip-path,visibility] duration-700 ease-[cubic-bezier(0.2,0.7,0.1,1)] ${
        isOpen
          ? '[clip-path:circle(150%_at_calc(100%-44px)_44px)] visible'
          : '[clip-path:circle(0px_at_calc(100%-44px)_44px)] invisible pointer-events-none'
      }`}
    >
      {/* Top action row */}
      <div className="flex items-center justify-between border-b border-[#E6E2D9]/15 pb-6">
        <span className="font-mono text-xs tracking-widest text-[#92938D] uppercase">
          Menu · OFFSCRIPT SOLUTION
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="w-12 h-12 flex items-center justify-center border border-[#E6E2D9]/20 hover:border-[#D36B4D] hover:text-[#D36B4D] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col gap-2 my-auto py-8">
        {MAIN_NAV.map((link, idx) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`font-space text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight transition-all duration-300 flex items-center justify-between py-3.5 min-h-[52px] border-b border-[#E6E2D9]/10 group ${
                isActive ? 'text-[#D36B4D] pl-3' : 'text-[#F5F3ED] hover:text-[#D36B4D] hover:pl-3'
              }`}
              style={{
                transitionDelay: isOpen ? `${idx * 40}ms` : '0ms',
              }}
            >
              <span>{link.label}</span>
              <span className="font-mono text-xs text-[#92938D] opacity-0 group-hover:opacity-100 transition-opacity">
                0{idx + 1}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom CTA block */}
      <div className="border-t border-[#E6E2D9]/15 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-[#92938D] uppercase tracking-wider">New Enquiries</p>
          <a
            href="mailto:hello@offscriptsolution.com"
            className="text-base text-[#F5F3ED] hover:text-[#D36B4D] transition-colors font-medium"
          >
            hello@offscriptsolution.com
          </a>
        </div>
        <Link
          href="/contact"
          onClick={onClose}
          className="btn-studio btn-studio-primary justify-between sm:w-auto"
        >
          <span>Start a Project</span>
          <ArrowUpRight className="w-4 h-4 arrow-icon" />
        </Link>
      </div>
    </div>
  );
}


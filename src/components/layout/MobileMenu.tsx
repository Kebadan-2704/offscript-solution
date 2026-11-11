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
  const prevPathname = useRef(pathname);

  // Close only when route actually changes
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Pause smooth scroll during mobile menu
    const lenis = (
      window as unknown as {
        __lenis?: { stop: () => void; start: () => void };
      }
    ).__lenis;
    lenis?.stop();

    // Focus close button on open
    const timer = setTimeout(() => {
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
      lenis?.start();
      clearTimeout(timer);
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
      style={{
        clipPath: isOpen
          ? 'circle(150% at calc(100% - 44px) 44px)'
          : 'circle(0px at calc(100% - 44px) 44px)',
      }}
      className={`fixed inset-0 z-[70] bg-[#191B1E] text-[#F5F3ED] flex flex-col justify-between p-6 sm:p-12 overflow-y-auto transition-[clip-path,opacity,visibility] duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)] ${
        isOpen
          ? 'opacity-100 visible pointer-events-auto'
          : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      {/* Top action row */}
      <div className="flex items-center justify-between border-b border-[#E6E2D9]/15 pb-5 shrink-0">
        <span className="font-mono text-xs tracking-widest text-[#92938D] uppercase">
          Menu · OFFSCRIPT SOLUTION
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="w-11 h-11 flex items-center justify-center border border-[#E6E2D9]/20 hover:border-[#D36B4D] hover:text-[#D36B4D] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col gap-1.5 my-auto py-6 shrink-0">
        {MAIN_NAV.map((link, idx) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`font-space text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight transition-all duration-300 flex items-center justify-between py-2.5 min-h-[48px] border-b border-[#E6E2D9]/10 group cursor-pointer ${
                isActive ? 'text-[#D36B4D] pl-2' : 'text-[#F5F3ED] hover:text-[#D36B4D] hover:pl-2'
              }`}
              style={{
                transitionDelay: isOpen ? `${idx * 30}ms` : '0ms',
              }}
            >
              <span>{link.label}</span>
              <span className="font-mono text-xs text-[#92938D] opacity-60 group-hover:opacity-100 transition-opacity">
                0{idx + 1}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom CTA block */}
      <div className="border-t border-[#E6E2D9]/15 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <p className="font-mono text-[11px] text-[#92938D] uppercase tracking-wider mb-1">New Enquiries</p>
          <a
            href="mailto:hello@offscriptsolution.com"
            className="text-sm sm:text-base text-[#F5F3ED] hover:text-[#D36B4D] transition-colors font-medium"
          >
            hello@offscriptsolution.com
          </a>
        </div>
        <Link
          href="/contact"
          onClick={onClose}
          className="btn-studio btn-studio-primary justify-between sm:w-auto cursor-pointer"
        >
          <span>Start a Project</span>
          <ArrowUpRight className="w-4 h-4 arrow-icon" />
        </Link>
      </div>
    </div>
  );
}


'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MAIN_NAV } from '@/content/nav';
import { MobileMenu } from './MobileMenu';
import { ArrowUpRight } from 'lucide-react';

/**
 * Global Header with responsive navigation, scroll state compacting, and mobile menu trigger.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const handleToggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-[cubic-bezier(0.2,0.7,0.1,1)] ${
          scrolled
            ? 'bg-[#F5F3ED]/95 backdrop-blur-md border-b border-[#E6E2D9] shadow-xs'
            : 'bg-[#F5F3ED]/80 backdrop-blur-xs border-b border-[#E6E2D9]/40'
        }`}
      >
        <div className="wrap">
          <div
            className={`flex items-center justify-between transition-[height] duration-400 ease-[cubic-bezier(0.2,0.7,0.1,1)] ${
              scrolled ? 'h-16' : 'h-20 lg:h-[84px]'
            }`}
          >
            {/* Logo lockup */}
            <Link
              href="/"
              className="flex items-center gap-3 min-h-[44px] focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
              aria-label="OFFSCRIPT SOLUTION - Return to home"
            >
              <div className="relative h-9 lg:h-11 w-auto aspect-[4.8/1] flex items-center">
                <Image
                  src="/brand/logo-lockup.png"
                  alt="OFFSCRIPT SOLUTION"
                  width={216}
                  height={44}
                  priority
                  className="object-contain w-auto h-full"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Primary Navigation"
              className="hidden lg:flex items-center gap-8 xl:gap-9 text-[15px] font-medium"
            >
              {MAIN_NAV.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-1 transition-colors duration-300 group ${
                      isActive ? 'text-[#9B3F27] font-semibold' : 'text-[#191B1E] hover:text-[#9B3F27]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-[#D36B4D] transition-transform duration-300 ease-[cubic-bezier(0.2,0.7,0.1,1)] origin-left ${
                        isActive
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/contact"
                className="btn-studio btn-studio-primary text-xs py-3 px-5"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 arrow-icon" />
              </Link>
            </div>

            {/* Mobile Hamburger Trigger */}
            <button
              type="button"
              onClick={handleToggleMenu}
              aria-label={menuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={menuOpen}
              className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 border border-[#191B1E] bg-transparent focus-visible:outline-[#D36B4D] cursor-pointer"
            >
              <span
                className={`w-5 h-[1.5px] bg-[#191B1E] transition-all duration-300 origin-center ${
                  menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
                }`}
              />
              <span
                className={`w-5 h-[1.5px] bg-[#191B1E] transition-all duration-300 origin-center ${
                  menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Accessible full-screen mobile menu */}
      <MobileMenu isOpen={menuOpen} onClose={handleCloseMenu} />
    </>
  );
}


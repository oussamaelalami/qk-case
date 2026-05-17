'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';

export function NavBar() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useI18n();
  const isActive = (path: string) => pathname === path;
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const navLinks = [
    { href: '/',           label: t.nav.home },
    { href: '/browse',     label: t.nav.browse },
    { href: '/customizer', label: t.nav.customize },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-surface/90 backdrop-blur-2xl border-b border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.4)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="flex justify-between items-center w-full px-gutter max-w-[1280px] mx-auto h-[72px]">
          {/* Left: Logo + Desktop Nav links */}
          <div className="flex items-center gap-lg">
            <Link
              href="/"
              className="font-display text-h2 font-extrabold tracking-tighter text-gradient hover:opacity-80 transition-opacity"
            >
              QK Case
            </Link>

            <div className="hidden md:flex gap-md">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative font-body-md transition-colors duration-200 py-xs ${
                    isActive(href)
                      ? 'text-on-surface font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {label}
                  {isActive(href) && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-tertiary rounded-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: CTA + Language toggle + Mobile hamburger */}
          <div className="flex items-center gap-sm">
            <Link
              href="/customizer"
              className="hidden md:flex items-center gap-xs px-md py-xs bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-medium hover:bg-primary/20 hover:border-primary/40 transition-all duration-200"
            >
              Personnaliser <span className="ml-0.5">→</span>
            </Link>

            <div className="flex items-center bg-surface-container rounded-full px-xs py-[3px] border border-white/5">
              <button
                onClick={() => setLocale('fr')}
                className={`text-label-caps font-label-caps px-sm py-xs rounded-full transition-all duration-200 ${
                  locale === 'fr'
                    ? 'bg-primary text-white shadow-sm shadow-primary/30'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLocale('ar')}
                className={`text-label-caps font-label-caps px-sm py-xs rounded-full transition-all duration-200 ${
                  locale === 'ar'
                    ? 'bg-primary text-white shadow-sm shadow-primary/30'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                AR
              </button>
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-xl border border-white/8 hover:bg-surface-container transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`w-4 h-0.5 bg-on-surface rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`w-4 h-0.5 bg-on-surface rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`w-4 h-0.5 bg-on-surface rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? 'max-h-64 border-t border-white/5' : 'max-h-0'
          }`}
        >
          <div className="px-gutter py-4 space-y-1 bg-surface/90 backdrop-blur-2xl">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                  isActive(href)
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/customizer"
              className="flex items-center justify-center gap-2 px-4 py-3 mt-2 bg-gradient-to-r from-primary to-tertiary text-white rounded-xl font-bold text-sm"
            >
              Personnaliser →
            </Link>
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}

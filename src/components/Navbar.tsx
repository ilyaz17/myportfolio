import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
}

const NAV_LINKS = [
  { href: '#projects', id: 'projects', label: 'Projects' },
  { href: '#experience', id: 'experience', label: 'Experience' },
  { href: '#skills', id: 'skills', label: 'Skills' },
  { href: '#contact', id: 'contact', label: 'Contact' },
];

export function Navbar({ onOpenResume }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / scrollable)));
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionElements = NAV_LINKS.map((link) =>
      document.getElementById(link.id)
    ).filter((el): el is HTMLElement => Boolean(el));

    if (sectionElements.length === 0 || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08090B]/88 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-[#F7F8FA] transition-colors hover:text-[#F2B705] whitespace-nowrap shrink-0"
        >
          {PROFILE.name}
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#A1A9B8]"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-[#F2B705] after:transition-transform after:duration-200 ${
                  isActive
                    ? 'text-[#F7F8FA] after:scale-x-100'
                    : 'hover:text-[#F7F8FA] after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenResume}
            className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#F2B705] px-4 py-2 text-sm font-semibold text-[#08090B] transition-colors duration-150 hover:bg-[#FFD043] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Resume
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-[#F4F5F7] transition-colors hover:border-white/30 hover:bg-white/5 md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Subtle reading progress hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-transparent"
      >
        <div
          className="h-full origin-left bg-[#F2B705]/80 transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-white/10 bg-[#0D0F14] px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[44px] items-center justify-between text-base font-medium text-[#D1D6DF] transition-colors hover:text-[#F2B705]"
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && (
                    <span className="font-mono text-xs text-[#F2B705]">Current</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

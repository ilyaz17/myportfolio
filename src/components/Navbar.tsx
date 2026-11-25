import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
}

const NAV_LINKS = [
  { href: '#home', id: 'home', label: 'Home' },
  { href: '#about', id: 'about', label: 'About' },
  { href: '#resume', id: 'resume', label: 'Resume' },
  { href: '#portfolio', id: 'portfolio', label: 'Portfolio' },
  { href: '#contact', id: 'contact', label: 'Contact' },
];

export function Navbar({ onOpenResume }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

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
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#070D1B]/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-8 px-6">
        <a
          href="#home"
          className="font-display text-xl font-bold tracking-tight text-[#FDFEFF] transition-colors hover:text-[#FEC544] whitespace-nowrap shrink-0"
        >
          <span className="text-[#FEC544]">M</span>ohammed {PROFILE.name.split(' ')[1]}
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#FDFEFF]"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                className={`py-1 whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive ? 'text-[#FEC544]' : 'text-[#D6DAE2] hover:text-[#FEC544]'
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
            className="inline-flex min-h-[40px] items-center justify-center rounded-full bg-[#FEC544] px-5 py-2 text-sm font-semibold text-[#070D1B] transition-colors duration-150 hover:bg-[#FFD369] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Resume
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-[#FDFEFF] transition-colors hover:border-[#FEC544]/50 md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-white/10 bg-[#0A101E] px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex min-h-[44px] items-center text-base font-medium transition-colors ${
                    activeSection === link.id
                      ? 'text-[#FEC544]'
                      : 'text-[#D6DAE2] hover:text-[#FEC544]'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

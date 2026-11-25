import { useState } from 'react';
import {
  ArrowUp,
  Briefcase,
  Cpu,
  FileDown,
  FolderGit2,
  Home,
  Layers,
  Menu,
  Moon,
  Send,
  Sun,
  User,
  X,
} from 'lucide-react';
import { PROFILE, RESUME_DOWNLOAD_FILENAME, RESUME_PDF_URL } from '../data/portfolioData';

export interface NavItem {
  id: string;
  label: string;
  icon: typeof Home;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'resume', label: 'Journey', icon: Briefcase },
  { id: 'portfolio', label: 'Work', icon: FolderGit2 },
  { id: 'services', label: 'Services', icon: Layers },
  { id: 'skills', label: 'Tech Stack', icon: Cpu },
  { id: 'contact', label: 'Contact', icon: Send },
];

interface RightNavRailProps {
  activeSection: string;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function RightNavRail({
  activeSection,
  isDark,
  onToggleTheme,
}: RightNavRailProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Compact Mobile & Tablet Top Bar (< xl) */}
      <header className="sticky top-0 z-40 border-b border-black/[0.07] bg-white/90 backdrop-blur-md dark:border-white/[0.08] dark:bg-[#0B0D10]/90 xl:hidden">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111315] font-display text-xs font-bold text-[#00E061] dark:bg-[#00E061] dark:text-[#0B0D10]">
              MI
            </span>
            <span className="font-display text-sm font-semibold text-[#111315] dark:text-[#F3F5F7]">
              {PROFILE.name}
            </span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href={RESUME_PDF_URL}
              download={RESUME_DOWNLOAD_FILENAME}
              className="hidden sm:inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-[#111315] transition-colors hover:border-[#00C853] hover:text-[#009944] dark:border-white/15 dark:text-[#F3F5F7] dark:hover:text-[#00E061]"
            >
              <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
              <span>CV</span>
            </a>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-[#111315] transition-colors hover:border-[#00C853] dark:border-white/15 dark:bg-[#15181E] dark:text-[#F3F5F7] cursor-pointer"
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-[#00E061]" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-[#111315] dark:border-white/15 dark:bg-[#15181E] dark:text-[#F3F5F7] cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            aria-label="Mobile section navigation"
            className="border-t border-black/[0.07] bg-white px-4 py-3 dark:border-white/[0.08] dark:bg-[#0B0D10]"
          >
            <div className="flex flex-wrap gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#111315] text-[#00E061] dark:bg-[#00E061] dark:text-[#0B0D10]'
                        : 'bg-[#F3F4F6] text-[#3F444E] hover:text-[#111315] dark:bg-[#161A22] dark:text-[#C4C9D4]'
                    }`}
                  >
                    <item.icon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Iconic Isak Right Floating Vertical Icon Dock (Desktop xl+) */}
      <aside
        aria-label="Quick section navigation and theme controls"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex"
      >
        {/* Theme Toggle Circle */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          title={isDark ? 'Light mode' : 'Dark mode'}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#4A4F59] shadow-[0_6px_22px_rgba(0,0,0,0.06)] transition-all hover:border-[#00C853] hover:text-[#00A846] dark:border-white/10 dark:bg-[#14171D] dark:text-[#C4C9D4] dark:hover:border-[#00E061] dark:hover:text-[#00E061] cursor-pointer"
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-[#00E061]" aria-hidden="true" />
          ) : (
            <Moon className="h-4 w-4" aria-hidden="true" />
          )}
        </button>

        {/* Vertical Icon Pill Rail */}
        <nav
          aria-label="Primary sections"
          className="flex flex-col items-center gap-1 rounded-full border border-black/[0.08] bg-white/95 px-1.5 py-2.5 shadow-[0_8px_28px_rgba(0,0,0,0.06)] backdrop-blur-md dark:border-white/10 dark:bg-[#14171D]/95"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                title={item.label}
                className={`group relative flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                  isActive
                    ? 'bg-[#00E061]/15 text-[#009E46] dark:bg-[#00E061]/20 dark:text-[#00E061]'
                    : 'text-[#737882] hover:bg-black/[0.04] hover:text-[#111315] dark:text-[#8E95A3] dark:hover:bg-white/[0.06] dark:hover:text-white'
                }`}
              >
                <Icon className="h-[17px] w-[17px]" aria-hidden="true" />
                <span className="pointer-events-none absolute right-12 rounded-md bg-[#111315] px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 whitespace-nowrap dark:bg-white dark:text-[#111315]">
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Back to Top Circle */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#4A4F59] shadow-[0_6px_22px_rgba(0,0,0,0.06)] transition-all hover:border-[#00C853] hover:text-[#00A846] dark:border-white/10 dark:bg-[#14171D] dark:text-[#C4C9D4] dark:hover:border-[#00E061] dark:hover:text-[#00E061] cursor-pointer"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </button>
      </aside>
    </>
  );
}

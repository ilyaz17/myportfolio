/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, type ReactNode } from 'react';
import { MotionConfig, motion } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ExperienceSection } from './components/ExperienceSection';
import { HeroSection } from './components/HeroSection';
import { InitialLoader } from './components/InitialLoader';
import { ProfileSidebar } from './components/ProfileSidebar';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeModal } from './components/ResumeModal';
import { NAV_ITEMS, RightNavRail } from './components/RightNavRail';
import { ServicesSection } from './components/ServicesSection';
import { SkillsSection } from './components/SkillsSection';
import { PROFILE, RESUME_DOWNLOAD_FILENAME, RESUME_PDF_URL } from './data/portfolioData';

function SectionReveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.4, 0.7] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white text-[#111315] transition-colors duration-200 dark:bg-[#0B0D10] dark:text-[#F3F5F7]">
        <InitialLoader />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#00E061] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0B0D10]"
        >
          Skip to main content
        </a>

        <RightNavRail
          activeSection={activeSection}
          isDark={isDark}
          onToggleTheme={() => setIsDark((prev) => !prev)}
        />

        {/* Exact Isak 2-Column Sticky-Left + Scrollable-Right Shell */}
        <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-10 px-4 py-6 sm:px-6 lg:flex-row lg:items-start lg:gap-14 lg:px-8 xl:gap-16 xl:pr-24">
          <ProfileSidebar onOpenResume={() => setIsResumeOpen(true)} />

          <main id="main-content" className="min-w-0 flex-1 lg:pt-4">
            <HeroSection />

            <SectionReveal>
              <AboutSection />
            </SectionReveal>

            <SectionReveal>
              <ExperienceSection />
            </SectionReveal>

            <SectionReveal>
              <ProjectsSection />
            </SectionReveal>

            <SectionReveal>
              <ServicesSection />
            </SectionReveal>

            <SectionReveal>
              <SkillsSection />
            </SectionReveal>

            <SectionReveal>
              <ContactSection />
            </SectionReveal>

            <footer className="mt-8 border-t border-black/[0.08] py-8 dark:border-white/[0.08]">
              <div className="flex flex-col justify-between gap-4 text-xs text-[#646870] dark:text-[#9CA3AF] sm:flex-row sm:items-center">
                <p>
                  © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.location}
                </p>
                <div className="flex flex-wrap items-center gap-5">
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[#111315] dark:hover:text-[#00E061]"
                  >
                    GitHub
                  </a>
                  <a
                    href={PROFILE.emailHref}
                    className="transition-colors hover:text-[#111315] dark:hover:text-[#00E061]"
                  >
                    Email
                  </a>
                  <a
                    href={RESUME_PDF_URL}
                    download={RESUME_DOWNLOAD_FILENAME}
                    className="transition-colors hover:text-[#111315] dark:hover:text-[#00E061]"
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </footer>
          </main>
        </div>

        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ContactSection } from './components/ContactSection';
import { ExperienceSection } from './components/ExperienceSection';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeModal } from './components/ResumeModal';
import { SkillsSection } from './components/SkillsSection';
import { PROFILE, RESUME_DOWNLOAD_FILENAME, RESUME_PDF_URL } from './data/portfolioData';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F4F5F7]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-[#F2B705] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#08090B]"
      >
        Skip to content
      </a>

      <Navbar onOpenResume={() => setResumeOpen(true)} />

      <main id="main-content">
        <HeroSection onOpenResume={() => setResumeOpen(true)} />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-xs text-[#949DAA] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {PROFILE.name}. Full Stack Developer · {PROFILE.location}.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#F4F5F7]"
            >
              GitHub
            </a>
            <a
              href={PROFILE.emailHref}
              className="transition-colors hover:text-[#F4F5F7]"
            >
              Email
            </a>
            <a
              href={RESUME_PDF_URL}
              download={RESUME_DOWNLOAD_FILENAME}
              className="transition-colors hover:text-[#F2B705]"
            >
              Download Resume
            </a>
          </div>
        </div>
      </footer>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}

import { useEffect, useState } from 'react';
import { ArrowDownToLine, ExternalLink, X } from 'lucide-react';
import {
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  RESUME_DOWNLOAD_FILENAME,
  RESUME_PDF_URL,
  SKILL_GROUPS,
} from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [viewMode, setViewMode] = useState<'summary' | 'pdf'>('summary');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#040812]/85 p-3 backdrop-blur-md sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="devis-card flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#232935] px-5 py-4 sm:px-6">
          <div>
            <h2
              id="resume-modal-title"
              className="font-display text-xl font-semibold text-[#FDFEFF]"
            >
              {PROFILE.name} — Resume
            </h2>
            <p className="mt-0.5 text-xs text-[#A9ADB8]">
              {PROFILE.role} · {PROFILE.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div
              role="group"
              aria-label="Resume view mode"
              className="inline-flex rounded-full border border-[#232935] bg-[#070D1B] p-1"
            >
              <button
                type="button"
                aria-pressed={viewMode === 'summary'}
                onClick={() => setViewMode('summary')}
                className={`min-h-[36px] rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  viewMode === 'summary'
                    ? 'bg-[#FEC544] text-[#070D1B]'
                    : 'text-[#A9ADB8] hover:text-[#FDFEFF]'
                }`}
              >
                Structured Summary
              </button>
              <button
                type="button"
                aria-pressed={viewMode === 'pdf'}
                onClick={() => setViewMode('pdf')}
                className={`min-h-[36px] rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  viewMode === 'pdf'
                    ? 'bg-[#FEC544] text-[#070D1B]'
                    : 'text-[#A9ADB8] hover:text-[#FDFEFF]'
                }`}
              >
                Original PDF
              </button>
            </div>

            <a
              href={RESUME_PDF_URL}
              download={RESUME_DOWNLOAD_FILENAME}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#FEC544] px-4 py-2 text-xs font-semibold text-[#070D1B] transition-colors hover:bg-[#FFD369] whitespace-nowrap"
            >
              <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
              <span>Download PDF</span>
            </a>

            <a
              href={RESUME_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume PDF in new tab"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#232935] bg-[#070D1B] text-[#D6DAE2] transition-colors hover:border-[#FEC544] hover:text-[#FEC544]"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume viewer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#232935] bg-[#070D1B] text-[#D6DAE2] transition-colors hover:border-[#FEC544] hover:text-[#FEC544] cursor-pointer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto bg-[#070D1B]">
          {viewMode === 'pdf' ? (
            <div className="flex h-full flex-col">
              <object
                data={`${RESUME_PDF_URL}#view=FitH`}
                type="application/pdf"
                aria-label="Mohammed Ilyas Resume PDF"
                className="h-full min-h-[520px] w-full flex-1 bg-[#0A101E]"
              >
                <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                  <p className="font-display text-lg font-semibold text-[#FDFEFF]">
                    Inline PDF preview is unavailable in this browser.
                  </p>
                  <p className="max-w-md text-sm text-[#A9ADB8]">
                    Download the original PDF directly or switch back to the dark-mode structured
                    view.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={RESUME_PDF_URL}
                      download={RESUME_DOWNLOAD_FILENAME}
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#FEC544] px-5 py-2 text-sm font-semibold text-[#070D1B]"
                    >
                      <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
                      <span>Download Original PDF</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setViewMode('summary')}
                      className="min-h-[42px] rounded-full border border-[#232935] px-5 py-2 text-sm font-medium text-[#FDFEFF] cursor-pointer"
                    >
                      Back to text view
                    </button>
                  </div>
                </div>
              </object>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#232935] bg-[#101624] px-5 py-3 text-xs text-[#A9ADB8]">
                <span>Attached PDF file: {RESUME_DOWNLOAD_FILENAME}</span>
                <button
                  type="button"
                  onClick={() => setViewMode('summary')}
                  className="font-medium text-[#FEC544] hover:text-[#FFD369] cursor-pointer"
                >
                  Switch to dark text view
                </button>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-8 p-6 sm:p-8">
              <header className="border-b border-[#232935] pb-6">
                <h3 className="font-display text-2xl font-semibold text-[#FDFEFF]">
                  {PROFILE.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#FEC544]">{PROFILE.role}</p>
                <p className="mt-2 text-xs text-[#A9ADB8]">
                  {PROFILE.phone} · {PROFILE.email} · {PROFILE.githubHandle} · {PROFILE.location}
                </p>
              </header>

              <section>
                <h4 className="font-display text-base font-semibold text-[#FDFEFF]">
                  Professional Summary
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#A9ADB8]">{PROFILE.summary}</p>
              </section>

              <section>
                <h4 className="font-display text-base font-semibold text-[#FDFEFF]">Experience</h4>
                {EXPERIENCE.map((exp) => (
                  <div key={exp.company} className="mt-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm font-semibold text-[#FDFEFF]">
                        {exp.role} — {exp.company}, {exp.location}
                      </p>
                      <span className="font-mono text-xs text-[#FEC544] tabular-nums">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="mt-2.5 space-y-2 text-sm text-[#A9ADB8]">
                      {exp.highlights.map((bullet) => (
                        <li key={bullet} className="flex gap-2.5">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FEC544]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              <section>
                <h4 className="font-display text-base font-semibold text-[#FDFEFF]">
                  Key Projects
                </h4>
                <ul className="mt-3 space-y-3 text-sm text-[#A9ADB8]">
                  {PROJECTS.map((project) => (
                    <li key={project.id}>
                      <span className="font-semibold text-[#FDFEFF]">{project.title}</span>{' '}
                      <span className="text-xs text-[#FEC544]">({project.stack.join(', ')})</span> —{' '}
                      {project.summary}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="font-display text-base font-semibold text-[#FDFEFF]">
                  Technical Skills
                </h4>
                <dl className="mt-3 space-y-2 text-sm">
                  {SKILL_GROUPS.map((group) => (
                    <div key={group.id}>
                      <dt className="inline font-semibold text-[#FDFEFF]">{group.category}: </dt>
                      <dd className="inline text-[#A9ADB8]">{group.skills.join(', ')}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="grid grid-cols-1 gap-6 border-t border-[#232935] pt-6 sm:grid-cols-2">
                <div>
                  <h4 className="font-display text-base font-semibold text-[#FDFEFF]">Education</h4>
                  <ul className="mt-2 space-y-1.5 text-sm text-[#A9ADB8]">
                    {EDUCATION.map((edu) => (
                      <li key={edu.degree}>
                        <span className="font-medium text-[#FDFEFF]">{edu.degree}</span> —{' '}
                        {edu.institution} ({edu.period})
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-display text-base font-semibold text-[#FDFEFF]">Languages</h4>
                  <p className="mt-2 text-sm text-[#A9ADB8]">{PROFILE.languages.join(', ')}</p>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

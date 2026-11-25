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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] border border-black/10 bg-white text-[#111315] shadow-2xl dark:border-white/10 dark:bg-[#13161C] dark:text-[#F3F5F7]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.08] px-5 py-4 dark:border-white/10 sm:px-6">
          <div>
            <h2
              id="resume-modal-title"
              className="font-display text-xl font-semibold text-[#111315] dark:text-white"
            >
              {PROFILE.name} — Resume
            </h2>
            <p className="mt-0.5 text-xs text-[#646870] dark:text-[#9CA3AF]">
              {PROFILE.role} · {PROFILE.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div
              role="group"
              aria-label="Resume view mode"
              className="inline-flex rounded-full border border-black/[0.08] bg-[#F3F4F6] p-1 dark:border-white/10 dark:bg-[#0B0D10]"
            >
              <button
                type="button"
                aria-pressed={viewMode === 'summary'}
                onClick={() => setViewMode('summary')}
                className={`min-h-[34px] rounded-full px-3.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  viewMode === 'summary'
                    ? 'bg-[#111315] text-[#00E061] dark:bg-[#00E061] dark:text-[#0B0D10]'
                    : 'text-[#5F6570] hover:text-[#111315] dark:text-[#9CA3AF] dark:hover:text-white'
                }`}
              >
                Structured Summary
              </button>
              <button
                type="button"
                aria-pressed={viewMode === 'pdf'}
                onClick={() => setViewMode('pdf')}
                className={`min-h-[34px] rounded-full px-3.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  viewMode === 'pdf'
                    ? 'bg-[#111315] text-[#00E061] dark:bg-[#00E061] dark:text-[#0B0D10]'
                    : 'text-[#5F6570] hover:text-[#111315] dark:text-[#9CA3AF] dark:hover:text-white'
                }`}
              >
                Original PDF
              </button>
            </div>

            <a
              href={RESUME_PDF_URL}
              download={RESUME_DOWNLOAD_FILENAME}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-[#00E061] px-4 py-1.5 text-xs font-semibold text-[#0B0D10] transition-colors hover:bg-[#19F073] whitespace-nowrap"
            >
              <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
              <span>Download PDF</span>
            </a>

            <a
              href={RESUME_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume PDF in new tab"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-[#111315] transition-colors hover:border-[#00C853] hover:text-[#009944] dark:border-white/15 dark:text-[#F3F5F7] dark:hover:text-[#00E061]"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume viewer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-[#111315] transition-colors hover:border-[#00C853] hover:text-[#009944] dark:border-white/15 dark:text-[#F3F5F7] dark:hover:text-[#00E061] cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto bg-[#FAFAFB] dark:bg-[#0B0D10]">
          {viewMode === 'pdf' ? (
            <div className="flex h-full flex-col">
              <object
                data={`${RESUME_PDF_URL}#view=FitH`}
                type="application/pdf"
                aria-label="Mohammed Ilyas Resume PDF"
                className="h-full min-h-[520px] w-full flex-1 bg-white dark:bg-[#0B0D10]"
              >
                <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                  <p className="font-display text-lg font-semibold text-[#111315] dark:text-white">
                    Inline PDF preview is unavailable in this browser.
                  </p>
                  <p className="max-w-md text-sm text-[#5F6570] dark:text-[#9CA3AF]">
                    Download the original PDF directly or switch back to the structured summary view.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={RESUME_PDF_URL}
                      download={RESUME_DOWNLOAD_FILENAME}
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#00E061] px-5 py-2 text-sm font-semibold text-[#0B0D10]"
                    >
                      <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
                      <span>Download Original PDF</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setViewMode('summary')}
                      className="min-h-[42px] rounded-full border border-black/15 px-5 py-2 text-sm font-medium text-[#111315] dark:border-white/15 dark:text-white cursor-pointer"
                    >
                      Back to text view
                    </button>
                  </div>
                </div>
              </object>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-black/[0.08] bg-white px-5 py-3 text-xs text-[#646870] dark:border-white/10 dark:bg-[#13161C] dark:text-[#9CA3AF]">
                <span>Attached PDF file: {RESUME_DOWNLOAD_FILENAME}</span>
                <button
                  type="button"
                  onClick={() => setViewMode('summary')}
                  className="font-semibold text-[#009944] hover:underline dark:text-[#00E061] cursor-pointer"
                >
                  Switch to structured summary
                </button>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-8 p-6 sm:p-8">
              <header className="border-b border-black/[0.08] pb-6 dark:border-white/10">
                <h3 className="font-display text-2xl font-semibold text-[#111315] dark:text-white">
                  {PROFILE.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-[#009944] dark:text-[#00E061]">
                  {PROFILE.role}
                </p>
                <p className="mt-2 text-xs text-[#646870] dark:text-[#9CA3AF]">
                  {PROFILE.phone} · {PROFILE.email} · {PROFILE.githubHandle} · {PROFILE.location}
                </p>
              </header>

              <section>
                <h4 className="font-display text-base font-semibold text-[#111315] dark:text-white">
                  Professional Summary
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#4B515C] dark:text-[#B4BAC6]">
                  {PROFILE.summary}
                </p>
              </section>

              <section>
                <h4 className="font-display text-base font-semibold text-[#111315] dark:text-white">
                  Experience
                </h4>
                {EXPERIENCE.map((exp) => (
                  <div key={exp.company} className="mt-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm font-semibold text-[#111315] dark:text-white">
                        {exp.role} — {exp.company}, {exp.location}
                      </p>
                      <span className="font-mono text-xs font-medium text-[#009944] tabular-nums dark:text-[#00E061]">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="mt-2.5 space-y-2 text-sm text-[#4B515C] dark:text-[#B4BAC6]">
                      {exp.highlights.map((bullet) => (
                        <li key={bullet} className="flex gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00C853]"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              <section>
                <h4 className="font-display text-base font-semibold text-[#111315] dark:text-white">
                  Key Projects
                </h4>
                <ul className="mt-3 space-y-3 text-sm text-[#4B515C] dark:text-[#B4BAC6]">
                  {PROJECTS.map((project) => (
                    <li key={project.id}>
                      <span className="font-semibold text-[#111315] dark:text-white">
                        {project.title}
                      </span>{' '}
                      <span className="text-xs font-medium text-[#009944] dark:text-[#00E061]">
                        ({project.stack.join(', ')})
                      </span>{' '}
                      — {project.summary}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="font-display text-base font-semibold text-[#111315] dark:text-white">
                  Technical Skills
                </h4>
                <dl className="mt-3 space-y-2 text-sm">
                  {SKILL_GROUPS.map((group) => (
                    <div key={group.id}>
                      <dt className="inline font-semibold text-[#111315] dark:text-white">
                        {group.category}:{' '}
                      </dt>
                      <dd className="inline text-[#4B515C] dark:text-[#B4BAC6]">
                        {group.skills.join(', ')}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="grid grid-cols-1 gap-6 border-t border-black/[0.08] pt-6 dark:border-white/10 sm:grid-cols-2">
                <div>
                  <h4 className="font-display text-base font-semibold text-[#111315] dark:text-white">
                    Education
                  </h4>
                  <ul className="mt-2 space-y-1.5 text-sm text-[#4B515C] dark:text-[#B4BAC6]">
                    {EDUCATION.map((edu) => (
                      <li key={edu.degree}>
                        <span className="font-medium text-[#111315] dark:text-white">
                          {edu.degree}
                        </span>{' '}
                        — {edu.institution} ({edu.period})
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-display text-base font-semibold text-[#111315] dark:text-white">
                    Languages
                  </h4>
                  <p className="mt-2 text-sm text-[#4B515C] dark:text-[#B4BAC6]">
                    {PROFILE.languages.join(', ')}
                  </p>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="surface-card flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <h2
              id="resume-modal-title"
              className="font-display text-xl font-semibold text-[#F4F5F7]"
            >
              {PROFILE.name} — Resume
            </h2>
            <p className="mt-0.5 text-xs text-[#9BA3B2]">
              {PROFILE.role} · {PROFILE.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div
              role="group"
              aria-label="Resume view mode"
              className="inline-flex rounded-lg border border-white/10 bg-[#08090B] p-1"
            >
              <button
                type="button"
                aria-pressed={viewMode === 'summary'}
                onClick={() => setViewMode('summary')}
                className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  viewMode === 'summary'
                    ? 'bg-[#F2B705] text-[#08090B]'
                    : 'text-[#A8B0BD] hover:text-[#F4F5F7]'
                }`}
              >
                Structured Summary
              </button>
              <button
                type="button"
                aria-pressed={viewMode === 'pdf'}
                onClick={() => setViewMode('pdf')}
                className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  viewMode === 'pdf'
                    ? 'bg-[#F2B705] text-[#08090B]'
                    : 'text-[#A8B0BD] hover:text-[#F4F5F7]'
                }`}
              >
                Original PDF
              </button>
            </div>

            <a
              href={RESUME_PDF_URL}
              download={RESUME_DOWNLOAD_FILENAME}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-[#F2B705] px-4 py-2 text-xs font-semibold text-[#08090B] transition-colors hover:bg-[#FFD043] whitespace-nowrap"
            >
              <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
              <span>Download PDF</span>
            </a>

            <a
              href={RESUME_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume PDF in new tab"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-[#D1D6DF] transition-colors hover:border-white/30 hover:text-[#F4F5F7]"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume viewer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-[#D1D6DF] transition-colors hover:border-white/30 hover:text-[#F4F5F7] cursor-pointer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto bg-[#08090B]">
          {viewMode === 'pdf' ? (
            <div className="flex h-full flex-col">
              <object
                data={`${RESUME_PDF_URL}#view=FitH`}
                type="application/pdf"
                aria-label="Mohammed Ilyas Resume PDF"
                className="h-full min-h-[520px] w-full flex-1 bg-[#0B0D11]"
              >
                <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                  <p className="font-display text-lg font-semibold text-[#F4F5F7]">
                    Inline PDF preview is unavailable in this browser.
                  </p>
                  <p className="max-w-md text-sm text-[#9BA3B2]">
                    Download the original PDF directly or switch back to the dark-mode structured view.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={RESUME_PDF_URL}
                      download={RESUME_DOWNLOAD_FILENAME}
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#F2B705] px-4 py-2 text-sm font-semibold text-[#08090B]"
                    >
                      <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
                      <span>Download Original PDF</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setViewMode('summary')}
                      className="min-h-[40px] rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-[#F4F5F7] cursor-pointer"
                    >
                      Back to text view
                    </button>
                  </div>
                </div>
              </object>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-[#111317] px-5 py-3 text-xs text-[#9BA3B2]">
                <span>Attached PDF file: {RESUME_DOWNLOAD_FILENAME}</span>
                <button
                  type="button"
                  onClick={() => setViewMode('summary')}
                  className="font-medium text-[#F2B705] hover:text-[#FFD043] cursor-pointer"
                >
                  Switch to dark text view
                </button>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-8 p-6 sm:p-8">
              <header className="border-b border-white/10 pb-6">
                <h3 className="font-display text-2xl font-semibold text-[#F4F5F7]">
                  {PROFILE.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#F2B705]">{PROFILE.role}</p>
                <p className="mt-2 text-xs text-[#A8B0BD]">
                  {PROFILE.phone} · {PROFILE.email} · {PROFILE.githubHandle} · {PROFILE.location}
                </p>
              </header>

              <section>
                <h4 className="font-display text-base font-semibold text-[#F4F5F7]">
                  Professional Summary
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#B4BAC5]">{PROFILE.summary}</p>
              </section>

              <section>
                <h4 className="font-display text-base font-semibold text-[#F4F5F7]">Experience</h4>
                {EXPERIENCE.map((exp) => (
                  <div key={exp.company} className="mt-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm font-semibold text-[#F4F5F7]">
                        {exp.role} — {exp.company}, {exp.location}
                      </p>
                      <span className="font-mono text-xs text-[#9BA3B2] tabular-nums">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="mt-2.5 space-y-2 text-sm text-[#B4BAC5]">
                      {exp.highlights.map((bullet) => (
                        <li key={bullet} className="flex gap-2.5">
                          <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-[#F2B705]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              <section>
                <h4 className="font-display text-base font-semibold text-[#F4F5F7]">
                  Key Projects
                </h4>
                <ul className="mt-3 space-y-3 text-sm text-[#B4BAC5]">
                  {PROJECTS.map((project) => (
                    <li key={project.id}>
                      <span className="font-semibold text-[#F4F5F7]">{project.title}</span>{' '}
                      <span className="text-xs text-[#9BA3B2]">({project.stack.join(', ')})</span> —{' '}
                      {project.summary}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="font-display text-base font-semibold text-[#F4F5F7]">
                  Technical Skills
                </h4>
                <dl className="mt-3 space-y-2 text-sm">
                  {SKILL_GROUPS.map((group) => (
                    <div key={group.id}>
                      <dt className="inline font-semibold text-[#F4F5F7]">{group.category}: </dt>
                      <dd className="inline text-[#B4BAC5]">{group.skills.join(', ')}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="grid grid-cols-1 gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
                <div>
                  <h4 className="font-display text-base font-semibold text-[#F4F5F7]">Education</h4>
                  <ul className="mt-2 space-y-1.5 text-sm text-[#B4BAC5]">
                    {EDUCATION.map((edu) => (
                      <li key={edu.degree}>
                        <span className="font-medium text-[#F4F5F7]">{edu.degree}</span> —{' '}
                        {edu.institution} ({edu.period})
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-display text-base font-semibold text-[#F4F5F7]">Languages</h4>
                  <p className="mt-2 text-sm text-[#B4BAC5]">{PROFILE.languages.join(', ')}</p>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

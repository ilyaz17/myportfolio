import { Briefcase, GraduationCap } from 'lucide-react';
import { EDUCATION, EXPERIENCE, PROFILE } from '../data/portfolioData';

interface TimelineEntry {
  id: string;
  period: string;
  kind: 'work' | 'education';
  title: string;
  organization: string;
  description: string;
  bullets?: string[];
  active?: boolean;
}

export function ExperienceSection() {
  const timelineEntries: TimelineEntry[] = [
    ...EXPERIENCE.map((exp, idx) => ({
      id: `work-${idx}`,
      period: exp.period,
      kind: 'work' as const,
      title: exp.role,
      organization: `${exp.company} · ${exp.location}`,
      description:
        'Owning end-to-end delivery across high-traffic e-commerce storefronts, enterprise ERPs, ICICI payment integrations, and MySQL/MSSQL + React architectures.',
      bullets: exp.highlights.slice(0, 3),
      active: idx === 0,
    })),
    ...EDUCATION.map((edu, idx) => ({
      id: `edu-${idx}`,
      period: edu.period,
      kind: 'education' as const,
      title: edu.degree,
      organization: `${edu.institution} · ${edu.location}`,
      description:
        idx === 0
          ? 'Undergraduate degree covering software engineering, relational databases, and web application fundamentals.'
          : 'Secondary & higher secondary foundation.',
    })),
  ];

  return (
    <section id="resume" className="scroll-mt-10 py-14 sm:py-16">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#111315] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#14171D] dark:text-[#F3F5F7]">
        <Briefcase className="h-3.5 w-3.5 text-[#00B853] dark:text-[#00E061]" aria-hidden="true" />
        <span>Journey</span>
      </div>

      <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.02em] text-[#111315] dark:text-white sm:text-4xl">
        Experience &amp; Education
      </h2>

      {/* Exact Isak 2-Column Vertical Emerald Timeline */}
      <div className="mt-10 space-y-0">
        {timelineEntries.map((entry, idx) => {
          const isLast = idx === timelineEntries.length - 1;
          const Icon = entry.kind === 'work' ? Briefcase : GraduationCap;

          return (
            <div
              key={entry.id}
              className="grid grid-cols-1 gap-3 pb-10 sm:grid-cols-[148px_28px_1fr] sm:gap-5"
            >
              {/* Left Period Column */}
              <div className="pt-0.5">
                <span className="font-mono text-xs font-medium text-[#646870] tabular-nums dark:text-[#9CA3AF]">
                  {entry.period}
                </span>
              </div>

              {/* Center Vertical Line + Emerald Dot */}
              <div className="relative hidden flex-col items-center sm:flex" aria-hidden="true">
                <span
                  className={`relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full ${
                    entry.active
                      ? 'bg-[#00C853] ring-4 ring-[#00E061]/20'
                      : 'bg-[#00C853]'
                  }`}
                />
                {!isLast && (
                  <span
                    className={`mt-1 w-[2px] flex-1 ${
                      idx === 0
                        ? 'bg-gradient-to-b from-[#00C853] to-black/10 dark:to-white/15'
                        : 'bg-black/10 dark:bg-white/15'
                    }`}
                  />
                )}
              </div>

              {/* Right Content Column */}
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-medium text-[#646870] dark:text-[#9CA3AF]">
                  <Icon
                    className="h-3.5 w-3.5 shrink-0 text-[#00A846] dark:text-[#00E061]"
                    aria-hidden="true"
                  />
                  <span>{entry.organization}</span>
                </div>

                <h3 className="mt-1.5 font-display text-xl font-semibold text-[#111315] dark:text-[#F3F5F7]">
                  {entry.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#5F6570] dark:text-[#A3AAB7]">
                  {entry.description}
                </p>

                {entry.bullets && (
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#4B515C] dark:text-[#B4BAC6]">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00C853]"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quiet Spoken Languages Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-black/[0.08] pt-5 text-sm dark:border-white/[0.08]">
        <span className="font-medium text-[#111315] dark:text-[#F3F5F7]">Languages</span>
        <span className="text-[#5F6570] dark:text-[#A3AAB7]">
          {PROFILE.languages.join(' · ')}
        </span>
      </div>
    </section>
  );
}

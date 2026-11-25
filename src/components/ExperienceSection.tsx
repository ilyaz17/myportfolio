import { EDUCATION, EXPERIENCE, PROFILE } from '../data/portfolioData';

const IMPACT_TITLES = [
  'E-Commerce Checkout Re-Engineering',
  'Core Web Vitals & Load Optimization',
  'Scalable Internal ERP Systems',
  'ICICI Payment Gateway & REST APIs',
  'Full-Stack Schema-to-UI Ownership',
];

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-t border-white/10"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-22">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs font-medium text-[#F2B705]">02. Experience</p>
            <h2
              id="experience-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F7F8FA] sm:text-4xl"
            >
              Work History
            </h2>

            <div className="mt-8 space-y-10">
              {EXPERIENCE.map((item) => (
                <article
                  key={`${item.company}-${item.period}`}
                  className="surface-card rounded-2xl p-6 sm:p-8"
                >
                  <div className="flex flex-col gap-2 border-b border-white/10 pb-6 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-[#F7F8FA]">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[#C8CFDB]">
                        {item.company}
                        <span aria-hidden="true" className="mx-2 text-white/30">
                          ·
                        </span>
                        <span className="text-[#9BA3B2]">{item.location}</span>
                      </p>
                    </div>
                    <p className="font-mono text-xs font-medium text-[#F2B705] tabular-nums whitespace-nowrap shrink-0">
                      {item.period}
                    </p>
                  </div>

                  <ol className="mt-6 divide-y divide-white/8">
                    {item.highlights.map((highlight, idx) => (
                      <li
                        key={highlight}
                        className="grid grid-cols-1 gap-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-12 sm:gap-4"
                      >
                        <div className="flex items-baseline gap-2.5 sm:col-span-5">
                          <span className="font-mono text-xs text-[#F2B705] tabular-nums">
                            0{idx + 1}
                          </span>
                          <span className="font-display text-sm font-semibold text-[#F4F5F7]">
                            {IMPACT_TITLES[idx] ?? `Key Deliverable 0${idx + 1}`}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-[#B4BAC5] sm:col-span-7">
                          {highlight}
                        </p>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-10 lg:col-span-5">
            <div>
              <p className="font-mono text-xs font-medium text-[#9BA3B2]">Education</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[#F7F8FA]">
                Academic Background
              </h3>

              <ol className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {EDUCATION.map((edu, index) => (
                  <li key={edu.degree} className="py-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-mono text-xs text-[#8D96A6] tabular-nums">
                          0{index + 1}
                        </span>
                        <h4 className="font-display text-base font-semibold text-[#F7F8FA]">
                          {edu.degree}
                        </h4>
                      </div>
                      <span className="font-mono text-xs text-[#F2B705] tabular-nums whitespace-nowrap shrink-0">
                        {edu.period}
                      </span>
                    </div>
                    <p className="mt-1.5 pl-6 text-sm text-[#B4BAC5]">
                      {edu.institution}
                      <span aria-hidden="true" className="mx-1.5 text-white/30">
                        ·
                      </span>
                      <span className="text-[#949DAA]">{edu.location}</span>
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="surface-card rounded-2xl p-6 sm:p-7">
              <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3.5">
                <h3 className="font-display text-lg font-semibold text-[#F7F8FA]">
                  Languages
                </h3>
                <span className="font-mono text-xs text-[#949DAA] tabular-nums">
                  {PROFILE.languages.length} Fluent
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#9BA3B2]">
                Fluent written and spoken collaboration across regional and international product teams.
              </p>
              <p className="mt-4 font-display text-base font-medium text-[#F7F8FA]">
                {PROFILE.languages.join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

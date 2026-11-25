import { EDUCATION, EXPERIENCE, PROFILE } from '../data/portfolioData';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-t border-white/10"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-[#9BA3B2]">02. Experience</p>
            <h2
              id="experience-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F4F5F7] sm:text-4xl"
            >
              Work History
            </h2>

            <div className="mt-10 space-y-10">
              {EXPERIENCE.map((item) => (
                <article
                  key={`${item.company}-${item.period}`}
                  className="border-t border-white/10 pt-8"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-[#F4F5F7]">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[#C5CBD6]">
                        {item.company}
                        <span aria-hidden="true" className="mx-2 text-white/30">
                          ·
                        </span>
                        <span className="text-[#9BA3B2]">{item.location}</span>
                      </p>
                    </div>
                    <p className="font-mono text-xs text-[#F2B705] tabular-nums whitespace-nowrap shrink-0">
                      {item.period}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#B4BAC5]">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3.5">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-[#F2B705]"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-12 lg:col-span-5">
            <div>
              <p className="text-sm font-medium text-[#9BA3B2]">Education</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[#F4F5F7]">
                Academic Background
              </h3>

              <ol className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {EDUCATION.map((edu) => (
                  <li key={edu.degree} className="py-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="font-display text-base font-semibold text-[#F4F5F7]">
                        {edu.degree}
                      </h4>
                      <span className="font-mono text-xs text-[#9BA3B2] tabular-nums whitespace-nowrap shrink-0">
                        {edu.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#B4BAC5]">
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

            <div className="rounded-2xl border border-white/10 bg-[#111317] p-6">
              <h3 className="font-display text-lg font-semibold text-[#F4F5F7]">
                Languages
              </h3>
              <p className="mt-2 text-sm text-[#9BA3B2]">
                Fluent written and spoken collaboration across regional and international teams.
              </p>
              <p className="mt-4 text-base font-medium text-[#F4F5F7]">
                {PROFILE.languages.join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

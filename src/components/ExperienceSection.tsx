import { Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { EDUCATION, EXPERIENCE, PROFILE } from '../data/portfolioData';
import { SectionHeading } from './SectionHeading';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function ExperienceSection() {
  const primaryRole = EXPERIENCE[0];

  const experienceTimeline = [
    {
      title: primaryRole.role,
      period: primaryRole.period,
      organization: `${primaryRole.company}, ${primaryRole.location}`,
      points: primaryRole.highlights.slice(0, 2),
    },
    {
      title: 'Enterprise ERP & ICICI Payment APIs',
      period: 'Core Delivery',
      organization: primaryRole.company,
      points: primaryRole.highlights.slice(2, 4),
    },
    {
      title: 'End-to-End Schema-to-UI Architecture',
      period: 'Full-Stack Ownership',
      organization: 'MySQL · MS SQL Server · React · Laravel',
      points: primaryRole.highlights.slice(4),
    },
  ];

  return (
    <section
      id="resume"
      aria-labelledby="resume-heading"
      className="scroll-mt-18 border-t border-white/6 bg-[#070D1B] py-20 sm:py-24 overflow-x-clip"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading id="resume-heading" title="RESUME" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
          {/* Left column — Devis vertical timeline for Experience */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="mb-9 flex items-center gap-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#232935] bg-[#101624] text-[#FEC544]">
                <Briefcase className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-3xl font-semibold text-[#FDFEFF]">
                Experience
              </h3>
            </motion.div>

            <ol className="relative ml-3 border-l border-[#232935] pl-8 sm:pl-10 space-y-10">
              {experienceTimeline.map((entry, idx) => (
                <motion.li
                  key={entry.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.48, delay: idx * 0.09, ease: EASE_OUT }}
                  className="group relative"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-[39px] sm:-left-[47px] h-3.5 w-3.5 rounded-full border-2 border-[#3F4551] bg-[#070D1B] transition-colors duration-200 group-hover:border-[#FEC544] group-hover:bg-[#FEC544]"
                  />

                  <h4 className="font-display text-xl font-semibold text-[#FEC544]">
                    {entry.title}
                  </h4>
                  <p className="mt-1.5 font-mono text-xs text-[#A9ADB8] tabular-nums">
                    {entry.period}
                  </p>
                  <p className="mt-3 font-display text-base font-medium text-[#FDFEFF]">
                    {entry.organization}
                  </p>
                  <ul className="mt-2.5 space-y-2 text-sm leading-relaxed text-[#A9ADB8]">
                    {entry.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Right column — Devis vertical timeline for Education + Languages */}
          <div className="flex flex-col justify-between gap-10">
            <div>
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="mb-9 flex items-center gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#232935] bg-[#101624] text-[#FEC544]">
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-3xl font-semibold text-[#FDFEFF]">
                  Education
                </h3>
              </motion.div>

              <ol className="relative ml-3 border-l border-[#232935] pl-8 sm:pl-10 space-y-10">
                {EDUCATION.map((edu, idx) => (
                  <motion.li
                    key={edu.degree}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 'some' }}
                    transition={{ duration: 0.48, delay: idx * 0.09, ease: EASE_OUT }}
                    className="group relative"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-1.5 -left-[39px] sm:-left-[47px] h-3.5 w-3.5 rounded-full border-2 border-[#3F4551] bg-[#070D1B] transition-colors duration-200 group-hover:border-[#FEC544] group-hover:bg-[#FEC544]"
                    />

                    <h4 className="font-display text-xl font-semibold text-[#FEC544]">
                      {edu.degree}
                    </h4>
                    <p className="mt-1.5 font-mono text-xs text-[#A9ADB8] tabular-nums">
                      {edu.period}
                    </p>
                    <p className="mt-3 font-display text-base font-medium text-[#FDFEFF]">
                      {edu.institution}
                    </p>
                    <p className="mt-1.5 text-sm text-[#A9ADB8]">{edu.location}</p>
                  </motion.li>
                ))}
              </ol>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.48, delay: 0.16, ease: EASE_OUT }}
              className="devis-card rounded-xl p-6"
            >
              <div className="flex items-baseline justify-between gap-4 border-b border-[#232935] pb-3.5">
                <h4 className="font-display text-lg font-semibold text-[#FDFEFF]">
                  Languages
                </h4>
                <span className="font-mono text-xs text-[#FEC544] tabular-nums">
                  {PROFILE.languages.length} Fluent
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#A9ADB8]">
                Direct stakeholder collaboration and technical communication across regional and
                international teams.
              </p>
              <p className="mt-3.5 font-display text-base font-medium text-[#FDFEFF]">
                {PROFILE.languages.join(' · ')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

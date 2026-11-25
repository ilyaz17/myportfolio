import { ArrowDownToLine, FileText } from 'lucide-react';
import {
  HERO_HIGHLIGHTS,
  PROFILE,
  RESUME_DOWNLOAD_FILENAME,
  RESUME_PDF_URL,
} from '../data/portfolioData';
import { SectionHeading } from './SectionHeading';

interface AboutSectionProps {
  onOpenResume: () => void;
}

const ABOUT_DETAILS = [
  { label: 'Experience', value: '5+ Years (Feb 2021 – Present)' },
  { label: 'Phone', value: PROFILE.phone, href: PROFILE.phoneHref },
  { label: 'Email', value: PROFILE.email, href: PROFILE.emailHref },
  { label: 'From', value: `${PROFILE.location} (Pollachi / Coimbatore)` },
  { label: 'Language', value: PROFILE.languages.join(', ') },
  { label: 'GitHub', value: PROFILE.githubHandle, href: PROFILE.githubUrl, external: true },
];

export function AboutSection({ onOpenResume }: AboutSectionProps) {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-18 bg-[#0A101E] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading id="about-heading" title="ABOUT ME" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left column — Dark Editorial Highlights Profile Card */}
          <div className="lg:col-span-5">
            <div className="devis-card rounded-2xl p-6 sm:p-8">
              <p className="font-mono text-xs text-[#FEC544]">Engineering Profile</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-[#FDFEFF]">
                End-to-End Delivery Across Laravel &amp; MERN
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#A9ADB8]">
                Focused on measurable business outcomes — faster page load times, higher checkout
                conversion, reliable ICICI payment integrations, and resilient relational schemas.
              </p>

              <dl className="mt-7 grid grid-cols-2 gap-5 border-t border-white/10 pt-6">
                {HERO_HIGHLIGHTS.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <dd className="font-display text-2xl font-bold text-[#FEC544] tabular-nums">
                      {item.value}
                    </dd>
                    <dt className="text-xs font-medium text-[#FDFEFF]">{item.label}</dt>
                    <dd className="text-xs leading-relaxed text-[#8E95A5]">{item.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right column — Devis About bio + structured key-value details + Download CV */}
          <div className="lg:col-span-7">
            <h3 className="font-display text-3xl font-semibold text-[#FDFEFF] sm:text-4xl">
              Hi There! I&apos;m {PROFILE.name}
            </h3>
            <p className="mt-2 font-display text-xl font-normal text-[#FEC544]">
              {PROFILE.role}
            </p>

            <p className="mt-5 text-[15px] leading-[1.75] text-[#A9ADB8]">
              {PROFILE.summary}
            </p>

            <dl className="mt-7 space-y-3 text-sm">
              {ABOUT_DETAILS.map((item) => (
                <div key={item.label} className="grid grid-cols-12 items-baseline gap-2">
                  <dt className="col-span-4 font-medium text-[#FDFEFF] sm:col-span-3">
                    {item.label}
                  </dt>
                  <dd className="col-span-8 text-[#A9ADB8] sm:col-span-9">
                    <span aria-hidden="true" className="mr-3 text-[#6E7585]">
                      :
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className="transition-colors hover:text-[#FEC544]"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={RESUME_PDF_URL}
                download={RESUME_DOWNLOAD_FILENAME}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#FEC544] px-8 py-3 text-sm font-semibold text-[#070D1B] transition-colors duration-150 hover:bg-[#FFD369] whitespace-nowrap"
              >
                <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
                <span>Download CV</span>
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#232935] bg-[#101624] px-6 py-3 text-sm font-medium text-[#FDFEFF] transition-colors hover:border-[#FEC544]/50 hover:text-[#FEC544] whitespace-nowrap cursor-pointer"
              >
                <FileText className="h-4 w-4 text-[#FEC544]" aria-hidden="true" />
                <span>View Full Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

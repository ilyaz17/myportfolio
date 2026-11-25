import { Sparkles } from 'lucide-react';
import { CORE_HIGHLIGHTS, PROFILE } from '../data/portfolioData';

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-10 py-14 sm:py-16">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#111315] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#14171D] dark:text-[#F3F5F7]">
        <Sparkles className="h-3.5 w-3.5 text-[#00B853] dark:text-[#00E061]" aria-hidden="true" />
        <span>About</span>
      </div>

      <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.18] tracking-[-0.02em] text-[#111315] dark:text-white sm:text-4xl">
        Building reliable Laravel &amp; MERN systems with AI-accelerated craft.
      </h2>

      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#5F6570] dark:text-[#A3AAB7]">
        {PROFILE.conciseAbout}
      </p>

      {/* Clean Minimalist Highlight Rows (Isak editorial list aesthetic, 100% real impact) */}
      <div className="mt-9 divide-y divide-black/[0.08] border-y border-black/[0.08] dark:divide-white/[0.08] dark:border-white/[0.08]">
        {CORE_HIGHLIGHTS.map((item) => (
          <div
            key={item.title}
            className="group flex flex-col justify-between gap-1.5 py-4 transition-colors sm:flex-row sm:items-center sm:gap-6"
          >
            <div className="min-w-0">
              <p className="font-display text-[17px] font-medium text-[#111315] transition-colors group-hover:text-[#009944] dark:text-[#F3F5F7] dark:group-hover:text-[#00E061]">
                {item.title}
              </p>
              <p className="mt-0.5 text-sm text-[#686E79] dark:text-[#9CA3AF]">
                {item.detail}
              </p>
            </div>
            <span className="shrink-0 font-mono text-xs text-[#686E79] dark:text-[#9CA3AF]">
              {item.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

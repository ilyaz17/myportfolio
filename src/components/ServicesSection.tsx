import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Layers, Minus, Plus } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

export function ServicesSection() {
  const [openId, setOpenId] = useState<string>(SERVICES[0].id);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="services" className="scroll-mt-10 py-14 sm:py-16">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#111315] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#14171D] dark:text-[#F3F5F7]">
        <Layers className="h-3.5 w-3.5 text-[#00B853] dark:text-[#00E061]" aria-hidden="true" />
        <span>Services</span>
      </div>

      <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.02em] text-[#111315] dark:text-white sm:text-4xl">
        How I help teams ship faster
      </h2>

      {/* Exact Isak Expandable Editorial Accordion */}
      <div className="mt-8 divide-y divide-black/[0.08] border-y border-black/[0.08] dark:divide-white/[0.08] dark:border-white/[0.08]">
        {SERVICES.map((service) => {
          const isOpen = openId === service.id;
          const panelId = `service-panel-${service.id}`;

          return (
            <div key={service.id} className="py-5 sm:py-6">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(service.id)}
                className="flex w-full items-center justify-between gap-4 text-left cursor-pointer"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`font-display text-2xl font-medium tracking-tight transition-colors sm:text-[28px] ${
                      isOpen
                        ? 'text-[#111315] dark:text-white'
                        : 'text-[#2D323A] hover:text-[#111315] dark:text-[#D0D5DE] dark:hover:text-white'
                    }`}
                  >
                    {service.title}
                  </span>
                  {service.featured && (
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[#00A846] dark:text-[#00E061]">
                      Core Edge
                    </span>
                  )}
                </div>

                <span
                  aria-hidden="true"
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    isOpen
                      ? 'border-[#111315] bg-[#111315] text-[#00E061] dark:border-[#00E061] dark:bg-[#00E061] dark:text-[#0B0D10]'
                      : 'border-black/[0.1] bg-white text-[#111315] hover:border-black/30 dark:border-white/15 dark:bg-[#14171D] dark:text-[#F3F5F7]'
                  }`}
                >
                  {isOpen ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 sm:pt-5">
                      <p className="font-mono text-xs leading-relaxed text-[#009944] dark:text-[#00E061]">
                        {service.tags.join(' · ')}
                      </p>
                      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#5F6570] dark:text-[#A3AAB7]">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

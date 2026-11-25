import { useState } from 'react';
import { ArrowDownToLine, ArrowUpRight, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import {
  ARCHITECTURE_LAYERS,
  HERO_HIGHLIGHTS,
  PROFILE,
  RESUME_DOWNLOAD_FILENAME,
  RESUME_PDF_URL,
} from '../data/portfolioData';

interface HeroSectionProps {
  onOpenResume: () => void;
}

const MARQUEE_ITEMS = [
  'Laravel & PHP',
  'MERN Stack',
  'REST API Design',
  'ICICI Payment Gateways',
  'MySQL & MS SQL Server',
  'AWS S3 & RDS',
  'Core Web Vitals',
  'Enterprise ERP Systems',
  'Epson ePOS SDK',
  'Claude Code & MCP',
];

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const [activeLayerId, setActiveLayerId] = useState(ARCHITECTURE_LAYERS[0].id);
  const activeLayerIndex = Math.max(
    0,
    ARCHITECTURE_LAYERS.findIndex((layer) => layer.id === activeLayerId)
  );
  const activeLayer = ARCHITECTURE_LAYERS[activeLayerIndex] ?? ARCHITECTURE_LAYERS[0];

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Subtle architectural ambient lighting & hairline grid */}
      <div
        aria-hidden="true"
        className="arch-grid-backdrop pointer-events-none absolute inset-x-0 top-0 h-[560px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-1/4 h-[420px] w-[620px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(242,183,5,0.09)_0%,rgba(242,183,5,0.02)_45%,transparent_72%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-10 pb-12 sm:pt-14 sm:pb-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <p className="text-sm font-medium text-[#A1A9B8]">
                <span className="text-[#F4F5F7]">{PROFILE.role}</span>
                <span aria-hidden="true" className="mx-2.5 text-white/30">
                  ·
                </span>
                <span>{PROFILE.location}</span>
              </p>

              <h1 className="mt-4 font-display text-[clamp(2.35rem,4.2vw,3.65rem)] font-semibold leading-[1.06] tracking-tight text-[#F7F8FA]">
                Engineering scalable Laravel &amp; MERN systems{' '}
                <span className="text-[#F2B705]">end-to-end.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-[15px] leading-[1.7] text-[#B8C0CC]">
                {PROFILE.summary}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex min-h-[44px] items-center gap-2.5 rounded-lg bg-[#F2B705] px-6 py-3 text-sm font-semibold text-[#08090B] shadow-[0_10px_30px_-12px_rgba(242,183,5,0.55)] transition-all duration-150 hover:bg-[#FFD043] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>Preview Resume</span>
              </button>

              <a
                href={RESUME_PDF_URL}
                download={RESUME_DOWNLOAD_FILENAME}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/14 bg-[#12151C] px-5 py-3 text-sm font-medium text-[#F4F5F7] transition-colors duration-150 hover:border-white/30 hover:bg-[#191D26] whitespace-nowrap shrink-0"
              >
                <ArrowDownToLine className="h-4 w-4 text-[#F2B705]" aria-hidden="true" />
                <span>Download PDF</span>
              </a>

              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 px-2 text-sm font-medium text-[#C5CBD6] transition-colors hover:text-[#F2B705] whitespace-nowrap shrink-0"
              >
                <span>{PROFILE.githubHandle}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <aside
            aria-label="Full-Stack Architecture Overview"
            className="surface-card flex flex-col justify-between overflow-hidden rounded-2xl p-6 sm:p-7 lg:col-span-5 lg:h-full"
          >
            <div>
              <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h2 className="font-display text-lg font-semibold text-[#F7F8FA]">
                    Full-Stack Blueprint
                  </h2>
                  <p className="mt-0.5 text-xs text-[#949DAA]">
                    Select a layer to inspect production tools
                  </p>
                </div>
                <span className="font-mono text-xs text-[#F2B705] tabular-nums">
                  0{activeLayerIndex + 1} / 0{ARCHITECTURE_LAYERS.length}
                </span>
              </div>

              {/* Visual 4-step architectural signal bar */}
              <div
                aria-hidden="true"
                className="mt-4 grid grid-cols-4 gap-1.5"
              >
                {ARCHITECTURE_LAYERS.map((layer, idx) => (
                  <div
                    key={layer.id}
                    className={`h-1 rounded-full transition-colors duration-200 ${
                      idx <= activeLayerIndex ? 'bg-[#F2B705]' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>

              <div
                role="tablist"
                aria-label="Engineering stack layers"
                className="mt-4 flex flex-col gap-1"
              >
                {ARCHITECTURE_LAYERS.map((layer) => {
                  const isSelected = layer.id === activeLayer.id;
                  return (
                    <button
                      key={layer.id}
                      type="button"
                      role="tab"
                      id={`arch-tab-${layer.id}`}
                      aria-selected={isSelected}
                      aria-controls="arch-layer-panel"
                      onClick={() => setActiveLayerId(layer.id)}
                      className={`relative flex min-h-[42px] w-full items-center justify-between gap-4 rounded-lg px-3 py-2 text-left transition-colors duration-150 cursor-pointer ${
                        isSelected
                          ? 'text-[#F7F8FA]'
                          : 'text-[#A8B0BD] hover:bg-white/[0.03] hover:text-[#F4F5F7]'
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="active-arch-layer"
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 rounded-lg border border-[#F2B705]/35 bg-[#F2B705]/[0.08]"
                        />
                      )}
                      <span
                        className={`relative z-10 text-sm font-medium ${
                          isSelected ? 'text-[#F2B705]' : ''
                        }`}
                      >
                        {layer.label}
                      </span>
                      <span className="relative z-10 font-mono text-xs text-[#8D96A6] tabular-nums whitespace-nowrap shrink-0">
                        {layer.technologies.length} tools
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              id="arch-layer-panel"
              role="tabpanel"
              aria-labelledby={`arch-tab-${activeLayer.id}`}
              className="mt-5 border-t border-white/10 pt-4"
            >
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0.35, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-xs font-medium text-[#9BA3B2]">Focus Area</p>
                <p className="mt-1 text-sm leading-relaxed text-[#F4F5F7]">
                  {activeLayer.role}
                </p>

                <p className="mt-3.5 text-xs font-medium text-[#9BA3B2]">Core Stack</p>
                <p className="mt-1 font-mono text-xs leading-relaxed text-[#F2B705]">
                  {activeLayer.technologies.join(' · ')}
                </p>

                <p className="mt-3.5 text-xs font-medium text-[#9BA3B2]">Production Usage</p>
                <p className="mt-1 text-sm text-[#B4BAC5]">{activeLayer.appliedIn}</p>
              </motion.div>
            </div>
          </aside>
        </div>

        <dl className="mt-10 grid grid-cols-1 gap-6 border-y border-white/10 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {HERO_HIGHLIGHTS.map((item) => (
            <div key={item.label} className="space-y-1">
              <dt className="text-xs font-medium text-[#9BA3B2]">{item.label}</dt>
              <dd className="font-display text-2xl font-semibold tracking-tight text-[#F7F8FA] tabular-nums">
                {item.value}
              </dd>
              <dd className="text-xs leading-relaxed text-[#949DAA]">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Editorial engineering ribbon divider */}
      <div
        aria-hidden="true"
        className="overflow-hidden border-b border-white/10 bg-[#0B0D11]/80 py-3"
      >
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {MARQUEE_ITEMS.map((item) => (
                <span
                  key={`${dup}-${item}`}
                  className="inline-flex items-center text-xs font-medium tracking-wide text-[#8E97A6] whitespace-nowrap"
                >
                  <span className="px-4">{item}</span>
                  <span className="text-[#F2B705]/60">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

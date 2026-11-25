import { useState } from 'react';
import { ArrowDownToLine, ArrowUpRight, FileText } from 'lucide-react';
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

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const [activeLayerId, setActiveLayerId] = useState(ARCHITECTURE_LAYERS[0].id);
  const activeLayer =
    ARCHITECTURE_LAYERS.find((layer) => layer.id === activeLayerId) ??
    ARCHITECTURE_LAYERS[0];

  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pt-10 pb-14 sm:pt-14 sm:pb-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <p className="text-sm font-medium text-[#9BA3B2]">
              <span>{PROFILE.role}</span>
              <span aria-hidden="true" className="mx-2 text-white/30">
                ·
              </span>
              <span>{PROFILE.location}</span>
            </p>

            <h1 className="mt-4 font-display text-[clamp(2.25rem,4vw,3.45rem)] font-semibold leading-[1.08] tracking-tight text-[#F4F5F7]">
              {PROFILE.headline}
            </h1>

            <p className="mt-5 max-w-2xl text-[15px] leading-[1.68] text-[#B4BAC5]">
              {PROFILE.summary}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex min-h-[44px] items-center gap-2.5 rounded-lg bg-[#F2B705] px-6 py-3 text-sm font-semibold text-[#08090B] transition-colors duration-150 hover:bg-[#FFD043] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>Preview Resume</span>
            </button>

            <a
              href={RESUME_PDF_URL}
              download={RESUME_DOWNLOAD_FILENAME}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/15 bg-[#111317] px-5 py-3 text-sm font-medium text-[#F4F5F7] transition-colors duration-150 hover:border-white/30 hover:bg-[#171A21] whitespace-nowrap shrink-0"
            >
              <ArrowDownToLine className="h-4 w-4 text-[#F2B705]" aria-hidden="true" />
              <span>Download PDF</span>
            </a>

            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-[#C5CBD6] transition-colors hover:text-[#F2B705] whitespace-nowrap shrink-0"
            >
              <span>{PROFILE.githubHandle}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside
          aria-label="Full-Stack Architecture Overview"
          className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111317] p-6 sm:p-8 lg:col-span-5 lg:h-full"
        >
          <div>
            <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
              <h2 className="font-display text-lg font-semibold text-[#F4F5F7]">
                Full-Stack Architecture
              </h2>
              <span className="font-mono text-xs text-[#9BA3B2] tabular-nums">
                4 Layers
              </span>
            </div>

            <div
              role="tablist"
              aria-label="Engineering stack layers"
              className="mt-5 flex flex-col divide-y divide-white/8"
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
                    className={`flex min-h-[44px] w-full items-center justify-between gap-4 py-3 text-left transition-colors duration-150 cursor-pointer ${
                      isSelected
                        ? 'text-[#F2B705]'
                        : 'text-[#C5CBD6] hover:text-[#F4F5F7]'
                    }`}
                  >
                    <span className="text-sm font-medium">{layer.label}</span>
                    <span className="font-mono text-xs text-[#8D96A6] tabular-nums whitespace-nowrap shrink-0">
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
            className="mt-6 border-t border-white/10 pt-5"
          >
            <p className="text-xs font-medium text-[#9BA3B2]">Focus Area</p>
            <p className="mt-1.5 text-sm leading-relaxed text-[#F4F5F7]">
              {activeLayer.role}
            </p>

            <p className="mt-4 text-xs font-medium text-[#9BA3B2]">Core Stack</p>
            <p className="mt-1.5 text-sm leading-relaxed text-[#D8DDE6]">
              {activeLayer.technologies.join(' · ')}
            </p>

            <p className="mt-4 text-xs font-medium text-[#9BA3B2]">Production Usage</p>
            <p className="mt-1 text-sm text-[#B4BAC5]">{activeLayer.appliedIn}</p>
          </div>
        </aside>
      </div>

      <dl className="mt-10 grid grid-cols-1 gap-6 border-y border-white/10 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {HERO_HIGHLIGHTS.map((item) => (
          <div key={item.label} className="space-y-1.5">
            <dt className="text-xs font-medium text-[#9BA3B2]">{item.label}</dt>
            <dd className="font-display text-2xl font-semibold tracking-tight text-[#F4F5F7] tabular-nums">
              {item.value}
            </dd>
            <dd className="text-xs leading-relaxed text-[#949DAA]">{item.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

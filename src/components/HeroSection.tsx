import { useState } from 'react';
import { ArrowDownToLine, FileText, Github, Mail, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import {
  ARCHITECTURE_LAYERS,
  PROFILE,
  RESUME_DOWNLOAD_FILENAME,
  RESUME_PDF_URL,
} from '../data/portfolioData';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const [activeLayerId, setActiveLayerId] = useState(ARCHITECTURE_LAYERS[0].id);
  const activeLayerIndex = Math.max(
    0,
    ARCHITECTURE_LAYERS.findIndex((layer) => layer.id === activeLayerId)
  );
  const activeLayer = ARCHITECTURE_LAYERS[activeLayerIndex] ?? ARCHITECTURE_LAYERS[0];

  return (
    <section
      id="home"
      className="relative scroll-mt-18 overflow-hidden bg-[#080E1E] border-b border-white/8"
    >
      <div className="devis-hero-stars pointer-events-none absolute inset-0 opacity-75" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] bg-gradient-to-b from-[#0D1426] via-[#0B1222] to-[#070D1B] border-l border-white/8 lg:block"
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-12 lg:py-20">
        {/* Left Hero Column — Exact Devis typographic rhythm */}
        <div className="lg:col-span-6 lg:pr-8">
          <p className="font-display text-2xl font-normal text-[#FEC544] sm:text-[28px]">
            Hello, I’m
          </p>

          <h1 className="mt-3 font-display text-[clamp(3.15rem,6.4vw,5.4rem)] font-bold leading-[1.02] tracking-tight text-[#FDFEFF]">
            Mohammed{' '}
            <br />
            Ilyas
          </h1>

          <p className="mt-5 font-display text-2xl font-light text-[#A9ADB8] sm:text-[32px]">
            Full Stack Developer
          </p>

          <p className="mt-3 text-sm text-[#8E95A5]">
            Laravel &amp; PHP · MERN Stack · Coimbatore, India
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#FEC544] px-9 py-3 text-sm font-semibold text-[#070D1B] transition-colors duration-150 hover:bg-[#FFD369] whitespace-nowrap shrink-0"
            >
              Hire Me
            </a>

            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/15 bg-[#101624] px-7 py-3 text-sm font-medium text-[#FDFEFF] transition-colors duration-150 hover:border-[#FEC544]/50 hover:text-[#FEC544] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileText className="h-4 w-4 text-[#FEC544]" aria-hidden="true" />
              <span>Preview Resume</span>
            </button>
          </div>
        </div>

        {/* Right Hero Column — Dark Architectural Studio Panel + Devis Social Bar */}
        <div className="flex flex-col gap-6 lg:col-span-6 lg:pl-8">
          <aside
            aria-label="Full-Stack Architecture Overview"
            className="devis-card rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="font-display text-xl font-semibold text-[#FDFEFF]">
                  Full-Stack Blueprint
                </h2>
                <p className="mt-0.5 text-xs text-[#8E95A5]">
                  5+ years owning systems from schema to interface
                </p>
              </div>
              <span className="font-mono text-xs text-[#FEC544] tabular-nums">
                0{activeLayerIndex + 1} / 0{ARCHITECTURE_LAYERS.length}
              </span>
            </div>

            <div
              aria-hidden="true"
              className="mt-4 grid grid-cols-4 gap-1.5"
            >
              {ARCHITECTURE_LAYERS.map((layer, idx) => (
                <div
                  key={layer.id}
                  className={`h-1 rounded-full transition-colors duration-200 ${
                    idx <= activeLayerIndex ? 'bg-[#FEC544]' : 'bg-white/10'
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
                        ? 'text-[#FDFEFF]'
                        : 'text-[#A9ADB8] hover:bg-white/[0.03] hover:text-[#FDFEFF]'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="active-arch-layer"
                        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 rounded-lg border border-[#FEC544]/40 bg-[#FEC544]/[0.09]"
                      />
                    )}
                    <span
                      className={`relative z-10 text-sm font-medium ${
                        isSelected ? 'text-[#FEC544]' : ''
                      }`}
                    >
                      {layer.label}
                    </span>
                    <span className="relative z-10 font-mono text-xs text-[#8E95A5] tabular-nums whitespace-nowrap shrink-0">
                      {layer.technologies.length} tools
                    </span>
                  </button>
                );
              })}
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
                <p className="text-xs font-medium text-[#8E95A5]">Focus Area</p>
                <p className="mt-1 text-sm leading-relaxed text-[#FDFEFF]">
                  {activeLayer.role}
                </p>

                <p className="mt-3.5 text-xs font-medium text-[#8E95A5]">Core Stack</p>
                <p className="mt-1 font-mono text-xs leading-relaxed text-[#FEC544]">
                  {activeLayer.technologies.join(' · ')}
                </p>

                <p className="mt-3.5 text-xs font-medium text-[#8E95A5]">Production Usage</p>
                <p className="mt-1 text-sm text-[#A9ADB8]">{activeLayer.appliedIn}</p>
              </motion.div>
            </div>
          </aside>

          {/* Signature Devis Social Connect Strip */}
          <div className="flex flex-wrap items-center gap-3 rounded-full border border-[#232935] bg-[#101624] px-4 py-2.5 self-start">
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[36px] items-center gap-2 rounded-full border border-[#232935] bg-[#0A101E] px-3.5 py-1.5 text-xs font-medium text-[#FDFEFF] transition-colors hover:border-[#FEC544] hover:text-[#FEC544]"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              <span>GitHub</span>
            </a>

            <a
              href={PROFILE.emailHref}
              className="inline-flex min-h-[36px] items-center gap-2 rounded-full border border-[#232935] bg-[#0A101E] px-3.5 py-1.5 text-xs font-medium text-[#D6DAE2] transition-colors hover:border-[#FEC544] hover:text-[#FEC544]"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Email</span>
            </a>

            <a
              href={PROFILE.phoneHref}
              className="inline-flex min-h-[36px] items-center gap-2 rounded-full border border-[#232935] bg-[#0A101E] px-3.5 py-1.5 text-xs font-medium text-[#D6DAE2] transition-colors hover:border-[#FEC544] hover:text-[#FEC544]"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Call</span>
            </a>

            <a
              href={RESUME_PDF_URL}
              download={RESUME_DOWNLOAD_FILENAME}
              className="inline-flex min-h-[36px] items-center gap-2 rounded-full border border-[#232935] bg-[#0A101E] px-3.5 py-1.5 text-xs font-medium text-[#D6DAE2] transition-colors hover:border-[#FEC544] hover:text-[#FEC544]"
            >
              <ArrowDownToLine className="h-3.5 w-3.5" aria-hidden="true" />
              <span>CV PDF</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Eye, FileDown, Github, Mail, Phone } from 'lucide-react';
import { PROFILE, RESUME_DOWNLOAD_FILENAME, RESUME_PDF_URL } from '../data/portfolioData';

interface ProfileSidebarProps {
  onOpenResume: () => void;
}

const TYPING_WORDS = ['Ilyas', 'Full-Stack Dev', 'AI-First Dev'];

export function ProfileSidebar({ onOpenResume }: ProfileSidebarProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charCount, setCharCount] = useState(TYPING_WORDS[0].length);
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const currentWord = TYPING_WORDS[wordIndex];
    let delay = isDeleting ? 55 : 95;

    if (!isDeleting && charCount === currentWord.length) {
      delay = 1900;
    } else if (isDeleting && charCount === 0) {
      delay = 280;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting && charCount === currentWord.length) {
        setIsDeleting(true);
      } else if (isDeleting && charCount === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
      } else {
        setCharCount((prev) => prev + (isDeleting ? -1 : 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charCount, isDeleting, wordIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const nodes = Array.from({ length: 24 }, (_, idx) => ({
      x: ((idx * 73) % 100) / 100,
      y: ((idx * 41 + 17) % 100) / 100,
      vx: (((idx % 5) - 2) * 0.00018) || 0.00014,
      vy: ((((idx + 2) % 5) - 2) * 0.00016) || -0.00012,
      r: idx % 4 === 0 ? 2 : 1.25,
      accent: idx % 3 === 0,
    }));

    const draw = () => {
      const w = canvas.clientWidth || 380;
      const h = canvas.clientHeight || 640;
      ctx.clearRect(0, 0, w, h);

      for (const node of nodes) {
        if (!prefersReduced) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0.05 || node.x > 0.95) node.vx *= -1;
          if (node.y < 0.05 || node.y > 0.85) node.vy *= -1;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = (nodes[i].x - nodes[j].x) * w;
          const dy = (nodes[i].y - nodes[j].y) * h;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x * w, nodes[i].y * h);
            ctx.lineTo(nodes[j].x * w, nodes[j].y * h);
            ctx.strokeStyle = `rgba(0, 224, 97, ${(1 - dist / 110) * 0.16})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x * w, node.y * h, node.r, 0, Math.PI * 2);
        ctx.fillStyle = node.accent ? 'rgba(0, 224, 97, 0.72)' : 'rgba(255, 255, 255, 0.34)';
        ctx.fill();
      }

      if (!prefersReduced) {
        rafId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const displayedWord = TYPING_WORDS[wordIndex].slice(0, charCount);

  return (
    <aside
      aria-label="Profile card"
      className="w-full lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-[390px] xl:w-[425px] shrink-0"
    >
      <div className="h-full rounded-[32px] border border-black/[0.08] bg-white p-2.5 shadow-[0_14px_44px_rgba(15,18,22,0.07)] dark:border-white/[0.09] dark:bg-[#15181E] dark:shadow-[0_18px_48px_rgba(0,0,0,0.45)]">
        <div className="relative flex h-full min-h-[520px] flex-col justify-between overflow-hidden rounded-[24px] bg-[#0D1014] text-white">
          {/* Atmospheric dark studio depth & interactive mesh */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 studio-grid-dark opacity-70"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 48% 28%, rgba(255,255,255,0.11) 0%, rgba(0,224,97,0.12) 28%, rgba(13,16,20,0.92) 72%)',
            }}
          />
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          />

          {/* Sculptural studio monogram centerpiece */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[11%] flex flex-col items-center justify-center select-none sm:top-[18%] lg:top-[20%]"
          >
            <div className="relative flex h-36 w-36 items-center justify-center sm:h-48 sm:w-48 lg:h-52 lg:w-52">
              <div className="absolute inset-0 rounded-full border border-white/[0.08]" />
              <div className="absolute inset-4 rounded-full border border-[#00E061]/25 sm:inset-5" />
              <div className="absolute inset-9 rounded-full bg-gradient-to-b from-white/[0.1] to-transparent backdrop-blur-[2px] sm:inset-12" />
              <span className="relative font-display text-[56px] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/85 to-white/25 sm:text-[72px] lg:text-[76px]">
                MI
              </span>
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.26em] text-white/55 sm:text-[11px]">
              Laravel · MERN · AI-First
            </p>
          </div>

          {/* Left edge vertical Open to Work tab (matching Isak silhouette, static dot) */}
          <div
            aria-label="Open to full-stack opportunities"
            className="absolute left-0 top-[30%] z-20 -translate-y-1/2 rounded-r-2xl bg-white py-3 pl-2 pr-2.5 text-[#111315] shadow-md dark:bg-[#1B1F27] dark:text-[#F3F5F7] lg:top-1/2 lg:py-3.5"
          >
            <div className="flex flex-col items-center gap-2">
              <span
                className="text-[11px] font-semibold tracking-wide whitespace-nowrap"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                Open to Work
              </span>
              <span className="h-2 w-2 rounded-full bg-[#00C853]" aria-hidden="true" />
            </div>
          </div>

          {/* Top Bar: Monogram left + Circular white social buttons right */}
          <div className="relative z-10 flex items-start justify-between p-5 sm:p-6">
            <a
              href="#home"
              aria-label="Mohammed Ilyas home"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#111315] font-display text-sm font-bold tracking-tight shadow-sm transition-transform hover:scale-105"
            >
              MI
            </a>

            <div className="flex flex-col gap-2.5">
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111315] shadow-md transition-all hover:scale-105 hover:bg-[#00E061]"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={PROFILE.emailHref}
                aria-label="Send email to Mohammed Ilyas"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111315] shadow-md transition-all hover:scale-105 hover:bg-[#00E061]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={PROFILE.phoneHref}
                aria-label="Call Mohammed Ilyas"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111315] shadow-md transition-all hover:scale-105 hover:bg-[#00E061]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Bottom Anchor: Typing Intro + Bio + Emerald Pill Actions */}
          <div className="relative z-10 mt-auto bg-gradient-to-t from-[#090B0E] via-[#090B0E]/95 to-transparent px-6 pb-6 pt-16 sm:px-7 sm:pb-7">
            <h2 className="font-display text-[28px] font-semibold leading-tight tracking-tight text-white sm:text-[31px]">
              Hey, I’m{' '}
              <span className="text-white">{displayedWord}</span>
              <span
                aria-hidden="true"
                className="animate-caret ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[2px] bg-[#00E061]"
              />
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#B2B7C2]">
              {PROFILE.sidebarBio}
            </p>

            <div className="mt-5 border-t border-white/10 pt-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="#contact"
                  aria-label="Jump to contact section"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#00E061] text-[#0B0D10] transition-transform hover:scale-105 hover:bg-[#19F073]"
                >
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#00E061] px-5 py-2.5 text-sm font-semibold text-[#0B0D10] transition-colors hover:bg-[#19F073] whitespace-nowrap"
                >
                  Let’s talk
                </a>
                <a
                  href={RESUME_PDF_URL}
                  download={RESUME_DOWNLOAD_FILENAME}
                  className="inline-flex min-h-[44px] items-center gap-1.5 px-2.5 py-2 text-sm font-medium text-[#D6DAE2] transition-colors hover:text-[#00E061] whitespace-nowrap"
                >
                  <FileDown className="h-4 w-4" aria-hidden="true" />
                  <span>Download CV</span>
                </a>
                <button
                  type="button"
                  onClick={onOpenResume}
                  aria-label="Preview resume"
                  className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#D6DAE2] transition-colors hover:border-[#00E061] hover:text-[#00E061] cursor-pointer"
                >
                  <Eye className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

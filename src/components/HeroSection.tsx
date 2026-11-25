import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { HERO_STATS, PROFILE } from '../data/portfolioData';

function formatLocalStamp(date: Date) {
  const day = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return { day, time };
}

export function HeroSection() {
  const [stamp, setStamp] = useState(() => formatLocalStamp(new Date()));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStamp(formatLocalStamp(new Date()));
    }, 30000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="home" className="scroll-mt-8 pb-16 pt-2 sm:pb-20">
      {/* Top Minimal Identity & Live Time Utility Header (Isak signature) */}
      <div className="flex items-center justify-between gap-4 pb-10 sm:pb-12">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-[#F5F7F9] font-display text-sm font-bold text-[#111315] dark:border-white/10 dark:bg-[#161A22] dark:text-[#00E061]">
            MI
          </div>
          <div>
            <p className="text-sm font-semibold text-[#111315] dark:text-[#F3F5F7]">
              {PROFILE.name}
            </p>
            <p className="text-xs text-[#646870] dark:text-[#9CA3AF]">
              {PROFILE.role}
            </p>
          </div>
        </div>

        <div className="text-right font-mono text-xs leading-snug text-[#646870] tabular-nums dark:text-[#9CA3AF]">
          <p>{stamp.day}</p>
          <p className="text-[#111315] dark:text-[#E5E7EB]">{stamp.time}</p>
        </div>
      </div>

      {/* Oversized Multi-Accent Isak Editorial Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-[clamp(2.3rem,4.5vw,3.75rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[#111315] dark:text-[#F5F7FA]"
      >
        I’m building{' '}
        <span className="whitespace-nowrap text-[#00B853] dark:text-[#00E061]">scalable apps</span>{' '}
        <span className="my-1 inline-block rounded-full bg-[#111315] px-5 py-0.5 text-[#00E061] dark:bg-[#00E061] dark:text-[#0B0D10]">
          &amp; AI workflows
        </span>{' '}
        that teams rely on
      </motion.h1>

      {/* Signature Flowing Emerald Ribbon & Rotating Circular Seal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="relative my-8 h-48 w-full overflow-visible sm:my-10 sm:h-56"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 680 220"
          className="h-full w-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="isakRibbonGrad" x1="20" y1="120" x2="660" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00E061" stopOpacity="0.12" />
              <stop offset="28%" stopColor="#00E061" stopOpacity="0.88" />
              <stop offset="58%" stopColor="#00C853" stopOpacity="1" />
              <stop offset="85%" stopColor="#34F58C" stopOpacity="0.72" />
              <stop offset="100%" stopColor="#00E061" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 18 112 C 110 155, 190 95, 290 66 C 410 32, 515 76, 488 148 C 466 208, 355 210, 344 148 C 332 82, 465 92, 655 96"
            stroke="url(#isakRibbonGrad)"
            strokeWidth="30"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        {/* Rotating Engineering Seal overlapping the ribbon loop */}
        <div className="absolute left-[46%] top-[44%] flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/[0.08] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-[#14171D] sm:h-32 sm:w-32">
          <svg
            viewBox="0 0 120 120"
            className="animate-slow-spin h-full w-full p-1.5 text-[#111315] dark:text-[#F3F5F7]"
          >
            <defs>
              <path
                id="sealCirclePath"
                d="M 60, 60 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
              />
            </defs>
            <text
              fill="currentColor"
              fontSize="9"
              fontWeight="600"
              letterSpacing="2.2"
              fontFamily="JetBrains Mono, monospace"
            >
              <textPath href="#sealCirclePath" textLength="255">
                FULL STACK · LARAVEL · MERN · AI-FIRST ·
              </textPath>
            </text>
          </svg>
          <div className="absolute flex h-11 w-11 items-center justify-center rounded-full border border-black/15 dark:border-white/20">
            <span className="font-display text-sm font-bold text-[#111315] dark:text-[#00E061]">
              MI
            </span>
          </div>
        </div>
      </motion.div>

      {/* Big Minimalist Stat Counters (Real Resume Numbers Only) */}
      <div className="grid grid-cols-3 gap-6 border-b border-black/[0.08] pb-12 pt-2 dark:border-white/[0.08] sm:max-w-lg sm:gap-10">
        {HERO_STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 + idx * 0.08 }}
          >
            <p className="font-display text-4xl font-semibold tracking-tight text-[#111315] tabular-nums dark:text-white sm:text-5xl">
              {stat.value}
            </p>
            <p className="mt-1.5 text-xs leading-snug text-[#646870] dark:text-[#9CA3AF] sm:text-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

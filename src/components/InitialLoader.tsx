import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';

export function InitialLoader() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('autostart') !== '1';
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    if (prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    const durationMs = 680;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setIsVisible(false), 120);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isVisible, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="isak-loader"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white px-6 dark:bg-[#0B0D10]"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full max-w-xs flex-col items-center text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111315] font-display text-lg font-bold tracking-tight text-[#00E061] shadow-sm dark:bg-[#00E061] dark:text-[#0B0D10]">
              MI
            </div>
            <p className="mt-4 font-display text-base font-semibold tracking-tight text-[#111315] dark:text-[#F3F5F7]">
              {PROFILE.name}
            </p>
            <p className="mt-0.5 text-xs text-[#646870] dark:text-[#9CA3AF]">
              {PROFILE.role}
            </p>

            <div className="mt-5 h-1 w-44 overflow-hidden rounded-full bg-black/[0.08] dark:bg-white/10">
              <div
                className="h-full rounded-full bg-[#00E061] transition-[width] duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="mt-2 font-mono text-[11px] text-[#646870] tabular-nums dark:text-[#9CA3AF]">
              {progress}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

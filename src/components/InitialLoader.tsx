import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';

export function InitialLoader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 880);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="initial-loader"
          role="status"
          aria-label="Loading portfolio"
          data-testid="initial-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070D1B] px-6"
        >
          {/* Ambient center glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-72 w-72 rounded-full bg-[#FEC544]/[0.07] blur-3xl"
          />

          <div className="relative flex flex-col items-center text-center">
            {/* Animated concentric monogram ring */}
            <div className="relative flex h-20 w-20 items-center justify-center">
              <motion.span
                aria-hidden="true"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.8, ease: 'linear', repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-[#232935] border-t-[#FEC544] border-r-[#FEC544]/40"
              />
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-2xl font-bold tracking-tight text-[#FDFEFF]"
              >
                <span className="text-[#FEC544]">M</span>I
              </motion.span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-display text-xl font-semibold tracking-tight text-[#FDFEFF]"
            >
              <span className="text-[#FEC544]">M</span>ohammed {PROFILE.name.split(' ')[1]}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.32, delay: 0.2 }}
              className="mt-1 font-mono text-xs text-[#8E95A5]"
            >
              Laravel · MERN · AI-Assisted Engineering
            </motion.p>

            {/* Sleek warm-gold progress bar */}
            <div
              aria-hidden="true"
              className="mt-6 h-[2px] w-48 overflow-hidden rounded-full bg-[#232935]"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                className="h-full origin-left bg-[#FEC544]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

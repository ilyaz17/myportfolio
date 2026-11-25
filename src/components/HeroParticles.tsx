import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isGold: boolean;
  alpha: number;
  phase: number;
}

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    const initParticles = () => {
      const count = width < 640 ? 28 : 54;
      particles = Array.from({ length: count }, (_, idx) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.42,
        vy: (Math.random() - 0.5) * 0.42,
        radius: Math.random() * 1.6 + 0.9,
        isGold: idx % 3 === 0,
        alpha: Math.random() * 0.45 + 0.3,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    const renderFrame = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const connectionDist = width < 640 ? 95 : 135;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Subtle pointer magnetic drift
          if (pointer.active) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const distSq = dx * dx + dy * dy;
            if (distSq > 400 && distSq < 25600) {
              p.x += dx * 0.0025;
              p.y += dy * 0.0025;
            }
          }

          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        // Draw constellation lines
        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDist) {
            const opacity = (1 - dist / connectionDist) * (p.isGold || other.isGold ? 0.16 : 0.1);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle =
              p.isGold || other.isGold
                ? `rgba(254, 197, 68, ${opacity.toFixed(3)})`
                : `rgba(214, 218, 226, ${opacity.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Subtle twinkle modulation
        const twinkle = prefersReducedMotion
          ? 1
          : 0.72 + 0.28 * Math.sin(time * 0.0018 + p.phase);
        const dotAlpha = Math.min(1, p.alpha * twinkle);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isGold
          ? `rgba(254, 197, 68, ${dotAlpha.toFixed(3)})`
          : `rgba(235, 240, 250, ${(dotAlpha * 0.8).toFixed(3)})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resize();
    animationFrameId = window.requestAnimationFrame(renderFrame);

    window.addEventListener('resize', resize);
    const parent = canvas.parentElement;
    parent?.addEventListener('pointermove', handlePointerMove, { passive: true });
    parent?.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      parent?.removeEventListener('pointermove', handlePointerMove);
      parent?.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Slow drifting ambient warm-gold and midnight-blue radial auras */}
      <motion.div
        animate={{ x: [0, 32, -18, 0], y: [0, -24, 18, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#FEC544]/[0.07] blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -28, 20, 0], y: [0, 26, -16, 0], scale: [1, 0.94, 1.06, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[12%] bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#1C2C4E]/[0.35] blur-3xl"
      />

      {/* Interactive 60fps particle constellation canvas */}
      <canvas
        ref={canvasRef}
        data-testid="hero-particles-canvas"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

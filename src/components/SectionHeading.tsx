import { motion } from 'motion/react';

interface SectionHeadingProps {
  id: string;
  title: string;
}

export function SectionHeading({ id, title }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 text-center sm:mb-14"
    >
      <h2
        id={id}
        className="font-display text-2xl font-semibold tracking-[0.06em] text-[#FEC544] sm:text-[26px]"
      >
        {title}
      </h2>
      <div
        aria-hidden="true"
        className="relative mx-auto mt-3.5 h-[2px] w-44 overflow-hidden bg-[#3F4551]"
      >
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-1/2 w-16 -translate-x-1/2 origin-center bg-[#FEC544]"
        />
      </div>
    </motion.div>
  );
}

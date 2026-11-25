import {
  Blocks,
  Cpu,
  CreditCard,
  Database,
  Layers,
  Server,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES, type ServiceItem } from '../data/portfolioData';
import { SectionHeading } from './SectionHeading';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function ServiceIcon({
  icon,
  featured,
}: {
  icon: ServiceItem['icon'];
  featured?: boolean;
}) {
  const iconClass = featured
    ? 'h-8 w-8 text-[#FEC544] transition-colors duration-200'
    : 'h-8 w-8 text-[#8E95A5] transition-colors duration-200 group-hover:text-[#FEC544]';

  switch (icon) {
    case 'laravel':
      return <Server className={iconClass} aria-hidden="true" />;
    case 'mern':
      return <Layers className={iconClass} aria-hidden="true" />;
    case 'erp':
      return <Blocks className={iconClass} aria-hidden="true" />;
    case 'payments':
      return <CreditCard className={iconClass} aria-hidden="true" />;
    case 'database':
      return <Database className={iconClass} aria-hidden="true" />;
    case 'ai':
      return <Cpu className={iconClass} aria-hidden="true" />;
  }
}

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-18 bg-[#0A101E] pb-20 sm:pb-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading id="services-heading" title="SERVICES" />

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, idx) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.48, delay: idx * 0.07, ease: EASE_OUT }}
              className={`devis-card devis-card-hover group flex flex-col items-center rounded-xl px-7 py-10 text-center ${
                service.featured
                  ? 'border-[#FEC544]/45 bg-gradient-to-b from-[#131C31] to-[#101624]'
                  : ''
              }`}
            >
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full border bg-[#070D1B] transition-colors duration-200 ${
                  service.featured
                    ? 'border-[#FEC544]'
                    : 'border-[#3F4551] group-hover:border-[#FEC544]'
                }`}
              >
                <ServiceIcon icon={service.icon} featured={service.featured} />
              </div>

              {service.featured && (
                <p className="mt-4 font-mono text-[11px] font-medium tracking-wider text-[#FEC544] uppercase">
                  Modern Delivery Edge
                </p>
              )}

              <h3
                className={`${
                  service.featured ? 'mt-2 text-[#FEC544]' : 'mt-6 text-[#FDFEFF]'
                } font-display text-xl font-medium transition-colors duration-200 group-hover:text-[#FEC544]`}
              >
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#A9ADB8]">
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

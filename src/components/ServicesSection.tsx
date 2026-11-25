import {
  Blocks,
  CreditCard,
  Database,
  Layers,
  Printer,
  Server,
} from 'lucide-react';
import { SERVICES, type ServiceItem } from '../data/portfolioData';
import { SectionHeading } from './SectionHeading';

function ServiceIcon({ icon }: { icon: ServiceItem['icon'] }) {
  const iconClass =
    'h-8 w-8 text-[#8E95A5] transition-colors duration-200 group-hover:text-[#FEC544]';

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
    case 'pos':
      return <Printer className={iconClass} aria-hidden="true" />;
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
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="devis-card devis-card-hover group flex flex-col items-center rounded-xl px-7 py-10 text-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#3F4551] bg-[#070D1B] transition-colors duration-200 group-hover:border-[#FEC544]">
                <ServiceIcon icon={service.icon} />
              </div>

              <h3 className="mt-6 font-display text-xl font-medium text-[#FDFEFF] transition-colors duration-200 group-hover:text-[#FEC544]">
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#A9ADB8]">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

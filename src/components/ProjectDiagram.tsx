import type { ProjectItem } from '../data/portfolioData';

interface ProjectDiagramProps {
  type: ProjectItem['diagramType'];
  compact?: boolean;
}

export function ProjectDiagram({ type, compact = false }: ProjectDiagramProps) {
  const heightClass = compact ? 'h-36' : 'h-48 sm:h-56';

  if (type === 'tngasagl') {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-white/8 bg-[#0B0D11] ${heightClass}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 640 220"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid-tn" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="640" height="220" fill="url(#grid-tn)" />

          {/* Connecting lines */}
          <path d="M182 110 H242" stroke="#F2B705" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M398 110 H458" stroke="#949DAA" strokeWidth="1.5" />
          <path d="M320 148 V178 H458" stroke="#949DAA" strokeWidth="1.2" />

          {/* Node 1: Applicant Portal */}
          <rect x="28" y="68" width="154" height="84" rx="10" fill="#13161C" stroke="rgba(255,255,255,0.14)" />
          <text x="44" y="96" fill="#F2B705" fontSize="11" fontFamily="JetBrains Mono, monospace">
            CLIENT LAYER
          </text>
          <text x="44" y="118" fill="#F4F5F7" fontSize="14" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            React + Shadcn
          </text>
          <text x="44" y="137" fill="#949DAA" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            Applicant Workflows
          </text>

          {/* Node 2: Express API */}
          <rect x="242" y="68" width="156" height="84" rx="10" fill="#171B23" stroke="#F2B705" strokeOpacity="0.55" />
          <text x="258" y="96" fill="#F2B705" fontSize="11" fontFamily="JetBrains Mono, monospace">
            API GATEWAY
          </text>
          <text x="258" y="118" fill="#F4F5F7" fontSize="14" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            Express.js Core
          </text>
          <text x="258" y="137" fill="#949DAA" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            Validation &amp; Routing
          </text>

          {/* Node 3: Data & Storage */}
          <rect x="458" y="42" width="154" height="66" rx="10" fill="#13161C" stroke="rgba(255,255,255,0.14)" />
          <text x="474" y="68" fill="#F4F5F7" fontSize="13" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            MySQL &amp; AWS S3
          </text>
          <text x="474" y="88" fill="#949DAA" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            Scale Records + Docs
          </text>

          {/* Node 4: Payment Gateway */}
          <rect x="458" y="136" width="154" height="58" rx="10" fill="#13161C" stroke="rgba(255,255,255,0.14)" />
          <text x="474" y="162" fill="#F4F5F7" fontSize="13" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            Payment Gateway
          </text>
          <text x="474" y="180" fill="#949DAA" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            Verified Fee Settlement
          </text>
        </svg>
      </div>
    );
  }

  if (type === 'campuseye') {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-white/8 bg-[#0B0D11] ${heightClass}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 360 160" className="h-full w-full" fill="none">
          <defs>
            <pattern id="grid-ce" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="360" height="160" fill="url(#grid-ce)" />
          <path d="M122 80 H150 M246 56 H268 M246 104 H268" stroke="#949DAA" strokeWidth="1.4" />
          <rect x="16" y="46" width="106" height="68" rx="8" fill="#13161C" stroke="rgba(255,255,255,0.14)" />
          <text x="28" y="75" fill="#F4F5F7" fontSize="13.5" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            Laravel 9.x
          </text>
          <text x="28" y="96" fill="#9BA3B2" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            ERP Core
          </text>

          <rect x="150" y="32" width="96" height="96" rx="8" fill="#171B23" stroke="#F2B705" strokeOpacity="0.55" />
          <text x="164" y="60" fill="#F2B705" fontSize="10.5" fontFamily="JetBrains Mono, monospace">
            DATA
          </text>
          <text x="164" y="83" fill="#F4F5F7" fontSize="14" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            MySQL
          </text>
          <text x="164" y="104" fill="#9BA3B2" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            AWS S3
          </text>

          <rect x="268" y="32" width="76" height="42" rx="8" fill="#13161C" stroke="rgba(255,255,255,0.14)" />
          <text x="281" y="58" fill="#E2E6EE" fontSize="12" fontWeight="500" fontFamily="Plus Jakarta Sans, sans-serif">
            Flutter
          </text>

          <rect x="268" y="86" width="76" height="42" rx="8" fill="#13161C" stroke="rgba(255,255,255,0.14)" />
          <text x="277" y="112" fill="#E2E6EE" fontSize="12" fontWeight="500" fontFamily="Plus Jakarta Sans, sans-serif">
            Firebase
          </text>
        </svg>
      </div>
    );
  }

  if (type === 'proman') {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-white/8 bg-[#0B0D11] ${heightClass}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 360 160" className="h-full w-full" fill="none">
          <defs>
            <pattern id="grid-pm" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="360" height="160" fill="url(#grid-pm)" />
          <path d="M122 80 H150 M240 80 H262" stroke="#F2B705" strokeOpacity="0.7" strokeWidth="1.5" />
          <rect x="18" y="46" width="104" height="68" rx="8" fill="#13161C" stroke="rgba(255,255,255,0.14)" />
          <text x="32" y="75" fill="#F4F5F7" fontSize="13.5" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            2FA Auth
          </text>
          <text x="32" y="96" fill="#9BA3B2" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            Access Gate
          </text>

          <rect x="150" y="38" width="90" height="84" rx="8" fill="#171B23" stroke="#F2B705" strokeOpacity="0.55" />
          <text x="166" y="75" fill="#F4F5F7" fontSize="13.5" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            Laravel
          </text>
          <text x="166" y="96" fill="#9BA3B2" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            Workflows
          </text>

          <rect x="262" y="46" width="80" height="68" rx="8" fill="#13161C" stroke="rgba(255,255,255,0.14)" />
          <text x="276" y="75" fill="#F4F5F7" fontSize="13.5" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            MySQL
          </text>
          <text x="276" y="96" fill="#9BA3B2" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            Projects
          </text>
        </svg>
      </div>
    );
  }

  if (type === 'kot') {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-white/8 bg-[#0B0D11] ${heightClass}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 360 160" className="h-full w-full" fill="none">
          <defs>
            <pattern id="grid-kot" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="360" height="160" fill="url(#grid-kot)" />
          <path d="M120 80 H148 M242 80 H264" stroke="#949DAA" strokeWidth="1.5" />
          <rect x="16" y="46" width="104" height="68" rx="8" fill="#13161C" stroke="rgba(255,255,255,0.14)" />
          <text x="28" y="75" fill="#F4F5F7" fontSize="13.5" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            Order Desk
          </text>
          <text x="28" y="96" fill="#9BA3B2" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            PHP App
          </text>

          <rect x="148" y="38" width="94" height="84" rx="8" fill="#171B23" stroke="#F2B705" strokeOpacity="0.55" />
          <text x="162" y="75" fill="#F4F5F7" fontSize="13.5" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            MSSQL
          </text>
          <text x="162" y="96" fill="#9BA3B2" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            Ticket Queue
          </text>

          <rect x="264" y="42" width="80" height="76" rx="8" fill="#13161C" stroke="rgba(255,255,255,0.14)" />
          <text x="278" y="73" fill="#F2B705" fontSize="11" fontFamily="JetBrains Mono, monospace">
            ePOS
          </text>
          <text x="278" y="95" fill="#E2E6EE" fontSize="12.5" fontWeight="500" fontFamily="Plus Jakarta Sans, sans-serif">
            Printer
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-white/8 bg-[#0B0D11] ${heightClass}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 360 160" className="h-full w-full" fill="none">
        <defs>
          <pattern id="grid-mc" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="360" height="160" fill="url(#grid-mc)" />
        <path d="M132 80 H156 M252 80 H272" stroke="#949DAA" strokeWidth="1.5" />
        <rect x="16" y="46" width="116" height="68" rx="8" fill="#13161C" stroke="rgba(255,255,255,0.14)" />
        <text x="28" y="75" fill="#F4F5F7" fontSize="13.5" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
          CodeIgniter
        </text>
        <text x="28" y="96" fill="#9BA3B2" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
          PHP Modules
        </text>

        <rect x="156" y="40" width="96" height="80" rx="8" fill="#171B23" stroke="#F2B705" strokeOpacity="0.55" />
        <text x="168" y="75" fill="#F4F5F7" fontSize="13.5" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
          Operations
        </text>
        <text x="168" y="96" fill="#9BA3B2" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
          jQuery UI
        </text>

        <rect x="272" y="48" width="72" height="64" rx="8" fill="#13161C" stroke="rgba(255,255,255,0.14)" />
        <text x="286" y="85" fill="#E2E6EE" fontSize="13" fontWeight="500" fontFamily="Plus Jakarta Sans, sans-serif">
          MySQL
        </text>
      </svg>
    </div>
  );
}

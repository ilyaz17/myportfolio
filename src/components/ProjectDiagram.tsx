import type { ProjectItem } from '../data/portfolioData';

interface ProjectDiagramProps {
  type: ProjectItem['diagramType'];
  compact?: boolean;
}

export function ProjectDiagram({ type, compact = false }: ProjectDiagramProps) {
  const heightClass = compact ? 'h-38' : 'h-52 sm:h-60';

  if (type === 'tngasagl') {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-[#232935] bg-[#070D1B] ${heightClass}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 640 230"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid-tn" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
            </pattern>
            <radialGradient id="glow-tn" cx="50%" cy="48%" r="52%">
              <stop offset="0%" stopColor="#FEC544" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#070D1B" stopOpacity="0" />
            </radialGradient>
            <marker
              id="arrow-amber"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#FEC544" />
            </marker>
            <marker
              id="arrow-slate"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#A9ADB8" />
            </marker>
          </defs>
          <rect width="640" height="230" fill="url(#grid-tn)" />
          <rect width="640" height="230" fill="url(#glow-tn)" />

          {/* Connecting signal paths */}
          <path
            d="M186 115 H238"
            stroke="#FEC544"
            strokeWidth="1.6"
            strokeDasharray="4 4"
            markerEnd="url(#arrow-amber)"
          />
          <path
            d="M402 95 H430 V74 H452"
            stroke="#A9ADB8"
            strokeWidth="1.4"
            markerEnd="url(#arrow-slate)"
          />
          <path
            d="M402 135 H430 V168 H452"
            stroke="#FEC544"
            strokeOpacity="0.8"
            strokeWidth="1.4"
            markerEnd="url(#arrow-amber)"
          />

          {/* Node 1: Applicant Portal */}
          <rect
            x="24"
            y="68"
            width="162"
            height="94"
            rx="12"
            fill="#101624"
            stroke="#232935"
          />
          <line x1="36" y1="69" x2="174" y2="69" stroke="rgba(255,255,255,0.16)" />
          <text x="40" y="96" fill="#FEC544" fontSize="10.5" fontFamily="JetBrains Mono, monospace">
            01 · CLIENT LAYER
          </text>
          <text
            x="40"
            y="120"
            fill="#FDFEFF"
            fontSize="15"
            fontWeight="600"
            fontFamily="Bricolage Grotesque, sans-serif"
          >
            React + Shadcn
          </text>
          <text x="40" y="141" fill="#A9ADB8" fontSize="11.5" fontFamily="Plus Jakarta Sans, sans-serif">
            Applicant Workflows
          </text>

          {/* Node 2: Express API */}
          <rect
            x="240"
            y="62"
            width="162"
            height="106"
            rx="12"
            fill="#131C30"
            stroke="#FEC544"
            strokeOpacity="0.62"
            strokeWidth="1.2"
          />
          <line x1="254" y1="63" x2="388" y2="63" stroke="#FEC544" strokeOpacity="0.65" />
          <text x="256" y="92" fill="#FEC544" fontSize="10.5" fontFamily="JetBrains Mono, monospace">
            02 · API GATEWAY
          </text>
          <text
            x="256"
            y="118"
            fill="#FDFEFF"
            fontSize="15.5"
            fontWeight="600"
            fontFamily="Bricolage Grotesque, sans-serif"
          >
            Express.js Core
          </text>
          <text x="256" y="140" fill="#A9ADB8" fontSize="11.5" fontFamily="Plus Jakarta Sans, sans-serif">
            Validation &amp; Routing
          </text>

          {/* Node 3: Data & Storage */}
          <rect
            x="454"
            y="38"
            width="162"
            height="72"
            rx="12"
            fill="#101624"
            stroke="#232935"
          />
          <text x="470" y="66" fill="#FDFEFF" fontSize="14" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            MySQL &amp; AWS S3
          </text>
          <text x="470" y="88" fill="#A9ADB8" fontSize="11.5" fontFamily="Plus Jakarta Sans, sans-serif">
            Scale Records + Docs
          </text>

          {/* Node 4: Payment Gateway */}
          <rect
            x="454"
            y="132"
            width="162"
            height="72"
            rx="12"
            fill="#101624"
            stroke="rgba(254,197,68,0.34)"
          />
          <text x="470" y="160" fill="#FDFEFF" fontSize="14" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            Payment Gateway
          </text>
          <text x="470" y="182" fill="#A9ADB8" fontSize="11.5" fontFamily="Plus Jakarta Sans, sans-serif">
            Verified Fee Settlement
          </text>
        </svg>
      </div>
    );
  }

  if (type === 'campuseye') {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-[#232935] bg-[#070D1B] ${heightClass}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 360 160" className="h-full w-full" fill="none">
          <defs>
            <pattern id="grid-ce" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
            </pattern>
            <radialGradient id="glow-ce" cx="55%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#FEC544" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#070D1B" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="360" height="160" fill="url(#grid-ce)" />
          <rect width="360" height="160" fill="url(#glow-ce)" />
          <path d="M122 80 H148 M246 54 H268 M246 106 H268" stroke="#A9ADB8" strokeWidth="1.4" />
          <rect x="16" y="44" width="106" height="72" rx="10" fill="#101624" stroke="#232935" />
          <text x="28" y="75" fill="#FDFEFF" fontSize="13.5" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            Laravel 9.x
          </text>
          <text x="28" y="96" fill="#A9ADB8" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            ERP Core
          </text>

          <rect x="148" y="30" width="98" height="100" rx="10" fill="#131C30" stroke="#FEC544" strokeOpacity="0.6" />
          <text x="163" y="58" fill="#FEC544" fontSize="10.5" fontFamily="JetBrains Mono, monospace">
            DATA
          </text>
          <text x="163" y="83" fill="#FDFEFF" fontSize="14.5" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            MySQL
          </text>
          <text x="163" y="104" fill="#A9ADB8" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            AWS S3
          </text>

          <rect x="268" y="30" width="76" height="44" rx="10" fill="#101624" stroke="#232935" />
          <text x="281" y="57" fill="#FDFEFF" fontSize="12.5" fontWeight="500" fontFamily="Plus Jakarta Sans, sans-serif">
            Flutter
          </text>

          <rect x="268" y="86" width="76" height="44" rx="10" fill="#101624" stroke="#232935" />
          <text x="277" y="113" fill="#FDFEFF" fontSize="12.5" fontWeight="500" fontFamily="Plus Jakarta Sans, sans-serif">
            Firebase
          </text>
        </svg>
      </div>
    );
  }

  if (type === 'proman') {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-[#232935] bg-[#070D1B] ${heightClass}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 360 160" className="h-full w-full" fill="none">
          <defs>
            <pattern id="grid-pm" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
            </pattern>
            <radialGradient id="glow-pm" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#FEC544" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#070D1B" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="360" height="160" fill="url(#grid-pm)" />
          <rect width="360" height="160" fill="url(#glow-pm)" />
          <path d="M122 80 H148 M240 80 H262" stroke="#FEC544" strokeOpacity="0.75" strokeWidth="1.5" />
          <rect x="18" y="44" width="104" height="72" rx="10" fill="#101624" stroke="#232935" />
          <text x="32" y="75" fill="#FDFEFF" fontSize="13.5" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            2FA Auth
          </text>
          <text x="32" y="96" fill="#A9ADB8" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            Access Gate
          </text>

          <rect x="148" y="36" width="92" height="88" rx="10" fill="#131C30" stroke="#FEC544" strokeOpacity="0.6" />
          <text x="164" y="75" fill="#FDFEFF" fontSize="14" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            Laravel
          </text>
          <text x="164" y="96" fill="#A9ADB8" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            Workflows
          </text>

          <rect x="262" y="44" width="80" height="72" rx="10" fill="#101624" stroke="#232935" />
          <text x="276" y="75" fill="#FDFEFF" fontSize="13.5" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            MySQL
          </text>
          <text x="276" y="96" fill="#A9ADB8" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            Projects
          </text>
        </svg>
      </div>
    );
  }

  if (type === 'kot') {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-[#232935] bg-[#070D1B] ${heightClass}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 360 160" className="h-full w-full" fill="none">
          <defs>
            <pattern id="grid-kot" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
            </pattern>
            <radialGradient id="glow-kot" cx="55%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#FEC544" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#070D1B" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="360" height="160" fill="url(#grid-kot)" />
          <rect width="360" height="160" fill="url(#glow-kot)" />
          <path d="M120 80 H148 M242 80 H264" stroke="#A9ADB8" strokeWidth="1.5" />
          <rect x="16" y="44" width="104" height="72" rx="10" fill="#101624" stroke="#232935" />
          <text x="28" y="75" fill="#FDFEFF" fontSize="13.5" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            Order Desk
          </text>
          <text x="28" y="96" fill="#A9ADB8" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            PHP App
          </text>

          <rect x="148" y="36" width="94" height="88" rx="10" fill="#131C30" stroke="#FEC544" strokeOpacity="0.6" />
          <text x="162" y="75" fill="#FDFEFF" fontSize="14" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
            MSSQL
          </text>
          <text x="162" y="96" fill="#A9ADB8" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            Ticket Queue
          </text>

          <rect x="264" y="40" width="80" height="80" rx="10" fill="#101624" stroke="rgba(254,197,68,0.34)" />
          <text x="278" y="73" fill="#FEC544" fontSize="11" fontFamily="JetBrains Mono, monospace">
            ePOS
          </text>
          <text x="278" y="96" fill="#FDFEFF" fontSize="12.5" fontWeight="500" fontFamily="Plus Jakarta Sans, sans-serif">
            Printer
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-[#232935] bg-[#070D1B] ${heightClass}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 360 160" className="h-full w-full" fill="none">
        <defs>
          <pattern id="grid-mc" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
          </pattern>
          <radialGradient id="glow-mc" cx="55%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#FEC544" stopOpacity="0.11" />
            <stop offset="100%" stopColor="#070D1B" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="360" height="160" fill="url(#grid-mc)" />
        <rect width="360" height="160" fill="url(#glow-mc)" />
        <path d="M132 80 H156 M252 80 H272" stroke="#A9ADB8" strokeWidth="1.5" />
        <rect x="16" y="44" width="116" height="72" rx="10" fill="#101624" stroke="#232935" />
        <text x="28" y="75" fill="#FDFEFF" fontSize="13.5" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
          CodeIgniter
        </text>
        <text x="28" y="96" fill="#A9ADB8" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
          PHP Modules
        </text>

        <rect x="156" y="38" width="96" height="84" rx="10" fill="#131C30" stroke="#FEC544" strokeOpacity="0.6" />
        <text x="168" y="75" fill="#FDFEFF" fontSize="13.5" fontWeight="600" fontFamily="Bricolage Grotesque, sans-serif">
          Operations
        </text>
        <text x="168" y="96" fill="#A9ADB8" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
          jQuery UI
        </text>

        <rect x="272" y="46" width="72" height="68" rx="10" fill="#101624" stroke="#232935" />
        <text x="286" y="85" fill="#FDFEFF" fontSize="13" fontWeight="500" fontFamily="Plus Jakarta Sans, sans-serif">
          MySQL
        </text>
      </svg>
    </div>
  );
}

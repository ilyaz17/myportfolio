export type ProjectCategory = 'all' | 'laravel-php' | 'mern' | 'enterprise-pos';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  featured?: boolean;
  summary: string;
  architectureHighlights: string[];
  stack: string[];
  scope: string;
  diagramType: 'tngasagl' | 'campuseye' | 'proman' | 'kot' | 'masscool';
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface SkillGroup {
  id: string;
  category: string;
  description: string;
  skills: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export interface ArchitectureLayer {
  id: string;
  label: string;
  role: string;
  technologies: string[];
  appliedIn: string;
}

export interface ServiceItem {
  id: string;
  icon: 'laravel' | 'mern' | 'erp' | 'payments' | 'database' | 'pos';
  title: string;
  description: string;
}

export const RESUME_PDF_URL = '/assets/aistudio/Mohammed_Ilyas_Resume__1__c1e233fa.pdf';
export const RESUME_DOWNLOAD_FILENAME = 'Mohammed_Ilyas_Resume.pdf';

export const SERVICES: ServiceItem[] = [
  {
    id: 'laravel-php',
    icon: 'laravel',
    title: 'Laravel & PHP Engineering',
    description:
      'Production web platforms, CodeIgniter enterprise apps, modular backend logic, and 2FA-protected role-based access control.',
  },
  {
    id: 'mern-stack',
    icon: 'mern',
    title: 'MERN & Modern Frontend',
    description:
      'Responsive React.js, Next.js, TypeScript, Tailwind, and Shadcn UI applications engineered for speed and Core Web Vitals.',
  },
  {
    id: 'erp-portals',
    icon: 'erp',
    title: 'Enterprise ERP & Portals',
    description:
      'High-volume government recruitment portals and coaching center ERPs built to streamline applicant data and internal workflows.',
  },
  {
    id: 'payments-apis',
    icon: 'payments',
    title: 'REST APIs & Payments',
    description:
      'Clean REST API design, e-commerce checkout re-engineering, and secure ICICI payment gateway integrations for reliable transactions.',
  },
  {
    id: 'database-cloud',
    icon: 'database',
    title: 'Database & Cloud Architecture',
    description:
      'Schema design and query optimization across MySQL, MS SQL Server, PostgreSQL, MongoDB, AWS S3, RDS, and Linux VPS.',
  },
  {
    id: 'pos-ai',
    icon: 'pos',
    title: 'POS Hardware & AI Workflows',
    description:
      'Hospitality kitchen ordering with direct Epson ePOS SDK receipt printing alongside modern Claude Code, Codex, and MCP automation.',
  },
];

export const PROFILE = {
  name: 'Mohammed Ilyas',
  role: 'Full Stack Developer (Laravel & MERN)',
  location: 'Coimbatore, India',
  phone: '+91 9188310575',
  phoneHref: 'tel:+919188310575',
  email: 'mohammedilyassa@gmail.com',
  emailHref: 'mailto:mohammedilyassa@gmail.com',
  githubHandle: 'github.com/ilyaz17',
  githubUrl: 'https://github.com/ilyaz17',
  headline: 'Engineering scalable Laravel & MERN systems end-to-end.',
  summary:
    'Full Stack Developer with 5+ years of experience building and scaling web applications across the Laravel/PHP and MERN (MongoDB, Express, React, Node.js) ecosystems. Skilled in designing REST APIs, optimizing MySQL/relational databases, and integrating payment gateways and third-party services. Track record of improving checkout conversion, page performance, and system usability for high-traffic and enterprise platforms. Comfortable owning features end-to-end, from database schema to responsive UI.',
  languages: ['Tamil', 'English', 'Arabic', 'Malayalam'],
};

export const HERO_HIGHLIGHTS = [
  {
    value: '5+ Years',
    label: 'Full-Stack Production Engineering',
    detail: 'Laravel/PHP & MERN delivery since Feb 2021',
  },
  {
    value: '5 Systems',
    label: 'Enterprise, Gov & POS Platforms',
    detail: 'ERPs, recruitment portals, builder & kitchen apps',
  },
  {
    value: 'End-to-End',
    label: 'Database Schema to Responsive UI',
    detail: 'MySQL, MSSQL, REST APIs, ICICI payment gateways',
  },
  {
    value: '4 Languages',
    label: 'Cross-Team Communication',
    detail: 'Tamil, English, Arabic, Malayalam',
  },
];

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'interface',
    label: '01. Frontend & Interfaces',
    role: 'Responsive web apps, checkout optimization, Core Web Vitals',
    technologies: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI'],
    appliedIn: 'TNGASAGL Portal, High-Traffic E-Commerce Platforms',
  },
  {
    id: 'api',
    label: '02. Backend & Payment APIs',
    role: 'RESTful service design, ICICI payment gateway, 2FA security',
    technologies: ['Laravel', 'Node.js', 'Express.js', 'CodeIgniter', 'REST APIs'],
    appliedIn: 'Campuseye Coaching ERP, Builder’s ProMan, TNGASAGL',
  },
  {
    id: 'data',
    label: '03. Relational & Document Data',
    role: 'Schema architecture, query tuning, large-scale applicant datasets',
    technologies: ['MySQL', 'MS SQL Server', 'PostgreSQL', 'MongoDB', 'AWS RDS'],
    appliedIn: 'TNGASAGL, KOT Hotel System, Masscool Operations',
  },
  {
    id: 'cloud',
    label: '04. Cloud, Hardware & AI Tooling',
    role: 'AWS S3 storage, VPS hosting, Epson ePOS SDK, MCP workflows',
    technologies: ['AWS & S3', 'Hostinger VPS', 'Linux', 'Epson ePOS SDK', 'Claude Code & MCP'],
    appliedIn: 'Campuseye S3/Firebase, KOT Receipt Printing, Production Deploys',
  },
];

export const PROJECT_FILTERS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'mern', label: 'MERN Stack' },
  { id: 'laravel-php', label: 'Laravel & PHP' },
  { id: 'enterprise-pos', label: 'Enterprise & POS' },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'tngasagl',
    index: '01',
    title: 'TNGASAGL',
    subtitle: 'Tamil Nadu Government Arts & Science Colleges Guest Lecturer Interview System',
    category: 'mern',
    categoryLabel: 'MERN Stack · Government Portal',
    featured: true,
    summary:
      'Built the Tamil Nadu Government Arts & Science Colleges Guest Lecturer Interview system, handling large-scale applicant data, document storage, payment workflows, and multi-stage candidate processing.',
    architectureHighlights: [
      'Structured Express.js REST APIs and MySQL schemas engineered for high-volume applicant submissions and interview scheduling workflows.',
      'Integrated AWS S3 for secure applicant document uploads alongside payment gateway verification for application fees.',
      'Delivered an accessible React.js and Shadcn UI front end designed for reliable cross-device candidate registration.',
    ],
    stack: ['Express.js', 'MySQL', 'AWS', 'React.js', 'Shadcn UI', 'S3', 'Payment Gateway'],
    scope: 'Full-Stack Architecture · API & Database · Cloud & Payments',
    diagramType: 'tngasagl',
  },
  {
    id: 'campuseye-erp',
    index: '02',
    title: 'Campuseye Coaching ERP',
    subtitle: 'NEET & JEE Coaching Center Operations Platform',
    category: 'laravel-php',
    categoryLabel: 'Laravel 9.x · Education ERP',
    summary:
      'Built the Campuseye Coaching Center (NEET/JEE) ERP system, handling large-scale applicant records, academic workflows, cloud media storage, and mobile-connected notifications.',
    architectureHighlights: [
      'Architected core ERP modules on Laravel 9.x and MySQL to streamline admissions, batch tracking, and student administration.',
      'Connected AWS S3 storage and Firebase services to support web dashboards and companion Flutter mobile workflows.',
      'Improved internal operator speed by unifying fragmented administrative routines into a single responsive interface.',
    ],
    stack: ['Laravel 9.x', 'MySQL', 'AWS', 'jQuery', 'S3', 'Firebase', 'Flutter'],
    scope: 'ERP Engineering · Cloud Storage · Multi-Client Integration',
    diagramType: 'campuseye',
  },
  {
    id: 'builders-proman',
    index: '03',
    title: "Builder's ProMan",
    subtitle: 'Construction Project Management & Access Control',
    category: 'laravel-php',
    categoryLabel: 'Laravel · Security & Operations',
    summary:
      'Built a project management tool tailored for builders and construction teams with two-factor authentication (2FA) for secure role-based access control.',
    architectureHighlights: [
      'Implemented two-factor authentication (2FA) and structured permission boundaries to safeguard sensitive builder records.',
      'Engineered Laravel and MySQL workflows for tracking project stages, materials, and stakeholder milestones.',
      'Focused on clarity and low-friction daily data entry for field and office teams.',
    ],
    stack: ['Laravel', 'PHP', 'MySQL', '2FA'],
    scope: 'Backend & Frontend · Authentication · Relational Modeling',
    diagramType: 'proman',
  },
  {
    id: 'kot',
    index: '04',
    title: 'KOT (Kitchen Order Ticket)',
    subtitle: 'Hotel Kitchen Ordering & Direct Receipt Printing',
    category: 'enterprise-pos',
    categoryLabel: 'PHP · Hospitality POS',
    summary:
      'Developed a hotel kitchen-ordering application with direct receipt and kitchen ticket printing integrated via the Epson ePOS SDK.',
    architectureHighlights: [
      'Integrated the Epson ePOS SDK directly with web-based ordering flows for low-latency thermal ticket printing.',
      'Built fast PHP and MS SQL Server order routing to coordinate dining service and kitchen stations reliably.',
      'Designed clean order queues to minimize manual handoffs during peak restaurant hours.',
    ],
    stack: ['PHP', 'MSSQL', 'Epson ePOS SDK'],
    scope: 'POS Workflow · MSSQL Integration · Hardware SDK',
    diagramType: 'kot',
  },
  {
    id: 'masscool',
    index: '05',
    title: 'Masscool',
    subtitle: 'Enterprise Internal Business Operations Platform',
    category: 'enterprise-pos',
    categoryLabel: 'CodeIgniter · Enterprise Web App',
    summary:
      'Built a robust PHP-based enterprise application powering internal business operations, inventory workflows, and daily operational reporting.',
    architectureHighlights: [
      'Developed modular business logic using CodeIgniter and MySQL to replace repetitive manual tracking processes.',
      'Crafted interactive jQuery operational forms and tables for dependable day-to-day internal team usage.',
      'Structured relational schemas for consistent record auditing and fast lookup across departments.',
    ],
    stack: ['CodeIgniter', 'PHP', 'MySQL', 'jQuery'],
    scope: 'Enterprise Modules · Internal Tooling · Database Design',
    diagramType: 'masscool',
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'PHP Full Stack Developer',
    company: 'Infotrack Technology Solutions',
    location: 'Pollachi, Tamil Nadu',
    period: 'Feb 2021 – Present',
    highlights: [
      'Engineered user-facing applications and re-engineered checkout flows, improving user engagement and conversion rates on production e-commerce platforms.',
      'Built and maintained multiple high-traffic websites with a focus on responsive design, cutting page load times and improving Core Web Vitals.',
      'Designed and developed scalable ERP applications used by internal teams, improving interface usability and reducing manual process time.',
      'Integrated REST APIs and payment gateways (ICICI) into Laravel applications, ensuring secure and reliable transaction processing.',
      'Worked across the full stack — from MySQL/MSSQL schema design to React/JavaScript front ends — collaborating directly with stakeholders on requirements and delivery.',
    ],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'frontend',
    category: 'Frontend',
    description: 'Component systems, responsive interfaces, and Core Web Vitals performance.',
    skills: [
      'HTML',
      'CSS',
      'Bootstrap',
      'Tailwind',
      'JavaScript',
      'TypeScript',
      'React.js',
      'Next.js',
      'Shadcn UI',
      'WordPress',
    ],
  },
  {
    id: 'backend',
    category: 'Backend',
    description: 'Production PHP/Laravel architectures, Node.js services, and payment gateways.',
    skills: [
      'Laravel',
      'CodeIgniter',
      'Node.js',
      'Express.js',
      'REST API design',
      'Payment Gateway Integration',
    ],
  },
  {
    id: 'database',
    category: 'Database',
    description: 'Relational schema design, query optimization, and managed cloud databases.',
    skills: ['MySQL', 'MS SQL Server', 'PostgreSQL', 'MongoDB', 'AWS RDS'],
  },
  {
    id: 'devops',
    category: 'DevOps & Cloud',
    description: 'Source control workflows, cloud storage, and production VPS deployment.',
    skills: ['GitHub', 'GitLab', 'AWS', 'Hostinger VPS'],
  },
  {
    id: 'ai-tools',
    category: 'AI-Assisted Dev Tools',
    description: 'Modern agentic coding workflows, automation skills, and MCP integrations.',
    skills: [
      'Claude Code',
      'Codex',
      'OpenCode',
      'Antigravity',
      'Agents Automation',
      'Skills',
      'MCP & Plugins',
    ],
  },
  {
    id: 'os',
    category: 'Operating Systems',
    description: 'Server administration and local development environments.',
    skills: ['Windows', 'Linux (Ubuntu, Debian)'],
  },
  {
    id: 'tools',
    category: 'Development Tools',
    description: 'Daily IDEs and relational database inspection tools.',
    skills: ['VS Code', 'MySQL Workbench', 'Eclipse IDE'],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'B.Sc. Computer Technology',
    institution: 'Sree Saraswathi Thyagaraja College',
    location: 'Pollachi',
    period: '2017 – 2020',
  },
  {
    degree: 'HSC',
    institution: 'Govt High School, Divansapudur',
    location: 'Pollachi',
    period: '2016 – 2017',
  },
  {
    degree: 'SSLC',
    institution: 'Govt High School, Muthalamada',
    location: 'Palakkad',
    period: '2014 – 2015',
  },
];

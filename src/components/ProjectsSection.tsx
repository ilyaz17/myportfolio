import { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  PROJECT_FILTERS,
  PROJECTS,
  type ProjectCategory,
  type ProjectItem,
} from '../data/portfolioData';
import { filterProjects } from '../utils/portfolioLogic';
import { ProjectDiagram } from './ProjectDiagram';
import { SectionHeading } from './SectionHeading';

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const visibleProjects = filterProjects(PROJECTS, activeCategory);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section
      id="portfolio"
      aria-labelledby="projects-heading"
      className="scroll-mt-18 bg-[#0A101E] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading id="projects-heading" title="PORTFOLIO" />

        <div className="flex flex-col items-center gap-4 text-center">
          <div
            role="group"
            aria-label="Filter projects by technology stack"
            className="inline-flex max-w-full flex-wrap sm:flex-nowrap items-center justify-center gap-1 rounded-full border border-[#232935] bg-[#101624] p-1 shrink-0"
          >
            {PROJECT_FILTERS.map((filter) => {
              const isActive = activeCategory === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(filter.id)}
                  className={`relative min-h-[40px] rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-[#070D1B]'
                      : 'text-[#A9ADB8] hover:text-[#FDFEFF]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-filter-active"
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 rounded-full bg-[#FEC544]"
                    />
                  )}
                  <span className="relative z-10">{filter.label}</span>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#8E95A5] tabular-nums" data-testid="project-count">
            Showing {visibleProjects.length} of {PROJECTS.length} production systems
          </p>
        </div>

        <div
          className={`mt-10 grid grid-cols-1 gap-6 ${
            activeCategory === 'all'
              ? 'md:grid-cols-2 lg:grid-cols-6'
              : visibleProjects.length === 1
                ? 'lg:grid-cols-1'
                : 'md:grid-cols-2'
          }`}
        >
          {visibleProjects.map((project) => {
            const isBentoWide = activeCategory === 'all' && project.featured;
            const colSpanClass =
              activeCategory === 'all'
                ? isBentoWide
                  ? 'md:col-span-2 lg:col-span-4'
                  : 'lg:col-span-2'
                : '';

            return (
              <article
                key={project.id}
                data-testid={`project-card-${project.id}`}
                className={`devis-card devis-card-hover group flex flex-col justify-between rounded-xl p-6 sm:p-7 ${colSpanClass}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 text-xs text-[#8E95A5]">
                    <span className="font-mono tabular-nums">
                      <span className="text-[#FEC544]">{project.index}</span> ·{' '}
                      {project.categoryLabel}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[#FDFEFF] transition-colors group-hover:text-[#FEC544]">
                    {project.title}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-[#D6DAE2]">
                    {project.subtitle}
                  </p>

                  <div className="mt-5">
                    <ProjectDiagram type={project.diagramType} compact={!isBentoWide} />
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-[#A9ADB8]">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#232935] pt-4">
                  <p className="text-xs font-medium text-[#8E95A5]">
                    {project.scope}
                  </p>
                  <p className="mt-1.5 font-mono text-[11.5px] leading-relaxed text-[#C5CAD4]">
                    {project.stack.join(' · ')}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`Inspect architecture for ${project.title}`}
                    className="mt-4 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-[#FEC544] transition-colors hover:text-[#FFD369] whitespace-nowrap cursor-pointer"
                  >
                    <span>Inspect Architecture</span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#040812]/85 p-4 backdrop-blur-md sm:p-6"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setSelectedProject(null);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="devis-card max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[#232935] pb-5">
                <div>
                  <p className="font-mono text-xs text-[#8E95A5] tabular-nums">
                    <span className="text-[#FEC544]">{selectedProject.index}</span> ·{' '}
                    {selectedProject.categoryLabel}
                  </p>
                  <h3
                    id="project-modal-title"
                    className="mt-2 font-display text-2xl font-semibold text-[#FDFEFF] sm:text-3xl"
                  >
                    {selectedProject.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#D6DAE2]">{selectedProject.subtitle}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#232935] bg-[#070D1B] text-[#D6DAE2] transition-colors hover:border-[#FEC544] hover:text-[#FEC544] cursor-pointer"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-6">
                <ProjectDiagram type={selectedProject.diagramType} />
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-xs font-medium text-[#8E95A5]">System Overview</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#D6DAE2]">
                    {selectedProject.summary}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-[#8E95A5]">
                    Engineering Scope &amp; Key Deliverables
                  </h4>
                  <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#A9ADB8]">
                    {selectedProject.architectureHighlights.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FEC544]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-4 border-t border-[#232935] pt-5 sm:grid-cols-2">
                  <div>
                    <h4 className="text-xs font-medium text-[#8E95A5]">Technology Stack</h4>
                    <p className="mt-1.5 font-mono text-xs leading-relaxed text-[#FEC544]">
                      {selectedProject.stack.join(' · ')}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-[#8E95A5]">Ownership Scope</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#D6DAE2]">
                      {selectedProject.scope}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-end gap-4 border-t border-[#232935] pt-5">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="min-h-[42px] rounded-full border border-[#232935] px-5 py-2 text-sm font-medium text-[#D6DAE2] transition-colors hover:border-[#FEC544]/50 hover:text-[#FDFEFF] cursor-pointer"
                >
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex min-h-[42px] items-center rounded-full bg-[#FEC544] px-6 py-2 text-sm font-semibold text-[#070D1B] transition-colors hover:bg-[#FFD369]"
                >
                  Discuss Similar Project
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

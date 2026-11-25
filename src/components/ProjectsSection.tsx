import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Sparkles, X } from 'lucide-react';
import {
  PROJECT_FILTERS,
  PROJECTS,
  type ProjectCategory,
  type ProjectItem,
} from '../data/portfolioData';
import { filterProjects } from '../utils/portfolioLogic';
import { ProjectDiagram } from './ProjectDiagram';

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const visibleProjects = useMemo(
    () => filterProjects(PROJECTS, activeFilter),
    [activeFilter]
  );

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
    <section id="portfolio" className="scroll-mt-10 py-14 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#111315] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#14171D] dark:text-[#F3F5F7]">
            <Sparkles className="h-3.5 w-3.5 text-[#00B853] dark:text-[#00E061]" aria-hidden="true" />
            <span>Work Highlights</span>
          </div>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.02em] text-[#111315] dark:text-white sm:text-4xl">
            Production systems shipped
          </h2>
        </div>

        {/* Clean Single-Row Filter */}
        <div
          role="group"
          aria-label="Filter projects by stack"
          className="flex flex-wrap items-center gap-1.5"
        >
          {PROJECT_FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter.id)}
                className={`min-h-[36px] rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#111315] text-[#00E061] dark:bg-[#00E061] dark:text-[#0B0D10]'
                    : 'border border-black/[0.09] bg-white text-[#5F6570] hover:border-black/25 hover:text-[#111315] dark:border-white/10 dark:bg-[#14171D] dark:text-[#A3AAB7] dark:hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Isak Bold Dark-Framed Showcase Cards on Clean Canvas */}
      <div data-testid="project-grid" className="mt-8 space-y-6">
        {visibleProjects.map((project) => (
          <article
            key={project.id}
            data-testid={`project-card-${project.id}`}
            className="group overflow-hidden rounded-[28px] border border-black/[0.08] bg-[#0E1116] p-5 text-white shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/[0.09] sm:p-6"
          >
            <ProjectDiagram type={project.diagramType} compact={!project.featured} />

            <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#00E061]">
                  {project.index} · {project.categoryLabel}
                </p>
                <h3 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-white">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#A7AEBC]">
                  {project.subtitle}
                </p>
                <p className="mt-2.5 font-mono text-xs text-[#858D9C]">
                  {project.stack.join(' · ')}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                aria-label={`Inspect ${project.title} architecture`}
                className="inline-flex min-h-[42px] shrink-0 items-center gap-1.5 self-start rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#111315] transition-colors hover:bg-[#00E061] sm:self-end whitespace-nowrap cursor-pointer"
              >
                <span>Inspect</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Clean Architecture Detail Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProject(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-black/10 bg-white p-6 text-[#111315] shadow-2xl dark:border-white/10 dark:bg-[#13161C] dark:text-[#F3F5F7] sm:p-7">
            <div className="flex items-start justify-between gap-4 border-b border-black/[0.08] pb-4 dark:border-white/10">
              <div>
                <p className="font-mono text-xs font-medium text-[#00A846] dark:text-[#00E061]">
                  {selectedProject.index} · {selectedProject.categoryLabel}
                </p>
                <h3
                  id="project-modal-title"
                  className="mt-1 font-display text-2xl font-semibold text-[#111315] dark:text-white"
                >
                  {selectedProject.title}
                </h3>
                <p className="mt-0.5 text-sm text-[#5F6570] dark:text-[#9CA3AF]">
                  {selectedProject.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 text-[#111315] transition-colors hover:border-[#00C853] hover:text-[#00A846] dark:border-white/15 dark:text-[#F3F5F7] dark:hover:text-[#00E061] cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5">
              <ProjectDiagram type={selectedProject.diagramType} />
            </div>

            <p className="mt-5 text-sm leading-relaxed text-[#4B515C] dark:text-[#C4C9D4]">
              {selectedProject.summary}
            </p>

            <div className="mt-5">
              <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#00A846] dark:text-[#00E061]">
                Engineering Scope
              </h4>
              <ul className="mt-2.5 space-y-2 text-sm text-[#4B515C] dark:text-[#B4BAC6]">
                {selectedProject.architectureHighlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00C853]"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.08] pt-4 dark:border-white/10">
              <p className="font-mono text-xs text-[#646870] dark:text-[#9CA3AF]">
                {selectedProject.stack.join(' · ')}
              </p>
              <a
                href="#contact"
                onClick={() => setSelectedProject(null)}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#00E061] px-4 py-2 text-xs font-semibold text-[#0B0D10] transition-colors hover:bg-[#19F073] whitespace-nowrap"
              >
                <span>Discuss similar build</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

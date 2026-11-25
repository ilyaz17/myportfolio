import { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import {
  PROJECT_FILTERS,
  PROJECTS,
  type ProjectCategory,
  type ProjectItem,
} from '../data/portfolioData';
import { filterProjects } from '../utils/portfolioLogic';
import { ProjectDiagram } from './ProjectDiagram';

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
      id="projects"
      aria-labelledby="projects-heading"
      className="mx-auto max-w-6xl px-6 py-16 sm:py-20"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#9BA3B2]">01. Selected Work</p>
          <h2
            id="projects-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F4F5F7] sm:text-4xl"
          >
            Production Systems &amp; Enterprise Platforms
          </h2>
        </div>

        <div
          role="group"
          aria-label="Filter projects by technology stack"
          className="inline-flex max-w-full flex-wrap sm:flex-nowrap items-center gap-1 rounded-xl border border-white/10 bg-[#111317] p-1 shrink-0"
        >
          {PROJECT_FILTERS.map((filter) => {
            const isActive = activeCategory === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(filter.id)}
                className={`min-h-[40px] rounded-lg px-3 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#F2B705] text-[#08090B]'
                    : 'text-[#A8B0BD] hover:text-[#F4F5F7]'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-xs text-[#949DAA] tabular-nums" data-testid="project-count">
        Showing {visibleProjects.length} of {PROJECTS.length} production systems
      </p>

      <div
        className={`mt-8 grid grid-cols-1 gap-6 ${
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
              className={`group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111317] p-6 transition-colors duration-200 hover:border-white/25 ${colSpanClass}`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 text-xs text-[#949DAA]">
                  <span className="font-mono tabular-nums">
                    {project.index} · {project.categoryLabel}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[#F4F5F7]">
                  {project.title}
                </h3>

                <p className="mt-1 text-sm font-medium text-[#C5CBD6]">
                  {project.subtitle}
                </p>

                <div className="mt-5">
                  <ProjectDiagram type={project.diagramType} compact={!isBentoWide} />
                </div>

                <p className="mt-5 text-sm leading-relaxed text-[#B4BAC5]">
                  {project.summary}
                </p>
              </div>

              <div className="mt-6 border-t border-white/8 pt-4">
                <p className="text-xs leading-relaxed text-[#949DAA]">
                  {project.stack.join(' · ')}
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`Inspect architecture for ${project.title}`}
                  className="mt-4 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-[#F2B705] transition-colors hover:text-[#FFD043] whitespace-nowrap cursor-pointer"
                >
                  <span>Inspect Architecture</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProject(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-[#111317] p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="font-mono text-xs text-[#949DAA] tabular-nums">
                  {selectedProject.index} · {selectedProject.categoryLabel}
                </p>
                <h3
                  id="project-modal-title"
                  className="mt-2 font-display text-2xl font-semibold text-[#F4F5F7] sm:text-3xl"
                >
                  {selectedProject.title}
                </h3>
                <p className="mt-1 text-sm text-[#C5CBD6]">{selectedProject.subtitle}</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 text-[#D1D6DF] transition-colors hover:border-white/30 hover:text-[#F4F5F7] cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6">
              <ProjectDiagram type={selectedProject.diagramType} />
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <h4 className="text-xs font-medium text-[#9BA3B2]">System Overview</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#D1D6DF]">
                  {selectedProject.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-medium text-[#9BA3B2]">
                  Engineering Scope &amp; Key Deliverables
                </h4>
                <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#B4BAC5]">
                  {selectedProject.architectureHighlights.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-[#F2B705]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
                <div>
                  <h4 className="text-xs font-medium text-[#9BA3B2]">Technology Stack</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#F4F5F7]">
                    {selectedProject.stack.join(' · ')}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-[#9BA3B2]">Ownership Scope</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#D1D6DF]">
                    {selectedProject.scope}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-end gap-4 border-t border-white/10 pt-5">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="min-h-[40px] rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-[#D1D6DF] transition-colors hover:border-white/30 hover:text-[#F4F5F7] cursor-pointer"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={() => setSelectedProject(null)}
                className="inline-flex min-h-[40px] items-center rounded-lg bg-[#F2B705] px-5 py-2 text-sm font-semibold text-[#08090B] transition-colors hover:bg-[#FFD043]"
              >
                Discuss Similar Project
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { SKILL_GROUPS } from '../data/portfolioData';
import { countMatchedSkills, filterSkillGroups } from '../utils/portfolioLogic';

const QUICK_FILTERS = ['Laravel', 'React', 'MySQL', 'AWS', 'MCP'];

const BENTO_SPAN_BY_ID: Record<string, string> = {
  frontend: 'md:col-span-3 lg:col-span-3',
  backend: 'md:col-span-3 lg:col-span-3',
  database: 'md:col-span-2 lg:col-span-2',
  devops: 'md:col-span-2 lg:col-span-2',
  'ai-tools': 'md:col-span-2 lg:col-span-2',
  os: 'md:col-span-3 lg:col-span-3',
  tools: 'md:col-span-3 lg:col-span-3',
};

export function SkillsSection() {
  const [query, setQuery] = useState('');

  const filteredGroups = filterSkillGroups(SKILL_GROUPS, query);
  const totalSkills = countMatchedSkills(SKILL_GROUPS);
  const matchedSkills = countMatchedSkills(filteredGroups);
  const isUnfiltered = query.trim().length === 0;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-t border-white/10"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-22">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs font-medium text-[#F2B705]">03. Technical Skills</p>
            <h2
              id="skills-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F7F8FA] sm:text-4xl"
            >
              Stack &amp; Tooling Matrix
            </h2>
          </div>

          <div className="w-full lg:w-96">
            <label htmlFor="skill-search-input" className="sr-only">
              Search technical skills
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#8D96A6]"
                aria-hidden="true"
              />
              <input
                id="skill-search-input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter skills (e.g. Laravel, AWS, MCP)"
                className="min-h-[44px] w-full rounded-xl border border-white/14 bg-[#111319] py-2.5 pr-10 pl-10 text-sm text-[#F7F8FA] placeholder:text-[#7E8796] transition-colors focus:border-[#F2B705] focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear skill search"
                  className="absolute top-1/2 right-2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#9BA3B2] transition-colors hover:text-[#F7F8FA] cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#8D96A6]">
              <span>Quick filter:</span>
              {QUICK_FILTERS.map((term) => {
                const active = query.trim().toLowerCase() === term.toLowerCase();
                return (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(active ? '' : term)}
                    aria-pressed={active}
                    className={`rounded px-1.5 py-0.5 font-mono transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#F2B705] font-semibold text-[#08090B]'
                        : 'text-[#B4BAC5] hover:text-[#F2B705]'
                    }`}
                  >
                    {term}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-[#949DAA] tabular-nums" data-testid="skill-count">
          Showing {matchedSkills} of {totalSkills} technical skills across {filteredGroups.length}{' '}
          {filteredGroups.length === 1 ? 'domain' : 'domains'}
        </p>

        {filteredGroups.length === 0 ? (
          <div
            role="status"
            className="surface-card mt-8 rounded-2xl p-10 text-center"
          >
            <p className="font-display text-lg font-semibold text-[#F7F8FA]">
              No matching skills found for “{query}”
            </p>
            <p className="mt-2 text-sm text-[#9BA3B2]">
              Try searching for Laravel, React, MySQL, AWS, Payment Gateway, or Claude Code.
            </p>
            <button
              type="button"
              onClick={() => setQuery('')}
              className="mt-5 inline-flex min-h-[40px] items-center rounded-lg bg-[#F2B705] px-4 py-2 text-sm font-semibold text-[#08090B] transition-colors hover:bg-[#FFD043] cursor-pointer"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div
            className={`mt-8 grid grid-cols-1 gap-5 ${
              isUnfiltered
                ? 'md:grid-cols-6'
                : filteredGroups.length === 1
                  ? 'md:grid-cols-1'
                  : 'md:grid-cols-2'
            }`}
          >
            {filteredGroups.map((group, idx) => (
              <section
                key={group.id}
                aria-label={`${group.category} skills`}
                className={`surface-card flex flex-col justify-between rounded-2xl p-6 transition-colors duration-150 hover:border-white/20 ${
                  isUnfiltered ? BENTO_SPAN_BY_ID[group.id] ?? 'md:col-span-3' : ''
                }`}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3.5">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-[#F2B705] tabular-nums">
                        0{idx + 1}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-[#F7F8FA]">
                        {group.category}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-[#949DAA] tabular-nums whitespace-nowrap shrink-0">
                      {group.skills.length} {group.skills.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-[#949DAA]">
                    {group.description}
                  </p>
                </div>

                <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-sm font-medium text-[#E8ECF2]">
                  {group.skills.map((skill, skillIdx) => (
                    <li key={skill} className="inline-flex items-center gap-3">
                      <span>{skill}</span>
                      {skillIdx < group.skills.length - 1 && (
                        <span aria-hidden="true" className="text-[#F2B705]/45">
                          ·
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

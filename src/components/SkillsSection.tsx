import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { SKILL_GROUPS } from '../data/portfolioData';
import { countMatchedSkills, filterSkillGroups } from '../utils/portfolioLogic';
import { SectionHeading } from './SectionHeading';

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

const MAX_DOMAIN_SKILLS = Math.max(...SKILL_GROUPS.map((group) => group.skills.length));

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
      className="scroll-mt-18 bg-[#070D1B] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading id="skills-heading" title="SKILLS" />

        {/* Devis 2-column intro + signature horizontal gold capability bars */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-5">
            <h3 className="font-display text-3xl font-semibold leading-tight text-[#FDFEFF] sm:text-[34px]">
              All the stack &amp; tooling I work with in production.
            </h3>
            <p className="mt-4 text-[15px] leading-[1.75] text-[#A9ADB8]">
              Over 5+ years of shipping web platforms across Laravel/PHP, MERN, relational
              databases, AWS cloud storage, and modern AI-assisted development workflows. Search any
              skill below to inspect exact coverage.
            </p>

            <div className="mt-7">
              <label htmlFor="skill-search-input" className="sr-only">
                Search technical skills
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#8E95A5]"
                  aria-hidden="true"
                />
                <input
                  id="skill-search-input"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Filter skills (e.g. Laravel, AWS, MCP)"
                  className="min-h-[46px] w-full rounded-lg border border-[#232935] bg-[#101624] py-2.5 pr-10 pl-11 text-sm text-[#FDFEFF] placeholder:text-[#7A8294] transition-colors focus:border-[#FEC544] focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear skill search"
                    className="absolute top-1/2 right-2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#A9ADB8] transition-colors hover:text-[#FDFEFF] cursor-pointer"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-[#8E95A5]">
                <span>Quick filter:</span>
                {QUICK_FILTERS.map((term) => {
                  const active = query.trim().toLowerCase() === term.toLowerCase();
                  return (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(active ? '' : term)}
                      aria-pressed={active}
                      className={`rounded px-2 py-0.5 font-mono transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#FEC544] font-semibold text-[#070D1B]'
                          : 'text-[#C5CAD4] hover:text-[#FEC544]'
                      }`}
                    >
                      {term}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column — Devis thin horizontal gold bars using real tool counts (no fabricated %) */}
          <div className="space-y-5 lg:col-span-7">
            {SKILL_GROUPS.map((group) => {
              const widthPercent = Math.round((group.skills.length / MAX_DOMAIN_SKILLS) * 100);
              const isMatched = filteredGroups.some((item) => item.id === group.id);
              return (
                <div
                  key={group.id}
                  className={`transition-opacity duration-150 ${
                    isUnfiltered || isMatched ? 'opacity-100' : 'opacity-35'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-base font-semibold text-[#FDFEFF]">
                      {group.category}
                    </span>
                    <span className="font-mono text-xs font-medium text-[#FEC544] tabular-nums whitespace-nowrap shrink-0">
                      {group.skills.length} {group.skills.length === 1 ? 'skill' : 'skills'}
                    </span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="mt-2.5 h-[2px] w-full overflow-hidden bg-[#232935]"
                  >
                    <div
                      className="h-full bg-[#FEC544] transition-all duration-300"
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-10 text-xs text-[#8E95A5] tabular-nums" data-testid="skill-count">
          Showing {matchedSkills} of {totalSkills} technical skills across {filteredGroups.length}{' '}
          {filteredGroups.length === 1 ? 'domain' : 'domains'}
        </p>

        {filteredGroups.length === 0 ? (
          <div
            role="status"
            className="devis-card mt-6 rounded-xl p-10 text-center"
          >
            <p className="font-display text-lg font-semibold text-[#FDFEFF]">
              No matching skills found for “{query}”
            </p>
            <p className="mt-2 text-sm text-[#A9ADB8]">
              Try searching for Laravel, React, MySQL, AWS, Payment Gateway, or Claude Code.
            </p>
            <button
              type="button"
              onClick={() => setQuery('')}
              className="mt-5 inline-flex min-h-[42px] items-center rounded-full bg-[#FEC544] px-6 py-2 text-sm font-semibold text-[#070D1B] transition-colors hover:bg-[#FFD369] cursor-pointer"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div
            className={`mt-6 grid grid-cols-1 gap-5 ${
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
                className={`devis-card devis-card-hover flex flex-col justify-between rounded-xl p-6 ${
                  isUnfiltered ? BENTO_SPAN_BY_ID[group.id] ?? 'md:col-span-3' : ''
                }`}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-[#232935] pb-3.5">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-[#FEC544] tabular-nums">
                        0{idx + 1}
                      </span>
                      <h4 className="font-display text-lg font-semibold text-[#FDFEFF]">
                        {group.category}
                      </h4>
                    </div>
                    <span className="font-mono text-xs text-[#8E95A5] tabular-nums whitespace-nowrap shrink-0">
                      {group.skills.length} {group.skills.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-[#A9ADB8]">
                    {group.description}
                  </p>
                </div>

                <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-sm font-medium text-[#FDFEFF]">
                  {group.skills.map((skill, skillIdx) => (
                    <li key={skill} className="inline-flex items-center gap-3">
                      <span>{skill}</span>
                      {skillIdx < group.skills.length - 1 && (
                        <span aria-hidden="true" className="text-[#FEC544]/55">
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

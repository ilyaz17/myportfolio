import { useMemo, useState } from 'react';
import { Cpu, Search, X } from 'lucide-react';
import { SKILL_GROUPS } from '../data/portfolioData';
import { countMatchedSkills, filterSkillGroups } from '../utils/portfolioLogic';

const QUICK_FILTERS = ['Claude Code', 'MCP', 'Laravel', 'React', 'MySQL', 'AWS'];

export function SkillsSection() {
  const [query, setQuery] = useState('');

  const filteredGroups = useMemo(
    () => filterSkillGroups(SKILL_GROUPS, query),
    [query]
  );

  const totalSkills = useMemo(() => countMatchedSkills(SKILL_GROUPS), []);
  const matchedSkills = useMemo(
    () => countMatchedSkills(filteredGroups),
    [filteredGroups]
  );

  return (
    <section id="skills" className="scroll-mt-10 py-14 sm:py-16">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#111315] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#14171D] dark:text-[#F3F5F7]">
        <Cpu className="h-3.5 w-3.5 text-[#00B853] dark:text-[#00E061]" aria-hidden="true" />
        <span>Tech Stack</span>
      </div>

      <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.18] tracking-[-0.02em] text-[#111315] dark:text-white sm:text-4xl">
        See how my expertise with these tools drives faster delivery
      </h2>

      {/* Clean Search + Quick Filter Strip */}
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <label htmlFor="skill-search-input" className="sr-only">
            Filter technical skills
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737882]"
            aria-hidden="true"
          />
          <input
            id="skill-search-input"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tools (Claude Code, Laravel, React...)"
            className="min-h-[42px] w-full rounded-full border border-black/[0.1] bg-[#F7F8FA] py-2 pl-10 pr-9 text-sm text-[#111315] placeholder:text-[#737882] transition-colors focus:border-[#00C853] focus:bg-white focus:outline-none dark:border-white/10 dark:bg-[#14171D] dark:text-[#F3F5F7] dark:placeholder:text-[#7B8291] dark:focus:border-[#00E061]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear skill search"
              className="absolute right-2.5 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#737882] hover:text-[#111315] dark:hover:text-white cursor-pointer"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        <p
          data-testid="skill-count"
          className="font-mono text-xs text-[#646870] tabular-nums dark:text-[#9CA3AF]"
        >
          {matchedSkills} of {totalSkills} skills
        </p>
      </div>

      {/* Quick Filter Links */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[#737882] dark:text-[#8E95A3]">Quick:</span>
        {QUICK_FILTERS.map((term) => {
          const isSelected = query.trim().toLowerCase() === term.toLowerCase();
          return (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(isSelected ? '' : term)}
              className={`min-h-[30px] rounded-full px-3 py-1 font-medium transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-[#111315] text-[#00E061] dark:bg-[#00E061] dark:text-[#0B0D10]'
                  : 'bg-[#F3F4F6] text-[#4B515C] hover:bg-black/10 hover:text-[#111315] dark:bg-[#161A22] dark:text-[#B4BAC6] dark:hover:text-white'
              }`}
            >
              {term}
            </button>
          );
        })}
      </div>

      {/* Clean Minimalist Domain Rows */}
      {filteredGroups.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-black/[0.08] bg-[#F7F8FA] p-8 text-center dark:border-white/10 dark:bg-[#14171D]">
          <p className="font-display text-base font-semibold text-[#111315] dark:text-white">
            No skills match “{query}”
          </p>
          <p className="mt-1 text-sm text-[#646870] dark:text-[#9CA3AF]">
            Try searching Laravel, React, Claude Code, MCP, MySQL, or AWS.
          </p>
          <button
            type="button"
            onClick={() => setQuery('')}
            className="mt-4 inline-flex min-h-[38px] items-center rounded-full bg-[#111315] px-4 py-1.5 text-xs font-semibold text-[#00E061] dark:bg-[#00E061] dark:text-[#0B0D10] cursor-pointer"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div className="mt-8 divide-y divide-black/[0.08] border-y border-black/[0.08] dark:divide-white/[0.08] dark:border-white/[0.08]">
          {filteredGroups.map((group) => {
            const isAiGroup = group.id === 'ai-tools';
            return (
              <div
                key={group.id}
                className={`py-5 transition-colors ${
                  isAiGroup
                    ? '-mx-4 rounded-2xl bg-[#F4FBF7] px-4 dark:bg-[#0F1B15]'
                    : ''
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-display text-lg font-semibold text-[#111315] dark:text-white">
                      {group.category}
                    </h3>
                    {isAiGroup && (
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#009944] dark:text-[#00E061]">
                        AI-First
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-[#737882] tabular-nums dark:text-[#8E95A3]">
                    {group.skills.length} tools
                  </span>
                </div>

                <p className="mt-1 text-xs text-[#646870] dark:text-[#9CA3AF]">
                  {group.description}
                </p>

                <p className="mt-3 text-sm font-medium leading-relaxed text-[#1E2228] dark:text-[#E5E7EB]">
                  {group.skills.join('  ·  ')}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

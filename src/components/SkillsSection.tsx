import { useState } from 'react';
import { Cpu, Search, X } from 'lucide-react';
import { motion } from 'motion/react';
import { AI_WORKFLOW_PILLARS, SKILL_GROUPS } from '../data/portfolioData';
import { countMatchedSkills, filterSkillGroups } from '../utils/portfolioLogic';
import { SectionHeading } from './SectionHeading';

const QUICK_FILTERS = ['Claude Code', 'MCP', 'Laravel', 'React', 'MySQL', 'AWS'];
const MAX_DOMAIN_SKILLS = Math.max(...SKILL_GROUPS.map((group) => group.skills.length));
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function SkillsSection() {
  const [query, setQuery] = useState('');

  const filteredGroups = filterSkillGroups(SKILL_GROUPS, query);
  const totalSkills = countMatchedSkills(SKILL_GROUPS);
  const matchedSkills = countMatchedSkills(filteredGroups);
  const isUnfiltered = query.trim().length === 0;

  // Promote AI-Assisted Dev Tools to the top spotlight when present in filtered results
  const aiGroup = filteredGroups.find((group) => group.id === 'ai-tools');
  const otherGroups = filteredGroups.filter((group) => group.id !== 'ai-tools');

  // Show AI-Assisted Dev Tools first in the overview bars as well so recruiters notice it immediately
  const orderedBarGroups = [
    ...SKILL_GROUPS.filter((group) => group.id === 'ai-tools'),
    ...SKILL_GROUPS.filter((group) => group.id !== 'ai-tools'),
  ];

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-18 bg-[#070D1B] py-20 sm:py-24 overflow-x-clip"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading id="skills-heading" title="SKILLS" />

        {/* Devis 2-column intro + signature animated horizontal gold capability bars */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="lg:col-span-5"
          >
            <h3 className="font-display text-3xl font-semibold leading-tight text-[#FDFEFF] sm:text-[34px]">
              Full-stack craft, accelerated by AI-assisted engineering.
            </h3>
            <p className="mt-4 text-[15px] leading-[1.75] text-[#A9ADB8]">
              5+ years shipping Laravel/PHP and MERN platforms—combined with daily production use
              of Claude Code, Codex, OpenCode, Antigravity, reusable Skills, and MCP plugins to
              deliver cleaner architecture faster.
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
                  placeholder="Filter skills (e.g. Claude Code, MCP, Laravel)"
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
          </motion.div>

          {/* Right column — Devis thin horizontal gold bars animating smoothly on scroll */}
          <div className="space-y-5 lg:col-span-7">
            {orderedBarGroups.map((group, idx) => {
              const widthPercent = Math.round((group.skills.length / MAX_DOMAIN_SKILLS) * 100);
              const isMatched = filteredGroups.some((item) => item.id === group.id);
              const isAiDomain = group.id === 'ai-tools';
              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: EASE_OUT }}
                  className={`transition-opacity duration-150 ${
                    isUnfiltered || isMatched ? 'opacity-100' : 'opacity-35'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex flex-wrap items-baseline gap-2.5">
                      <span
                        className={`font-display text-base font-semibold ${
                          isAiDomain ? 'text-[#FEC544]' : 'text-[#FDFEFF]'
                        }`}
                      >
                        {group.category}
                      </span>
                      {isAiDomain && (
                        <span className="font-mono text-[11px] text-[#A9ADB8]">
                          · Highlighted Workflow Edge
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs font-medium text-[#FEC544] tabular-nums whitespace-nowrap shrink-0">
                      {group.skills.length} {group.skills.length === 1 ? 'skill' : 'skills'}
                    </span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="mt-2.5 h-[2px] w-full overflow-hidden bg-[#232935]"
                  >
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 'some' }}
                      transition={{ duration: 0.65, delay: 0.1 + idx * 0.06, ease: EASE_OUT }}
                      className="h-full origin-left bg-[#FEC544]"
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                </motion.div>
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
              Try searching for Claude Code, Codex, MCP, Laravel, React, MySQL, or AWS.
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
          <div className="mt-6 space-y-6">
            {/* Promoted Featured Spotlight Card for AI-Assisted Dev Tools */}
            {aiGroup && (
              <motion.section
                aria-label={`${aiGroup.category} skills`}
                data-testid="ai-skills-spotlight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="relative overflow-hidden rounded-2xl border border-[#FEC544]/45 bg-gradient-to-br from-[#141D33] via-[#101624] to-[#0C1220] p-6 sm:p-8"
              >
                <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#FEC544] bg-[#070D1B] text-[#FEC544]">
                      <Cpu className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-mono text-xs font-medium tracking-wider text-[#FEC544] uppercase">
                        Featured Advantage · AI-Augmented Full-Stack Delivery
                      </p>
                      <h4 className="mt-1 font-display text-2xl font-semibold text-[#FDFEFF]">
                        {aiGroup.category}
                      </h4>
                      <p className="mt-1 text-sm text-[#A9ADB8]">{aiGroup.description}</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-medium text-[#FEC544] tabular-nums whitespace-nowrap shrink-0">
                    {aiGroup.skills.length} {aiGroup.skills.length === 1 ? 'tool' : 'tools'} active
                  </span>
                </div>

                {isUnfiltered ? (
                  <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {AI_WORKFLOW_PILLARS.map((pillar) => (
                      <div
                        key={pillar.title}
                        className="rounded-xl border border-[#232935] bg-[#0A101E]/75 p-5"
                      >
                        <h5 className="font-display text-base font-semibold text-[#FDFEFF]">
                          {pillar.title}
                        </h5>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#A9ADB8]">
                          {pillar.summary}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs font-medium text-[#FEC544]">
                          {pillar.tools.map((tool, idx) => (
                            <li key={tool} className="inline-flex items-center gap-3">
                              <span>{tool}</span>
                              {idx < pillar.tools.length - 1 && (
                                <span aria-hidden="true" className="text-white/25">
                                  ·
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-mono text-sm font-medium text-[#FEC544]">
                    {aiGroup.skills.map((skill, skillIdx) => (
                      <li key={skill} className="inline-flex items-center gap-3">
                        <span>{skill}</span>
                        {skillIdx < aiGroup.skills.length - 1 && (
                          <span aria-hidden="true" className="text-white/30">
                            ·
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.section>
            )}

            {/* Remaining 6 engineering skill domains in symmetric 2-column grid */}
            {otherGroups.length > 0 && (
              <div
                className={`grid grid-cols-1 gap-5 ${
                  otherGroups.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2'
                }`}
              >
                {otherGroups.map((group, idx) => (
                  <motion.section
                    key={group.id}
                    aria-label={`${group.category} skills`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 'some' }}
                    transition={{ duration: 0.42, delay: idx * 0.05, ease: EASE_OUT }}
                    className="devis-card devis-card-hover flex flex-col justify-between rounded-xl p-6"
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
                  </motion.section>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

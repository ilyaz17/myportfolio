import type { ProjectCategory, ProjectItem, SkillGroup } from '../data/portfolioData';

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface ContactValidationResult {
  isValid: boolean;
  errors: ContactFormErrors;
}

export function filterProjects(
  projects: ProjectItem[],
  category: ProjectCategory
): ProjectItem[] {
  if (category === 'all') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}

export function filterSkillGroups(
  groups: SkillGroup[],
  rawQuery: string
): SkillGroup[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) {
    return groups;
  }

  return groups
    .map((group) => {
      const skillMatches = group.skills.filter((skill) =>
        skill.toLowerCase().includes(query)
      );
      const categoryMatches = group.category.toLowerCase().includes(query);
      const matchingSkills =
        skillMatches.length > 0
          ? skillMatches
          : categoryMatches
            ? group.skills
            : [];

      return {
        ...group,
        skills: matchingSkills,
      };
    })
    .filter((group) => group.skills.length > 0);
}

export function countMatchedSkills(groups: SkillGroup[]): number {
  return groups.reduce((total, group) => total + group.skills.length, 0);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactForm(
  input: ContactFormInput
): ContactValidationResult {
  const errors: ContactFormErrors = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedMessage = input.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (trimmedMessage.length < 10) {
    errors.message = 'Please include a short message (at least 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildMailtoHref(
  recipientEmail: string,
  input: ContactFormInput
): string {
  const subject = input.subject.trim() || `Portfolio Inquiry from ${input.name.trim()}`;
  const bodyLines = [
    `Name: ${input.name.trim()}`,
    `Email: ${input.email.trim()}`,
    '',
    input.message.trim(),
  ];
  const params = new URLSearchParams({
    subject,
    body: bodyLines.join('\n'),
  });
  return `mailto:${recipientEmail}?${params.toString().replace(/\+/g, '%20')}`;
}

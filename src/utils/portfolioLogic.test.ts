import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS, SKILL_GROUPS } from '../data/portfolioData';
import {
  buildMailtoHref,
  countMatchedSkills,
  filterProjects,
  filterSkillGroups,
  validateContactForm,
} from './portfolioLogic';

test('filterProjects returns all projects when category is all', () => {
  const result = filterProjects(PROJECTS, 'all');
  assert.equal(result.length, 5);
});

test('filterProjects filters MERN and Laravel/PHP projects accurately', () => {
  const mern = filterProjects(PROJECTS, 'mern');
  assert.deepEqual(
    mern.map((item) => item.id),
    ['tngasagl']
  );

  const laravel = filterProjects(PROJECTS, 'laravel-php');
  assert.deepEqual(
    laravel.map((item) => item.id),
    ['campuseye-erp', 'builders-proman']
  );

  const enterprise = filterProjects(PROJECTS, 'enterprise-pos');
  assert.deepEqual(
    enterprise.map((item) => item.id),
    ['kot', 'masscool']
  );
});

test('filterSkillGroups matches individual skills case-insensitively', () => {
  const result = filterSkillGroups(SKILL_GROUPS, 'payment');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'backend');
  assert.deepEqual(result[0].skills, ['Payment Gateway Integration']);
  assert.equal(countMatchedSkills(result), 1);
});

test('filterSkillGroups returns empty list when no skills match', () => {
  const result = filterSkillGroups(SKILL_GROUPS, 'nonexistent-quantum-stack');
  assert.equal(result.length, 0);
  assert.equal(countMatchedSkills(result), 0);
});

test('filterSkillGroups returns full skill list for whitespace query', () => {
  const result = filterSkillGroups(SKILL_GROUPS, '   ');
  assert.equal(result.length, SKILL_GROUPS.length);
  assert.ok(countMatchedSkills(result) >= 35);
});

test('validateContactForm catches empty and invalid fields without bypassing validation', () => {
  const emptyResult = validateContactForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.message);

  const badEmailResult = validateContactForm({
    name: 'Karthik',
    email: 'invalid-email',
    subject: 'Project',
    message: 'Looking for a Laravel developer for an ERP build.',
  });
  assert.equal(badEmailResult.isValid, false);
  assert.equal(badEmailResult.errors.name, undefined);
  assert.ok(badEmailResult.errors.email);
  assert.equal(badEmailResult.errors.message, undefined);
});

test('validateContactForm passes on valid inquiry payload and builds clean mailto href', () => {
  const payload = {
    name: 'Arun Kumar',
    email: 'arun@company.in',
    subject: 'Full-Stack Role',
    message: 'We would like to discuss a senior Laravel & React role.',
  };
  const validResult = validateContactForm(payload);
  assert.equal(validResult.isValid, true);
  assert.deepEqual(validResult.errors, {});

  const href = buildMailtoHref('mohammedilyassa@gmail.com', payload);
  assert.ok(href.startsWith('mailto:mohammedilyassa@gmail.com?'));
  assert.ok(href.includes('Full-Stack%20Role'));
  assert.ok(href.includes('Arun%20Kumar'));
});

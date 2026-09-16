import { describe, it, expect } from 'vitest';
import {
  calculateFundingPercent,
  parseAmount,
  formatCurrency,
  validateProject,
  createSponsorshipProject,
} from './sponsorshipUtils';

describe('sponsorshipUtils', () => {
  describe('parseAmount', () => {
    it('parses numeric values correctly', () => {
      expect(parseAmount(5000)).toBe(5000);
      expect(parseAmount(0)).toBe(0);
    });

    it('parses currency strings with symbols and commas', () => {
      expect(parseAmount('GHS 45,000')).toBe(45000);
      expect(parseAmount('$12,500.50')).toBe(12500.5);
      expect(parseAmount('  20,000  ')).toBe(20000);
    });

    it('handles edge cases and invalid formats safely', () => {
      expect(parseAmount('')).toBe(0);
      expect(parseAmount('invalid')).toBe(0);
      expect(parseAmount(-100)).toBe(0);
    });
  });

  describe('calculateFundingPercent', () => {
    it('calculates accurate percentages with numeric inputs', () => {
      expect(calculateFundingPercent(28500, 45000)).toBe(63);
      expect(calculateFundingPercent(41200, 60000)).toBe(69);
      expect(calculateFundingPercent(0, 50000)).toBe(0);
      expect(calculateFundingPercent(50000, 50000)).toBe(100);
    });

    it('calculates accurate percentages with formatted strings', () => {
      expect(calculateFundingPercent('GHS 28,500', 'GHS 45,000')).toBe(63);
      expect(calculateFundingPercent('GHS 0', 'GHS 10,000')).toBe(0);
    });

    it('caps percentage at 100 or handles overflow gracefully', () => {
      expect(calculateFundingPercent(60000, 50000)).toBe(100);
    });

    it('handles zero or negative target without dividing by zero', () => {
      expect(calculateFundingPercent(1000, 0)).toBe(0);
      expect(calculateFundingPercent(1000, -500)).toBe(0);
      expect(calculateFundingPercent(0, 0)).toBe(0);
    });
  });

  describe('formatCurrency', () => {
    it('formats numbers into clean currency strings', () => {
      expect(formatCurrency(45000)).toBe('GHS 45,000');
      expect(formatCurrency(120000, 'USD')).toBe('USD 120,000');
      expect(formatCurrency(0)).toBe('GHS 0');
    });

    it('formats existing strings if already matching or converts raw numeric strings', () => {
      expect(formatCurrency('50000')).toBe('GHS 50,000');
      expect(formatCurrency('GHS 50,000')).toBe('GHS 50,000');
    });
  });

  describe('validateProject', () => {
    it('validates a valid project payload', () => {
      const valid = {
        title: 'Community Outreach',
        category: 'Compassion & Mercy',
        target: 'GHS 50,000',
        raised: 'GHS 10,000',
        description: 'Providing meals and water.',
        impact: '100+ families',
      };
      const result = validateProject(valid);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors).length).toBe(0);
    });

    it('flags errors for missing required fields', () => {
      const invalid = {
        title: '',
        category: '',
        target: '',
        description: '',
      };
      const result = validateProject(invalid);
      expect(result.isValid).toBe(false);
      expect(result.errors.title).toBeDefined();
      expect(result.errors.category).toBeDefined();
      expect(result.errors.target).toBeDefined();
      expect(result.errors.description).toBeDefined();
    });

    it('flags error for non-positive target amount', () => {
      const invalid = {
        title: 'Project',
        category: 'Missions',
        target: '0',
        description: 'Desc',
      };
      const result = validateProject(invalid);
      expect(result.isValid).toBe(false);
      expect(result.errors.target).toBeDefined();
    });
  });

  describe('createSponsorshipProject', () => {
    it('creates a fully formed project with auto percent calculation and ID', () => {
      const input = {
        title: 'Youth Center Renovation',
        category: 'Education',
        target: 'GHS 40,000',
        raised: 'GHS 20,000',
        percent: 0,
        description: 'Renovating the youth center.',
        impact: '500+ youth empowered',
      };

      const project = createSponsorshipProject(input, 'proj-test-1');
      expect(project.id).toBe('proj-test-1');
      expect(project.title).toBe('Youth Center Renovation');
      expect(project.percent).toBe(50);
      expect(project.target).toBe('GHS 40,000');
      expect(project.raised).toBe('GHS 20,000');
    });
  });
});

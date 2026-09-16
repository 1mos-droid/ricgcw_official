import { SponsorshipProject } from '../data/churchData';

/**
 * Parses numeric value from a currency string or number (e.g. "GHS 45,000" -> 45000).
 */
export function parseAmount(val: string | number): number {
  if (typeof val === 'number') {
    return isNaN(val) || val < 0 ? 0 : val;
  }
  if (!val || typeof val !== 'string') {
    return 0;
  }
  // Strip out currency prefixes and commas
  const cleaned = val.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) || parsed < 0 ? 0 : parsed;
}

/**
 * Calculates funding percentage rounded to nearest whole number (0 to 100).
 */
export function calculateFundingPercent(raised: string | number, target: string | number): number {
  const raisedNum = parseAmount(raised);
  const targetNum = parseAmount(target);

  if (targetNum <= 0) return 0;
  const percent = Math.round((raisedNum / targetNum) * 100);
  return Math.max(0, Math.min(100, percent));
}

/**
 * Formats a number or string into a currency string (e.g. 45000 -> "GHS 45,000").
 */
export function formatCurrency(amount: string | number, prefix: string = 'GHS'): string {
  if (typeof amount === 'string') {
    const trimmed = amount.trim();
    if (trimmed.startsWith(prefix) && trimmed.includes(',')) {
      return trimmed;
    }
  }
  const numeric = parseAmount(amount);
  return `${prefix} ${numeric.toLocaleString('en-US')}`;
}

/**
 * Validates sponsorship project form input.
 */
export function validateProject(project: Partial<SponsorshipProject>): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!project.title || !project.title.trim()) {
    errors.title = 'Project title is required';
  }
  if (!project.category || !project.category.trim()) {
    errors.category = 'Category is required';
  }
  if (!project.target || parseAmount(project.target) <= 0) {
    errors.target = 'Target amount must be greater than 0';
  }
  if (!project.description || !project.description.trim()) {
    errors.description = 'Description is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Creates a normalized sponsorship project object with ID and percent calculated.
 */
export function createSponsorshipProject(data: Omit<SponsorshipProject, 'id'>, customId?: string): SponsorshipProject {
  const target = formatCurrency(data.target);
  const raised = formatCurrency(data.raised || '0');
  const percent = calculateFundingPercent(raised, target);

  return {
    id: customId || `proj-${Date.now()}`,
    title: data.title.trim(),
    category: data.category.trim(),
    target,
    raised,
    percent,
    description: data.description.trim(),
    impact: data.impact ? data.impact.trim() : 'Impacting kingdom lives',
  };
}

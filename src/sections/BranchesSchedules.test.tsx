import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BRANCHES } from '../data/churchData';
import { BranchesSchedules } from './BranchesSchedules';

let branches = BRANCHES;
vi.mock('../context/ChurchContext', () => ({ useChurch: () => ({ branches }) }));

afterEach(() => {
  cleanup();
  branches = BRANCHES;
});

describe('Branch service directory', () => {
  it('highlights the main gathering and keeps the complete week available', () => {
    const branch = BRANCHES[0];
    const main = branch.services.find(service => service.isMain)!;
    branches = [{ ...branch, services: [...branch.services.filter(service => !service.isMain), main] }];
    render(<BranchesSchedules />);

    const article = screen.getByRole('article');
    expect(within(article).getByText(main.time)).toBeVisible();
    const details = article.querySelector('details')!;
    expect(details).not.toHaveAttribute('open');
    expect(within(details).getByText('Full weekly schedule')).toBeVisible();
    for (const service of branch.services) {
      expect(within(details).getByText(service.name)).toBeInTheDocument();
    }
  });

  it('keeps directions available when a branch has no published services', () => {
    const onOpenBranchModal = vi.fn();
    branches = [{ ...BRANCHES[0], services: [] }];
    render(<BranchesSchedules onOpenBranchModal={onOpenBranchModal} />);

    expect(screen.getByText(/Contact our secretariat for current service hours/)).toBeInTheDocument();
    screen.getByRole('button', { name: /Service times & directions/ }).click();
    expect(onOpenBranchModal).toHaveBeenCalledWith(BRANCHES[0].id);
  });

  it('uses Sunday when services have no main gathering marker', () => {
    const branch = BRANCHES[0];
    branches = [{ ...branch, services: [...branch.services].reverse().map(service => ({ ...service, isMain: false })) }];
    render(<BranchesSchedules />);

    const sunday = branch.services.find(service => service.day === 'Sunday')!;
    expect(screen.getByText(sunday.time)).toBeVisible();
  });
});

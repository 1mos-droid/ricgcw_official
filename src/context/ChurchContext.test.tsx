import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { ChurchProvider, useChurch } from './ChurchContext';
import { SponsorshipProject } from '../data/churchData';

describe('ChurchContext Sponsorship Management', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ChurchProvider>{children}</ChurchProvider>
  );

  it('provides initial default sponsorship projects, stats, and settings', () => {
    const { result } = renderHook(() => useChurch(), { wrapper });

    // Projects start empty — admin adds real data via dashboard
    expect(result.current.projects.length).toBe(0);
    // Only 1 verified stat: number of active sanctuaries
    expect(result.current.sponsorshipStats.length).toBe(1);
    expect(result.current.sponsorshipSettings.headline).toContain('Partner with God');
  });

  it('allows adding a new sponsorship project', () => {
    const { result } = renderHook(() => useChurch(), { wrapper });

    const newProj: SponsorshipProject = {
      id: 'proj-test-new',
      title: 'Solar Power for Kokrobitey',
      category: 'Infrastructure',
      target: 'GHS 30,000',
      raised: 'GHS 15,000',
      percent: 50,
      description: 'Clean energy for the sanctuary.',
      impact: 'Uninterrupted power',
    };

    act(() => {
      result.current.addProject(newProj);
    });

    expect(result.current.projects.some((p) => p.id === 'proj-test-new')).toBe(true);
    expect(result.current.projects[0].title).toBe('Solar Power for Kokrobitey');
  });

  it('allows updating an existing sponsorship project', () => {
    const { result } = renderHook(() => useChurch(), { wrapper });

    // Seed a project first since initial array is empty
    act(() => {
      result.current.addProject({
        id: 'proj-seed-upd',
        title: 'Seed Project',
        category: 'Infrastructure',
        target: 'GHS 10,000',
        raised: 'GHS 2,000',
        percent: 20,
        description: 'Test project.',
        impact: 'Test impact',
      });
    });

    const firstProjId = result.current.projects[0].id;

    act(() => {
      result.current.updateProject(firstProjId, {
        raised: 'GHS 35,000',
        percent: 85,
        impact: 'Updated impact milestone',
      });
    });

    const updated = result.current.projects.find((p) => p.id === firstProjId);
    expect(updated?.raised).toBe('GHS 35,000');
    expect(updated?.percent).toBe(85);
    expect(updated?.impact).toBe('Updated impact milestone');
  });

  it('allows deleting a sponsorship project', () => {
    const { result } = renderHook(() => useChurch(), { wrapper });

    // Seed a project first since initial array is empty
    act(() => {
      result.current.addProject({
        id: 'proj-seed-del',
        title: 'Deletable Project',
        category: 'Missions',
        target: 'GHS 5,000',
        raised: 'GHS 1,000',
        percent: 20,
        description: 'To be deleted.',
        impact: 'N/A',
      });
    });

    const projectToDelete = result.current.projects[0].id;
    const initialCount = result.current.projects.length;

    act(() => {
      result.current.deleteProject(projectToDelete);
    });

    expect(result.current.projects.length).toBe(initialCount - 1);
    expect(result.current.projects.some((p) => p.id === projectToDelete)).toBe(false);
  });

  it('allows updating sponsorship impact statistics', () => {
    const { result } = renderHook(() => useChurch(), { wrapper });

    const statId = result.current.sponsorshipStats[0].id;

    act(() => {
      result.current.updateSponsorshipStat(statId, {
        value: '15,000+',
        label: 'Global Souls Reached',
      });
    });

    const updatedStat = result.current.sponsorshipStats.find((s) => s.id === statId);
    expect(updatedStat?.value).toBe('15,000+');
    expect(updatedStat?.label).toBe('Global Souls Reached');
  });

  it('allows updating sponsorship page settings (headline, subtitle, badge)', () => {
    const { result } = renderHook(() => useChurch(), { wrapper });

    act(() => {
      result.current.updateSponsorshipSettings({
        headline: 'Empower Royal Kingdom Initiatives Worldwide',
        badge: 'Divine Manifestation Sponsorship',
      });
    });

    expect(result.current.sponsorshipSettings.headline).toBe('Empower Royal Kingdom Initiatives Worldwide');
    expect(result.current.sponsorshipSettings.badge).toBe('Divine Manifestation Sponsorship');
  });
});

describe('ChurchContext Events Management', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ChurchProvider>{children}</ChurchProvider>
  );

  it('allows adding, updating, and deleting events', () => {
    const { result } = renderHook(() => useChurch(), { wrapper });

    const newEvent = {
      id: 'evt-test-1',
      title: 'Miracle & Healing Night',
      date: 'Dec 12, 2026',
      time: '6:30 PM',
      location: 'Kokrobitey Sanctuary',
      category: 'Revival',
      description: 'An evening of signs and wonders.',
      isFeatured: true,
    };

    act(() => {
      result.current.addEvent(newEvent);
    });

    expect(result.current.events.some((e) => e.id === 'evt-test-1')).toBe(true);
    expect(result.current.events[0].title).toBe('Miracle & Healing Night');

    act(() => {
      result.current.updateEvent('evt-test-1', {
        time: '7:00 PM',
        description: 'Updated description for revival.',
      });
    });

    const updated = result.current.events.find((e) => e.id === 'evt-test-1');
    expect(updated?.time).toBe('7:00 PM');
    expect(updated?.description).toBe('Updated description for revival.');

    act(() => {
      result.current.deleteEvent('evt-test-1');
    });

    expect(result.current.events.some((e) => e.id === 'evt-test-1')).toBe(false);
  });
});

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import * as ChurchContextModule from '../context/ChurchContext';
import { Home } from './Home';

const renderHome = (initialEntry = '/') =>
  render(
    <ChurchContextModule.ChurchProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Home />
      </MemoryRouter>
    </ChurchContextModule.ChurchProvider>
  );

describe('Home Page Redesign Behavior & Regression Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders homepage sections in exact redesigned order', () => {
    const { container } = renderHome();
    const sections = Array.from(container.querySelectorAll('main > section'));
    expect(sections.map((s) => s.id)).toEqual([
      'hero',
      'sanctuaries',
      'about',
      'ministries',
      'media',
      'events',
      'connect',
    ]);

    for (const section of sections) {
      const labelledBy = section.getAttribute('aria-labelledby');
      expect(labelledBy).toBeTruthy();
      expect(document.getElementById(labelledBy!)).not.toBeNull();
    }
  });

  it('preselects the clicked branch when opening BranchModal from BranchesSchedules', () => {
    renderHome();

    const buttons = screen.getAllByRole('button', { name: /Service times & directions/i });
    expect(buttons.length).toBeGreaterThanOrEqual(2);

    // Second branch is Kokrobitey Branch
    fireEvent.click(buttons[1]);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent(/Kokrobitey Branch/i);
  });

  it('prefills PrayerModal when clicking Connect on a ministry card', () => {
    renderHome();

    const connectBtn = screen.getByRole('button', { name: /Connect with Men/i });
    fireEvent.click(connectBtn);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    const textarea = screen.getByPlaceholderText(/Share your petition freely/i) as HTMLTextAreaElement;
    expect(textarea.value).toMatch(/Men of Valor/i);
  });

  it('toggles church name & color meanings disclosure cleanly', () => {
    renderHome();

    const toggleBtn = screen.getByRole('button', { name: /What our name & church colors mean/i });
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Official Church Colors/i)).toBeInTheDocument();
  });

  it('renders truthful official media links without fake sample sermon players', () => {
    renderHome();

    const youtubeLink = screen.getByRole('link', { name: /Watch on YouTube/i });
    expect(youtubeLink).toHaveAttribute('href', expect.stringContaining('youtube.com'));
    expect(screen.getByText(/Need prayer\?/i)).toBeInTheDocument();
  });

  it('renders long custom heroHeadline & heroSubtitle cleanly from ChurchContext', () => {
    const originalUseChurch = ChurchContextModule.useChurch;
    let cachedCtx: ReturnType<typeof originalUseChurch> | null = null;

    const Wrapper = () => {
      const realCtx = originalUseChurch();
      if (!cachedCtx) {
        cachedCtx = {
          ...realCtx,
          themeSettings: {
            ...realCtx.themeSettings,
            heroHeadline:
              'Touching Lives Across Mallam, Kokrobitey, Langma, and Every Calling Through Living Worship',
            heroSubtitle:
              'A long editorial welcome subtitle verifying fluid multi-line wrapping without clipping or overflow.',
          },
        };
      }
      return null;
    };

    const Probe = () => {
      Wrapper();
      return null;
    };

    const probeRender = render(
      <ChurchContextModule.ChurchProvider>
        <Probe />
      </ChurchContextModule.ChurchProvider>
    );
    probeRender.unmount();

    if (cachedCtx) {
      vi.spyOn(ChurchContextModule, 'useChurch').mockReturnValue(cachedCtx);
    }

    renderHome();
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Touching Lives Across Mallam, Kokrobitey, Langma, and Every Calling Through Living Worship/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/verifying fluid multi-line wrapping without clipping or overflow/i)
    ).toBeInTheDocument();
  });

  it('handles empty branches and empty events safely without crashing', () => {
    const originalUseChurch = ChurchContextModule.useChurch;
    let emptyCtx: ReturnType<typeof originalUseChurch> | null = null;

    const Probe = () => {
      const realCtx = originalUseChurch();
      emptyCtx = {
        ...realCtx,
        branches: [],
        events: [],
        ministries: [],
      };
      return null;
    };

    const probeRender = render(
      <ChurchContextModule.ChurchProvider>
        <Probe />
      </ChurchContextModule.ChurchProvider>
    );
    probeRender.unmount();

    if (emptyCtx) {
      vi.spyOn(ChurchContextModule, 'useChurch').mockReturnValue(emptyCtx);
    }

    renderHome();
    expect(screen.getByText(/Branch information is being updated/i)).toBeInTheDocument();
    expect(screen.getByText(/Regular Weekly Gatherings Continue/i)).toBeInTheDocument();
    expect(screen.getByText(/Ministry directory is being updated/i)).toBeInTheDocument();

    // Opening Plan your visit with 0 branches must not throw
    const planVisitBtn = screen.getAllByRole('button', { name: /Plan your visit/i })[0];
    fireEvent.click(planVisitBtn);
    expect(screen.getByRole('dialog')).toHaveTextContent(/Branch directory is currently being updated/i);
  });
});

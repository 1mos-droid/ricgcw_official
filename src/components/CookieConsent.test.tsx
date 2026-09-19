import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CookieConsent } from './CookieConsent';

describe('CookieConsent Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <CookieConsent />
      </BrowserRouter>
    );
  };

  it('renders cookie consent banner when no prior consent is stored', async () => {
    vi.useFakeTimers();
    renderComponent();

    // Advance timer past the 800ms display delay
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/Cookie & Privacy Notice/i)).toBeInTheDocument();
    expect(screen.getByText(/Accept All/i)).toBeInTheDocument();
    expect(screen.getByText(/Essential Only/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Privacy Policy/i })).toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('link', { name: /Terms of Service/i })).toHaveAttribute('href', '/terms');

    vi.useRealTimers();
  });

  it('saves all preferences when "Accept All" is clicked', async () => {
    vi.useFakeTimers();
    renderComponent();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    const acceptBtn = screen.getByRole('button', { name: /Accept All/i });
    fireEvent.click(acceptBtn);

    const saved = localStorage.getItem('ricgcw_cookie_consent');
    expect(saved).not.toBeNull();
    const parsed = JSON.parse(saved!);
    expect(parsed.essential).toBe(true);
    expect(parsed.analytics).toBe(true);

    vi.useRealTimers();
  });

  it('saves essential only preferences when "Essential Only" is clicked', async () => {
    vi.useFakeTimers();
    renderComponent();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    const essentialBtn = screen.getByRole('button', { name: /^Essential Only$/i });
    fireEvent.click(essentialBtn);

    const saved = localStorage.getItem('ricgcw_cookie_consent');
    expect(saved).not.toBeNull();
    const parsed = JSON.parse(saved!);
    expect(parsed.essential).toBe(true);
    expect(parsed.analytics).toBe(false);

    vi.useRealTimers();
  });

  it('toggles detailed preferences panel', async () => {
    vi.useFakeTimers();
    renderComponent();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    const prefBtn = screen.getByRole('button', { name: /Preferences/i });
    fireEvent.click(prefBtn);

    expect(screen.getByText(/Essential Operations \(Required\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Anonymous Usage Analytics/i)).toBeInTheDocument();

    vi.useRealTimers();
  });
});

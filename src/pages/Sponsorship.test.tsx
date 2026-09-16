import { describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChurchProvider } from '../context/ChurchContext';
import { Sponsorship } from './Sponsorship';

describe('Sponsorship Page Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderSponsorship = () => {
    return render(
      <ChurchProvider>
        <BrowserRouter>
          <Sponsorship />
        </BrowserRouter>
      </ChurchProvider>
    );
  };

  it('renders dynamic headline, subtitle, and badge from context', () => {
    renderSponsorship();

    expect(screen.getByText(/Kingdom Partnership & Sponsorship/i)).toBeInTheDocument();
    expect(screen.getByText(/Partner with God's Work to/i)).toBeInTheDocument();
  });

  it('renders the verified active sanctuaries stat', () => {
    renderSponsorship();

    // Only verified fact: 3 active sanctuaries
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Active Sanctuaries')).toBeInTheDocument();
  });

  it('shows empty projects message when no projects exist', () => {
    renderSponsorship();

    // With empty projects array, shows the empty state message
    expect(screen.getByText(/No Projects Currently Active/i)).toBeInTheDocument();
  });

  it('opens giving modal via the main CTA button', () => {
    renderSponsorship();

    const giveButton = screen.getByRole('button', { name: /Give Online Now/i });
    expect(giveButton).toBeInTheDocument();
    fireEvent.click(giveButton);

    // Modal opens
    expect(screen.getByText(/Online Giving Portal/i)).toBeInTheDocument();
  });
});

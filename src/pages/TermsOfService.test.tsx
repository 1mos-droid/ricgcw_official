import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChurchProvider } from '../context/ChurchContext';
import { TermsOfService } from './TermsOfService';

describe('TermsOfService Page Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <ChurchProvider>
        <BrowserRouter>
          <TermsOfService />
        </BrowserRouter>
      </ChurchProvider>
    );
  };

  it('renders official church terms of service sections', () => {
    renderComponent();

    expect(screen.getByRole('heading', { name: /Terms of Service & Ministry Guidelines/i })).toBeInTheDocument();
    expect(screen.getByText(/Acceptance of Terms/i)).toBeInTheDocument();
    expect(screen.getByText(/Ministry Purpose & Respectful Use/i)).toBeInTheDocument();
    expect(screen.getByText(/Online Giving, Tithes & Project Sponsorship/i)).toBeInTheDocument();
    expect(screen.getByText(/Intellectual Property & Media Rights/i)).toBeInTheDocument();
    expect(screen.getByText(/External Links & Third-Party Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Governing Law & Jurisdiction/i)).toBeInTheDocument();
    expect(screen.getByText(/Secretariat Inquiries/i)).toBeInTheDocument();
  });

  it('links correctly back to the homepage', () => {
    renderComponent();

    const homeLink = screen.getByRole('link', { name: /Return to Homepage/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });
});

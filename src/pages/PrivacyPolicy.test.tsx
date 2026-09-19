import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChurchProvider } from '../context/ChurchContext';
import { PrivacyPolicy } from './PrivacyPolicy';

describe('PrivacyPolicy Page Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <ChurchProvider>
        <BrowserRouter>
          <PrivacyPolicy />
        </BrowserRouter>
      </ChurchProvider>
    );
  };

  it('renders official church privacy policy sections', () => {
    renderComponent();

    expect(screen.getByRole('heading', { name: /Privacy Policy & Data Protection/i })).toBeInTheDocument();
    expect(screen.getByText(/Information We Collect/i)).toBeInTheDocument();
    expect(screen.getByText(/Pastoral Confidentiality & Prayer Petitions/i)).toBeInTheDocument();
    expect(screen.getByText(/Online Giving & Payment Security/i)).toBeInTheDocument();
    expect(screen.getByText(/Cookies & Local Storage Usage/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Rights & Data Deletion/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Pastoral Secretariat/i)).toBeInTheDocument();
  });

  it('displays accurate pastoral and church contact details', () => {
    renderComponent();

    expect(screen.getAllByText(/innercourtch@gmail\.com/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\+233 244 485 7403/i).length).toBeGreaterThan(0);
  });
});

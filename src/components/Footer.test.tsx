import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from './Footer';
import { ChurchProvider } from '../context/ChurchContext';

describe('Footer Component', () => {
  it('renders copyright and creator portfolio link with secure attributes', () => {
    render(
      <MemoryRouter>
        <ChurchProvider>
          <Footer />
        </ChurchProvider>
      </MemoryRouter>
    );

    // Verify Church Copyright
    expect(
      screen.getByText(/Rhema Inner Court Gospel Church \(Worldwide\)\. All rights reserved\./i)
    ).toBeInTheDocument();

    // Verify "Built by Kumesi Moses Mawulolo"
    const authorLink = screen.getByRole('link', { name: /Kumesi Moses Mawulolo/i });
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute('href', 'https://damise-1free.web.app');
    expect(authorLink).toHaveAttribute('target', '_blank');
    expect(authorLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Verify Privacy Policy & Terms of Service links
    expect(screen.getByRole('link', { name: /Privacy Policy/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Terms of Service/i })).toBeInTheDocument();
  });
});

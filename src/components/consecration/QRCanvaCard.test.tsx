import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { QRCanvaCard } from './QRCanvaCard';

// Mock QRCode library
vi.mock('qrcode', () => ({
  default: {
    toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,mockqrcodedata'),
  },
}));

describe('QRCanvaCard Component (Admin / Media Hub)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the framed Canva poster and points to /program by default', () => {
    render(<QRCanvaCard />);

    expect(screen.getAllByText(/Rhema Inner Court Gospel Church \(Worldwide\)/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/CONSECRATION AND ORDINATION SERVICE/i)).toBeInTheDocument();
    expect(screen.getByText(/Download Canva Poster \(PNG\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Scan to View Program Lineup/i)).toBeInTheDocument();
    expect(screen.getByText(/https:\/\/ricgcw\.me\/program/i)).toBeInTheDocument();
  });

  it('renders theme selector buttons', () => {
    render(<QRCanvaCard />);

    expect(screen.getByText(/Royal Midnight/i)).toBeInTheDocument();
    expect(screen.getByText(/Imperial Velvet/i)).toBeInTheDocument();
    expect(screen.getByText(/Classic Print/i)).toBeInTheDocument();
  });
});

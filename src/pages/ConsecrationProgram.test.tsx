import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChurchProvider } from '../context/ChurchContext';
import { ConsecrationProgram } from './ConsecrationProgram';

// Mock QRCode library to avoid canvas issues in jsdom
vi.mock('qrcode', () => ({
  default: {
    toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,mockqrdata'),
    toString: vi.fn().mockResolvedValue('<svg>mock qr</svg>'),
  },
}));

describe('ConsecrationProgram Page Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const renderConsecrationProgram = () => {
    return render(
      <ChurchProvider>
        <BrowserRouter>
          <ConsecrationProgram />
        </BrowserRouter>
      </ChurchProvider>
    );
  };

  it('renders the solemn consecration hero header and church details', () => {
    renderConsecrationProgram();

    expect(screen.getAllByText(/Rhema Inner Court Gospel Church \(Worldwide\)/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Solemn Episcopal Consecration & Sacred Ordination Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Divine Manifestation \(2026\)/i)).toBeInTheDocument();
  });

  it('renders the 33-step Consecration lineup by default', () => {
    renderConsecrationProgram();

    // Key milestone steps
    expect(screen.getAllByText(/OPENING PRAYER \/ INTRODUCTION OF PROCESSION/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/SONG MINISTRATION & ORDER OF PROCESSION/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/CONSECRATION VOWS/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/PRAYERS AND ANOINTING OF CANDIDATE WITH HORN OF OIL/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/PRESENTATION OF THE VESTMENTS/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/RECESSIONAL SONG: TO GOD BE THE GLORY/i)[0]).toBeInTheDocument();
  });

  it('renders Order of Procession details with sacred members', () => {
    renderConsecrationProgram();

    expect(screen.getAllByText(/Assisting Ceremonial Ministers/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Bearer of the Consecrating Bishop’s Sword/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Bearer of the Consecrating Bishop’s Staff/i)[0]).toBeInTheDocument();
  });

  it('switches to Ordination of Pastors tab and displays 13 steps', () => {
    renderConsecrationProgram();

    const pastorsTab = screen.getByRole('button', { name: /Ordination of Pastors/i });
    fireEvent.click(pastorsTab);

    expect(screen.getAllByText(/DECLARATION OF PURPOSE/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/The Holy Call & Scriptural Qualifications of a Pastor/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/PRESENTATION OF CERTIFICATES, CROSS AND BIBLE/i)[0]).toBeInTheDocument();
  });

  it('switches to Canva Poster & QR Hub tab', () => {
    renderConsecrationProgram();

    const canvaTab = screen.getByRole('button', { name: /Canva Poster & QR Hub/i });
    fireEvent.click(canvaTab);

    expect(screen.getByText(/Custom Framed Canva Poster & QR Code/i)).toBeInTheDocument();
    expect(screen.getByText(/Download Canva Poster \(PNG\)/i)).toBeInTheDocument();
  });

  it('switches to Sacred Regalia & Symbols tab', () => {
    renderConsecrationProgram();

    const symbolsTab = screen.getByRole('button', { name: /Sacred Regalia & Symbols/i });
    fireEvent.click(symbolsTab);

    expect(screen.getAllByText(/The Episcopal Mitre/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/The Horn of Consecration Oil/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/The Pastoral Staff \(Crozier\)/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/The Consecrating Sword/i)[0]).toBeInTheDocument();
  });

  it('switches to Liturgical Scriptures & Hymns tab', () => {
    renderConsecrationProgram();

    const hymnsTab = screen.getByRole('button', { name: /Liturgical Scriptures & Hymn/i });
    fireEvent.click(hymnsTab);

    expect(screen.getAllByText(/To God Be The Glory/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Hebrews 5:1-10/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Isaiah 42:1-9/i)[0]).toBeInTheDocument();
  });

  it('filters program steps via search input', () => {
    renderConsecrationProgram();

    const searchInput = screen.getByPlaceholderText(/Search program steps, scriptures, prayers.../i);
    fireEvent.change(searchInput, { target: { value: 'Horn of Oil' } });

    expect(screen.getByText(/PRAYERS AND ANOINTING OF CANDIDATE WITH HORN OF OIL/i)).toBeInTheDocument();
    expect(screen.queryByText(/FIRST SCRIPTURE READING \(Hebrews 5:1-10\)/i)).not.toBeInTheDocument();
  });

  it('opens the QR Code Hub modal when clicking QR & Share button', () => {
    renderConsecrationProgram();

    const qrButtons = screen.getAllByText(/QR & Share/i);
    fireEvent.click(qrButtons[0]);

    expect(screen.getByText(/Digital Program QR Code & Canva Hub/i)).toBeInTheDocument();
    expect(screen.getByText(/Unlisted Endpoint Protected/i)).toBeInTheDocument();
    expect(screen.getByText(/Download Canva Poster \(PNG\)/i)).toBeInTheDocument();
  });

  it('allows setting active step and marking items as done', () => {
    renderConsecrationProgram();

    // Click on step 1 to make it active
    const setStepButtons = screen.getAllByText(/Set as Current Step/i);
    fireEvent.click(setStepButtons[0]);

    expect(screen.getByText(/CURRENTLY IN SESSION \/ ACTIVE STEP/i)).toBeInTheDocument();
  });
});

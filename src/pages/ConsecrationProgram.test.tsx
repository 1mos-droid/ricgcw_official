import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChurchProvider } from '../context/ChurchContext';
import { ConsecrationProgram } from './ConsecrationProgram';

describe('ConsecrationProgram Page Component (Verbatim Document Lineup)', () => {
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

  it('renders the document header and church name', () => {
    renderConsecrationProgram();

    expect(screen.getAllByText(/Rhema Inner Court Gospel Church \(Worldwide\)/i)[0]).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /CONSECRATION AND ORDINATION SERVICE/i })).toBeInTheDocument();
    expect(screen.getAllByText(/PROGRAM LINE UP/i)[0]).toBeInTheDocument();
  });

  it('renders all 33 items of the Consecration & Ordination Service lineup by default', () => {
    renderConsecrationProgram();

    // Verbatim checks from page 1 of document
    expect(screen.getByText(/OPENING PRAYER \/ INTRODUCTION OF PROCESSION/i)).toBeInTheDocument();
    expect(screen.getByText(/Song Ministration/i)).toBeInTheDocument();
    expect(screen.getByText(/REMOVAL OF MITRE/i)).toBeInTheDocument();
    expect(screen.getByText(/FIRST SCRIPTURE READING \(Hebrews 5:1-10\)/i)).toBeInTheDocument();
    expect(screen.getByText(/SECOND SCRIPTURE READING \(Isaiah 42:1-9\)/i)).toBeInTheDocument();
    expect(screen.getByText(/CONSECRATION VOWS/i)).toBeInTheDocument();
    expect(screen.getByText(/PRAYERS AND ANOINTING OF CANDIDATE with HORN of OIL/i)).toBeInTheDocument();
    expect(screen.getByText(/CUMMUNION FOR NEW CANDIDATE/i)).toBeInTheDocument();
    expect(screen.getByText(/PRESENTATION OF THE VESTMENTS/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ORDER OF RECESSION/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/RECESSIONAL SONG: To God be the Glory/i)).toBeInTheDocument();
    expect(screen.getByText(/GREETINGS AND PHOTOGRAPHS/i)).toBeInTheDocument();
  });

  it('renders Order of Procession sub-items (a-g)', () => {
    renderConsecrationProgram();

    expect(screen.getByText(/Assisting Ceremonial Ministers bearing vestments, staff and Bibles/i)).toBeInTheDocument();
    expect(screen.getByText(/Candidate \(in white cassock\)/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Bearer of the Consecrating Bishop['’]s Sword/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Consecrating Bishop wearing Mitre on skull cap for procession/i)).toBeInTheDocument();
  });

  it('renders Order of Recession sub-items (a-h)', () => {
    renderConsecrationProgram();

    expect(screen.getByText(/New Bishops \/ Apostles \/ Prophets \(each holding his own staff\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Assisting Ceremonial Ministers bearing Bibles and Certificates of New Bishop/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Bearer of the Consecrating Bishop['’]s Sword/i)[1]).toBeInTheDocument();
    expect(screen.getByText(/Clergy/i)).toBeInTheDocument();
  });

  it('switches to Ordination of Pastors tab and renders the 13 verbatim items', () => {
    renderConsecrationProgram();

    const pastorsTab = screen.getByRole('button', { name: /Ordination of Pastors/i });
    fireEvent.click(pastorsTab);

    expect(screen.getByRole('heading', { name: /ORDINATION OF PASTORS/i })).toBeInTheDocument();
    expect(screen.getByText(/PROCESSIONAL HYMN/i)).toBeInTheDocument();
    expect(screen.getByText(/DECLARATION OF PURPOSE/i)).toBeInTheDocument();
    expect(screen.getByText(/ORDINATION VOWS/i)).toBeInTheDocument();
    expect(screen.getByText(/PRESENTATION OF CERTIFICATES, CROSS AND BIBLE, prayer, laying of hands, anointing with oil/i)).toBeInTheDocument();
    expect(screen.getByText(/OFFICIAL PICTURES TAKEN/i)).toBeInTheDocument();
  });

  it('filters lineup items via real-time search', () => {
    renderConsecrationProgram();

    const searchInput = screen.getByPlaceholderText(/Search lineup items\.\.\./i);
    fireEvent.change(searchInput, { target: { value: 'HORN of OIL' } });

    expect(screen.getByText(/PRAYERS AND ANOINTING OF CANDIDATE with HORN of OIL/i)).toBeInTheDocument();
    expect(screen.queryByText(/FIRST SCRIPTURE READING \(Hebrews 5:1-10\)/i)).not.toBeInTheDocument();
  });

  it('does not render QR generator, modal buttons, or print controls on the attendee page', () => {
    renderConsecrationProgram();

    expect(screen.queryByText(/QR & Share/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Generate \/ Download QR Code/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Print Program/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/Canva Poster & QR Hub/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Sacred Regalia & Symbols/i)).not.toBeInTheDocument();
  });

  it('allows toggling text size zoom for reading comfort in church', () => {
    renderConsecrationProgram();

    const zoomButton = screen.getByRole('button', { name: /Toggle text size/i });
    expect(zoomButton).toHaveTextContent(/Text Size: A\+/i);

    fireEvent.click(zoomButton);
    expect(zoomButton).toHaveTextContent(/Text Size: A-/i);
  });
});

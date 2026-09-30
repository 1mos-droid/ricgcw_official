import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChurchProvider } from '../../context/ChurchContext';
import { ProgramLineupManager } from './ProgramLineupManager';

describe('ProgramLineupManager Component (Admin Liturgy Studio)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const renderManager = () => {
    return render(
      <ChurchProvider>
        <BrowserRouter>
          <ProgramLineupManager />
        </BrowserRouter>
      </ChurchProvider>
    );
  };

  it('renders Consecration and Pastors ordination service tabs with counts', () => {
    renderManager();

    expect(screen.getByRole('button', { name: /Consecration Service \(33\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ordination of Pastors \(13\)/i })).toBeInTheDocument();
  });

  it('renders Consecration title and allows editing it', () => {
    renderManager();

    expect(screen.getByText(/CONSECRATION AND ORDINATION SERVICE/i)).toBeInTheDocument();
    expect(screen.getByText(/PROGRAM LINE UP/i)).toBeInTheDocument();

    const editTitlesBtn = screen.getByRole('button', { name: /Edit Service Titles/i });
    fireEvent.click(editTitlesBtn);

    const titleInput = screen.getByDisplayValue(/CONSECRATION AND ORDINATION SERVICE/i);
    fireEvent.change(titleInput, { target: { value: 'UPDATED CONSECRATION LITURGY' } });

    const saveBtn = screen.getByRole('button', { name: /Save Titles/i });
    fireEvent.click(saveBtn);

    expect(screen.getByText('UPDATED CONSECRATION LITURGY')).toBeInTheDocument();
  });

  it('allows adding a new lineup item', () => {
    renderManager();

    const addBtn = screen.getByRole('button', { name: /Add Lineup Item/i });
    fireEvent.click(addBtn);

    expect(screen.getByText(/Add New Lineup Item/i)).toBeInTheDocument();

    const titleInput = screen.getByPlaceholderText(/e\.g\. OPENING PRAYER \/ INTRODUCTION OF PROCESSION/i);
    fireEvent.change(titleInput, { target: { value: 'SPECIAL EPISCOPAL BENEDICTION' } });

    const submitBtn = screen.getByRole('button', { name: /Add Item to Lineup/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('SPECIAL EPISCOPAL BENEDICTION')).toBeInTheDocument();
    // Count should increase to 34
    expect(screen.getByRole('button', { name: /Consecration Service \(34\)/i })).toBeInTheDocument();
  });

  it('allows editing an existing lineup item', () => {
    renderManager();

    // First item is "OPENING PRAYER / INTRODUCTION OF PROCESSION"
    const editBtns = screen.getAllByRole('button', { name: /Edit/i });
    // First edit button corresponds to item #1
    fireEvent.click(editBtns[1]); // [0] is "Edit Service Titles"

    expect(screen.getByText(/Edit Lineup Item #1/i)).toBeInTheDocument();

    const titleInput = screen.getByDisplayValue(/OPENING PRAYER \/ INTRODUCTION OF PROCESSION/i);
    fireEvent.change(titleInput, { target: { value: 'SOLEMN OPENING PRAYER & PROCESSION CALL' } });

    const updateBtn = screen.getByRole('button', { name: /Update Lineup Item/i });
    fireEvent.click(updateBtn);

    expect(screen.getByText('SOLEMN OPENING PRAYER & PROCESSION CALL')).toBeInTheDocument();
  });

  it('allows reordering items using Move Down and Move Up', () => {
    renderManager();

    // Move item #1 down
    const moveDownBtns = screen.getAllByTitle('Move Down');
    expect(moveDownBtns.length).toBeGreaterThan(0);
    fireEvent.click(moveDownBtns[0]);

    // Item #2 was "Song Ministration", now it should be order 1
    const items = screen.getAllByRole('heading', { level: 5 });
    expect(items[0].textContent).toBe('Song Ministration');
  });

  it('allows deleting an item with confirmation modal', () => {
    renderManager();

    const deleteBtns = screen.getAllByRole('button', { name: /Delete/i });
    fireEvent.click(deleteBtns[0]);

    // Delete modal appears
    expect(screen.getByText(/Delete Program Item\?/i)).toBeInTheDocument();

    const confirmDeleteBtn = screen.getByRole('button', { name: /Yes, Delete Item/i });
    fireEvent.click(confirmDeleteBtn);

    // Item count decreases to 32
    expect(screen.getByRole('button', { name: /Consecration Service \(32\)/i })).toBeInTheDocument();
  });

  it('switches to Ordination of Pastors tab and displays 13 items', () => {
    renderManager();

    const pastorsTab = screen.getByRole('button', { name: /Ordination of Pastors \(13\)/i });
    fireEvent.click(pastorsTab);

    expect(screen.getByRole('heading', { level: 4, name: /ORDINATION OF PASTORS/i })).toBeInTheDocument();
    expect(screen.getByText(/PROCESSIONAL HYMN/i)).toBeInTheDocument();
    expect(screen.getByText(/ORDINATION VOWS/i)).toBeInTheDocument();
  });

  it('resets lineup to official document defaults when requested', () => {
    renderManager();

    // First delete an item to make it 32
    const deleteBtns = screen.getAllByRole('button', { name: /Delete/i });
    fireEvent.click(deleteBtns[0]);
    fireEvent.click(screen.getByRole('button', { name: /Yes, Delete Item/i }));

    expect(screen.getByRole('button', { name: /Consecration Service \(32\)/i })).toBeInTheDocument();

    // Click Reset to Document Defaults
    const resetBtn = screen.getByRole('button', { name: /Reset to Document Defaults/i });
    fireEvent.click(resetBtn);

    expect(screen.getByText(/Reset to Official Document\?/i)).toBeInTheDocument();

    const confirmResetBtn = screen.getByRole('button', { name: /Reset to Defaults/i });
    fireEvent.click(confirmResetBtn);

    // Should be restored to 33 items
    expect(screen.getByRole('button', { name: /Consecration Service \(33\)/i })).toBeInTheDocument();
  });
});

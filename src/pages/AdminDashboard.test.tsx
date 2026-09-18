import { describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChurchProvider } from '../context/ChurchContext';
import { AdminDashboard } from './AdminDashboard';

describe('AdminDashboard Sponsorship Management Tab', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.setItem('ricgcw_admin_session', 'true');
  });

  const renderDashboard = () => {
    return render(
      <ChurchProvider>
        <BrowserRouter>
          <AdminDashboard />
        </BrowserRouter>
      </ChurchProvider>
    );
  };

  it('switches to Sponsorship & Projects tab when clicked', () => {
    renderDashboard();

    const sponsorshipTabBtn = screen.getByRole('button', { name: /sponsorship & projects/i });
    expect(sponsorshipTabBtn).toBeInTheDocument();
    fireEvent.click(sponsorshipTabBtn);

    expect(screen.getByText(/Kingdom Projects & Sponsorship Manager/i)).toBeInTheDocument();
    expect(screen.getByText(/Sponsorship Impact Statistics/i)).toBeInTheDocument();
    expect(screen.getByText(/Sponsorship Page Copy & Gateway Settings/i)).toBeInTheDocument();
  });

  it('allows adding a new kingdom project through the admin form', () => {
    renderDashboard();

    fireEvent.click(screen.getByRole('button', { name: /sponsorship & projects/i }));

    const titleInput = screen.getByPlaceholderText(/Rural Church Planting/i);
    const categoryInput = screen.getByPlaceholderText(/Evangelism & Missions \/ Education/i);
    const targetInput = screen.getByPlaceholderText(/Target Amount/i);
    const raisedInput = screen.getByPlaceholderText(/Amount Raised/i);
    const descInput = screen.getByPlaceholderText(/Detailed project description and purpose/i);

    fireEvent.change(titleInput, { target: { value: 'New Test Church Plant' } });
    fireEvent.change(categoryInput, { target: { value: 'Missions' } });
    fireEvent.change(targetInput, { target: { value: 'GHS 75,000' } });
    fireEvent.change(raisedInput, { target: { value: 'GHS 25,000' } });
    fireEvent.change(descInput, { target: { value: 'Planting churches in remote villages.' } });

    const publishBtn = screen.getByRole('button', { name: /publish kingdom project/i });
    fireEvent.click(publishBtn);

    expect(screen.getByText('New Test Church Plant')).toBeInTheDocument();
  });

  it('allows editing an existing project after adding one', () => {
    renderDashboard();

    fireEvent.click(screen.getByRole('button', { name: /sponsorship & projects/i }));

    // First add a project via the form
    const titleInput = screen.getByPlaceholderText(/Rural Church Planting/i);
    const categoryInput = screen.getByPlaceholderText(/Evangelism & Missions \/ Education/i);
    const targetInput = screen.getByPlaceholderText(/Target Amount/i);
    const raisedInput = screen.getByPlaceholderText(/Amount Raised/i);
    const descInput = screen.getByPlaceholderText(/Detailed project description and purpose/i);

    fireEvent.change(titleInput, { target: { value: 'Edit Test Project' } });
    fireEvent.change(categoryInput, { target: { value: 'Infrastructure' } });
    fireEvent.change(targetInput, { target: { value: 'GHS 20,000' } });
    fireEvent.change(raisedInput, { target: { value: 'GHS 5,000' } });
    fireEvent.change(descInput, { target: { value: 'A project to edit.' } });

    fireEvent.click(screen.getByRole('button', { name: /publish kingdom project/i }));

    // Now the project exists: click Edit
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    expect(editButtons.length).toBeGreaterThan(0);
    fireEvent.click(editButtons[0]);

    expect(screen.getByText(/Editing Project:/i)).toBeInTheDocument();
    const saveChangesBtn = screen.getByRole('button', { name: /save project changes/i });
    expect(saveChangesBtn).toBeInTheDocument();
  });
});


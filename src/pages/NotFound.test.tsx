import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from './NotFound';

describe('NotFound Page (404 Waypoint)', () => {
  it('renders waypoint not found message and sanctuary return button', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText(/Waypoint Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Return to Sanctuary Homepage/i)).toBeInTheDocument();
    expect(screen.getByText(/Error 404/i)).toBeInTheDocument();
  });
});

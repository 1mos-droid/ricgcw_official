import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { ChurchProvider } from '../context/ChurchContext';
import { GivingModal } from './GivingModal';
import { DEFAULT_PAYSTACK_SUBACCOUNT } from '../utils/paystackService';

describe('GivingModal (Direct Paystack Giving)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const renderModal = (props: { isOpen: boolean; onClose: () => void; defaultCategory?: string }) => {
    return render(
      <ChurchProvider>
        <GivingModal {...props} />
      </ChurchProvider>
    );
  };

  it('renders correctly when open', () => {
    const handleClose = vi.fn();
    renderModal({ isOpen: true, onClose: handleClose });

    expect(screen.getByText(/Online Giving Portal/i)).toBeInTheDocument();
    expect(screen.getByText(/Fast & Secure Paystack Digital Giving/i)).toBeInTheDocument();
    expect(screen.getByText(/Tithe/i)).toBeInTheDocument();
    expect(screen.getByText(/Offering/i)).toBeInTheDocument();
    expect(screen.getByText(/2026 Theme Covenant Seed/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Proceed with GHS 100 via Paystack/i })).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    const handleClose = vi.fn();
    renderModal({ isOpen: false, onClose: handleClose });

    expect(screen.queryByText(/Online Giving Portal/i)).not.toBeInTheDocument();
  });

  it('updates amount when a preset amount button is clicked', () => {
    const handleClose = vi.fn();
    renderModal({ isOpen: true, onClose: handleClose });

    // Click GH₵ 500 preset
    const preset500 = screen.getByRole('button', { name: /GHS 500/i });
    fireEvent.click(preset500);

    expect(screen.getByRole('button', { name: /Proceed with GHS 500 via Paystack/i })).toBeInTheDocument();
  });

  it('updates currency when currency pill is clicked', () => {
    const handleClose = vi.fn();
    renderModal({ isOpen: true, onClose: handleClose });

    const usdBtn = screen.getByRole('button', { name: 'USD' });
    fireEvent.click(usdBtn);

    expect(screen.getByRole('button', { name: /Proceed with USD 100 via Paystack/i })).toBeInTheDocument();
  });

  it('allows entering custom donation amount', () => {
    const handleClose = vi.fn();
    renderModal({ isOpen: true, onClose: handleClose });

    const customInput = screen.getByPlaceholderText(/Enter custom amount/i);
    fireEvent.change(customInput, { target: { value: '750' } });

    expect(screen.getByRole('button', { name: /Proceed with GHS 750 via Paystack/i })).toBeInTheDocument();
  });

  it('uses default church subaccount ACCT_cm4xpwb0z8y7xou for settlements', () => {
    expect(DEFAULT_PAYSTACK_SUBACCOUNT).toBe('ACCT_cm4xpwb0z8y7xou');
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    renderModal({ isOpen: true, onClose: handleClose });

    const closeBtn = screen.getByLabelText(/Close giving modal/i);
    fireEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});

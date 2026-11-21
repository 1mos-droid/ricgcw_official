import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { MotionConfig, LazyMotion, domMax } from 'framer-motion';
import { Modal } from './Modal';

const renderWithMotion = (ui: React.ReactElement) =>
  render(
    <MotionConfig reducedMotion="always">
      <LazyMotion features={domMax}>{ui}</LazyMotion>
    </MotionConfig>
  );

describe('Modal Primitive (WCAG 2.2 AA Accessible Dialog)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = 'visible';
  });

  it('renders with role="dialog", aria-modal="true", and aria-labelledby', () => {
    const handleClose = vi.fn();
    renderWithMotion(
      <Modal isOpen={true} onClose={handleClose} title="Test Sanctuary Title">
        <p>Modal body content</p>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby');

    const titleEl = screen.getByText('Test Sanctuary Title');
    expect(titleEl.id).toBe(dialog.getAttribute('aria-labelledby'));
  });

  it('locks body scrolling when open and restores it when closed', async () => {
    const handleClose = vi.fn();
    const { rerender } = renderWithMotion(
      <Modal isOpen={true} onClose={handleClose} title="Scroll Lock Test">
        <div>Content</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <MotionConfig reducedMotion="always">
        <LazyMotion features={domMax}>
          <Modal isOpen={false} onClose={handleClose} title="Scroll Lock Test">
            <div>Content</div>
          </Modal>
        </LazyMotion>
      </MotionConfig>
    );

    expect(document.body.style.overflow).toBe('visible');
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('closes on Escape key press', () => {
    const handleClose = vi.fn();
    renderWithMotion(
      <Modal isOpen={true} onClose={handleClose} title="Escape Key Test">
        <button>Inside Button</button>
      </Modal>
    );

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('closes when clicking the close button', () => {
    const handleClose = vi.fn();
    renderWithMotion(
      <Modal isOpen={true} onClose={handleClose} title="Close Button Test" closeLabel="Close this test modal">
        <div>Content</div>
      </Modal>
    );

    const closeBtn = screen.getByLabelText('Close this test modal');
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import CancelBookingModal from '../../../src/components/booking/CancelBookingModal.jsx';

describe('CancelBookingModal', () => {
  it('renders when open', () => {
    render(<CancelBookingModal open={true} onClose={() => {}} />);
    expect(
      screen.getByText(/are you sure you want to cancel your appointment/i),
    ).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<CancelBookingModal open={false} onClose={() => {}} />);
    expect(
      screen.queryByText(/are you sure you want to cancel your appointment/i),
    ).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<CancelBookingModal open={true} onClose={handleClose} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });

  it('calls onConfirm when confirm/cancel button is clicked', () => {
    const handleCancel = vi.fn();
    render(<CancelBookingModal open={true} onClose={() => {}} onConfirm={handleCancel} />);
    const confirmButton = screen.getByRole('button', {
      name: /yes, cancel appointment/i,
    });
    fireEvent.click(confirmButton);
    expect(handleCancel).toHaveBeenCalled();
  });

  it('shows confirmation message', () => {
    render(<CancelBookingModal open={true} onClose={() => {}} />);
    expect(screen.getByText(/Are you sure/i)).toBeInTheDocument();
  });
});

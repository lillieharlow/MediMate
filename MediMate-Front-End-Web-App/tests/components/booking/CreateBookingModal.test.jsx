import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import CreateBookingModal from '../../../src/components/booking/CreateBookingModal.jsx';

describe('CreateBookingModal', () => {
  it('renders when open', () => {
    render(<CreateBookingModal open={true} onClose={() => {}} />);
    expect(screen.getByRole('heading', { name: /Create Booking/i })).toBeInTheDocument();
  });

  it('renders when open', () => {
    render(<CreateBookingModal open={false} onClose={() => {}} />);
    expect(screen.queryByRole('heading', { name: /Create Booking/i })).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<CreateBookingModal open={true} onClose={handleClose} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });

  it('renders booking form fields', () => {
    render(<CreateBookingModal open={true} onClose={() => {}} />);
    // Adjust selectors as needed for your form fields
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
  });
});

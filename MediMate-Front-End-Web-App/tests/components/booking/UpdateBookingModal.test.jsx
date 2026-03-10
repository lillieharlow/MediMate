import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import UpdateBookingModal from '../../../src/components/booking/UpdateBookingModal.jsx';

describe('UpdateBookingModal', () => {
  it('renders when open', () => {
    render(
      <UpdateBookingModal
        open={true}
        onClose={() => {}}
        booking={{
          _id: '1',
          datetimeStart: new Date().toISOString(),
          bookingDuration: 30,
          bookingStatus: 'confirmed',
          doctorId: 'docid',
        }}
        doctors={[{ user: { _id: 'docid' }, firstName: 'Jane', lastName: 'Doe' }]}
        patientId="patientid"
      />,
    );
    expect(screen.getByRole('heading', { name: /update booking/i })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <UpdateBookingModal
        open={true}
        onClose={handleClose}
        booking={{
          _id: '1',
          datetimeStart: new Date().toISOString(),
          bookingDuration: 30,
          bookingStatus: 'confirmed',
          doctorId: 'docid',
        }}
        doctors={[{ user: { _id: 'docid' }, firstName: 'Jane', lastName: 'Doe' }]}
        patientId="patientid"
      />,
    );
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });

  it('renders booking details if provided', () => {
    const booking = {
      _id: '1',
      datetimeStart: new Date().toISOString(),
      bookingDuration: 30,
      bookingStatus: 'confirmed',
      doctorId: 'docid',
    };
    render(
      <UpdateBookingModal
        open={true}
        onClose={() => {}}
        booking={booking}
        doctors={[{ user: { _id: 'docid' }, firstName: 'Jane', lastName: 'Doe' }]}
        patientId="patientid"
      />,
    );
    expect(screen.getByDisplayValue(/30/)).toBeInTheDocument();
  });
});

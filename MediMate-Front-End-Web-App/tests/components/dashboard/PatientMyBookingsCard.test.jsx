import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import PatientMyBookingsCard from '../../../src/components/dashboard/PatientMyBookingsCard.jsx';

describe('PatientMyBookingsCard', () => {
  it('renders no bookings message when empty', () => {
    render(<PatientMyBookingsCard bookings={[]} doctors={[]} />);
    expect(screen.getByText('---------- No bookings ----------')).toBeInTheDocument();
  });

  it('renders bookings and doctor name', () => {
    const bookings = [
      {
        _id: '1',
        doctorId: 'docid',
        datetimeStart: new Date(Date.now() + 1000000).toISOString(),
        bookingDuration: 30,
        bookingStatus: 'confirmed',
      },
    ];
    const doctors = [{ user: { _id: 'docid' }, firstName: 'John', lastName: 'Smith' }];
    render(<PatientMyBookingsCard bookings={bookings} doctors={doctors} />);
    expect(screen.getByText(/Dr. John Smith/)).toBeInTheDocument();
  });
});

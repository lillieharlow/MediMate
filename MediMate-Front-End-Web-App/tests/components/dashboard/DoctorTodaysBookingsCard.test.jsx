import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import DoctorTodaysBookingsCard from '../../../src/components/dashboard/DoctorTodaysBookingsCard.jsx';

describe('DoctorTodaysBookingsCard', () => {
  it('renders without crashing', () => {
    render(<DoctorTodaysBookingsCard doctorBookings={[]} />);
    expect(screen.getByTestId('doctor-todays-bookings-card')).toBeInTheDocument();
  });
});

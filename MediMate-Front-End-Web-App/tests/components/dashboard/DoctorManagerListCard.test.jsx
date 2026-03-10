import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import DoctorManagerListCard from '../../../src/components/dashboard/DoctorManagerListCard.jsx';

describe('DoctorManagerListCard', () => {
  it('renders without crashing', () => {
    const mockBooking = {
      _id: 'booking1',
      datetimeStart: new Date().toISOString(),
      patientId: 'patient1',
      bookingDuration: 30,
      bookingStatus: 'confirmed',
    };
    render(<DoctorManagerListCard booking={mockBooking} />);
    expect(screen.getByTestId('doctor-manager-list-card')).toBeInTheDocument();
  });
});

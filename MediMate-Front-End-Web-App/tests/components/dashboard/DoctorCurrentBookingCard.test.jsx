import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import DoctorCurrentBookingCard from '../../../src/components/dashboard/DoctorCurrentBookingCard.jsx';

describe('DoctorCurrentBookingCard', () => {
  it('renders without crashing', () => {
    render(<DoctorCurrentBookingCard booking={null} />);
    expect(screen.getByTestId('doctor-current-booking-card')).toBeInTheDocument();
  });
});

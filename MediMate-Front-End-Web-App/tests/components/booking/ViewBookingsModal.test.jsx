import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ViewBookingsModal from '../../../src/components/booking/ViewBookingsModal.jsx';

describe('ViewBookingsModal', () => {
  it('renders when open', () => {
    render(<ViewBookingsModal open={true} onClose={() => {}} />);
    expect(screen.getByText(/View Bookings/i)).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<ViewBookingsModal open={false} onClose={() => {}} />);
    expect(screen.queryByText(/View Bookings/i)).not.toBeInTheDocument();
  });

  it('shows empty state when no bookings', () => {
    render(<ViewBookingsModal open={true} onClose={() => {}} bookings={[]} doctors={[]} />);
    expect(screen.getByText(/no bookings/i)).toBeInTheDocument();
  });
});

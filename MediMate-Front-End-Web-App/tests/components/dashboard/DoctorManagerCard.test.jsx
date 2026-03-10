import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import DoctorManagerCard from '../../../src/components/dashboard/DoctorManagerCard.jsx';

describe('DoctorManagerCard', () => {
  it('renders without crashing', () => {
    render(<DoctorManagerCard />);
    expect(screen.getByTestId('doctor-manager-card')).toBeInTheDocument();
  });
});

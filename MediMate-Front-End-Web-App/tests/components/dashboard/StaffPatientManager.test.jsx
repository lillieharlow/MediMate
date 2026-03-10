import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import StaffPatientManager from '../../../src/components/dashboard/StaffPatientManager.jsx';

describe('StaffPatientManager', () => {
  it('renders without crashing', () => {
    render(<StaffPatientManager />);
    expect(screen.getByTestId('staff-patient-manager')).toBeInTheDocument();
  });
});

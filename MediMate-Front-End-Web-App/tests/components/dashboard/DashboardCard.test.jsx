import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import DashboardCard from '../../../src/components/dashboard/DashboardCard.jsx';

describe('DashboardCard', () => {
  it('renders title and children', () => {
    render(
      <DashboardCard title="Test Title">
        <div>Child Content</div>
      </DashboardCard>,
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import LogoutPage from '../../src/pages/LogoutPage';
import { renderWithoutRoutes, renderWithRoutes, setTestToken } from '../testUtils';

beforeEach(() => {
  setTestToken('patient');
});

describe('test /logout page', () => {
  it('LogoutCard displays on /logout', () => {
    renderWithoutRoutes(<LogoutPage />);

    expect(screen.getByTestId('app-logout-card')).toBeInTheDocument();
  });

  it('Clicking on logout button returns user to /login and clears localStorage', async () => {
    renderWithRoutes(<LogoutPage />, '/logout');
    const user = userEvent.setup();

    const logoutButton = screen.getByTestId('app-logout-card-button');
    expect(logoutButton).toBeInTheDocument();
    expect(localStorage.getItem('token')).not.toBeNull();
    await user.click(logoutButton);

    expect(screen.getByTestId('app-login-form')).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('Navigating to /logout while not logged in redirects to /login', () => {
    localStorage.clear();
    renderWithRoutes(<LogoutPage />, '/logout');

    expect(screen.getByTestId('app-login-form')).toBeInTheDocument();
  });
});

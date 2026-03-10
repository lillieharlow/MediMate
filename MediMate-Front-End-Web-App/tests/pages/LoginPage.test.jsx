import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import LoginPage from '../../src/pages/LoginPage';
import { renderWithoutRoutes, renderWithRoutes } from '../testUtils';

describe('Test /login page', () => {
  it('LoginForm displayed on LoginPage when user not authenticated', () => {
    renderWithoutRoutes(<LoginPage />);

    // LoginForm form element is present
    expect(screen.getByTestId('app-login-form')).toBeInTheDocument();

    // LoginForm elements are visible (email/password fields, submit button)
    expect(screen.getByTestId('app-login-form-input-email')).toBeInTheDocument();
    expect(screen.getByTestId('app-login-form-input-password')).toBeInTheDocument();
    expect(screen.getByTestId('app-login-form-button-submit')).toBeInTheDocument();
  });

  it('User can enter details into login form', async () => {
    renderWithoutRoutes(<LoginPage />);

    const emailField = screen.getByTestId('app-login-form-input-email');
    const passwordField = screen.getByTestId('app-login-form-input-password');

    const user = userEvent.setup();

    expect(emailField.value).toBe('');

    await user.type(emailField, 'test@email.com');
    await user.type(passwordField, '123456');
    expect(emailField.value).toBe('test@email.com');
    expect(passwordField.value).toBe('123456');
  });

  it('Remain on login page & display error on failed login attempt', async () => {
    renderWithRoutes(<LoginPage />);

    const loginForm = screen.getByTestId('app-login-form');
    const emailField = screen.getByTestId('app-login-form-input-email');
    const passwordField = screen.getByTestId('app-login-form-input-password');
    const submitButton = screen.getByTestId('app-login-form-button-submit');
    const user = userEvent.setup();

    expect(screen.getByTestId('app-login-form')).toBeInTheDocument();

    await user.type(emailField, 'bad-email@example.com');
    await user.type(passwordField, '123456');
    await user.click(submitButton);

    // LoginForm should still be present
    expect(loginForm).toBeInTheDocument();
    // Error message displayed on screen matches that sent in mock response
    expect(await screen.findByText(/invalid test credentials/i)).toBeInTheDocument();
  });

  it('Successful login navigates to /dashboard', async () => {
    renderWithRoutes(<LoginPage />, '/login');

    const emailField = screen.getByTestId('app-login-form-input-email');
    const passwordField = screen.getByTestId('app-login-form-input-password');
    const submitButton = screen.getByTestId('app-login-form-button-submit');
    const user = userEvent.setup();

    expect(screen.getByTestId('app-login-form')).toBeInTheDocument();

    await user.type(emailField, 'patient@example.com');
    await user.type(passwordField, '123456');
    await user.click(submitButton);

    // Should have navigated to dashboard on successful login
    expect(await screen.findByTestId('app-dashboard-heading')).toBeInTheDocument();
  });
});

describe('Test /login page create account card', () => {
  it('Create account card rendered on /login', () => {
    renderWithoutRoutes(<LoginPage />);

    const createAccountCard = screen.getByTestId('app-create-account-card');
    const createAccountButton = screen.getByTestId('app-create-account-card-button');
    expect(createAccountCard).toBeInTheDocument();
    expect(createAccountButton).toBeInTheDocument();
  });

  it('Create account button directs to /signup page', async () => {
    renderWithRoutes(<LoginPage />);
    const user = userEvent.setup();
    const createAccountButton = screen.getByTestId('app-create-account-card-button');

    expect(createAccountButton).toBeInTheDocument();
    await user.click(createAccountButton);
    expect(screen.getByTestId('app-signup-heading')).toBeInTheDocument();
  });
});

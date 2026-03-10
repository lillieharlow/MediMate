import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import SignupPage from '../../src/pages/SignupPage';
import { renderWithoutRoutes } from '../testUtils';

describe('test /signup page', () => {
  it('SignupForm displays on /signup page, and is interactable', async () => {
    renderWithoutRoutes(<SignupPage />);
    const user = userEvent.setup();

    // Checks signup form is present
    expect(screen.getByTestId('app-signup-form')).toBeInTheDocument();

    // Checks signup fields interactable
    const emailInput = screen.getByTestId('app-signup-form-input-email');
    const passwordInput = screen.getByTestId('app-signup-form-input-password');
    await user.type(emailInput, 'test@email.com');
    await user.type(passwordInput, 'passw0rd');

    expect(emailInput.value).toBe('test@email.com');
    expect(passwordInput.value).toBe('passw0rd');
  });

  it('User & password fields should require a valid email address & password', async () => {
    //TODO: update test to reflect front end validation
    renderWithoutRoutes(<SignupPage />);
    const user = userEvent.setup();

    const emailInput = screen.getByTestId('app-signup-form-input-email');
    const passwordInput = screen.getByTestId('app-signup-form-input-password');
    await user.type(emailInput, 'notAValidEmail.com');

    expect(emailInput).toBeInvalid();
    expect(passwordInput).toBeInvalid();
  });

  it('Signup with valid credentials returns success message', async () => {
    renderWithoutRoutes(<SignupPage />);
    const user = userEvent.setup();

    const emailInput = screen.getByTestId('app-signup-form-input-email');
    const passwordInput = screen.getByTestId('app-signup-form-input-password');
    const submitBtn = screen.getByTestId('app-signup-form-button-submit');

    await user.type(emailInput, 'ok-email@example.com');
    await user.type(passwordInput, 'ThisDoesntMatter');
    await user.type(screen.getByTestId('app-signup-form-input-firstname'), 'Myname');
    await user.type(screen.getByTestId('app-signup-form-input-lastname'), 'Mysurname');
    await user.type(screen.getByTestId('app-signup-form-input-dob'), '2000-01-01');
    await user.type(screen.getByTestId('app-signup-form-input-phone'), '0400111222');

    await user.click(submitBtn);

    expect(screen.getByText(/patient account created/i)).toBeInTheDocument();
  });

  it('Signup with existing email address should return relevant error', async () => {
    renderWithoutRoutes(<SignupPage />);
    const user = userEvent.setup();

    const emailInput = screen.getByTestId('app-signup-form-input-email');
    const passwordInput = screen.getByTestId('app-signup-form-input-password');
    const submitBtn = screen.getByTestId('app-signup-form-button-submit');

    await user.type(emailInput, 'duplicate@example.com');
    await user.type(passwordInput, 'ThisDoesntMatter');
    await user.type(screen.getByTestId('app-signup-form-input-firstname'), 'Myname');
    await user.type(screen.getByTestId('app-signup-form-input-lastname'), 'Mysurname');
    await user.type(screen.getByTestId('app-signup-form-input-dob'), '2000-01-01');
    await user.type(screen.getByTestId('app-signup-form-input-phone'), '0400111222');

    await user.click(submitBtn);

    expect(screen.getByText(/test email already in use/i)).toBeInTheDocument();
  });
});

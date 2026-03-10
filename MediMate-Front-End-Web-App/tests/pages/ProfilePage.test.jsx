import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ProfilePage from '../../src/pages/ProfilePage';
import { renderWithoutRoutes, setTestToken } from '../testUtils';

describe('test /profile page', () => {
  it('Profile page displays ManageProfileCard & expected patient fields', () => {
    setTestToken('patient');
    renderWithoutRoutes(<ProfilePage />);

    expect(screen.getByTestId('app-profile-card')).toBeInTheDocument();
    expect(screen.getByTestId('app-profile-form-input-firstname')).toBeInTheDocument();
    expect(screen.getByTestId('app-profile-form-input-middlename')).toBeInTheDocument();
    expect(screen.getByTestId('app-profile-form-input-lastname')).toBeInTheDocument();
    expect(screen.getByTestId('app-profile-form-input-dob')).toBeInTheDocument();
    expect(screen.getByTestId('app-profile-form-input-phone')).toBeInTheDocument();
    expect(screen.queryByTestId('app-profile-form-input-shift-start')).not.toBeInTheDocument();
    expect(screen.queryByTestId('app-profile-form-input-shift-end')).not.toBeInTheDocument();
  });

  it('Profile page displays ManageProfileCard & expected doctor fields', () => {
    setTestToken('doctor');
    renderWithoutRoutes(<ProfilePage />);

    expect(screen.getByTestId('app-profile-card')).toBeInTheDocument();
    expect(screen.getByTestId('app-profile-form-input-firstname')).toBeInTheDocument();
    expect(screen.queryByTestId('app-profile-form-input-middlename')).not.toBeInTheDocument();
    expect(screen.getByTestId('app-profile-form-input-lastname')).toBeInTheDocument();
    expect(screen.queryByTestId('app-profile-form-input-dob')).not.toBeInTheDocument();
    expect(screen.queryByTestId('app-profile-form-input-phone')).not.toBeInTheDocument();
    expect(screen.getByTestId('app-profile-form-input-shift-start')).toBeInTheDocument();
    expect(screen.getByTestId('app-profile-form-input-shift-end')).toBeInTheDocument();
  });

  it('Profile page displays ManageProfileCard & expected staff fields', () => {
    setTestToken('staff');
    renderWithoutRoutes(<ProfilePage />);

    expect(screen.getByTestId('app-profile-card')).toBeInTheDocument();
    expect(screen.getByTestId('app-profile-form-input-firstname')).toBeInTheDocument();
    expect(screen.queryByTestId('app-profile-form-input-middlename')).not.toBeInTheDocument();
    expect(screen.getByTestId('app-profile-form-input-lastname')).toBeInTheDocument();
    expect(screen.queryByTestId('app-profile-form-input-shift-start')).not.toBeInTheDocument();
  });

  it('Profile fields match values in mock API response', async () => {
    setTestToken('patient');
    renderWithoutRoutes(<ProfilePage />);

    expect(await screen.findByTestId('app-profile-form-input-firstname')).toHaveValue(
      'TestFirstName',
    );
    expect(await screen.findByTestId('app-profile-form-input-middlename')).toHaveValue(
      'TestMiddleName',
    );
    expect(await screen.findByTestId('app-profile-form-input-lastname')).toHaveValue(
      'TestLastName',
    );
    expect(await screen.findByTestId('app-profile-form-input-dob')).toHaveValue('2001-01-02');
    expect(await screen.findByTestId('app-profile-form-input-phone')).toHaveValue('0400111222');
  });

  it('Updating profile fields succesfully displays message', async () => {
    setTestToken('patient');
    const user = userEvent.setup();
    renderWithoutRoutes(<ProfilePage />);

    const fNameInput = await screen.findByTestId('app-profile-form-input-firstname');
    const submitButton = screen.getByTestId('app-profile-form-button-submit');

    await user.clear(fNameInput);
    await user.type(fNameInput, 'ValidFirstName');
    await user.click(submitButton);

    expect(screen.getByText(/profile updated successfully/i)).toBeInTheDocument();
  });

  it('Updating profile fields with invalid values displays error message', async () => {
    setTestToken('patient');
    const user = userEvent.setup();
    renderWithoutRoutes(<ProfilePage />);

    const fNameInput = await screen.findByTestId('app-profile-form-input-firstname');
    const submitButton = screen.getByTestId('app-profile-form-button-submit');

    await user.clear(fNameInput);
    await user.type(fNameInput, 'InvalidFirstName');
    await user.click(submitButton);

    expect(screen.getByText(/test profile update failed/i)).toBeInTheDocument();
  });
});

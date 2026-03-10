import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import UserAdminPage from '../../src/pages/UserAdminPage';
import { renderWithoutRoutes, setTestToken } from '../testUtils';

describe('Test /useradmin page', () => {
  it('Components render on /useradmin', () => {
    setTestToken('staff');
    renderWithoutRoutes(<UserAdminPage />);

    expect(screen.getByTestId('app-useradmin-table')).toBeInTheDocument();
    expect(screen.getByTestId('app-useradmin-button-add-user')).toBeInTheDocument();
  });

  it('UserAdminTable renders with mocked content', async () => {
    setTestToken('staff');
    renderWithoutRoutes(<UserAdminPage />);

    expect(screen.getByTestId('app-useradmin-table')).toBeInTheDocument();
    expect(await screen.findByText(/mockfirstname/i)).toBeInTheDocument();
    expect(await screen.findByText(/mockstaff@email.com/i)).toBeInTheDocument();

    expect((await screen.findAllByRole('row')).length).toBe(4);
  });

  it('Clicking create user button renders SignupForm & usertype selector', async () => {
    setTestToken('staff');
    renderWithoutRoutes(<UserAdminPage />);
    const user = userEvent.setup();
    const addUserButton = screen.getByTestId('app-useradmin-button-add-user');

    await user.click(addUserButton);

    expect(screen.getByTestId('app-signup-form')).toBeInTheDocument();
    expect(screen.getByTestId('app-useradmin-select-usertype')).toBeInTheDocument();
    expect(screen.queryByTestId('app-signup-heading')).not.toBeInTheDocument();
  });

  it('Clicking manage profile button renders ManageProfileCard with populated profile fields, and is interactable', async () => {
    setTestToken('staff');
    renderWithoutRoutes(<UserAdminPage />);
    const user = userEvent.setup();
    const patientRow = await screen.findByRole('row', { name: /patient/i });
    const manageProfileButton = within(patientRow).getByTestId('app-useradmin-button-manage-user');

    await user.click(manageProfileButton);

    expect(screen.getByTestId('app-profile-card')).toBeInTheDocument();

    const fNameField = await screen.findByTestId('app-profile-form-input-firstname');
    const lNameField = await screen.findByTestId('app-profile-form-input-lastname');

    expect(fNameField).toHaveValue('mockFirstName');
    expect(lNameField).toHaveValue('mockLastName');

    await user.clear(fNameField);
    await user.type(fNameField, 'newFirstName');

    expect(fNameField).toHaveValue('newFirstName');
  });

  it('ManageProfileCard displays success / error message', async () => {
    setTestToken('staff');
    renderWithoutRoutes(<UserAdminPage />);

    const user = userEvent.setup();
    const patientRow = await screen.findByRole('row', { name: /patient/i });
    const manageProfileButton = within(patientRow).getByTestId('app-useradmin-button-manage-user');

    await user.click(manageProfileButton);
    const submitButton = screen.getByTestId('app-profile-form-button-submit');

    await user.click(submitButton);
    expect(await screen.findByText(/profile updated successfully/i)).toBeInTheDocument();

    const firstNameField = screen.getByTestId('app-profile-form-input-firstname');
    await user.clear(firstNameField);
    await user.type(firstNameField, 'errorName');

    await user.click(submitButton);

    expect(await screen.findByText(/mock error reason/i)).toBeInTheDocument();
  });

  it('Delete user button renders DeleteUserConfirmCard with correct user details', async () => {
    setTestToken('staff');
    renderWithoutRoutes(<UserAdminPage />);

    const user = userEvent.setup();
    const patientRow = await screen.findByRole('row', { name: /patient/i });
    const deleteProfileButton = within(patientRow).getByTestId('app-useradmin-button-delete-user');

    await user.click(deleteProfileButton);

    expect(await screen.findByTestId('app-delete-user-card')).toBeInTheDocument();

    expect(screen.getByRole('row', { name: /email: mock@email.com/i })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /first name: mockfirstname/i })).toBeInTheDocument();
  });
});

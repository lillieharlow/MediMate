/*
 * DeleteUserConfirmCard.jsx
 *
 * Card displays when a staff member clicks button to delete a user account
 *
 * props:
 * - userInfo: Contains details of the user to render in the card
 * - onConfirmDelete: Function to execute when staff confirms deletion of the user account
 */

import styled from 'styled-components';
import { deleteDoctor } from '../../api/doctor';
import { deletePatient } from '../../api/patient';
import { deleteStaff } from '../../api/staff';
import ActionButton from '../button/ActionButton';

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    text-align: center;
`;

const UserTable = styled.table`
    & td.label {
        text-align: right;
        font-weight: bold;
    }
    & td.details {
        text-align: left;
    }
`;

export default function DeleteUserConfirmCard({ userInfo, onConfirmDelete }) {
  const handleConfirmDelete = async event => {
    event.preventDefault();

    // Delete the user userInfo.userId, userInfo.userType
    let res;

    if (userInfo.userType === 'patient') {
      res = await deletePatient(userInfo.userId);
    }
    if (userInfo.userType === 'doctor') {
      res = await deleteDoctor(userInfo.userId);
    }
    if (userInfo.userType === 'staff') {
      res = await deleteStaff(userInfo.userId);
    }

    if (!res) throw new Error('An unexpected error occured.');
    if (!res.success) throw new Error(`${res.error.message}`);

    // Update state of parent components to reflect deletion
    onConfirmDelete(userInfo);
  };
  return (
    <StyledDiv data-testid="app-delete-user-card">
      <h3>Delete User</h3>
      <p>
        Are you sure? This action <strong>cannot be reversed</strong>. Pending bookings for this
        user will also be deleted.
      </p>
      <p>
        <strong>Deleting User:</strong>
      </p>
      <UserTable>
        <tbody>
          <tr>
            <td className="label">Email:</td>
            <td className="details">{userInfo.email}</td>
          </tr>
          <tr>
            <td className="label">First Name:</td>
            <td className="details">{userInfo.firstName}</td>
          </tr>
          <tr>
            <td className="label">Last Name:</td>
            <td className="details">{userInfo.lastName}</td>
          </tr>
        </tbody>
      </UserTable>
      <ActionButton
        $bg="#c90000"
        style={{ marginTop: '1rem' }}
        onClick={handleConfirmDelete}
        data-testid="app-delete-user-confirm-button"
      >
        Yes, delete user
      </ActionButton>
    </StyledDiv>
  );
}

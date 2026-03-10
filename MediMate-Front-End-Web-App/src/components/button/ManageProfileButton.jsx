/*
- "Manage Profile" button for profile management
*/

import { FaUserEdit } from 'react-icons/fa';
import ActionButton from './ActionButton';

function ManageProfileButton({ profileId, userType, onManage }) {
  return (
    <ActionButton
      $bg="#2393ca"
      $color="#000"
      alt="atatat"
      onClick={() => onManage(profileId, userType)}
      title="Edit user profile"
      data-testid="app-useradmin-button-manage-user"
    >
      <FaUserEdit />
    </ActionButton>
  );
}

export default ManageProfileButton;

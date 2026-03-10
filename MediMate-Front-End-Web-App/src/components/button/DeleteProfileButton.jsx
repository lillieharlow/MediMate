/*
- "Delete Account" button for profile management
*/

import { FaUserLargeSlash } from 'react-icons/fa6';
import ActionButton from './ActionButton';

function DeleteProfileButton({ profileId, userType, userInfo, onDelete }) {
  return (
    <ActionButton
      $bg="#c90000"
      $color="#ffffff"
      onClick={() => onDelete(profileId, userType, userInfo)}
      title="Delete user"
      data-testid="app-useradmin-button-delete-user"
    >
      <FaUserLargeSlash />
    </ActionButton>
  );
}

export default DeleteProfileButton;

/*
- "Edit User Type" button for profile management
*/

import { FaUserCog } from 'react-icons/fa';
import ActionButton from './ActionButton';

function EditUserTypeButton({ profileId, onEditType }) {
  return (
    <ActionButton
      $bg="#2393ca"
      $color="#000"
      onClick={() => onEditType(profileId)}
      title="Change user role"
      data-testid="app-useradmin-button-edit-usertype"
    >
      <FaUserCog />
    </ActionButton>
  );
}

export default EditUserTypeButton;

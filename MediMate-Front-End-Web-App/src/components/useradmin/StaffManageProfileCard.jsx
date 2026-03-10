/*
 * StaffManageProfileCard.jsx
 *
 * Card renders when staff member clicks button to modify user account information
 *
 * props:
 * - userInfo: Details of the user to modify
 * - onProfileUpdated: Function to execute when user is modified
 */

import { useState } from 'react';
import ManageProfileCard from '../ManageProfileCard';
import StaffUserTypeSelector from './StaffUserTypeSelector';

export default function StaffManageProfileCard({ userInfo, onProfileUpdated }) {
  const initialUserType = userInfo.userType;
  const [userType, setUserType] = useState(initialUserType);
  const [userTypeChanged, setUserTypeChanged] = useState(false);

  const changeUserType = userType => {
    setUserType(userType);
    setUserTypeChanged(userType !== initialUserType);
  };

  return (
    <>
      <h2>Edit User Profile</h2>
      <StaffUserTypeSelector onChangeType={changeUserType} />
      <br />
      <ManageProfileCard
        userInfo={{ ...userInfo, userType }}
        onProfileUpdated={onProfileUpdated}
        userTypeChanged={userTypeChanged}
      />
    </>
  );
}

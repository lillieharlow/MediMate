/*
 * UserAdminPage.jsx
 *
 * UserAdminPage allows staff to manage accounts of all logged in users.
 * Redirects to /login if user is not authenticated.
 * Redirects to /dashboard if user is not authorised as staff.
 *
 */

import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import styled from 'styled-components';
import { populateUsersRequest } from '../api/staff';
import DeleteUserConfirmCard from '../components/useradmin/DeleteUserConfirmCard';
import StaffCreateUserCard from '../components/useradmin/StaffCreateUserCard';
import StaffManageProfileCard from '../components/useradmin/StaffManageProfileCard';
import UserAdminTable from '../components/useradmin/UserAdminTable';
import { useAuth } from '../contexts/AuthContext';
import { BlurOverlay } from '../style/componentStyles';

const StaticCard = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  background-color: #ffffff;
  border: 2px solid #7a7a7a;
  border-radius: 10px;
`;

export default function UserAdminPage() {
  const [users, setUsers] = useState([]);
  const [renderOverlay, setRenderOverlay] = useState(false);
  const [creatingProfile, setCreatingProfile] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [deletingProfile, setDeletingProfile] = useState(false);
  const [targetUser, setTargetUser] = useState({});
  const { isAuthenticated, userType } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;
    if (userType !== 'staff') return;

    async function fetchData() {
      const data = await populateUsersRequest();
      setUsers(data.users);
    }

    fetchData();
  }, [isAuthenticated, userType]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (userType !== 'staff') return <Navigate to="/dashboard" replace />;

  const addUserToTable = user => {
    setUsers(prev => [...prev, user]);
  };

  const updateUserTable = user => {
    setUsers(prev => prev.map(u => (u.user._id === user.user._id ? user : u)));
    setTimeout(() => closeCard(), 1000);
  };

  const deleteUserFromTable = userInfo => {
    setUsers(prev => prev.filter(u => u.user._id !== userInfo.userId));
    closeCard();
  };

  const closeCard = () => {
    setRenderOverlay(false);
    setCreatingProfile(false);
    setEditingProfile(false);
    setDeletingProfile(false);
    setTargetUser({});
  };

  const promptCreateUser = () => {
    setRenderOverlay(true);
    setCreatingProfile(true);
  };

  const promptEditUser = (profileId, userType) => {
    setRenderOverlay(true);
    setEditingProfile(true);
    setTargetUser({ userId: profileId, userType });
  };

  const promptDeleteUser = (profileId, userType, userInfo) => {
    setRenderOverlay(true);
    setDeletingProfile(true);
    setTargetUser({ userId: profileId, userType, ...userInfo });
  };

  return (
    <main>
      <h1>User Administration</h1>

      <UserAdminTable
        users={users}
        onCreateUser={promptCreateUser}
        onEditUser={promptEditUser}
        onDeleteUser={promptDeleteUser}
      />
      {renderOverlay && (
        <>
          <BlurOverlay onClick={closeCard} />
          {creatingProfile && (
            <StaticCard>
              <h2>Create User Profile</h2>
              <StaffCreateUserCard onUserAdded={addUserToTable} />
            </StaticCard>
          )}
          {editingProfile && (
            <StaticCard>
              <StaffManageProfileCard userInfo={targetUser} onProfileUpdated={updateUserTable} />
            </StaticCard>
          )}
          {deletingProfile && (
            <StaticCard>
              <DeleteUserConfirmCard userInfo={targetUser} onConfirmDelete={deleteUserFromTable} />
            </StaticCard>
          )}
        </>
      )}
    </main>
  );
}

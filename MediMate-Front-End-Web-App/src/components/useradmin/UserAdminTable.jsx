/*
 * UserAdminTable.jsx
 *
 * Table to allow management of users registed for the app
 *
 * props:
 * - users: Array of app users
 * - onCreateUser: Function to execute when a user has been created
 * - onEditUser: Function to execute when a user has been modified
 * - onDeleteUser: Function to execute when a user has been deleted
 */

import AddUserButton from '../button/AddUserButton';
import DeleteProfileButton from '../button/DeleteProfileButton';
import ManageProfileButton from '../button/ManageProfileButton';

export default function UserAdminTable({ users, onCreateUser, onEditUser, onDeleteUser }) {
  const onAddUser = () => {
    onCreateUser();
  };

  const onManageProfile = (profileId, userType) => {
    onEditUser(profileId, userType);
  };

  const onDeleteProfile = (profileId, userType, userInfo) => {
    onDeleteUser(profileId, userType, userInfo);
  };

  return (
    <section>
      <div style={{ width: 'fit-content', marginLeft: 'auto' }}>
        <AddUserButton onAddUser={onAddUser} />
      </div>
      <table data-testid="app-useradmin-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Functions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.user.email}</td>
                <td>{user.user.userType.typeName}</td>
                <td>
                  <ManageProfileButton
                    profileId={user.user._id}
                    userType={user.user.userType.typeName}
                    onManage={onManageProfile}
                  />
                  <DeleteProfileButton
                    profileId={user.user._id}
                    userType={user.user.userType.typeName}
                    userInfo={{
                      email: user.user.email,
                      firstName: user.firstName,
                      lastName: user.lastName,
                    }}
                    onDelete={onDeleteProfile}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

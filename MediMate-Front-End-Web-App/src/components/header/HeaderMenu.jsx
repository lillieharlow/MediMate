/*
 * HeaderMenu.jsx
 *
 * Hamburger menu for accessing functions relavent to logged in users type
 *
 * props: onClickItem - function to execute when a menu item is clicked
 */

import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import HeaderMenuLink from './HeaderMenuLink';

const Menu = styled.div`
  background-color: white;
  position: absolute;
  right: 20px;
  top: 20px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 0.5rem;
  margin: 0;

  > ul {
    margin: 0;
    padding: 0 0.5rem;
    list-style: none;
    width: 150px;
  }
`;
export default function HeaderMenu({ onClickItem }) {
  const { userType } = useAuth();
  return (
    <Menu role="menu" onClick={onClickItem}>
      <ul>
        <li>
          <HeaderMenuLink to="/dashboard">
            <span>Dashboard</span>
          </HeaderMenuLink>
        </li>
        {/* Render /useradmin conditionally for staff */}
        {userType === 'staff' && (
          <li>
            <HeaderMenuLink to="/useradmin">
              <span>User Administration</span>
            </HeaderMenuLink>
          </li>
        )}
        <li>
          <HeaderMenuLink to="/profile">
            <span>My Profile</span>
          </HeaderMenuLink>
        </li>
        <li>
          <HeaderMenuLink to="/logout">
            <span>Logout</span>
          </HeaderMenuLink>
        </li>
      </ul>
    </Menu>
  );
}

/*
 * HeaderMenuLink.jsx
 *
 * Component to apply standard NavLink functionality to all header menu links
 *
 * props:
 * - children: Child text content to render within the link
 * - to: Path to link user to on clicking the link
 */

import { NavLink } from 'react-router';

export default function HeaderMenuLink({ children, to }) {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? 'active' : null)}>
      {children}
    </NavLink>
  );
}

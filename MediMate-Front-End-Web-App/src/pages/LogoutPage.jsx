/*
 * LogoutPage.jsx
 *
 * Logout page displays confirmation dialog for a user to log out.
 * Redirects to /login if user is not authenticated.
 *
 */

import { Navigate } from 'react-router';
import LogoutCard from '../components/LogoutCard';
import { useAuth } from '../contexts/AuthContext';

export default function LogoutPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <main>
      <LogoutCard />
    </main>
  );
}

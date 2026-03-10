/*
 * ProfilePage.jsx
 *
 * Profile page displays fields to allow modification of users profile information.
 * Redirects to /login if user is not authenticated.
 *
 */

import { Navigate } from 'react-router';
import ManageProfileCard from '../components/ManageProfileCard';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { isAuthenticated, userType, userId } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <main>
      <h2>Manage Your Profile</h2>
      <ManageProfileCard userInfo={{ userType, userId }} />
    </main>
  );
}

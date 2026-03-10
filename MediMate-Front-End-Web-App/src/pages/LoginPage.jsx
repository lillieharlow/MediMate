/*
 * LoginPage.jsx
 *
 * Login page displays fields to allow login, or creation of a new user account.
 * Redirects to /dashboard if user is already logged in.
 *
 */

import { Navigate } from 'react-router';
import CreateAccountCard from '../components/CreateAccountCard';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <main>
      <h1>MediMate Medical Centre</h1>
      <LoginForm />
      <CreateAccountCard />
    </main>
  );
}

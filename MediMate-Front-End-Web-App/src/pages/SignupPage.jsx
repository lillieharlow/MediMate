/*
 * SignupPage.jsx
 *
 * Signup page allows users to create a new patient account.
 * Redirects to /dashboard if user is already logged in.
 *
 */

import { Navigate } from 'react-router';
import SignupForm from '../components/SignupForm';
import { useAuth } from '../contexts/AuthContext';

export default function SignupPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <main>
      <h1>MediMate Medical Centre</h1>
      <SignupForm />
    </main>
  );
}

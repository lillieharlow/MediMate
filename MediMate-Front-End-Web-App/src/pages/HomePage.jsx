/*
 * HomePage.jsx
 *
 * Home page located at root of the app. Redirects to /dashboard or /login based off authentication status:
 *
 */

import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return <Navigate to="/login" />;
}

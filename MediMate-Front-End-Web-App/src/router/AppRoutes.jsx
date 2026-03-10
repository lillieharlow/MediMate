/*
 * AppRoutes.jsx
 *
 * Defines the configured routes for the app.
 * Routes:
 * - /: Home page - redirects to /login or /dashboard depending on authentication
 * - /login: Login page - Allow users to log in to the app
 * - /signup: Signup page - Allow users to create patient accounts
 * - /profile: Profile page - Allow users to manage their profile details
 * - /dashboard: Dashboard page - Primary page of the app displaying information relevant to user type
 * - /useradmin: User administration page - Staff only page to allow management of all app users
 * - /logout: Logout page - Confirmation page allowing users to log out of the pap
 * - /500: 500 page - Static 500 error page if server errors encountered
 * - Fallback: 404 page - Display 404 error for unrecognised routes
 *
 */

import { Route, Routes } from 'react-router';
import DashboardPage from '../pages/DashboardPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import LogoutPage from '../pages/LogoutPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProfilePage from '../pages/ProfilePage';
import ServerErrorPage from '../pages/ServerErrorPage';
import SignupPage from '../pages/SignupPage';
import UserAdminPage from '../pages/UserAdminPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/useradmin" element={<UserAdminPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/500" element={<ServerErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

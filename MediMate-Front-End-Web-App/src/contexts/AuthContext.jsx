/*
 * AuthContext.jsx
 *
 * Defines the global context containing user authorisation status
 *
 * Fields:
 * - userId: Backend identifier for the logged in user
 * - userType: Type of user account
 * - token: JWT of the logged in user
 * - isAuthenticated: Bool indicating if user is authenticated
 */

import { createContext, useContext, useEffect, useState } from 'react';
import { getJwtPayload } from '../utils/jwt';

const defaultState = {
  userId: null,
  userType: null,
  token: null,
  isAuthenticated: false,
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('token');

    if (!saved) {
      return defaultState;
    }

    try {
      // Validate token - this could refresh token too

      const payload = getJwtPayload(saved);
      return {
        userId: payload.userId,
        userType: payload.userType,
        token: saved,
        isAuthenticated: true,
      };
    } catch {
      return {
        ...defaultState,
      };
    }
  });

  useEffect(() => {
    if (!auth.isAuthenticated) {
      localStorage.removeItem('token');
      return;
    }

    const { token } = auth;

    localStorage.setItem('token', token);
  }, [auth]);

  const login = ({ userId, userType, token }) => {
    setAuth({ userId, userType, token, isAuthenticated: true });
  };

  const logout = () => {
    setAuth(defaultState);
  };

  return <AuthContext.Provider value={{ ...auth, login, logout }}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

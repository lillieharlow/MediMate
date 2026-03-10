import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AuthProvider } from '../src/contexts/AuthContext';
import AppRoutes from '../src/router/AppRoutes';

export const renderWithoutRoutes = ui => {
  return render(
    <MemoryRouter>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>,
  );
};

export const renderWithRoutes = (ui, routerPath = '/') => {
  return render(
    <MemoryRouter initialEntries={[routerPath]}>
      <AuthProvider>
        <AppRoutes>{ui}</AppRoutes>
      </AuthProvider>
    </MemoryRouter>,
  );
};

export const setTestToken = userType => {
  const token = createTestJwt({ userId: '1testUserId', userType });

  localStorage.setItem('token', token);
};

export const createTestJwt = payload => {
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
  const fakeToken = `header.${base64Payload}.signature`;

  return fakeToken;
};

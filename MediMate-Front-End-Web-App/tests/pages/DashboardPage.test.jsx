import { render, screen, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { MemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { AuthProvider } from '../../src/contexts/AuthContext';

import DashboardPage from '../../src/pages/DashboardPage';
import * as jwtUtils from '../../src/utils/jwt';
import { mswServer } from '../mocks/mswServer';

// Helper to set up MSW handlers for doctors and bookings
function setupPatientHandlers() {
  mswServer.use(
    http.get('http://localhost:3000/api/v1/doctors', () =>
      HttpResponse.json({
        data: [
          {
            _id: 'docid',
            firstName: 'Alice',
            lastName: 'Smith',
            user: { _id: 'docid' },
          },
        ],
      }),
    ),
    http.get('http://localhost:3000/api/v1/bookings/patients/patient123', () =>
      HttpResponse.json({
        data: [
          {
            _id: 'bookingid1',
            doctorId: 'docid',
            datetimeStart: '2026-01-21T10:00:00.000Z',
            bookingDuration: 30,
            bookingStatus: 'confirmed',
          },
        ],
      }),
    ),
  );
}

describe('DashboardPage', () => {
  describe('as patient', () => {
    beforeEach(() => {
      vi.spyOn(jwtUtils, 'getJwtPayload').mockReturnValue({
        userId: 'patient123',
        userType: 'patient',
      });
      localStorage.setItem('token', JSON.stringify('mockToken'));
      setupPatientHandlers();
    });

    afterEach(() => {
      localStorage.clear();
      vi.restoreAllMocks();
    });

    test('shows empty bookings if API returns empty array', async () => {
      mswServer.use(
        http.get('http://localhost:3000/api/v1/bookings/patients/patient123', () =>
          HttpResponse.json({ data: [] }),
        ),
      );
      render(
        <MemoryRouter>
          <AuthProvider>
            <DashboardPage />
          </AuthProvider>
        </MemoryRouter>,
      );
      expect(await screen.findByTestId('app-dashboard-heading')).toBeInTheDocument();
      expect(await screen.findByText(/My Bookings/i)).toBeInTheDocument();
      // Should not find booking details
      await waitFor(() => {
        expect(screen.queryByText(/Booking Status:/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('as staff', () => {
    beforeEach(() => {
      vi.spyOn(jwtUtils, 'getJwtPayload').mockReturnValue({
        userId: 'staff123',
        userType: 'staff',
      });
      localStorage.setItem('token', JSON.stringify('mockToken'));
      mswServer.use(
        http.get('http://localhost:3000/api/v1/doctors', () =>
          HttpResponse.json({
            data: [
              {
                _id: 'docid',
                firstName: 'Alice',
                lastName: 'Smith',
                user: { _id: 'docid' },
              },
            ],
          }),
        ),
      );
    });

    afterEach(() => {
      localStorage.clear();
      vi.restoreAllMocks();
    });

    test('renders staff dashboard with Patient Manager and Doctor Manager cards', async () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <DashboardPage />
          </AuthProvider>
        </MemoryRouter>,
      );
      expect(await screen.findByTestId('app-dashboard-heading')).toHaveTextContent(
        'Staff Dashboard',
      );
      expect(await screen.findByText(/Patient Manager/i)).toBeInTheDocument();
      expect(await screen.findByText(/Doctor Manager/i)).toBeInTheDocument();
    });
  });

  describe('as doctor', () => {
    beforeEach(() => {
      vi.spyOn(jwtUtils, 'getJwtPayload').mockReturnValue({
        userId: 'doctor123',
        userType: 'doctor',
      });
      localStorage.setItem('token', JSON.stringify('mockToken'));
      mswServer.use(
        http.get('http://localhost:3000/api/v1/bookings/doctors/doctor123', () =>
          HttpResponse.json({
            data: [
              {
                _id: 'bookingid2',
                doctorId: 'doctor123',
                datetimeStart: '2026-01-21T10:00:00.000Z',
                bookingDuration: 45,
                bookingStatus: 'confirmed',
              },
            ],
          }),
        ),
        http.get('http://localhost:3000/api/v1/doctors', () => HttpResponse.json({ data: [] })),
      );
    });

    afterEach(() => {
      localStorage.clear();
      vi.restoreAllMocks();
    });

    test("renders doctor dashboard with Current Booking and Today's Bookings", async () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <DashboardPage />
          </AuthProvider>
        </MemoryRouter>,
      );
      expect(await screen.findByTestId('app-dashboard-heading')).toHaveTextContent(
        'Doctor Dashboard',
      );
      const headings = await screen.findAllByText(/Current Booking/i);
      expect(headings[0]).toBeInTheDocument();
      expect(await screen.findByText(/Today's Bookings/i)).toBeInTheDocument();
    });

    test('shows empty state if no bookings for doctor', async () => {
      mswServer.use(
        http.get('http://localhost:3000/api/v1/bookings/doctors/doctor123', () =>
          HttpResponse.json({ data: [] }),
        ),
      );
      render(
        <MemoryRouter>
          <AuthProvider>
            <DashboardPage />
          </AuthProvider>
        </MemoryRouter>,
      );
      expect(await screen.findByTestId('app-dashboard-heading')).toHaveTextContent(
        'Doctor Dashboard',
      );
      const headings = await screen.findAllByText(/Current Booking/i);
      expect(headings[0]).toBeInTheDocument();
      expect(await screen.findByText(/Today's Bookings/i)).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.queryByText(/confirmed/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('unauthenticated', () => {
    beforeEach(() => {
      vi.spyOn(jwtUtils, 'getJwtPayload').mockReturnValue({});
      localStorage.clear();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    test('redirects to login if not authenticated', async () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <DashboardPage />
          </AuthProvider>
        </MemoryRouter>,
      );
      // Should not find dashboard heading
      await waitFor(() => {
        expect(screen.queryByTestId('app-dashboard-heading')).not.toBeInTheDocument();
      });
    });
  });
});

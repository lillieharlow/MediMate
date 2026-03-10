import { HttpResponse, http } from 'msw';
import { API_BASE_URL } from '../../src/api/apiConfig';

export const handlers = [
  // Login route success & fail state
  http.post(`${API_BASE_URL}/api/v1/auth/login`, async ({ request }) => {
    const reqJson = await request.clone().json();
    let mockJwt;
    if (reqJson.email === 'patient@example.com') {
      // Patient user
      mockJwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwidXNlclR5cGUiOiJwYXRpZW50In0.mock-signature';
    } else if (reqJson.email === 'staff@email.com') {
      // Staff user
      mockJwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzdGFmZiIsImVtYWlsIjoic3RhZmZAZW1haWwuY29tIiwidXNlclR5cGUiOiJzdGFmZiJ9.mock-signature';
    } else if (reqJson.email === 'doctor@email.com') {
      // Doctor user
      mockJwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkb2MxIiwiZW1haWwiOiJkb2N0b3JAZW1haWwuY29tIiwidXNlclR5cGUiOiJkb2N0b3IifQ.mock-signature';
    } else {
      throw HttpResponse.json(
        { success: false, message: 'Invalid test credentials' },
        { status: 401 },
      );
    }
    return HttpResponse.json(
      {
        success: true,
        token: mockJwt,
      },
      {
        status: 200,
      },
    );
  }),

  http.post(`${API_BASE_URL}/api/v1/auth/signup`, async ({ request }) => {
    const reqJson = await request.clone().json();
    if (reqJson.email === 'bad-email@example.com') {
      throw HttpResponse.json({ success: false, message: 'Invalid test signup' }, { status: 401 });
    }

    if (reqJson.email === 'duplicate@example.com') {
      throw HttpResponse.json(
        { success: false, message: 'Test email already in use' },
        { status: 409 },
      );
    }

    return HttpResponse.json(
      {
        success: true,
      },
      { status: 200 },
    );
  }),

  // Mock doctors list
  http.get(`${API_BASE_URL}/api/v1/doctors`, () => {
    return HttpResponse.json({
      data: [
        { _id: 'doc1', firstName: 'Alice', lastName: 'Smith', user: { _id: 'doc1' } },
        { _id: 'doc2', firstName: 'Bob', lastName: 'Jones', user: { _id: 'doc2' } },
        { _id: 'doc3', firstName: 'Carol', lastName: 'Lee', user: { _id: 'doc3' } },
      ],
    });
  }),

  // Mock patient bookings
  http.get(`${API_BASE_URL}/api/v1/bookings/patients/:patientId`, () => {
    return HttpResponse.json({
      data: [
        {
          _id: 'b1',
          info: 'Routine checkup.',
          date: '2026-01-22',
          time: '09:00',
          doctor: { _id: 'doc1', firstName: 'Alice', lastName: 'Smith' },
        },
        {
          _id: 'b2',
          info: 'Review test results.',
          date: '2026-01-23',
          time: '10:30',
          doctor: { _id: 'doc2', firstName: 'Bob', lastName: 'Jones' },
        },
      ],
    });
  }),

  // Mock doctor bookings
  http.get(`${API_BASE_URL}/api/v1/bookings/doctors/:doctorId`, function handler(req) {
    const { doctorId } = req.params;
    const today = '2026-01-21';
    if (doctorId === 'doc1') {
      return HttpResponse.json({
        data: [
          {
            _id: 'b_today',
            time: '08:30',
            patient: {
              _id: 'p1',
              firstName: 'Test',
              lastName: 'Patient',
            },
            patientNotes: 'Needs follow-up.',
            appointmentNotes: 'Review new symptoms.',
            doctorId: 'doc1',
            date: today,
          },
          {
            _id: 'b_today2',
            time: '10:00',
            patient: {
              _id: 'p2',
              firstName: 'Second',
              lastName: 'Patient',
            },
            patientNotes: 'Routine check.',
            appointmentNotes: 'Discuss results.',
            doctorId: 'doc1',
            date: today,
          },
        ],
      });
    }
    return HttpResponse.json({ data: [] });
  }),

  // Mock get patient profile request
  http.get(`${API_BASE_URL}/api/v1/patients/1TestUserId`, () => {
    return HttpResponse.json({
      data: {
        firstName: 'TestFirstName',
        middleName: 'TestMiddleName',
        lastName: 'TestLastName',
        dateOfBirth: '2001-01-02',
        phone: '0400111222',
      },
    });
  }),

  // Mock get doctor profile request
  http.get(`${API_BASE_URL}/api/v1/doctors/1TestUserId`, () => {
    return HttpResponse.json({
      data: {
        firstName: 'TestDoctorFirstName',
        lastName: 'TestDoctorLastName',
        shiftStartTime: '08:30',
        shiftEndTime: '16:30',
      },
    });
  }),

  // Mock get staff profile request
  http.get(`${API_BASE_URL}/api/v1/staff/1TestUserId`, () => {
    return HttpResponse.json({
      data: {
        firstName: 'TestDoctorFirstName',
        lastName: 'TestDoctorLastName',
      },
    });
  }),

  // Mock patch profile
  http.patch(`${API_BASE_URL}/api/v1/patients/1TestUserId`, async ({ request }) => {
    const reqJson = await request.clone().json();

    if (reqJson.firstName === 'ValidFirstName')
      return HttpResponse.json({
        success: true,
      });

    return HttpResponse.json({
      success: false,
      error: {
        message: 'Test profile update failed',
      },
    });
  }),

  // Mock staff get users request
  http.get(`${API_BASE_URL}/api/v1/staff/users`, () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          user: {
            _id: 'mockId1',
            email: 'mock@email.com',
            userType: {
              typeName: 'patient',
            },
          },
          firstName: 'mockFirstName',
          lastName: 'mockLastName',
          dateOfBirth: '2000-01-01',
          phone: '0400111222',
        },
        {
          user: {
            _id: 'mockId2',
            email: 'mockdoc@email.com',
            userType: {
              typeName: 'doctor',
            },
          },
          firstName: 'mockDocName',
          lastName: 'mockDocLName',
          shiftStartTime: '08:00',
          shiftEndTime: '16:00',
        },
        {
          user: {
            _id: 'mockId3',
            email: 'mockstaff@email.com',
            userType: {
              typeName: 'staff',
            },
          },
          firstName: 'mockStaffName',
          lastName: 'mockStaffLName',
        },
      ],
    });
  }),

  // Mock patient profile lookup
  http.get(`${API_BASE_URL}/api/v1/patients/:userId`, ({ params }) => {
    const { userId } = params;

    if (userId === 'mockId1') {
      return HttpResponse.json({
        success: true,
        data: {
          user: {
            _id: 'mockId1',
            email: 'mock@email.com',
            userType: {
              typeName: 'patient',
            },
          },
          firstName: 'mockFirstName',
          lastName: 'mockLastName',
          dateOfBirth: '2000-01-01',
          phone: '0400111222',
        },
      });
    }

    return HttpResponse.json(
      {
        success: false,
        message: 'Mock user not found',
      },
      { status: 404 },
    );
  }),

  // Mock PATCH patient profile
  http.patch(`${API_BASE_URL}/api/v1/patients/:userId`, async ({ request }) => {
    const reqJson = await request.clone().json();

    if (reqJson.firstName && reqJson.firstName === 'errorName') {
      return HttpResponse.json(
        {
          success: false,
          message: 'Mock error reason',
        },
        { status: 400 },
      );
    }

    return HttpResponse.json({
      success: true,
      data: {
        user: {
          _id: 'mockId1',
          email: 'mock@email.com',
          userType: {
            typeName: 'patient',
          },
        },
        firstName: 'mockFirstName',
        lastName: 'mockLastName',
        dateOfBirth: '2000-01-01',
        phone: '0400111222',
      },
    });
  }),
];

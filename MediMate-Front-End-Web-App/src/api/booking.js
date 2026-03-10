/* Booking Routes: Booking CRUD endpoints
 *
 * - GET /api/v1/bookings                           : List all bookings (staff only)
 * - GET /api/v1/bookings/patients/:userId          : Get all bookings for one patient (staff all, doctor self and patient self)
 * - GET /api/v1/bookings/doctors/:userId           : Get all bookings for one doctor (staff all, doctor self)
 * - GET /api/v1/bookings/:bookingId                : Get one booking (staff all, doctor self, patient self)
 * - POST /api/v1/bookings                          : Create a booking (staff and patient only)
 * - PATCH /api/v1/bookings/:bookingId              : Update a booking (staff, doctor self, patient self)
 * - PATCH /api/v1/bookings/:bookingId/doctorNotes  : Update doctor notes of a booking (doctor self only)
 * - GET /api/v1/bookings/:bookingId/doctorNotes    : Get doctor notes of a booking (doctor self only)
 * - DELETE /api/v1/bookings/:bookingId             : Delete a booking (staff and patient self)
 * */

import { getApiResponse } from './apiUtils';

// List all bookings
export async function getAllBookings() {
  return await getApiResponse('GET', 'api/v1/bookings', undefined, true).then(res => res.data);
}

// Get all bookings for one patient
export async function getPatientBookings(userId) {
  return await getApiResponse('GET', `api/v1/bookings/patients/${userId}`, undefined, true).then(
    res => res.data,
  );
}

// Get all bookings for one doctor
export async function getDoctorBookings(userId) {
  return await getApiResponse('GET', `api/v1/bookings/doctors/${userId}`, undefined, true).then(
    res => res.data,
  );
}

// Get one booking by bookingId
export async function getBookingById(bookingId) {
  return await getApiResponse('GET', `api/v1/bookings/${bookingId}`, undefined, true).then(
    res => res.data,
  );
}

// Create a booking
export async function createBooking(bookingData) {
  return await getApiResponse('POST', 'api/v1/bookings', bookingData, true);
}

// Update a booking
export async function updateBooking(bookingId, updateData) {
  return await getApiResponse('PATCH', `api/v1/bookings/${bookingId}`, updateData, true);
}

// Update doctor notes of a booking
export async function updateDoctorNotes(bookingId, doctorNotes) {
  return await getApiResponse(
    'PATCH',
    `api/v1/bookings/${bookingId}/doctorNotes`,
    { doctorNotes },
    true,
  );
}

// Get doctor notes of a booking
export async function getDoctorNotes(bookingId) {
  return await getApiResponse('GET', `api/v1/bookings/${bookingId}/doctorNotes`, undefined, true);
}

// Delete a booking
export async function deleteBooking(bookingId) {
  return await getApiResponse('DELETE', `api/v1/bookings/${bookingId}`, undefined, true);
}

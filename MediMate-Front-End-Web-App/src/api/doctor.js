/* Doctor Routes: Doctor profile CRUD endpoints
 *
 * - GET /api/v1/doctors                : List all doctors (staff and patient only)
 * - GET /api/v1/doctors/:userId        : Get one doctor (staff; doctor can view self)
 * - POST /api/v1/doctors               : Create doctor profile (staff only)
 * - PATCH /api/v1/doctors/:userId      : Update doctor (staff; doctor can update self)
 * - DELETE /api/v1/doctors/:userId     : Delete doctor profile (staff only)
 */

import { getApiResponse } from './apiUtils';

// Get all doctors
export async function getAllDoctors() {
  return await getApiResponse('GET', 'api/v1/doctors', undefined, true).then(res => res.data);
}

// Get one doctor by userId
export async function getDoctorById(userId) {
  return await getApiResponse('GET', `api/v1/doctors/${userId}`, undefined, true).then(
    res => res.data,
  );
}

// Create doctor profile
export async function createDoctorProfile(doctorData) {
  return await getApiResponse('POST', 'api/v1/doctors', doctorData, true);
}

// Update doctor
export async function updateDoctor(userId, updateData) {
  return await getApiResponse('PATCH', `api/v1/doctors/${userId}`, updateData, true);
}

// Delete doctor profile
export async function deleteDoctor(userId) {
  return await getApiResponse('DELETE', `api/v1/doctors/${userId}`, undefined, true);
}

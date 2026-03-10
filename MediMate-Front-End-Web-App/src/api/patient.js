/* Patient Routes: Patient profile CRUD operations
 *
 * - POST /api/v1/patients          : Create patient profile (patient only)
 * - GET /api/v1/patients/:userId   : Get patient by userId (Staff all,
 *                                    patients self, doctors with bookings for that patient)
 * - PATCH /api/v1/patients/:userId : Update patient profile (staff & patient only)
 * - DELETE /api/v1/patients/:userId: Delete patient (staff only)
 */

import { getApiResponse } from './apiUtils';

// Create patient profile
export async function createPatientProfile(patientData) {
  return await getApiResponse('POST', 'api/v1/patients', patientData, true);
}

// Get patient by userId
export async function getPatientById(userId) {
  return await getApiResponse('GET', `api/v1/patients/${userId}`, undefined, true).then(
    res => res.data,
  );
}

// Update patient profile
export async function updatePatient(userId, updateData) {
  return await getApiResponse('PATCH', `api/v1/patients/${userId}`, updateData, true);
}

// Delete patient
export async function deletePatient(userId) {
  return await getApiResponse('DELETE', `api/v1/patients/${userId}`, undefined, true);
}

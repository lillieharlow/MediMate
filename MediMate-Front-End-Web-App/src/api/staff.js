/* Staff Routes: Staff profile and management endpoints
 *
 * - PATCH /api/v1/staff/userType/:userId       : Change user type (staff only)
 * - POST /api/v1/staff                         : Create staff profile (staff only)
 * - GET /api/v1/staff/:userId                  : Get staff by userId (staff only)
 * - GET /api/v1/staff                          : List all staff (staff only)
 * - GET /api/v1/staff/patients                 : List all patients (staff only)
 * - GET /api/v1/staff/users                    : List all users of any type (staff only)
 * - PATCH /api/v1/staff/:userId                : Update staff profile (staff only)
 * - DELETE /api/v1/staff/:userId               : Delete staff (staff only)
 */

import { getApiResponse, getErrorReason } from './apiUtils';

// Change user type
export async function changeUserType(userId, updateUserData) {
  return await getApiResponse('PATCH', `api/v1/staff/userType/${userId}`, updateUserData, true);
}

// Create user account
export async function createUserProfile(userData) {
  const res = await getApiResponse('POST', `api/v1/staff/createUser`, userData, true);

  if (!res.success) {
    const errorsString = getErrorReason(res);
    throw new Error(`Signup failed: ${errorsString}`);
  }

  return res;
}

// Create staff profile
export async function createStaffProfile(staffData) {
  return await getApiResponse('POST', 'api/v1/staff', staffData, true);
}

// Get staff by userId
export async function getStaffById(userId) {
  return await getApiResponse('GET', `api/v1/staff/${userId}`, undefined, true).then(
    res => res.data,
  );
}

// List all staff
export async function getAllStaff() {
  return await getApiResponse('GET', 'api/v1/staff', undefined, true).then(res => res.data);
}

// List all patients
export async function getAllPatients(search = {}) {
  const params = Object.entries(search)
    .filter(([_, v]) => v)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  const endpoint = params ? `api/v1/staff/patients?${params}` : 'api/v1/staff/patients';
  const res = await getApiResponse('GET', endpoint, undefined, true);

  const returnArray = res.data;
  return returnArray;
}

// List all users of any type
export const populateUsersRequest = async () => {
  const profilesResData = await getApiResponse('GET', 'api/v1/staff/users', null, true);

  if (!profilesResData.success) {
    const errorsString = getErrorReason(profilesResData);
    throw new Error(`Get users failed: ${errorsString}`);
  }

  const returnObj = {
    users: profilesResData.data,
  };

  return returnObj;
};

// Update staff profile
export async function updateStaff(userId, updateData) {
  return await getApiResponse('PATCH', `api/v1/staff/${userId}`, updateData, true);
}

// Delete staff
export async function deleteStaff(userId) {
  return await getApiResponse('DELETE', `api/v1/staff/${userId}`, undefined, true);
}

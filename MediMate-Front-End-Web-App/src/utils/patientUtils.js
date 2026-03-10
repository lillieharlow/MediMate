/**
 * patientUtils.js
 *
 * Shared utility functions for patient-related data.
 * Used in: DoctorManagerListCard.jsx, DoctorManagerCard.jsx, StaffPatientManager.jsx
 * Exports:
 *   - getPatientFullName: Extracts a patient's full name from a patient object (handles nested user).
 *   - isToday: Checks if a date string is today.
 */

// Extract a patient's full name from a patient object (handles nested user)
export function getPatientFullName(patient) {
  if (!patient) return '';
  const user = patient.user && typeof patient.user === 'object' ? patient.user : {};
  const firstName = patient.firstName || user.firstName || '';
  const lastName = patient.lastName || user.lastName || '';
  return `${firstName} ${lastName}`.trim();
}

// Check if a date string is today
export function isToday(dateString) {
  if (!dateString) return false;
  const today = new Date();
  const date = new Date(dateString);
  return (
    date.getFullYear() === today.getFullYear()
    && date.getMonth() === today.getMonth()
    && date.getDate() === today.getDate()
  );
}

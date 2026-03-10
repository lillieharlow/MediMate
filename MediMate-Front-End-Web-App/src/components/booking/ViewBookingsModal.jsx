/*
 * ViewBookingsModal.jsx
 *
 * Modal dialog for viewing all bookings for a patient.
 * Fetches and displays bookings using PatientMyBookingsCard.
 * Allows refreshing bookings from within the modal.
 *
 * Props:
 *   open (bool): Whether the modal is open
 *   onClose (func): Called when the modal is closed
 *   patientId (string): The patient's ID whose bookings are shown
 *   doctors (array): List of doctor objects for display
 */

import { useEffect, useState } from 'react';

import { getPatientBookings } from '../../api/booking';
import { ModalOverlay, ModalTitle, PopupCard } from '../../style/componentStyles';

import CloseButton from '../button/CloseButton';
import PatientMyBookingsCard from '../dashboard/PatientMyBookingsCard';

export default function ViewBookingsModal({ open, onClose, patientId, doctors }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!(open && patientId)) return;
    getPatientBookings(patientId).then(data => setBookings(data || []));
  }, [open, patientId]);

  if (!open) return null;

  return (
    <ModalOverlay>
      <PopupCard style={{ minWidth: 400 }}>
        <CloseButton aria-label="Close" onClick={onClose} />
        <ModalTitle>View Bookings</ModalTitle>
        {bookings.length === 0 ? (
          <div>---------- No bookings ----------</div>
        ) : (
          <PatientMyBookingsCard
            bookings={bookings}
            doctors={doctors}
            onBookingsRefresh={async () => {
              setBookings((await getPatientBookings(patientId)) || []);
            }}
          />
        )}
      </PopupCard>
    </ModalOverlay>
  );
}

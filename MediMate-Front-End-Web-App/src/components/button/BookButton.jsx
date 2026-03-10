/*
 * BookButton.jsx
 *
 * Renders a "BOOK" action button that opens the CreateBookingModal.
 * Handles booking logic:
 *   - For staff: fetch all doctors for selection.
 *   - For doctors: fetch latest bookings for the doctor.
 *   - For patients: refresh bookings for the selected doctor.
 * Passes props to the modal and manages modal open/close state.
 */

import { useState } from 'react';

import { getDoctorBookings } from '../../api/booking';
import { getAllDoctors } from '../../api/doctor';
import { useAuth } from '../../contexts/AuthContext';

import CreateBookingModal from '../booking/CreateBookingModal';
import ActionButton from './ActionButton';

function BookButton({
  doctor,
  patientId,
  onBookingCreated,
  existingBookings,
  onBookButtonClick,
  onModalClose,
  staffSelectedDoctor = null,
}) {
  const [open, setOpen] = useState(false);
  const [latestBookings, setLatestBookings] = useState(existingBookings || []);
  const [doctors, setDoctors] = useState([]);
  const { userType } = useAuth();

  const handleOpen = async () => {
    if (userType === 'staff') {
      setOpen(true);
      const allDocs = await getAllDoctors();
      setDoctors(allDocs || []);
    } else if (userType === 'doctor') {
      if (typeof doctor?.user === 'string') {
        try {
          const bookings = await getDoctorBookings(doctor.user);
          setLatestBookings(bookings || []);
        } catch {
          setLatestBookings(existingBookings || []);
        }
      }
      setOpen(true);
    } else {
      if (onBookButtonClick && typeof doctor?.user === 'string') {
        const freshBookings = await onBookButtonClick(doctor.user);
        setLatestBookings(freshBookings || []);
      } else {
        setLatestBookings(existingBookings || []);
      }
      setOpen(true);
    }
  };

  const handleBookingCreated = createdDoctorId => {
    if (userType === 'staff' && createdDoctorId) {
      onBookingCreated?.(createdDoctorId);
    } else {
      onBookingCreated?.();
    }
  };
  const handleModalClose = () => {
    setOpen(false);
    if (onModalClose) onModalClose();
  };
  const isStaff = userType === 'staff';
  const isPatient = userType === 'patient';
  const selectedDoctor =
    isStaff && staffSelectedDoctor
      ? doctors.find(d => d.user && d.user._id === staffSelectedDoctor)
      : doctor;
  return (
    <>
      <ActionButton type="button" onClick={handleOpen}>
        BOOK
      </ActionButton>
      <CreateBookingModal
        open={open}
        onClose={handleModalClose}
        doctor={selectedDoctor}
        patientId={patientId}
        onBookingCreated={handleBookingCreated}
        existingBookings={latestBookings}
        doctors={isStaff ? doctors : undefined}
        disableDoctorSelect={isPatient}
      />
    </>
  );
}

export default BookButton;

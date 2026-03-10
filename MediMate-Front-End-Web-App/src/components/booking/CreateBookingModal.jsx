/*
 * CreateBookingModal.jsx
 *
 * Shows a popup modal form for patients or staff to book an appointment with a doctor.
 * - Loads available doctors and their bookings.
 * - Only shows time slots that are not already booked.
 * - Only allows booking for future times within the doctor's working hours.
 * - Handles form input, validation, and errors.
 * - Uses styled-components for styling.
 *
 * Usage:
 * <CreateBookingModal
 *   open={true}
 *   doctor={doctorObj}
 *   patientId={patientId}
 *   onClose={closeFn}
 *   onBookingCreated={refreshFn}
 *   doctors={doctorsArray}
 *   disableDoctorSelect={false}
 * />
 */

import { useEffect, useState } from 'react';

import { createBooking, getDoctorBookings, getPatientBookings } from '../../api/booking';

import { filterAvailableSlots, generateSlots } from '../../utils/bookingSlotUtils';
import BookingFormCard from './BookingFormCard';

export default function CreateBookingCard({
  open,
  onClose,
  doctor: initialDoctor,
  patientId,
  onBookingCreated,
  doctors: doctorsProp,
  disableDoctorSelect = false,
}) {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('15');
  const [doctor, setDoctor] = useState(initialDoctor || null);
  const [doctors, setDoctors] = useState(doctorsProp || []);
  const [error, setError] = useState('');

  function setErrorAndLoading(msg) {
    setError(msg);
    setLoading(false);
  }

  // Load all doctors if not provided (for staff users)
  useEffect(() => {
    if (open && !initialDoctor && (!doctorsProp || doctorsProp.length === 0)) {
      import('../../api/doctor').then(({ getAllDoctors }) => {
        getAllDoctors().then(setDoctors);
      });
    }
  }, [open, initialDoctor, doctorsProp]);

  useEffect(() => {
    // Accept both doctor._id and doctor.user?._id for compatibility
    let doctorId = '';
    if (typeof doctor?.user?._id === 'string') {
      doctorId = doctor.user._id;
    } else if (typeof doctor?._id === 'string') {
      doctorId = doctor._id;
    }

    // Only proceed if doctorId is a valid 24-char hex string
    if (!(open && date && doctorId && patientId && doctorId.match(/^[0-9a-fA-F]{24}$/))) return;

    setLoading(true);
    Promise.all([getDoctorBookings(doctorId, date), getPatientBookings(patientId, date)])
      .then(([doctorBookingsRes, patientBookingsRes]) => {
        const shiftStart = doctor.shiftStart || '09:00';
        const shiftEnd = doctor.shiftEnd || '17:00';
        const slotDuration = parseInt(duration, 10) || 15;
        const slots = generateSlots(date, shiftStart, shiftEnd, slotDuration);
        const allBookings = [...(doctorBookingsRes || []), ...(patientBookingsRes || [])];
        const filteredSlots = filterAvailableSlots(slots, allBookings, date, slotDuration);
        setAvailableSlots(filteredSlots);
      })
      .catch(() => {
        setAvailableSlots([]);
      })
      .finally(() => setLoading(false));
  }, [open, date, doctor, patientId, duration]);

  // Reset selected time when date or doctor changes
  useEffect(() => {
    setTime('');
  }, []);

  // Clear error when date, doctor, or time changes
  useEffect(() => {
    setError('');
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Accept both doctor._id and doctor.user?._id for compatibility
      const doctorId = doctor?.user?._id || doctor?._id;
      if (!(date && time && doctorId && patientId)) {
        setErrorAndLoading('Please select all required fields.');
        return;
      }
      if (!availableSlots.some(slot => slot.value === time)) {
        setErrorAndLoading('Please select a valid available time slot.');
        return;
      }
      const datetimeStart = new Date(`${date}T${time}`);
      if (Number.isNaN(datetimeStart.getTime())) {
        setErrorAndLoading('Please select a valid date and time.');
        return;
      }
      const parsedDuration = parseInt(duration, 10);
      const bookingPayload = {
        patientId: patientId,
        doctorId: doctorId,
        datetimeStart: datetimeStart.toISOString(),
        bookingDuration: parsedDuration,
        patientNotes: notes,
      };
      const result = await createBooking(bookingPayload);
      setLoading(false);
      if (result && result.success === false) {
        setError(result.message || 'Failed to create booking. Please try again.');
        return;
      }
      onClose?.();
      if (onBookingCreated) {
        setTimeout(() => {
          if (doctorId) {
            onBookingCreated(doctorId);
          } else {
            onBookingCreated();
          }
        }, 750);
      }
    } catch {
      setError('Failed to create booking. Please try again.');
      setLoading(false);
    }
  };

  // Only require doctor for slot loading and booking, allow modal to open for staff and patients
  if (!open) return null;

  return (
    <section>
      <BookingFormCard
        open={open}
        onClose={onClose}
        doctor={doctor}
        setDoctor={setDoctor}
        patientId={patientId}
        doctors={doctors}
        onSubmit={handleSubmit}
        submitLabel="Create Booking"
        loading={loading}
        error={error}
        availableSlots={availableSlots}
        setDate={setDate}
        setTime={setTime}
        setDuration={setDuration}
        setNotes={setNotes}
        date={date}
        time={time}
        duration={duration}
        notes={notes}
        disableDoctorSelect={disableDoctorSelect || (!!initialDoctor && !doctorsProp)}
        title="Create Booking"
      />
    </section>
  );
}

/*
 * UpdateBookingModal.jsx
 *
 * Popup form for patients to update an existing booking.
 * UI and logic are based on CreateBookingModal, but pre-fills fields and updates booking via API.
 */

import { useEffect, useState } from 'react';

import { getDoctorBookings, getPatientBookings, updateBooking } from '../../api/booking';

import { filterAvailableSlots, generateSlots } from '../../utils/bookingSlotUtils';
import BookingFormCard from './BookingFormCard';

export default function UpdateBookingModal({
  open,
  onClose,
  booking,
  doctor,
  patientId,
  onBookingUpdated,
}) {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [notes, setNotes] = useState(booking?.patientNotes || '');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(
    booking
      ? (() => {
          const d = new Date(booking.datetimeStart);
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const dd = String(d.getDate()).padStart(2, '0');
          return `${yyyy}-${mm}-${dd}`;
        })()
      : '',
  );
  const [time, setTime] = useState(
    booking
      ? (() => {
          const d = new Date(booking.datetimeStart);
          const hh = String(d.getHours()).padStart(2, '0');
          const min = String(d.getMinutes()).padStart(2, '0');
          return `${hh}:${min}`;
        })()
      : '',
  );
  const [duration, setDuration] = useState(booking?.bookingDuration?.toString() || '15');
  const [error, setError] = useState('');

  function setErrorAndLoading(msg) {
    setError(msg);
    setLoading(false);
  }

  useEffect(() => {
    if (!(open && date && doctor && doctor._id && patientId)) return;
    setLoading(true);
    Promise.all([getDoctorBookings(doctor._id, date), getPatientBookings(patientId, date)])
      .then(([doctorBookingsRes, patientBookingsRes]) => {
        const filteredDoctorBookings = (doctorBookingsRes || []).filter(b => b._id !== booking._id);
        const filteredPatientBookings = (patientBookingsRes || []).filter(
          b => b._id !== booking._id,
        );
        const shiftStart = doctor.shiftStart || '09:00';
        const shiftEnd = doctor.shiftEnd || '17:00';
        const slotDuration = parseInt(duration, 10) || 15;
        const slots = generateSlots(date, shiftStart, shiftEnd, slotDuration);
        const allBookings = [...filteredDoctorBookings, ...filteredPatientBookings];
        let filteredSlots = filterAvailableSlots(
          slots,
          allBookings,
          date,
          slotDuration,
          booking._id,
        );
        // Always include the current booking's slot if not present
        const currentTime = (() => {
          const d = new Date(booking.datetimeStart);
          const hh = String(d.getHours()).padStart(2, '0');
          const min = String(d.getMinutes()).padStart(2, '0');
          return `${hh}:${min}`;
        })();
        if (
          currentTime
          && !filteredSlots.some(slot => slot.value === currentTime)
          && slots.some(slot => slot.value === currentTime)
        ) {
          // Add the current slot from slots (with label)
          const slotToAdd = slots.find(slot => slot.value === currentTime);
          filteredSlots = [slotToAdd, ...filteredSlots];
        }
        setAvailableSlots(filteredSlots);
      })
      .catch(() => {
        setAvailableSlots([]);
      })
      .finally(() => setLoading(false));
  }, [open, date, doctor, patientId, duration, booking._id, booking.datetimeStart]);

  useEffect(() => {
    setError('');
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (!(date && time && doctor && patientId)) {
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

      // Get valid doctorId string (must be a valid MongoDB ObjectId string)
      let doctorId = '';
      if (typeof doctor?.user?._id === 'string' && doctor.user._id.match(/^[0-9a-fA-F]{24}$/)) {
        doctorId = doctor.user._id;
      } else if (typeof doctor?._id === 'string' && doctor._id.match(/^[0-9a-fA-F]{24}$/)) {
        doctorId = doctor._id;
      } else {
        setErrorAndLoading('Invalid doctor ID format.');
        return;
      }

      await updateBooking(booking._id, {
        doctorId,
        datetimeStart,
        bookingDuration: parsedDuration,
        patientNotes: notes,
      });
      setLoading(false);
      if (onBookingUpdated) onBookingUpdated(doctorId);
      if (onClose) onClose();
    } catch {
      setErrorAndLoading('Failed to update booking. Please try again.');
    }
  };

  if (!open) return null;

  return (
    <section>
      <BookingFormCard
        open={open}
        onClose={onClose}
        doctor={doctor}
        patientId={patientId}
        onSubmit={handleSubmit}
        submitLabel="Update Booking"
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
        disableDoctorSelect={true}
        title="Update Booking"
        onBookingUpdated={onBookingUpdated}
      />
    </section>
  );
}

/**
 * bookingSlotUtils.js
 *
 * Shared utility functions for generating and filtering booking slots.
 * Used in: CreateBookingModal.jsx, UpdateBookingModal.jsx
 * Exports:
 *   - formatTime12Hour: Format a Date object as a 12-hour time string.
 *   - generateSlots: Generate all possible slots for a doctor's shift.
 *   - filterAvailableSlots: Remove slots that overlap with bookings or are in the past.
 */

// Format a Date object as 12-hour time string (e.g., 1:30 pm)
export function formatTime12Hour(dateObj) {
  let hour = dateObj.getHours();
  const min = dateObj.getMinutes().toString().padStart(2, '0');
  const ampm = hour >= 12 ? 'pm' : 'am';
  hour %= 12;
  if (hour === 0) hour = 12;
  return `${hour}:${min} ${ampm}`;
}

// Generate all possible slots for a doctor's shift
export function generateSlots(date, shiftStart, shiftEnd, slotDuration) {
  const slots = [];
  const start = new Date(`${date}T${shiftStart}`);
  const end = new Date(`${date}T${shiftEnd}`);
  for (let t = new Date(start); t < end; t.setMinutes(t.getMinutes() + slotDuration)) {
    const value = t.toTimeString().slice(0, 5);
    const label = formatTime12Hour(t);
    slots.push({ value, label });
  }
  return slots;
}

/**
 * Filter slots to remove those that overlap with existing bookings or are in the past (if today)
 * @param {Array} slots - Array of { value, label }
 * @param {Array} bookings - Array of bookings with datetimeStart and bookingDuration
 * @param {string} date - YYYY-MM-DD
 * @param {number} slotDuration - in minutes
 * @param {string} [excludeBookingId] - booking _id to exclude (for update)
 * @returns {Array}
 */
export function filterAvailableSlots(slots, bookings, date, slotDuration, excludeBookingId) {
  function overlaps(slotStart, slotEnd, bookingStart, bookingEnd) {
    return slotStart < bookingEnd && bookingStart < slotEnd;
  }
  const now = new Date();
  const isToday = date === now.toISOString().slice(0, 10);

  return slots.filter(slot => {
    // Parse slotStart as local time
    const [hour, minute] = slot.value.split(':').map(Number);
    const [year, month, day] = date.split('-').map(Number);
    const slotStart = new Date(year, month - 1, day, hour, minute, 0, 0);
    const slotEnd = new Date(slotStart.getTime() + slotDuration * 60000);

    if (isToday && slotStart <= now) return false;

    for (const b of bookings) {
      if (excludeBookingId && b._id === excludeBookingId) continue;
      if (!(b.datetimeStart && b.bookingDuration)) continue;
      const bookingStart = new Date(b.datetimeStart);
      const bookingEnd = new Date(bookingStart.getTime() + (b.bookingDuration || 15) * 60000);
      if (overlaps(slotStart, slotEnd, bookingStart, bookingEnd)) return false;
    }
    return true;
  });
}

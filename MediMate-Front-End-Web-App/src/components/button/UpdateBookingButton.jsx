/*
 * UpdateBookingButton.jsx
 *
 * Renders an "Update Booking" action button for booking management.
 * Calls onUpdate(bookingId) when clicked.
 * ActionButton for styling.
 */

import ActionButton from './ActionButton';

function UpdateBookingButton({ bookingId, onUpdate }) {
  return (
    <ActionButton
      $bg="#2393ca"
      $color="#000000"
      onClick={() => onUpdate(bookingId)}
      style={{ fontSize: '0.85rem' }}
    >
      Update Booking
    </ActionButton>
  );
}

export default UpdateBookingButton;

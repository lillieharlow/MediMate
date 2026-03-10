/*
 * ManageBookingButton.jsx
 *
 * Renders a "Manage Booking" action button for booking management.
 * Calls onManage(bookingId) when clicked.
 * ActionButton for styling.
 */

import ActionButton from './ActionButton';

function ManageBookingButton({ bookingId, onManage }) {
  return (
    <ActionButton
      $bg="#2393ca"
      $color="#000000"
      onClick={() => onManage(bookingId)}
      style={{ fontSize: '0.85rem' }}
    >
      Manage Booking
    </ActionButton>
  );
}

export default ManageBookingButton;

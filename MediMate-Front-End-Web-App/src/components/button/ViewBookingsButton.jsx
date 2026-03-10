/*
 * ViewBookingsButton.jsx
 *
 * Renders a "View Bookings" action button for viewing a patient's bookings.
 * Calls onClick() when clicked.
 * ActionButton for styling.
 */

import ActionButton from './ActionButton';

function ViewBookingsButton({ onClick }) {
  return (
    <ActionButton $bg="#388bff" $color="#000000" type="button" onClick={onClick}>
      View Bookings
    </ActionButton>
  );
}

export default ViewBookingsButton;

/*
 * CreateBookingButton.jsx
 *
 * Renders a disabled "Create Booking" action button.
 * Intended for future use (e.g., staff booking creation modal).
 * Uses ActionButton for consistent styling.
 */

import ActionButton from './ActionButton';

function CreateBookingButton() {
  return (
    <ActionButton type="button" disabled>
      Create Booking
    </ActionButton>
  );
}

export default CreateBookingButton;

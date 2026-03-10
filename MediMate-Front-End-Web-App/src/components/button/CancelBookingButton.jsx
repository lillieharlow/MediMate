/*
 * CancelBookingButton.jsx
 *
 * Renders a "Cancel Booking" action button.
 * When clicked, opens the CancelBookingModal for confirmation.
 * Calls onCancel(bookingId) if the user confirms.
 */

import { useState } from 'react';

import CancelBookingModal from '../booking/CancelBookingModal';
import ActionButton from './ActionButton';

function CancelBookingButton({ bookingId, onCancel }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCancelClick = e => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onCancel(bookingId);
  };

  const handleClose = e => {
    if (e) e.stopPropagation();
    setShowConfirm(false);
  };

  return (
    <>
      <ActionButton
        $bg="#c90000"
        $color="#ffffff"
        onClick={handleCancelClick}
        style={{ fontSize: '0.85rem' }}
      >
        Cancel Booking
      </ActionButton>
      <CancelBookingModal open={showConfirm} onConfirm={handleConfirm} onClose={handleClose} />
    </>
  );
}

export default CancelBookingButton;

/*
 * FindPatientButton.jsx
 *
 * Renders a "Find Patient" action button for triggering patient search.
 * Calls onFind() when clicked.
 * ActionButton for styling.
 */

import ActionButton from './ActionButton';

function FindPatientButton({ onFind }) {
  return (
    <ActionButton type="button" onClick={onFind}>
      Find Patient
    </ActionButton>
  );
}

export default FindPatientButton;

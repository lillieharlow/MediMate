/*
 * CloseButton.jsx
 *
 * Reusable close ("×") button for modals and dialogs.
 * Uses StyledCloseButton.
 * Accepts an onClick handler prop.
 */

import { StyledCloseButton } from '../../style/componentStyles';

export default function CloseButton({ onClick }) {
  return (
    <StyledCloseButton type="button" aria-label="Close" onClick={onClick}>
      ×
    </StyledCloseButton>
  );
}

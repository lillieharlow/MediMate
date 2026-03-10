/*
 * ActionButton.jsx
 *
 * Generic styled button for actions throughout the app.
 * Accepts $bg and $color props for custom colors.
 * Renders children as button content.
 */

import { ColoredButton } from '../../style/componentStyles';

function ActionButton({ children, onClick, bg, color, ...props }) {
  return (
    <ColoredButton $bg={bg} $color={color} onClick={onClick} {...props}>
      {children}
    </ColoredButton>
  );
}

export default ActionButton;

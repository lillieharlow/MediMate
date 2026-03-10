/*
 * CreateAccountCard.jsx
 *
 * Card containing link to the /signup page, allowing users to create a new account
 */

import { useNavigate } from 'react-router';
import { DialogCard } from '../style/componentStyles';

export default function CreateAccountCard() {
  const navigate = useNavigate();
  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <DialogCard data-testid="app-create-account-card">
      <h3 data-testid="app-create-account-card-heading">Don't have a MediMate account?</h3>
      <button
        type="button"
        onClick={handleCreateAccount}
        data-testid="app-create-account-card-button"
      >
        Create Patient Account
      </button>
    </DialogCard>
  );
}

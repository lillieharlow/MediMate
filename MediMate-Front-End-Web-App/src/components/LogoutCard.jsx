/*
 * LogoutCard.jsx
 *
 * Card containing log out confirmation dialog
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useAuth } from '../contexts/AuthContext';

import { ModalOverlay, PopupCard } from '../style/componentStyles';
import CloseButton from './button/CloseButton';

export default function LogoutCard() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  return (
    <ModalOverlay>
      <PopupCard data-testid="app-logout-card">
        <CloseButton onClick={() => navigate(-1)} />
        <h3 data-testid="app-logout-heading">Log Out</h3>
        <p>Are you sure you want to log out?</p>
        <button
          type="button"
          onClick={() => logout()}
          data-testid="app-logout-card-button"
          style={{ backgroundColor: '#d66565', fontWeight: 'bold' }}
        >
          Yes, log out
        </button>
      </PopupCard>
    </ModalOverlay>
  );
}

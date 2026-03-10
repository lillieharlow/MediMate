/*
 * Header.jsx
 *
 * Defines the header for use on all app pages
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { BlurOverlay } from '../../style/componentStyles';
import HeaderMenu from './HeaderMenu';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const MenuButton = styled.button`
  padding: 0.5rem 0.75rem;
`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // Ensure menu starts closed in instances where user has previously logged out on render
  useEffect(() => {
    setMenuOpen(false);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <StyledHeader>
      <span>
        <Link to="/" style={{ color: 'inherit' }}>
          <h3 data-testid="app-header-title">MediMate</h3>
        </Link>
      </span>

      {/* Conditionally render menu button for logged in users */}
      {isAuthenticated && (
        <div style={{ position: 'relative' }}>
          <MenuButton type="button" onClick={() => setMenuOpen(prev => !prev)}>
            <span style={{ fontSize: '16pt' }} data-testid="app-header-menu-icon">
              ☰
            </span>
          </MenuButton>

          {/* Render overlay first so the menu is still interactable */}
          {menuOpen && <BlurOverlay onClick={closeMenu} />}

          {menuOpen && <HeaderMenu onClose={() => setMenuOpen(false)} onClickItem={closeMenu} />}
        </div>
      )}
    </StyledHeader>
  );
}

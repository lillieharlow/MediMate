/**
 * Footer.jsx
 *
 * Displays copyright and site info at the bottom of all pages.
 */

export default function Footer() {
  return (
    <footer
      style={{
        width: '100%',
        padding: '1rem',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 999,
      }}
    >
      &copy; 2026 MediMate. All rights reserved.
    </footer>
  );
}

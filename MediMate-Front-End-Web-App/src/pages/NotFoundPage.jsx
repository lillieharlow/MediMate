/*
 * NotFoundPage.jsx
 *
 * Displays a 404 error message when a user navigates to a non-existent or unauthorized route.
 */

const NotFoundPage = () => (
  <main style={{ textAlign: 'center', marginTop: '10vh' }}>
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <a href="/dashboard">Click here to go back to yourDashboard</a>
  </main>
);

export default NotFoundPage;

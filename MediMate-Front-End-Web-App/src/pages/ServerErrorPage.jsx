/*
 * ServerErrorPage.jsx
 *
 * Displays a 500 Internal Server Error message for unexpected server or application errors.
 * Styled to match DashboardPage cards.
 */

import { Card, DashboardCardContent } from '../style/componentStyles.js';

const ServerErrorPage = () => (
  <Card style={{ marginTop: '10vh', maxWidth: 500 }}>
    <DashboardCardContent style={{ textAlign: 'center' }}>
      <h1>500 - Internal Server Error</h1>
      <p>
        Oops! Something went wrong on our end.
        <br />
        Please try again later or contact support if the issue persists.
      </p>
    </DashboardCardContent>
  </Card>
);

export default ServerErrorPage;

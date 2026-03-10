/*
 * DashboardCard.jsx
 *
 * Reusable card component for displaying dashboard sections.
 * Props:
 *   - title (string, required): The card's title.
 *   - children (node): Card content; can include actions.
 *   - style (object): Optional custom styles for the card.
 * Used on dashboard pages to wrap dashboard content in a styled card.
 */

import PropTypes from 'prop-types';

import { Card, DashboardCardContent } from '../../style/componentStyles.js';

const DashboardCard = ({ title, children, style }) => {
  return (
    <Card style={style}>
      <header className="dashboard-card-header">
        <h3 className="dashboard-card-title">{title}</h3>
        {typeof children === 'object' && children && children.props && children.props.actions && (
          <div className="dashboard-card-actions">{children.props.actions}</div>
        )}
      </header>
      <DashboardCardContent className="dashboard-card-content">{children}</DashboardCardContent>
    </Card>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default DashboardCard;

/*
 * DoctorManagerListCard.jsx
 *
 * Displays a single booking for a doctor in a row style.
 * Shows the clock icon, booking time and patient name.
 * Used in staff and doctor dashboards for today's bookings.
 */

import PropTypes from 'prop-types';
import { FiClock } from 'react-icons/fi';

import { getPatientFullName } from '../../utils/patientUtils';

const DoctorManagerListCard = ({ booking }) => {
  const time = booking.datetimeStart
    ? new Date(booking.datetimeStart).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    : '';
  const patientName = booking.patientProfile ? getPatientFullName(booking.patientProfile) : '';
  return (
    <div data-testid="doctor-manager-list-card">
      <FiClock style={{ marginRight: '0.7em', verticalAlign: 'middle' }} />
      {booking.datetimeStart ? (
        <time dateTime={booking.datetimeStart} style={{ marginRight: '1.2em', fontWeight: 500 }}>
          {time}
        </time>
      ) : null}
      <span>{patientName}</span>
    </div>
  );
};

DoctorManagerListCard.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    datetimeStart: PropTypes.string,
    patientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default DoctorManagerListCard;

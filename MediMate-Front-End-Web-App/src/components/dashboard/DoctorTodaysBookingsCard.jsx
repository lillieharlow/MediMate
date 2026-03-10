/*
 * DoctorTodaysBookingsCard.jsx
 *
 * Displays today's bookings for a doctor or staff user in a dashboard card.
 * - Colors past bookings grey.
 * - Allows selecting a booking via click (doctor only).
 * Used in doctor and staff dashboards.
 */

import PropTypes from 'prop-types';

import { NameBox, NameBoxRow } from '../../style/componentStyles';
import DashboardCard from './DashboardCard';
import DoctorManagerListCard from './DoctorManagerListCard';

const TodaysBookingsCard = ({
  doctorBookings,
  containerClassName,
  cardStyle,
  selectedBooking,
  onBookingSelect,
  disablePointer,
}) => {
  const now = new Date();
  // Sort bookings by datetimeStart ascending
  const sortedBookings = [...doctorBookings].sort((a, b) => {
    if (!(a.datetimeStart && b.datetimeStart)) return 0;
    return new Date(a.datetimeStart) - new Date(b.datetimeStart);
  });

  return (
    <DashboardCard title="Today's Bookings" style={cardStyle}>
      <div className={containerClassName} data-testid="doctor-todays-bookings-card">
        {sortedBookings.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              marginTop: '1.5em',
              color: '#e0e0e0',
              fontWeight: 500,
            }}
          >
            ---------- No more bookings today ----------
          </div>
        ) : (
          sortedBookings.map(booking => {
            const bookingTime = new Date(booking.datetimeStart);
            const isPast = bookingTime < now;
            const isSelected = selectedBooking && booking._id === selectedBooking._id;
            let bgColor;
            if (isPast) {
              bgColor = '#e0e0e0';
            } else {
              bgColor = undefined;
            }
            return (
              <NameBoxRow
                $selected={isSelected}
                key={booking._id}
                onClick={() => typeof onBookingSelect === 'function' && onBookingSelect(booking)}
                style={{ cursor: disablePointer ? 'default' : 'pointer' }}
              >
                <NameBox $bg={bgColor} style={{ width: '70%', margin: '0 auto' }}>
                  <DoctorManagerListCard booking={booking} />
                </NameBox>
              </NameBoxRow>
            );
          })
        )}
      </div>
    </DashboardCard>
  );
};

TodaysBookingsCard.defaultProps = {
  renderBooking: undefined,
  containerClassName: '',
  cardStyle: undefined,
  onBookingSelect: undefined,
  selectedBooking: undefined,
};

TodaysBookingsCard.propTypes = {
  doctorBookings: PropTypes.array.isRequired,
  renderBooking: PropTypes.func,
  containerClassName: PropTypes.string,
  cardStyle: PropTypes.object,
  onBookingSelect: PropTypes.func,
  selectedBooking: PropTypes.object,
};
export default TodaysBookingsCard;

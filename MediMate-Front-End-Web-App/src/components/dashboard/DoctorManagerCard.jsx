/*
 * DoctorManagerCard.jsx
 *
 * Dashboard card for staff users to select a doctor and view that doctor's bookings for today.
 * Fetches all doctors on mount and displays a select dropdown.
 * Uses TodaysBookingsCard to render the selected doctor's bookings.
 */

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getAllDoctors } from '../../api/doctor';
import { ListSeparator, StyledLabel, StyledSelect } from '../../style/componentStyles';

import { isToday } from '../../utils/patientUtils';
import TodaysBookingsCard from './DoctorTodaysBookingsCard';

function DoctorManagerCard({ selectedDoctor, setSelectedDoctor, doctorBookings, disablePointer }) {
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [errorDoctors, setErrorDoctors] = useState('');

  useEffect(() => {
    setLoadingDoctors(true);
    setErrorDoctors('');
    getAllDoctors()
      .then(res => {
        setDoctors(res);
      })
      .catch(() => {
        setErrorDoctors('Failed to load doctors');
      })
      .finally(() => setLoadingDoctors(false));
  }, []);

  const todaysBookings = Array.isArray(doctorBookings)
    ? doctorBookings.filter(b => isToday(b.datetimeStart))
    : [];

  return (
    <section data-testid="doctor-manager-card">
      <StyledLabel
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <p style={{ minWidth: 110, textAlign: 'center', marginBottom: 4 }}>Select doctor</p>
        <StyledSelect
          id="doctor-manager-select"
          name="doctor-manager-select"
          autoComplete="off"
          value={selectedDoctor}
          onChange={e => {
            setSelectedDoctor(e.target.value);
          }}
          style={{
            width: 240,
            maxWidth: '90%',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <option value="">-- Select Doctor --</option>
          {loadingDoctors && <option disabled>Loading...</option>}
          {!loadingDoctors && errorDoctors && <option disabled>{errorDoctors}</option>}
          {!(loadingDoctors || errorDoctors)
            && (doctors || []).map(doctor => (
              <option key={String(doctor._id)} value={String(doctor.user?._id)}>
                {doctor.firstName} {doctor.lastName}
              </option>
            ))}
        </StyledSelect>
      </StyledLabel>
      <ListSeparator />
      <TodaysBookingsCard
        doctorBookings={todaysBookings}
        containerClassName="doctor-manager-bookings"
        cardStyle={{
          border: 'none',
          boxShadow: 'none',
          padding: 0,
          background: 'transparent',
        }}
        disablePointer={disablePointer}
      />
    </section>
  );
}

DoctorManagerCard.propTypes = {
  selectedDoctor: PropTypes.string.isRequired,
  setSelectedDoctor: PropTypes.func.isRequired,
  doctorBookings: PropTypes.array.isRequired,
  onBookingCreated: PropTypes.func,
  disablePointer: PropTypes.bool,
};

export default DoctorManagerCard;

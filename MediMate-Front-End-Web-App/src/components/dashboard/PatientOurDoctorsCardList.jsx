/*
 * PatientOurDoctorsCardList.jsx
 *
 * Lists all doctors for the patient dashboard.
 * Each doctor is displayed in an outlined card with an icon, name, and a "Book" button.
 * Used in the patient dashboard to allow booking appointments with any doctor.
 */

import { FaUserMd } from 'react-icons/fa';

import { getDoctorBookings } from '../../api/booking';
import { NameBox } from '../../style/componentStyles.js';

import BookButton from '../button/BookButton.jsx';

function PatientOurDoctorsCardList({ doctors = [], patientId, onBookingCreated }) {
  const handleBookButtonClick = async doctorId => {
    if (!doctorId) return [];
    const freshBookings = await getDoctorBookings(doctorId);
    return freshBookings;
  };

  return (
    <section
      aria-label="Our Doctors"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
      }}
    >
      {doctors.map(doctor => (
        <NameBox
          key={doctor._id}
          $bg="#fff"
          style={{
            padding: '1rem 2rem',
          }}
        >
          <FaUserMd style={{ fontSize: 40, color: '#222' }} />
          <p
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 'rem',
              letterSpacing: '0.2px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            Dr. {doctor.firstName} {doctor.lastName}
          </p>
          <BookButton
            doctor={doctor}
            patientId={patientId}
            existingBookings={[]}
            onBookingCreated={onBookingCreated}
            onBookButtonClick={() => handleBookButtonClick(doctor.user)}
          />
        </NameBox>
      ))}
    </section>
  );
}

export default PatientOurDoctorsCardList;

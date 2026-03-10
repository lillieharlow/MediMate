/*
 * DoctorCurrentBookingCard.jsx
 *
 * Displays the current booking for a doctor, including patient notes and editable appointment notes.
 * Used in the doctor dashboard.
 * Allows doctors to view and update appointment notes for the current booking.
 */

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { getDoctorNotes, updateDoctorNotes } from '../../api/booking';
import { getPatientById } from '../../api/patient';
import { ColoredButton, NameBox } from '../../style/componentStyles';

import NotesSection from '../NotesSection.jsx';
import DoctorManagerListCard from './DoctorManagerListCard.jsx';

const CurrentBookingCard = ({ booking }) => {
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [currentBooking, setCurrentBooking] = useState(booking);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    setCurrentBooking(booking);
    setSaveMsg('');
    async function fetchDoctorNotesAndProfile() {
      if (booking?._id) {
        const res = await getDoctorNotes(booking._id);
        setAppointmentNotes(res?.data?.doctorNotes || '');
      } else {
        setAppointmentNotes('');
      }
      if (booking && !booking.patientProfile && booking.patientId) {
        try {
          const profile = await getPatientById(booking.patientId);
          setCurrentBooking(prev => (prev ? { ...prev, patientProfile: profile } : prev));
        } catch (e) {
          console.error('Failed to fetch patient profile:', e);
        }
      }
    }
    fetchDoctorNotesAndProfile();
  }, [booking]);

  const handleSaveNotes = async () => {
    if (!currentBooking) return;
    setSaving(true);
    setSaveMsg('');
    try {
      await updateDoctorNotes(currentBooking._id, appointmentNotes);
      const notesRes = await getDoctorNotes(currentBooking._id);
      setAppointmentNotes(notesRes?.data?.doctorNotes || '');
      setSaveMsg('Notes saved!');
      setTimeout(() => setSaveMsg(''), 2000);
    } catch {
      setSaveMsg('Failed to save notes.');
      setTimeout(() => setSaveMsg(''), 2000);
    } finally {
      setSaving(false);
    }
  };

  if (!currentBooking)
    return (
      <section data-testid="doctor-current-booking-card">
        <p
          style={{
            textAlign: 'center',
            marginTop: '1.5em',
            color: '#e0e0e0',
            fontWeight: 500,
          }}
        >
          ---------- No current booking ----------
        </p>
      </section>
    );

  return (
    <section data-testid="doctor-current-booking-card">
      <article style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <NameBox
          style={{
            width: '70%',
            margin: '0 auto',
          }}
        >
          <DoctorManagerListCard booking={currentBooking} />
        </NameBox>
      </article>
      <section>
        <NotesSection
          label="Patient Notes"
          value={currentBooking?.patientNotes || 'No notes.'}
          readOnly
          style={{ marginTop: '1rem' }}
        />
      </section>
      <section>
        <NotesSection
          label="Appointment Notes"
          value={appointmentNotes}
          onChange={e => setAppointmentNotes(e.target.value)}
          placeholder="Add appointment notes..."
          style={{ marginTop: '1rem' }}
        />
      </section>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <ColoredButton
          type="button"
          $bg="#388bff"
          style={{
            marginTop: '1.5rem',
            minWidth: 160,
          }}
          onClick={handleSaveNotes}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Notes'}
        </ColoredButton>
        {saveMsg && (
          <p
            style={{
              color: saveMsg.includes('saved') ? '#000000' : 'red',
              marginTop: '1rem',
              textAlign: 'center',
            }}
          >
            {saveMsg}
          </p>
        )}
      </div>
    </section>
  );
};

CurrentBookingCard.propTypes = {
  doctorBookings: PropTypes.array.isRequired,
};

export default CurrentBookingCard;

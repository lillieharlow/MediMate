/*
 * BookingFormCard.jsx
 *
 * Shared form logic and UI for creating or updating a booking.
 * Used by CreateBookingModal and UpdateBookingModal.
 */

import {
  ColoredButton,
  ErrorMessage,
  FormFieldLabel,
  FormFieldRow,
  ModalOverlay,
  ModalTitle,
  PopupCard,
  StyledForm,
  StyledInput,
  StyledSelect,
} from '../../style/componentStyles';
import CloseButton from '../button/CloseButton';

function DoctorSelectSection({
  doctors,
  doctor,
  setDoctor,
  setDate,
  setTime,
  setNotes,
  setDuration,
  externalLoading,
  disableDoctorSelect,
}) {
  if (doctors && !disableDoctorSelect) {
    return (
      <FormFieldRow>
        <FormFieldLabel htmlFor="doctor-select">Doctor:</FormFieldLabel>
        <StyledSelect
          id="doctor-select"
          name="doctor-select"
          autoComplete="organization"
          value={doctor?.user?._id || ''}
          onChange={e => {
            const selected = doctors.find(d => d.user && d.user._id === e.target.value);
            setDate('');
            setTime('');
            setNotes('');
            setDuration('15');
            if (selected && setDoctor) {
              setDoctor(selected);
            }
          }}
          required
          style={{
            width: '100%',
            textAlign: 'center',
          }}
          disabled={externalLoading || doctors.length === 0}
        >
          <option value="">Select doctor</option>
          {doctors.map(d => (
            <option key={d._id} value={d.user?._id}>
              Dr. {d.firstName} {d.lastName}
            </option>
          ))}
        </StyledSelect>
      </FormFieldRow>
    );
  }
  if (doctor) {
    return (
      <FormFieldRow>
        <FormFieldLabel htmlFor="doctor-select-disabled">Doctor:</FormFieldLabel>
        <StyledSelect
          id="doctor-select-disabled"
          value={doctor._id}
          disabled
          style={{
            width: '100%',
            textAlign: 'center',
            background: '#f8f8f8',
            color: '#333',
          }}
        >
          <option value={doctor.user}>
            Dr. {doctor.firstName} {doctor.lastName}
          </option>
        </StyledSelect>
      </FormFieldRow>
    );
  }
  return null;
}

export default function BookingFormCard({
  open,
  onClose,
  doctor,
  setDoctor,
  doctors,
  onSubmit,
  submitLabel = 'Create Booking',
  loading: externalLoading = false,
  error: externalError = '',
  availableSlots = [],
  setDate,
  setTime,
  setDuration,
  setNotes,
  date,
  time,
  duration,
  notes,
  disableDoctorSelect = false,
  title,
}) {
  const todayObj = new Date();
  const todayStr = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, '0')}-${String(todayObj.getDate()).padStart(2, '0')}`;

  if (!open) return null;

  let buttonLabel = submitLabel;
  if (externalLoading) {
    buttonLabel = submitLabel === 'Update Booking' ? 'Updating...' : 'Creating...';
  }

  return (
    <ModalOverlay>
      <PopupCard>
        <CloseButton onClick={onClose} />
        {title && (
          <FormFieldRow style={{ marginBottom: 10 }}>
            <ModalTitle>{title}</ModalTitle>
          </FormFieldRow>
        )}
        <StyledForm
          onSubmit={e => {
            if (onSubmit) {
              onSubmit(e);
            } else {
              e.preventDefault();
            }
          }}
        >
          <DoctorSelectSection
            doctors={doctors}
            doctor={doctor}
            setDoctor={setDoctor}
            setDate={setDate}
            setTime={setTime}
            setNotes={setNotes}
            setDuration={setDuration}
            externalLoading={externalLoading}
            disableDoctorSelect={disableDoctorSelect}
          />
          <FormFieldRow>
            <FormFieldLabel htmlFor="booking-date">Date:</FormFieldLabel>
            <StyledInput
              id="booking-date"
              name="booking-date"
              type="date"
              autoComplete="bday"
              value={date}
              min={todayStr}
              onChange={e => setDate(e.target.value)}
              required
              style={{ marginBottom: 0, width: 180 }}
            />
          </FormFieldRow>
          <FormFieldRow>
            <FormFieldLabel htmlFor="booking-duration">Duration:</FormFieldLabel>
            <StyledSelect
              id="booking-duration"
              name="booking-duration"
              autoComplete="off"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              style={{ marginBottom: 0, width: 180 }}
            >
              <option value="15">15 min</option>
              <option value="30">30 min</option>
            </StyledSelect>
          </FormFieldRow>
          <FormFieldRow>
            <FormFieldLabel htmlFor="booking-time">Time:</FormFieldLabel>
            <StyledSelect
              id="booking-time"
              name="booking-time"
              autoComplete="off"
              value={time}
              onChange={e => setTime(e.target.value)}
              style={{
                marginBottom: 0,
                width: '100%',
                background:
                  availableSlots.length === 0 && date && doctor && !externalLoading
                    ? '#f8f8f8'
                    : undefined,
                fontStyle:
                  availableSlots.length === 0 && date && doctor && !externalLoading
                    ? 'italic'
                    : undefined,
              }}
              disabled={!date || externalLoading}
            >
              {externalLoading && <option value="">Loading...</option>}
              {!externalLoading && availableSlots.length === 0 && date && doctor && (
                <option value="" disabled>
                  No appointments available
                </option>
              )}
              {!externalLoading && availableSlots.length > 0 && (
                <>
                  <option value="">Select time</option>
                  {availableSlots.map(slot => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </>
              )}
            </StyledSelect>
          </FormFieldRow>
          <FormFieldRow
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <FormFieldLabel htmlFor="booking-notes" style={{ marginBottom: 4 }}>
              Notes for Doctor:
            </FormFieldLabel>
            <textarea
              id="booking-notes"
              name="booking-notes"
              autoComplete="off"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Reason for your booking, anything the Doctor should know?"
              style={{
                minHeight: 60,
                borderRadius: 4,
                padding: '0.2rem',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />
          </FormFieldRow>
          <ColoredButton
            type="submit"
            disabled={
              externalLoading || !date || !time || !availableSlots.some(slot => slot.value === time)
            }
          >
            {buttonLabel}
          </ColoredButton>
          {externalError && <ErrorMessage>{externalError}</ErrorMessage>}
        </StyledForm>
      </PopupCard>
    </ModalOverlay>
  );
}

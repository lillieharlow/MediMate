/*
 * ManageProfileCard.jsx
 *
 * Card containing profile fields conditionally rendered based on the user type, to facilitate updates to the users profile
 *
 * props:
 * - userInfo: Information of the user to be modified
 * - onProfileUpdated: Function to execute when profile is updated
 * - userTypeChanged: Bool indicating if the profile being modified belongs to an altered user account type
 */

/** biome-ignore-all lint/a11y/noLabelWithoutControl: Ignored due to use of custom InputField component */
import { useEffect, useState } from 'react';
import { getDoctorById, updateDoctor } from '../api/doctor';
import { getPatientById, updatePatient } from '../api/patient';
import { changeUserType, getStaffById, updateStaff } from '../api/staff';
import {
  DialogCard,
  FormErrorSpan,
  InputGrid,
  StyledForm,
  StyledInput,
} from '../style/componentStyles';

export default function ManageProfileCard({ userInfo, onProfileUpdated, userTypeChanged }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shiftStart, setShiftStart] = useState('');
  const [shiftEnd, setShiftEnd] = useState('');
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const handleManageProfile = async event => {
    event.preventDefault();
    setIsError(false);
    setMessage('');

    try {
      const requiredData = {
        patient: {
          firstName,
          middleName,
          lastName,
          dateOfBirth: dob,
          phone: phoneNumber,
        },
        doctor: {
          firstName,
          lastName,
          shiftStartTime: shiftStart,
          shiftEndTime: shiftEnd,
        },
        staff: {
          firstName,
          lastName,
        },
      };

      let res;
      if (userTypeChanged) {
        res = await changeUserType(userInfo.userId, {
          typeName: userInfo.userType,
          profileData: requiredData[userInfo.userType],
        });
      } else {
        const updateFunction = {
          patient: updatePatient,
          doctor: updateDoctor,
          staff: updateStaff,
        };

        res = await updateFunction[userInfo.userType](
          userInfo.userId,
          requiredData[userInfo.userType],
        );
      }

      if (!res) throw new Error('An unexpected error occured.');
      if (!res.success) throw new Error(`${res.error.message}`);
      onProfileUpdated ? onProfileUpdated(res.data) : null;
      setMessage('Profile updated successfully!');
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let profileData = {};
      if (userInfo.userType === 'patient') {
        profileData = await getPatientById(userInfo.userId);
        setDob(profileData.dateOfBirth);
        setMiddleName(profileData.middleName ?? '');
        setPhoneNumber(profileData.phone);
      }

      if (userInfo.userType === 'doctor') {
        profileData = await getDoctorById(userInfo.userId);
        setShiftStart(profileData.shiftStartTime);
        setShiftEnd(profileData.shiftEndTime);
      }

      if (userInfo.userType === 'staff') {
        profileData = await getStaffById(userInfo.userId);
      }

      if (!profileData) throw new Error('Error retrieving profile');

      // Set common fields
      setFirstName(profileData.firstName);
      setLastName(profileData.lastName);
    };
    // Fetch data only if userType not changed, otherwise don't send request as no profile will exist
    !userTypeChanged && fetchData();
  }, [userInfo, userTypeChanged]);

  return (
    <DialogCard data-testid="app-profile-card">
      <StyledForm onSubmit={handleManageProfile}>
        <InputGrid>
          <label htmlFor="input-first-name">First Name:</label>
          <StyledInput
            id="input-first-name"
            type="text"
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
            placeholder="First name"
            required
            data-testid="app-profile-form-input-firstname"
          />

          {userInfo.userType === 'patient' && (
            <>
              <label htmlFor="input-middle-name">Middle Name:</label>
              <StyledInput
                id="input-middle-name"
                type="text"
                value={middleName}
                onChange={event => setMiddleName(event.target.value)}
                placeholder="Middle name"
                data-testid="app-profile-form-input-middlename"
              />
            </>
          )}

          <label htmlFor="input-last-name">Last Name:</label>
          <StyledInput
            id="input-last-name"
            type="text"
            value={lastName}
            onChange={event => setLastName(event.target.value)}
            placeholder="Last name"
            required
            data-testid="app-profile-form-input-lastname"
          />

          {userInfo.userType === 'patient' && (
            <>
              <label htmlFor="input-dob">Date of Birth:</label>
              <StyledInput
                id="input-dob"
                type="date"
                value={dob}
                onChange={event => setDob(event.target.value)}
                required
                data-testid="app-profile-form-input-dob"
              />
              <label htmlFor="input-phone">Phone Number:</label>
              <StyledInput
                id="input-phone"
                type="tel"
                value={phoneNumber}
                onChange={event => setPhoneNumber(event.target.value)}
                placeholder="Phone #"
                required
                data-testid="app-profile-form-input-phone"
              />
            </>
          )}

          {userInfo.userType === 'doctor' && (
            <>
              <label htmlFor="input-shift-start">Shift Start:</label>
              <StyledInput
                id="input-shift-start"
                type="time"
                value={shiftStart}
                onChange={event => setShiftStart(event.target.value)}
                required
                data-testid="app-profile-form-input-shift-start"
              />
              <label htmlFor="input-shift-end">Shift End:</label>
              <StyledInput
                id="input-shift-end"
                type="time"
                value={shiftEnd}
                onChange={event => setShiftEnd(event.target.value)}
                placeholder="Phone #"
                required
                data-testid="app-profile-form-input-shift-end"
              />
            </>
          )}
        </InputGrid>

        <FormErrorSpan id="login-error-span" className={isError ? 'error' : ''}>
          {message}
        </FormErrorSpan>
        <button type="submit" data-testid="app-profile-form-button-submit">
          Save Changes
        </button>
      </StyledForm>
    </DialogCard>
  );
}

/*
 * SignupForm.jsx
 *
 * Allow new users to create patient accounts with required fields
 *
 * props:
 * - userType: Type of user account to create, defaults to patient
 * - staffCreated: Bool indicating if the account is created by a staff member
 * - onUserAdded: Function to execute when the user has been created
 */

/** biome-ignore-all lint/a11y/noLabelWithoutControl: Ignored due to use of custom InputField component */
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { signupRequest } from '../api/auth';
import { createUserProfile } from '../api/staff';
import {
  DialogCard,
  FormErrorSpan,
  InputGrid,
  StyledForm,
  StyledInput,
} from '../style/componentStyles';

// TODO: Update styling for input to reflect front-end validation once done

export default function SignupForm({ userType = 'patient', staffCreated, onUserAdded }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [shiftStart, setShiftStart] = useState('');
  const [shiftEnd, setShiftEnd] = useState('');
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignupSubmit = async event => {
    event.preventDefault();
    setIsError(false);
    setMessage('');
    setShowPassword(false);

    try {
      let signupRes;

      if (staffCreated) {
        signupRes = await createUserProfile({
          userType,
          email,
          password,
          firstName,
          middleName,
          lastName,
          dateOfBirth: dob,
          phone,
          shiftStartTime: shiftStart,
          shiftEndTime: shiftEnd,
        });
      } else {
        signupRes = await signupRequest({
          email,
          password,
          firstName,
          middleName,
          lastName,
          dateOfBirth: dob,
          phone,
        });
      }

      if (signupRes.success) {
        setMessage(
          staffCreated
            ? 'Account created'
            : 'Patient account created! Redirecting to login page...',
        );

        staffCreated && onUserAdded(signupRes.data);
        if (staffCreated) return;
        setTimeout(
          () => {
            navigate('/login');
          },
          1000 * 3, //3 seconds
        );
      }
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <DialogCard>
      {!staffCreated && <h2 data-testid="app-signup-heading">Create Account</h2>}
      <StyledForm onSubmit={handleSignupSubmit} data-testid="app-signup-form">
        <InputGrid>
          <label htmlFor="signup-email" className="is-required">
            Email:
          </label>
          <StyledInput
            id="signup-email"
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder={staffCreated ? 'Enter email' : 'Enter your email'}
            required
            data-testid="app-signup-form-input-email"
          />

          <label htmlFor="signup-password" className="is-required">
            Password:
          </label>
          <div>
            <StyledInput
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder={staffCreated ? 'Enter password' : 'Choose your password'}
              required
              data-testid="app-signup-form-input-password"
            />
            <button
              onClick={togglePasswordVisibility}
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                marginLeft: '10px',
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <label htmlFor="signup-firstname" className="is-required">
            First Name:
          </label>
          <StyledInput
            id="signup-firstname"
            type="text"
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
            placeholder={staffCreated ? 'User first name' : 'Your first name'}
            required
            data-testid="app-signup-form-input-firstname"
          />

          {userType === 'patient' && (
            <>
              <label htmlFor="signup-middlename">Middle Name:</label>
              <StyledInput
                id="signup-middlename"
                type="text"
                value={middleName}
                onChange={event => setMiddleName(event.target.value)}
                placeholder={staffCreated ? 'User middle name' : 'Your middle name'}
                data-testid="app-signup-form-input-middlename"
              />
            </>
          )}

          <label htmlFor="signup-lastname" className="is-required">
            Last Name:
          </label>
          <StyledInput
            id="signup-lastname"
            type="text"
            value={lastName}
            onChange={event => setLastName(event.target.value)}
            placeholder={staffCreated ? 'User last name' : 'Your last/family name'}
            required
            data-testid="app-signup-form-input-lastname"
          />

          {userType === 'patient' && (
            <>
              <label htmlFor="signup-dob" className="is-required">
                Date of Birth:
              </label>
              <StyledInput
                id="signup-dob"
                type="date"
                value={dob}
                onChange={event => setDob(event.target.value)}
                required
                data-testid="app-signup-form-input-dob"
              />

              <label htmlFor="signup-phone" className="is-required">
                Phone Number:
              </label>
              <StyledInput
                id="signup-phone"
                type="tel"
                value={phone}
                onChange={event => setPhone(event.target.value)}
                placeholder={staffCreated ? 'Phone #' : 'Your mobile / landline'}
                required
                data-testid="app-signup-form-input-phone"
              />
            </>
          )}

          {userType === 'doctor' && (
            <>
              <label htmlFor="signup-shiftstart" className="is-required">
                Shift Start Time:
              </label>
              <StyledInput
                id="signup-shiftstart"
                type="time"
                value={shiftStart}
                required
                onChange={event => setShiftStart(event.target.value)}
                data-testid="app-signup-form-input-shiftstart"
              />

              <label htmlFor="signup-shiftend" className="is-required">
                Shift End Time:
              </label>
              <StyledInput
                id="signup-shiftend"
                type="time"
                value={shiftEnd}
                required
                onChange={event => setShiftEnd(event.target.value)}
                data-testid="app-signup-form-input-shiftend"
              />
            </>
          )}
        </InputGrid>

        <FormErrorSpan id="signup-error-span" className={isError ? 'error' : ''}>
          {message}
        </FormErrorSpan>
        <button type="submit" data-testid="app-signup-form-button-submit">
          Create Account
        </button>
      </StyledForm>
    </DialogCard>
  );
}

/*
 * LoginForm.jsx
 *
 * Form containing fields to facilitate user login
 */

/** biome-ignore-all lint/a11y/noLabelWithoutControl: Ignored due to use of custom InputField component */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { loginRequest } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';
import {
  DialogCard,
  FormErrorSpan,
  InputGrid,
  StyledForm,
  StyledInput,
} from '../style/componentStyles';
import { getJwtPayload } from '../utils/jwt';

export default function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const handleLoginSubmit = async event => {
    event.preventDefault();
    setMessage('');
    setIsError(null);

    try {
      const { token } = await loginRequest({ email, password });
      const payload = getJwtPayload(token);

      if (!payload) throw new Error('Invalid token');

      login({ userId: payload.userId, userType: payload.userType, token });
      navigate('/dashboard');
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    }
  };

  return (
    <DialogCard>
      <h2>Log In</h2>
      <StyledForm onSubmit={handleLoginSubmit} data-testid="app-login-form">
        <InputGrid>
          <label htmlFor="login-email-input">Email:</label>
          <StyledInput
            id="login-email-input"
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
            data-testid="app-login-form-input-email"
          />
          <label htmlFor="login-password-input">Password:</label>
          <StyledInput
            id="login-password-input"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Enter your password"
            minLength={6}
            required
            data-testid="app-login-form-input-password"
          />
        </InputGrid>
        <FormErrorSpan id="login-error-span" className={isError ? 'error' : ''}>
          {message}
        </FormErrorSpan>
        <button type="submit" data-testid="app-login-form-button-submit">
          Log In
        </button>
      </StyledForm>
    </DialogCard>
  );
}

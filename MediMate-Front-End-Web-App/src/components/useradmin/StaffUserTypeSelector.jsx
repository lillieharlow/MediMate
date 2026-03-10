/*
 * StaffUserTypeSelector.jsx
 *
 * Component to allow modification of a users account type
 *
 * prop:
 * - onChangeType: Function to execute when a users account type has been changed
 */

import styled from 'styled-components';
import { InputGrid } from '../../style/componentStyles';

const StyledSelect = styled.select`
  padding: 0.2rem;
  margin: 1rem;
  border-radius: 4px;
  outline: none;
  border: 1px solid rgba(204, 204, 204, 0.5);
  width: 150px;

  &:focus {
    border: 1.5px solid rgba(0, 123, 255, 0.5);
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
    color: black;
  }
`;

export default function StaffUserTypeSelector({ onChangeType }) {
  const userTypeOptions = [
    { display: 'Patient', value: 'patient' },
    { display: 'Doctor', value: 'doctor' },
    { display: 'Staff', value: 'staff' },
  ];

  const handleChangeType = event => {
    onChangeType(event.target.value);
  };

  return (
    <InputGrid>
      <label htmlFor="create-account-select-type">Account Type: </label>
      <StyledSelect
        id="create-account-select-type"
        onChange={handleChangeType}
        data-testid="app-useradmin-select-usertype"
      >
        {userTypeOptions.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.display}
            </option>
          );
        })}
      </StyledSelect>
    </InputGrid>
  );
}

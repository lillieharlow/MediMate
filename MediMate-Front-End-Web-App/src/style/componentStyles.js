/*
 * componentStyles.js
 *
 * Define reusable styled components for the app
 *
 */

import styled from 'styled-components';

export const Card = styled.section`
  flex: 1 1 350px;
  min-width: 300px;
  max-width: 600px;
  width: auto;
  height: 60vh;
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1.5rem 2.5rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  @media (max-width: 900px) {
    width: 90vw;
    min-width: unset;
    max-width: 98vw;
    margin: 0 1rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (max-width: 600px) {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  @media (max-width: 1040px) and (min-width: 840px) {
    width: 80%;
    max-width: 100vw;
    margin-left: 0;
    margin-right: 0;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

export const DialogCard = styled.section`
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 1.5rem 2.5rem;
  border-radius: 12px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DashboardCardRow = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  @media (max-width: 1040px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

export const DashboardCardContent = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0;
  margin: 0 auto;
  list-style: none;
`;

export const StyledLi = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.4rem;
  padding-bottom: 0.4rem;
`;

export const InputGrid = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 1rem;
  align-items: center;
  > label {
    font-weight: bold;
    text-align: right;

    &.is-required::after {
      content: " *";
      color: red;
    }
  }
`;

export const StyledInput = styled.input`
  width: 250px;
  min-width: 180px;
  max-width: 250px;
  padding: 0.4rem 0.7rem;
  border-radius: 6px;
  border: 1px solid #cccccc;
  font-size: 1rem;
  text-align: center;
  margin: 0 auto 1rem auto;
  display: block;

  &:focus {
    border: 1.5px solid rgba(0, 123, 255, 0.5);
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
    color: black;
  }

  &:user-invalid {
    border: 1.5px solid rgba(255, 0, 0, 0.5);
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2);
    color: black;
  }
`;

export const FormErrorSpan = styled.span`
  color: green;
  &.error {
    color: red;
  }
`;

export const FormFieldRow = styled.ul`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
`;

export const FormFieldLabel = styled.label`
  font-weight: 500;
  margin-right: 10px;
  min-width: 0;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  height: 40px;
`;

export const ColoredButton = styled.button`
  background-color: ${({ $bg }) => $bg || '#008533'};
  color: ${({ $color }) => $color || '#fff'};
  font-weight: bold;
  border: 2px solid #000000;
  border-radius: 6px;
  box-shadow: 3px 3px 8px #0000002e;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition:
    box-shadow 0.2s,
    transform 0.2s;
  outline: none;
  &:hover {
    box-shadow: 8px 8px 16px #00000038;
    transform: translate(2px, 2px);
    outline: none;
  }
`;

export const NameBox = styled.article`
  background: ${({ $bg }) => $bg || '#80d09e'};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000000;
  border-radius: 24px;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  width: 80%;
  max-width: 400px;
  padding: 0.3rem 2.5rem;
  font-weight: bold;
  font-size: 1.1rem;
  box-sizing: border-box;
  @media (max-width: 1040px) {
    width: 80%;
    min-width: 0;
    max-width: 99vw;
    margin-left: 1vw;
    margin-right: 1vw;
    padding-left: 1rem;
    padding-right: 1rem;
  }
    @media (max-width: 600px) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-size: 1rem;
    max-width: 80%;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

export const NameBoxRow = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ $selected }) => ($selected ? '#acacacba' : 'transparent')};
  margin-bottom: 0.6rem;
  box-sizing: border-box;
  padding-left: 0;
  padding-right: 0;
  transition: background 0.2s;
  width: auto;
  margin-left: -2.5rem;
  margin-right: -2.5rem;
`;

export const PatientListActions = styled.article`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.8rem;
  margin-bottom: 0.5rem;
`;

export const ListSeparator = styled.hr`
  border: none;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  margin: 1.2rem 0 0.05rem 0;
`;

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 500;
  min-width: 110px;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

export const StyledSelect = styled.select`
  width: 250px;
  min-width: 180px;
  max-width: 250px;
  padding: 0.4rem 0.7rem;
  border-radius: 6px;
  border: 1px solid #cccccc;
  font-size: 1rem;
  text-align: center;
  margin: 0 auto 1rem auto;
  display: block;
`;

export const CenteredHeading = styled.h4`
  text-align: center;
  margin: 1.2rem 0 1.2rem 0;
`;

export const BlurOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.01);
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
`;
export const StyledTextarea = styled.textarea`
  min-width: 120px;
  max-width: 400px;
  width: 100%;
  padding: 0.4rem 0.7rem;
  border-radius: 6px;
  border: 1px solid #cccccc;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  margin-top: 0.3rem;
`;

export const PopupCard = styled.dialog`
  flex: 1 1 500px;
  min-width: 420px;
  max-width: 700px;
  width: 100%;
  height: auto;
  border-radius: 12px;
  border: none;
  padding: 2.2rem 3.2rem 2rem 3.2rem;
  box-sizing: border-box;
  @media (max-width: 800px) {
    min-width: 0;
    max-width: 98vw;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  > h3 {
    margin-bottom: 0.8rem;
    width: 100%;
    text-align: center;
  }
  > p {
    margin-bottom: 1.2rem;
    width: 100%;
    text-align: center;
  }
  > button {
    min-width: 140px;
    margin: 0 auto;
    display: block;
  }
  margin: 0;
  position: relative;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 400px;
  background: #fff;
  border-radius: 12px;
  padding: 2rem 1.5rem;
  position: relative;
  @media (max-width: 900px) {
    width: 90vw;
    min-width: unset;
    max-width: 98vw;
    margin: 0 1rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (max-width: 600px) {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

export const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: -10px;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  outline: none;
  box-shadow: none;
  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
    border: none;
    background: none;
  }
`;
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fffdfd70;
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
  margin: 0 0 16px 0;
  text-align: center;
  width: 100%;
`;

export const ErrorMessage = styled.p`
  margin-top: 10px;
  color: red;
  font-size: 14px;
  text-align: center;
`;

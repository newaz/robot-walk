import styled from 'styled-components';

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px auto;
  min-width: 300px;
`;

export const Label = styled.label`
  margin-bottom: 0.5em;
  margin-right: 1em;
  display: block;
`;

export const Input = styled.input`
  padding: 0.5em;
  color: palevioletred;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
`;

export const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin-top: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

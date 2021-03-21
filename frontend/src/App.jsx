import React, { useState } from 'react';

import styled, { createGlobalStyle } from 'styled-components';
import { RobotController } from './RobotController';

const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
  }
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const Result = styled.div`
  background: BurlyWood;
  height: 3em;
  margin-top: 1em;
  flex: 1;
  align-items: center;
  justify-content: center;
  align-content: center;
  display: flex;
}
`;

const App = () => {
  const [result, setResult] = useState();

  const calculatePosition = (pos) => {
    setResult(`(${pos.position}, ${pos.orientation})`);
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <h3>Robot controller</h3>
      <RobotController onSubmit={calculatePosition} />
      <Result aria-label='result'> {result} </Result>
    </Wrapper>
  );
};

export default App;

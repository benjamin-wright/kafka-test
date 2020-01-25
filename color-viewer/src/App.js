import React, { useState } from 'react';
import './App.css';
import useInterval from './hooks/set-interval';

import ColorBar from './color-elements/color-bar';
import metricsApi from './services/metrics';
import styled from 'styled-components';

const ColorTable = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const Page = styled.div`
  height: 10em;
  width: 1vw;
`;

function App() {
  const [ colorState, setColorState ] = useState({
    blue: 0,
    red: 0,
    green: 0
  });

  useInterval(() => {
    metricsApi.getColors().then(colors => {
      setColorState(colors);
    });

  }, 1000);

  function getColorBars(colors) {
    return Object.keys(colors).map(key => (<ColorBar color={key} value={colors[key]} />))
  }

  return (
    <div className="App">
      <Page>
        <ColorTable>
          { getColorBars(colorState) }
        </ColorTable>
      </Page>
    </div>
  );
}

export default App;

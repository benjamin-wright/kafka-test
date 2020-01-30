import React, { useState } from 'react';
import './App.css';
import useInterval from './hooks/set-interval';

import ColorWheel from './color-elements/color-wheel';
import Header from './page-components/header';
import metricsApi from './services/metrics';
import styled from 'styled-components';

const ColorTable = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const Page = styled.div`
  height: 90vh;
  width: 100vw;
`;

function App() {
  const [ colorState, setColorState ] = useState({
    total: 0,
    colors: {}
  });

  useInterval(() => {
    metricsApi.getColors().then(colors => {
      setColorState(colors);
    });

  }, 1000);

  function getColorBars(total, colors) {
    return Object.keys(colors).map(key => (<ColorWheel color={key} value={colors[key] / total} />))
  }

  return (
    <div className="App">
      <Header title="Color Viewer!" />
      <Page>
        <p>Totals: { colorState.total }</p>
        <ColorTable>
          { getColorBars(colorState.total, colorState.colors) }
        </ColorTable>
      </Page>
    </div>
  );
}

export default App;

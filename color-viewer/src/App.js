import React, { useState } from 'react';
import './App.css';
import useInterval from './hooks/set-interval';

import ColorBar from './color-elements/color-bar';
import metricsApi from './services/metrics';

function App() {
  const [ colorState, setColorState ] = useState({
    blue: 0,
    red: 0,
    green: 0
  });

  useInterval(() => {
    metricsApi.getColors().then(colors => {
      setColorState({
        ...colorState,
        ...colors
      });
    });

  }, 1000);

  function getColorBars(colors) {
    return <> { Object.keys(colors).map(key => (<ColorBar color={key} value={colors[key]} />)) }</>
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Some rubbish content
        </p>
        { getColorBars(colorState) }
      </header>
    </div>
  );
}

export default App;

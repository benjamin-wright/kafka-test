import React from 'react';
import './App.css';

import ColorBar from './color-elements/color-bar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Some rubbish content
        </p>
        <ColorBar color="blue" />
      </header>
    </div>
  );
}

export default App;

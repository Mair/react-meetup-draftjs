import * as React from 'react';
import './App.css';

import Simple from './draftjs/a_simple';

const logo = require('./logo.svg');

class App extends React.Component<null, null> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React and... Draft-js</h2>
        </div>
        <div className="editor">
          <Simple />
        </div>
      </div>
    );
  }
}

export default App;

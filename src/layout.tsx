import * as React from 'react';
import {Links} from './App';

const logo = require('./logo.svg');

export const Layout = (props) =>
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React and... Draft-js</h2>
    </div>
    <div className="layout">
      <Links />
      <div className="layout-right">
        {props.children}
      </div>
    </div>
  </div>;
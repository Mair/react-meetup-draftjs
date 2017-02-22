import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import 'highlight.js/styles/androidstudio.css';
import './App.css';

ReactDOM.render(
  <div className="container-fluid"><App /></div>,
  document.getElementById('root') as HTMLElement
);

import * as React from 'react';
import './App.css';
import { Router, Route, Link, browserHistory } from 'react-router';
import * as DraftSamples from './draftjs';
const logo = require('./logo.svg');

const LinkItem = (props: { route: string, DisplayText: string }) =>
  <li className="menu-item">
    <Link to={props.route} className="menu-link" activeStyle={{ color: 'cyan' }}>{props.DisplayText}</Link>
  </li>;

const Links = () =>
  <ul className="menu">
    <LinkItem DisplayText="Simple" route="simple" />
    <LinkItem DisplayText="Rich Utils" route="rich-utils" />
  </ul>;

const Home = (props) =>
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React and... Draft-js</h2>
    </div>
    <div className="layout">
      <Links />
      <div className="editor">
        {props.children}
      </div>
    </div>
  </div>;

class App extends React.Component<null, null> {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home} >
          <Route path="/simple" component={DraftSamples.Simple}  />
          <Route path="/rich-utils" component={DraftSamples.RichUtilsSample} />
        </Route>
      </Router>

    );
  }
}

export default App;

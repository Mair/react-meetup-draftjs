import * as React from 'react';
import { Router, Route, Link, browserHistory, Redirect } from 'react-router';
import * as DraftSamples from './draftjs';
import { Layout } from './layout';
import { HomeDoc } from './home';

const LinkItem = (props: { route: string, DisplayText: string, isSection?: boolean }) =>
  <li className={props.isSection ? 'menu-section' : 'menu-item'}>
    <Link to={props.route} className="menu-link" activeStyle={{ color: 'cyan' }}>{props.DisplayText}</Link>
  </li>;

export const Links = () =>
  <ul className="menu">
    <LinkItem DisplayText="Home" route="/" />
   
    <LinkItem DisplayText="Simple" route="simple" />
    <LinkItem DisplayText="Content State" route="contentstate" isSection={true} />
    <LinkItem DisplayText="Create content state" route="createeditorstate" />
    <LinkItem DisplayText="Selection State" route="selectionstate" />
    <LinkItem DisplayText="Rich Utils" route="rich-utils" />
    <LinkItem DisplayText="Block Function" route="blockfn" />
  </ul>;

class App extends React.Component<null, null> {
  render() {
    return (
      <Router history={browserHistory}>
        <Redirect from="/" to="/Home" />
        <Route path="/" component={Layout} >
          <Route path="/home" component={HomeDoc} />
          <Route path="/createeditorstate" component={DraftSamples.CreateEditorStateWithDoc} />
          <Route path="/simple" component={DraftSamples.SimpleWithDoc} />
          <Route path="/contentstate" component={DraftSamples.ContentStateViewWithDoc} />
          <Route path="/selectionstate" component={DraftSamples.SelectionStateViewWithDoc} />
          <Route path="/rich-utils" component={DraftSamples.RichUtilsSampleWithDoc} />
          <Route path="/blockfn" component={DraftSamples.BlockfnWithDoc} />
        </Route>
      </Router>

    );
  }
}

export default App;

import * as React from 'react';
import { Router, Route, Link, browserHistory, Redirect } from 'react-router';
import * as DraftSamples from './draftjs';
import { Layout } from './layout';

const LinkItem = (props: { route: string; DisplayText: string; isSection?: boolean }) => (
  <li className={props.isSection ? 'menu-section' : 'menu-item'}>
    <Link to={props.route} className="menu-link" activeStyle={{ color: 'cyan' }}>
      {props.DisplayText}
    </Link>
  </li>
);

export const Links = () => (
  <ul className="menu">
    <LinkItem DisplayText="Home" route="/" />
    <LinkItem DisplayText="Simple" route="simple" />
    <li className="menu-section">
      <a href="#" className="menu-link">
        API Basics
      </a>
    </li>;
    <LinkItem DisplayText="Content State" route="contentstate" />
    <LinkItem DisplayText="Create content state" route="createeditorstate" />
    <LinkItem DisplayText="Selection State" route="selectionstate" />
    <LinkItem DisplayText="Entity" route="entity" />
    <li className="menu-section">
      <a href="#" className="menu-link">
        helpers
      </a>
    </li>;
    <LinkItem DisplayText="Rich Utils" route="rich-utils" />
    <LinkItem DisplayText="Block Function" route="blockfn" />
    <LinkItem DisplayText="Block Styling" route="blockstyling" />
    <li className="menu-section">
      <a href="#" className="menu-link">
        Decorators
      </a>
    </li>;
    <LinkItem DisplayText="Hashtag Decorator" route="hashtagdecorator" />
    <LinkItem DisplayText="Regex Decorator" route="simpledecorator" />
    <LinkItem DisplayText="Complex Decorator" route="complexdecorator" />
  </ul>
);

class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Redirect from="/" to="/Home" />
        <Route path="/" component={Layout}>
          <Route path="/blockstyling" component={DraftSamples.BlockStylingWithDoc} />
          <Route path="/home" component={DraftSamples.HomeWithDoc} />
          <Route path="/entity" component={DraftSamples.EntitySampleWithDoc} />
          <Route path="/simpledecorator" component={DraftSamples.SimpleDecoratorWithDoc} />
          <Route path="/hashtagdecorator" component={DraftSamples.HashtagDecoratorWithDoc} />
          <Route path="/createeditorstate" component={DraftSamples.CreateEditorStateWithDoc} />
          <Route path="/simple" component={DraftSamples.SimpleWithDoc} />
          <Route path="/contentstate" component={DraftSamples.ContentStateViewWithDoc} />
          <Route path="/selectionstate" component={DraftSamples.SelectionStateViewWithDoc} />
          <Route path="/rich-utils" component={DraftSamples.RichUtilsSampleWithDoc} />
          <Route path="/blockfn" component={DraftSamples.BlockfnWithDoc} />
          <Route path="complexdecorator" component={DraftSamples.ComplexDecoratorStateWithDoc} />
        </Route>
      </Router>
    );
  }
}

export default App;

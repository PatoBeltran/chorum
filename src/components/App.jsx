import React from 'react';
import Registration from './Registration.jsx';
import { Router, Route, Link } from 'react-router';
import Parse from 'parse';

import 'css!./bootstrap/dist/css/bootstrap.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: Parse.User.current()
    };
  }
  render() {
    if (!this.state.currentUser) {
      return <LandingPage onLogin={(currentUser) => this.setState({ currentUser })}></LandingPage>
    }

    <Router>
      <Route path="/" component={App}>
        <Route path="/:repoId" component={About}/>
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  }
}


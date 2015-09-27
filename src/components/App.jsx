import React from 'react';
import Registration from './Registration.jsx';
import { Router, Route, Redirect } from 'react-router';
import Parse from 'parse';
import LandingPage from './LandingPage.jsx';
import Navbar from './Navbar.jsx';
import ProjectsPage from './ProjectsPage.jsx';
import TracksPage from './TracksPage.jsx';
import ProjectDetailsPage from './ProjectDetailsPage.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: Parse.User.current()
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  render() {
    if (!this.state.currentUser) {
      return <LandingPage onLogin={this.handleLogin}></LandingPage>
    }

    return (
      <div>
        <Navbar onLogOut={this.handleLogout} />
        <Router>
          <Redirect from="/" to="/projects" />
          <Route path="/projects" component={ProjectsPage}>
          </Route>
            <Route path="/projects/:projectId" component={ProjectDetailsPage} />
          <Route path="/tracks" component={TracksPage} />
        </Router>
      </div>
    );
  }
  handleLogin(currentUser) {
    this.setState({ currentUser });
  }
  handleLogout() {
    this.setState({ currentUser: null });
  }
}


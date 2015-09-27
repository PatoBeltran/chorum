import React from 'react';
import Registration from './Registration.jsx';
import { Router, Route, Link } from 'react-router';
import Parse from 'parse';
import LandingPage from './LandingPage.jsx';
// import Repository from './Repository.jsx';
import Navbar from './Navbar.jsx';
import ProjectsPage from './ProjectsPage.jsx';

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
          <Route path="/projects" component={ProjectsPage} />
          {/*<Route path="/tracks" component={TracksPage} />*/}
        </Router>
      </div>
    );
  }
  handleLogin(currentUser) {
    this.setState({ currentUser });
    window.location.href = '#/projects';
  }
  handleLogout() {
    this.setState({ currentUser: null });
    window.location.href = '#/';
  }
}


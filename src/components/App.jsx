import React from 'react';
import Registration from './Registration.jsx';
import { Router, Route, Link } from 'react-router';
import Parse from 'parse';
import LandingPage from './LandingPage.jsx';
// import Repository from './Repository.jsx';
import Navbar from './Navbar.jsx';

class Repositories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>Repositories</div>;
  }
}

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

    console.log(Router);

    return (
      <div>
        <Navbar onLogOut={this.onLogOut} />
        <Repositories />
      </div>
    );
  }
}


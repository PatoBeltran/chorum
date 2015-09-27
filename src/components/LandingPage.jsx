import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import Parallax from 'react-parallax'

import Registration from './Registration.jsx';
import LogIn from './LogIn.jsx';

import '!style!css!../css/landing.css';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'sign up'
    };
    this.setTab = this.setTab.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.inSignup = this.inSignup.bind(this);
    this.registration = this.registration.bind(this);
    this.loginUI = this.loginUI.bind(this);
  }
  render() {
    return (
        <div className="row">
          <div className="col-md-6 call-to-action">
          <h1>Where Music is built</h1>
          <h2>We simplify the sharing and collaboration of music creation.</h2>
          <h2>Share your tracks and build great music with your peers.</h2>
          </div>
          <div className="col-md-6 row">
            <div className="col-md-8 col-md-offset-2 login-form">
              { this.inSignup() ? this.registration() : this.loginUI() }
            </div>
          </div>
        </div>
    );
  }

  inSignup() {
    return this.state.tab === 'sign up';
  }

  registration() {
    return (
        <div>
          <h3> Sign up now! </h3>
          <Registration onRegister={this.handleLogin} />
          <span><br />Already have an account? <a onClick={this.setTab('sign in')}>Sign in</a></span>
        </div>
        );
  }

  loginUI() {
    return  (<div>
      <h3> Login </h3>
      <LogIn onLogin={this.handleLogin}/>      
      <div><br /><a onClick={this.setTab('sign up')}> Create an account </a></div>
    </div>
    );
  }
  
  setTab(tab) {
    return () => {
      if (this.state.tab !== tab) {
        this.setState({ tab });
      }
    }
  }
  handleLogin(user) {
    if (this.props.onLogin) {
      this.props.onLogin(user);
    }
  }
}

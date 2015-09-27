import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import Parallax from 'react-parallax'

import Registration from './Registration.jsx';
import LogIn from './Login.jsx';
import Alert from './Alert.jsx';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'sign up',
      errorMessage: ''
    };
    this.setTab = this.setTab.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleError = this.handleError.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.inSignup = this.inSignup.bind(this);
    this.registration = this.registration.bind(this);
    this.loginUI = this.loginUI.bind(this);
    this.styles = {
      callToAction: {
        color: '#fff',
        padding: '6em',
        paddingTop: '10em',
      },
      ctah21: {
        marginTop: '1.5em',
        fontWeight: '200'
      },
      ctah2: {
        fontWeight: '200'
      },
      ctah1: {
        fontWeight: '800'
      },
      loginForm: {
        backgroundColor: '#ecf0f1',
        boxShadow: '1px 0 5px #000',
        padding: '2em',
        marginTop: '10em',
        marginRight: '1em',
        borderRadius: '5px'
      }
    }
  }
  componentDidMount() {
    var css = `html {
      background: url('https://s3-us-west-2.amazonaws.com/chorum/bg.png') no-repeat center center fixed; 
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
      background-color:rgba(0, 0, 0, 0.8);
    }`
    
    var style = document.createElement('style');
    style.id = 'htmlStyle';
    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName("html")[0].appendChild(style);
  }
  componentWillUnmount() {
    document.getElementById("htmlStyle").remove();
  }
  render() {
    return (
        <div className="row">
          <div className="col-md-6" style={this.styles.callToAction}>
          <img className="img-responsive" src="https://s3-us-west-2.amazonaws.com/chorum/logo.png" />
          <h1 style={this.styles.ctah1}>Where Music is built</h1>
          <h2 style={this.styles.ctah21}>We simplify the sharing and collaboration of music creation.</h2>
          <h2 style={this.styles.ctah2}>Share your tracks and build great music with your peers.</h2>
          </div>
          <div className="col-md-6 row">
            <div className="col-md-8 col-md-offset-2" style={this.styles.loginForm}>
              { this.state.errorMessage ? <Alert close={this.closeAlert} alertMessage={this.state.errorMessage} /> : '' }
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
          <Registration onRegister={this.handleLogin} onError={this.handleError} />
          <span><br />Already have an account? <a onClick={this.setTab('sign in')}>Sign in</a></span>
        </div>
        );
  }

  loginUI() {
    return  (<div>
      <h3> Login </h3>
      <LogIn onLogin={this.handleLogin}  onError={this.handleError} />      
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
  
  handleError(message) {
    this.setState({errorMessage: message});
  }

  closeAlert() {
    this.setState({errorMessage: ''});
  }
}

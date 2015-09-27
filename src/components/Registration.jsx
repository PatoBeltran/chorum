import React from 'react';
import Parse from 'parse';

import Alert from './Alert.jsx';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmChange = this.handleConfirmChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }
  
  render() {
    return (
      <form>
        <div className="form-group">
          <label>Email:</label>
          <input className='form-control' type='text' value={this.state.email} onChange={this.handleEmailChange}></input>
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input className='form-control' type='password' value={this.state.password} onChange={this.handlePasswordChange}></input>
        </div>
        <div className="form-group">
          <label>Confirm password:</label>
          <input className='form-control' type='password' value={this.state.confirmPassword} onChange={this.handleConfirmChange}></input>
        </div>
        <button type='submit' className='btn btn-success' onClick={this.registerUser}>Sign up</button>
      </form>
    );
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleConfirmChange(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  registerUser() {
    event.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      const user = new Parse.User();
      user.set("username", this.state.email);
      user.set("email", this.state.email);
      user.set("password", this.state.password);

      user.signUp(null, {
        success: (user) => {
          if (this.props.onRegister) {
            this.props.onRegister(user);
          }
        },
        error: (user, error) => {
          if (this.props.onError) {
            this.props.onError(error.message);
          }
        }
      });
    } else if (this.props.onError) {
      this.props.onError("Passwords do not match.");
    }
  }
}

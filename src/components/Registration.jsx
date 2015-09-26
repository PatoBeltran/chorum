import React from 'react';

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
        <label>Email:</label>
        <input className='form-control' type='text' value={this.state.email} onChange={this.handleEmailChange}></input>
        <label>Password:</label>
        <input className='form-control' type='text' value={this.state.password} onChange={this.handlePasswordChange}></input>
        <label>Confirm:</label>
        <input className='form-control' type='text' value={this.state.confirmPassword} onChange={this.handleConfirmChange}></input>
        <button type='button' className='btn btn-success' onClick={this.registerUser}>Sign up</button>
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

  }
}
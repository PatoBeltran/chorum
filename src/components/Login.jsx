import React from 'react';
import Parse from 'parse';

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.signIn = this.signIn.bind(this);
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
        <button type='submit' className='btn btn-success' onClick={this.signIn}>Login!</button>
      </form>
    );
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  signIn() {
    event.preventDefault();
    Parse.User.logIn(this.state.email, this.state.password, {
      success: (user) => {
        if (this.props.onLogin) {
          this.props.onLogin(user);
        }
      },
      error: (error) => {
        if (this.props.onError) {
          this.props.onError(error.message);
        }
      }
    });
  }
}

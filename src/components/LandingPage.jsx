import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import Registration from './Registration.jsx';
import LogIn from './LogIn.jsx';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'sign up'
    };
    this.setTab = this.setTab.bind(this);
  }
  render() {
    return (
      <div>
        <form>
          <button type='button' className='btn btn-default' onClick={this.setTab('sign up')}>Sign Up</button>
          <button type='button' className='btn btn-default' onClick={this.setTab('sign in')}>Sign In</button>
        </form>
        {this.state.tab === 'sign up' ? <Registration /> : <LogIn />}
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
}

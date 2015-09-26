import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'sign up'
    };
  }
  render() {
    if (tab === 'sign up') {
      return <Registration></Registration>;
    }

    if (tab === 'sign in') {
      return <LogIn></LogIn>;
    }
  }
}

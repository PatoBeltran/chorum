import React from 'react';
import Parse from 'parse';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}
    };
  }
  render() {
    return (
      <div>Navbar</div>
    );
  }
}


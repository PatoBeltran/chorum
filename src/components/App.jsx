import React from 'react';
import Registration from './Registration.jsx';

import 'bootstrap/dist/css/bootstrap.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <Registration></Registration>
  }
}


import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import Repositories from './Repositories.jsx';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.user = Parse.User.current();
  }
  
  render() {
    return (
        <div>
          <Gravatar email=user.email size=100 rating="pg" />
          <Repositories></Repositories>
        </div>
    );
  }
}



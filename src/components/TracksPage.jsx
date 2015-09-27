import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import Gravatar from 'react-gravatar';
import Repositories from './Repositories.jsx';
import NewProject from './NewProject.jsx'

export default class TracksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.user = Parse.User.current();
  }
  render() {
    return (
        <div>TO DO: list tracks</div>
    );
  }
}



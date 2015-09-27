import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';

export default class Repositories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.user = Parse.User.current();
  }
  
  render() {
    return (
        <div>
          <ul>{ 
              (this.user.projects) ? this.user.projects.map(this.renderRepository) : ""
              }
          </ul>
        </div>
    );
  }

  renderRepository(repo) {
    <li><a href={`#/${this.user.id}/${repo.id}`}>{ repo.name }</a></li>
  }
}


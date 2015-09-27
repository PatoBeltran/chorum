import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';

export default class Repositories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
    this.user = Parse.User.current();
    this.renderRepository = this.renderRepository.bind(this);
  }
  componentDidMount() {
    var query = new Parse.Query("Project");
    query.equalTo("collaborators", Parse.User.current());

    query.find({
      success: (projects) =>{
        this.setState({projects});
      }});
  }
  render() {
    console.log(this.state.projects);
    return (
      <div>
        <ul>
        {(this.state.projects) ? this.state.projects.map(this.renderRepository) : ''}
        </ul>
      </div>
    );
  }

  renderRepository(repo) {
    return <li><a href={`#/projects/${this.user.id}/${repo.id}`}>{ repo.get("name") }</a></li>
  }
}


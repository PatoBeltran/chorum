import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import FontAwesome from 'react-fontawesome';
import Repository from './Repository.jsx'

export default class Repositories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
    this.style = {
      repoContainer: {
        padding: "40px",
        paddingTop: "20px"
      },
      reposList: {
        padding: "0",
        margin: "0",
        listStyle: "none"
      }
    }

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
    return (
      <div style={this.style.repoContainer}>
        <ul style={this.style.reposList}>
        { (this.state.projects) ? this.state.projects.map(this.renderRepository) : '' }
        </ul>
      </div>
    );
  }

  renderRepository(repo) {
    return <Repository repo={repo}></Repository>
  }
}


import React from 'react';
import Parse from 'parse';

export default class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    return (<div>Project details for project with id: {this.props.params.projectId}</div>);
  }
}
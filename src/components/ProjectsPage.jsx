import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import Gravatar from 'react-gravatar';
import Repositories from './Repositories.jsx';
import NewProject from './NewProject.jsx'

export default class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewProjectModal: false
    };
    this.user = Parse.User.current();

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  
  render() {
    return (
        <div>
          <div>
            <div>
              <button className='btn btn-success' onClick={this.open}>Create new project</button>
            </div>
            <Gravatar email={this.user.getEmail()} size={100} rating="pg" />
            <Repositories></Repositories>
          </div>
          <NewProject show={this.state.showNewProjectModal} onHide={this.close} />
        </div>
    );
  }

  close() {
    this.setState({ showNewProjectModal: false });
  }

  open() {
    this.setState({ showNewProjectModal: true });
  }

}



import React from 'react';
import Parse from 'parse';
import FontAwesome from 'react-fontawesome';
import NewProject from './NewProject.jsx'
import Gravatar from 'react-gravatar';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      showNewProjectModal: false

    };

    this.user = Parse.User.current();
    this.logout = this.logout.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Chorum</a>
            </div>

            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#/projects">My Projects</a></li>
                <li><a href="#" onClick={this.open}><FontAwesome name="plus-circle" /></a></li>
                <li><Gravatar className="img-circle" style={{marginTop: "5px" }} email={this.user.getEmail()} size={35} rating="pg" /></li>
                <li><a href="#" onClick={this.logout}><FontAwesome name="sign-out" /></a></li>
              </ul>
            </div>
          </div>
        </nav>
        <NewProject show={this.state.showNewProjectModal} onHide={this.close} />
      </div>
    );
  }
  logout() {
    Parse.User.logOut();
    if (this.props.onLogOut) {
      this.props.onLogOut();
    }
  }
  close() {
    this.setState({ showNewProjectModal: false });
  }

  open() {
    this.setState({ showNewProjectModal: true });
  }
}


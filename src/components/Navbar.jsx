import React from 'react';
import Parse from 'parse';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}
    };
    this.logout = this.logout.bind(this);
  }
  render() {
    return (
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
            <ul className="nav navbar-nav">
              <li><a href="#/projects">My Projects</a></li>
              <li><a href="#/tracks">My Tracks</a></li>
            </ul>
            
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#" onClick={this.logout}>Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  logout() {
    Parse.User.logOut();
    if (this.props.onLogOut) {
      this.props.onLogOut();
    }
  }
}


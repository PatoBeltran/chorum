import React from 'react';
import Registration from './Registration.jsx';
import { Router, Route, Link } from 'react-router';
import Parse from 'parse';
// import Repository from './Repository.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: Parse.User.current()
    };
  }
  render() {
    if (!this.state.currentUser) {
      return <LandingPage onLogin={(currentUser) => this.setState({ currentUser })}></LandingPage>
    }

    return <div>Logged In</div>;

    // <Router>
    //   <Route path="/" component={Repositories}>
    //     <Route path=":username/:repoId" component={Repository}/>
    //   </Route>
    // </Router>
  }
}


import alt from '../libs/alt';

class XTNAReportsStore {
  constructor() {
    this.state = {};
  }
  login(user) {
    this.setState({
      currentUser: user
    });
  }
  logout() {
    this.setState({
      currentUser = null;
    });
  }
}

export default alt.createStore(SessionStore, 'SessionStore');

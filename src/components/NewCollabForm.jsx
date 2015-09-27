import React from 'react';
import Parse from 'parse';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

export default class NewCollabForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: null
    };
    this.user = Parse.User.current();
    this.handleUserChange = this.handleUserChange.bind(this);
    this.addCollab = this.addCollab.bind(this);
  }

  componentDidMount() {
    var query = new Parse.Query(Parse.User);

    query.find({
      success: (users) => {
        this.setState({ users });
      }
    });
  }


  render() {
    return (
      <div className="static-modal">
        <Modal show={this.props.show} onHide={() => 0}>
          <Modal.Header>
            <Modal.Title>Add Collaborator</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <div className="form-group">
                <label>User:</label>
                <select className='form-control' value={ this.state.user } onChange={this.handleUserChange}>
                <option value=''>Select one</option>
                { this.state.users.map((user)=>{ return <option value={this.state.users.indexOf(user)}>{user.get("username") }</option>}) }
                </select>
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
            <Button bsStyle="primary" onClick={this.addCollab}>Add</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  
  handleUserChange(event) {
    this.setState({ user: event.target.value });
  }

  addCollab() {
    if (!this.state.user) {
      return;
    }

    var relation = this.props.project.relation("collaborators");
    relation.add(this.state.users[this.state.user]);

    this.props.project.save(null, {
      success: () => {
        this.props.onCollabAdded(this.state.users[this.state.user]);
      }
    });
  }
}

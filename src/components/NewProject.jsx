import React from 'react';
import Parse from 'parse';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

export default class NewProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      key: '',
      tempo: 120
    };

    this.user = Parse.User.current();

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleTempoChange = this.handleTempoChange.bind(this);

    this.createProject = this.createProject.bind(this);
  }
  
  render() {
    return (
        <div className="static-modal">
          <Modal show={this.props.show} onHide={this.props.onHide}>
            <Modal.Header>
              <Modal.Title>New Project</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form>
                <div className="form-group">
                  <label>Name:</label>
                  <input className='form-control' type='text' value={this.state.name} onChange={this.handleNameChange}></input>
                </div>
                <div className="form-group">
                  <label>Key:</label>
                  <select value={this.state.key} onChange={this.handleKeyChange} className="form-control">
                    <option value="C">C</option>
                    <option value="C#">C#</option>
                    <option value="Db">Db</option>
                    <option value="D">D</option>
                    <option value="D#">D</option>
                    <option value="Eb">Eb</option>
                    <option value="E">E</option>
                    <option value="E#">E#</option>
                    <option value="Fb">Fb</option>
                    <option value="F">F</option>
                    <option value="F#">F#</option>
                    <option value="Gb">Gb</option>
                    <option value="G">G</option>
                    <option value="G#">G#</option>
                    <option value="Ab">Ab</option>
                    <option value="A">A</option>
                    <option value="A#">A#</option>
                    <option value="Bb">Bb</option>
                    <option value="B">B</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tempo:</label> 
                  <div className="row">
                    <div className="col-md-10">
                      <input className='form-control' type='number' value={this.state.tempo} onChange={this.handleTempoChange}></input>
                    </div>
                    <div className="col-md-2">
                      <strong style={{ lineHeight: "35px" }}>BPM</strong>
                    </div>
                  </div>
                </div>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
              <Button bsStyle="primary" onClick={this.createProject}>Create</Button>
            </Modal.Footer>
          </Modal>
        </div>
    );
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleKeyChange(event) {
    this.setState({ key: event.target.value });
  }

  handleTempoChange(event) {
    this.setState({ tempo: event.target.value });
  }

  createProject() {
    if (this.state.name) {
      var project = new Parse.Object("Project");

      var relation = project.relation("collaborators");
      relation.add(this.user);

      project.set("name", this.state.name);
      project.set("key", this.state.key);
      project.set("tempo", parseInt(this.state.tempo));

      project.save(null, {
        success: (project) => {
          this.props.onHide(project);
        },
        error: (project, error) => {
          if (this.props.onError) {
            this.props.onError(error.message);
          }
        }
      }); 
    }
    if (this.props.onError) {
      this.props.onError("Name should not be empty.");
    }
  }
}

import React from 'react';
import Parse from 'parse';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

export default class NewTrackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: 'Vocals',
      file: null
    };

    this.user = Parse.User.current();
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.addTrack = this.addTrack.bind(this);
  }
  
  render() {
    const types = ['Vocals', 'Guitar', 'Drums', 'Piano', 'Other'];

    return (
      <div className="static-modal">
        <Modal show={this.props.show} onHide={() => 0}>
          <Modal.Header>
            <Modal.Title>New Track</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Name:</label>
                <input className='form-control' type='text' value={this.state.name} onChange={this.handleNameChange}></input>
              </div>
              <div className="form-group">
                <label>Key:</label>
                <select value={this.state.key} onChange={this.handleTypeChange} className="form-control">
                  {types.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Track:</label> 
                <span><input ref='fileInput' type='file' accept='.m4a' onChange={this.handleFileChange}></input></span>
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
            <Button bsStyle="primary" onClick={this.addTrack}>Add</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handleTypeChange(event) {
    this.setState({ type: event.target.value });
  }
  handleFileChange() {
    const files = this.refs.fileInput.getDOMNode().files;
    const file = files.length === 0 ? null : files[0];

    this.setState({ file });
  }
  addTrack() {
    if (!this.state.name || !this.state.file) {
      return;
    }

    const track = new Parse.Object('Track');
    track.set('name', this.state.name);
    track.set('type', this.state.type);
    track.set('project', this.props.project); 

    const audioFile = new Parse.Object('AudioFile');
    
    const reader = new FileReader();

    reader.onloadend = () => {
      console.log(reader.result);
      audioFile.set('file', new Parse.File('audiofile.txt', { base64: reader.result }));

      const audio = new Parse.Object('Audio');
      audio.set('version', 1);
      audio.set('startTime', '0');
      audio.set('audio', audioFile);
      audio.set('track', track);

      audio.save(null, {
        success: () => {
          this.props.onTrackAdded(track, audioFile);
          this.setState({
            name: '',
            type: 'Vocals',
            file: null
          })
        }
      });
    }

    reader.readAsDataURL(this.state.file);
  }
}

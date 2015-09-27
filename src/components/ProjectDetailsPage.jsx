import React from 'react';
import Parse from 'parse';
import NewTrackForm from './NewTrackForm.jsx';
import Track from './Track.jsx';

export default class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      showTrackForm: false
    };

    this.onTrackAdded = this.onTrackAdded.bind(this);
    this.playAll = this.playAll.bind(this);
    this.closeNewTrackForm = this.closeNewTrackForm.bind(this);
  }
  componentDidMount() {
    const projectQuery = new Parse.Query('Project');
    projectQuery.equalTo('objectId', this.props.params.projectId);
    
    projectQuery.find({
      success: (project) => {
        const tracksQuery = new Parse.Query('Track');
        tracksQuery.equalTo('project', project[0]);
        tracksQuery.find({
          success: (tracks) => {
            this.setState({ tracks, project: project[0] });
          }
        });
      }
    });
  }
  
  render() {
    const button = this.state.project ? <button type='button' className='btn btn-success' value='Add Track' onClick={() => this.setState({ showTrackForm: true })}>Add Track</button> : '';
    return (
        <div>
        <button type='button' className='btn btn-success' onClick={this.playAll}>Play All</button>
          {this.state.tracks.map((track) => <Track track={track}  />)}
          {button}
          <NewTrackForm project={this.state.project} show={this.state.showTrackForm} onTrackAdded={this.onTrackAdded} onHide={this.closeNewTrackForm} />
        </div>
    );
  }
  
  onTrackAdded(track) {
    this.setState({
      tracks: [...this.state.tracks, track],
      showTrackForm: false
    });
  }
  
  playAll() {
    
  }

  closeNewTrackForm(){
    this.setState({showTrackForm: false});
  }
}

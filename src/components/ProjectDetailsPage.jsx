import React from 'react';
import Parse from 'parse';
import NewTrackForm from './NewTrackForm.jsx';

export default class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      showTrackForm: false
    };

    this.onTrackAdded = this.onTrackAdded.bind(this);
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
          {this.state.tracks.map(this.renderTrack)}
          {button}
          <NewTrackForm project={this.state.project} show={this.state.showTrackForm} onTrackAdded={this.onTrackAdded} />
        </div>
    );
  }
  renderTrack(track) {
    return <div>{track.get("name")}</div>;
  }
  onTrackAdded(track) {
    this.setState({
      tracks: [...this.state.tracks, track],
      showTrackForm: false
    });
  }
}
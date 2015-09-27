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

    this.trackToAudio = {};

    this.onTrackAdded = this.onTrackAdded.bind(this);
  }
  componentDidMount() {
    const projectQuery = new Parse.Query('Project');
    projectQuery.equalTo('objectId', this.props.params.projectId);
    
    projectQuery.find({
      success: (projects) => {
        const tracksQuery = new Parse.Query('Track');
        tracksQuery.equalTo('project', projects[0]);
        tracksQuery.find({
          success: (tracks) => {
            let trackCount = 0;
            tracks.forEach((track) => {
              const audioQuery = new Parse.Query('Audio');
              audioQuery.equalTo('track', track);
              audioQuery.descending('createdAt');
              audioQuery.include('audio');
              audioQuery.first().then((audio) => {
                console.log(audio);
                trackCount++;
                this.trackToAudio[track.id] = audio.get('audio').get('file').url();
                if (trackCount === tracks.length) {
                  this.setState({
                    project: projects[0],
                    tracks
                  });
                }
              });
            })
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
          {this.state.tracks.map((track) => <Track track={track} url={this.trackToAudio[track.id]} />)}
          {button}
          <NewTrackForm project={this.state.project} show={this.state.showTrackForm} onTrackAdded={this.onTrackAdded} />
        </div>
    );
  }
  onTrackAdded(track, audioFile) {
    this.trackToAudio[track.id] = audioFile.get('file').url();
    this.setState({
      tracks: [...this.state.tracks, track],
      showTrackForm: false
    });
  }
  allAudios() {
    
  }
}
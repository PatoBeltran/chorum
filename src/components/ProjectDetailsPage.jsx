import React from 'react';
import Parse from 'parse';
import NewTrackForm from './NewTrackForm.jsx';
import Track from './Track.jsx';
import howler from 'howler';

export default class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      showTrackForm: false,
      sounds: {}
    };

    this.maxLength = 1;

    this.trackToAudio = {};

    this.onTrackAdded = this.onTrackAdded.bind(this);
    this.playAll = this.playAll.bind(this);
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
            if (tracks.length === 0) {
              this.setState({
                project: projects[0],
                tracks
              });
            }
            let trackCount = 0;
            tracks.forEach((track) => {
              const audioQuery = new Parse.Query('Audio');
              audioQuery.equalTo('track', track);
              audioQuery.descending('createdAt');
              audioQuery.include('audio');
              audioQuery.first().then((audio) => {
                trackCount++;
                this.trackToAudio[track.id] = audio.get('audio').get('file').url();
                
                const sound = new howler.Howl({
                  urls: [this.trackToAudio[track.id]],
                  onload: () => {
                    const sounds = this.state.sounds;
                    sounds[track.id] = sound;
                    if (sound._duration > this.maxLength) {
                      this.maxLength = sound._duration;
                    }
                    console.log(this.maxLength);
                    this.setState({ sounds });
                  }
                });

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
    const filterTracks = (track) => this.state.sounds[track.id];
    const renderTrack = (track) => <Track track={track} url={this.trackToAudio[track.id]} sound={this.state.sounds[track.id]} max={this.maxLength}/>
    return (
        <div>
          <button type='button' className='btn btn-success' onClick={this.playAll}>Play All</button>
          {this.state.tracks.filter(filterTracks).map(renderTrack)}
          <div>
          {button}
          </div>
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

    const sound = new howler.Howl({
      urls: [this.trackToAudio[track.id]],
      onload: () => {
        const sounds = this.state.sounds;
        sounds[track.id] = sound;
        if (sound._duration > this.maxLength) {
          this.maxLength = sound._duration;
        }
        console.log(this.maxLength);
        this.setState({ sounds });
      }
    });
  }
  playAll() {
    this.state.tracks.forEach((track) => {
      this.state.sounds[track.id].play()
    });
  }
}
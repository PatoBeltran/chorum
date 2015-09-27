import React from 'react';
import Parse from 'parse';
import Gravatar from 'react-gravatar';
import NewTrackForm from './NewTrackForm.jsx';
import NewCollabForm from './NewCollabForm.jsx';
import Track from './Track.jsx';
import howler from 'howler';
import FontAwesome from 'react-fontawesome';

export default class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      collabs: [],
      showCollabForm: false,
      showTrackForm: false,
      sounds: {},
      playingAll: false
    };

    this.maxLength = 1;

    this.trackToAudio = {};

    this.onTrackAdded = this.onTrackAdded.bind(this);
    this.playAll = this.playAll.bind(this);
    this.closeNewTrackForm = this.closeNewTrackForm.bind(this);
    this.onCollabAdded = this.onCollabAdded.bind(this);
    this.closeCollabForm = this.closeCollabForm.bind(this);
    this.userGravatar = this.userGravatar.bind(this);
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

        var rele = projects[0].relation("collaborators");
        var query = rele.query();

        query.find({
          success: (collabs) => {
            this.setState({collabs});
          }
        });
      }
    });
  }

  render() {
    const button = this.state.project ? <button type='button' className='btn btn-success' style={{ display: 'inline-block', width: '95%', margin: '15px', height: '100px', backgroundColor: '#EBEBEB', border: '2px dashed gray', color: '#9B9B9B', fontSize: 'x-large'}} onClick={() => this.setState({ showTrackForm: true })}>Add a track</button> : '';
    const filterTracks = (track) => this.state.sounds[track.id];
    const renderTrack = (track) => <Track track={track} url={this.trackToAudio[track.id]} sound={this.state.sounds[track.id]} max={this.maxLength}/>
    const linePosition = this.state.playingAll ? '75%' : '0';
    const collabButton = this.state.project ? 
    (<a style={{ color: '#F0F0F0', float: 'left', display: 'inline-block', marginTop: "5px", marginLeft: "2px" }} onClick={() => this.setState({ showCollabForm: true })}>
      <FontAwesome name='plus-circle' size='2x'/>
    </a>) :
    '';

    return (
      <div>
        <div className='col-xs-12' style={{ marginBottom: '20px', padding: '0px', backgroundImage: 'url("https://s3-us-west-2.amazonaws.com/chorum/cover.png")', height: '150px' }}>
          <div className='col-xs-2' style={{ height: '100%' }}>
            <a className='btn' style={{ width: '100%', height: '100%', color: '#F0F0F0' }} onClick={this.playAll}>
              <FontAwesome name='play-circle' size='5x' style={{ lineHeight: '140px' }} />
            </a>
          </div>
          <div className='col-xs-10' style={{ color: 'white' }}>
            <div className='pull-right' style={{ margin: '40px', fontSize: 'x-large'}}>
              {this.state.project ? this.state.project.get('tempo') + 'MBP | ' + this.state.project.get('key'): ''}
            </div>
            <div style={{ fontSize: 'xx-large', marginTop: '20px' }}>
              {this.state.project ? this.state.project.get('name') : ''}
            </div>
            <div>
              <div className='clearfix'>
              {(this.state.collabs) ? this.userGravatar() : '' }
              { collabButton }
              </div>
            </div>
          </div>
        </div>
        <div className='col-xs-offset-1 col-xs-10'>
          <div style={{ position: 'relative' }}>
            <div className='col-xs-offset-3 col-xs-8 play-transition' style={{ padding: '0', height: '100%', width: '1px', position: 'absolute', top: '0', left: linePosition, zIndex: '10', backgroundColor: 'black', transition: `${this.maxLength}s linear` }} />
            {this.state.tracks.filter(filterTracks).map(renderTrack)}
          </div>
          <NewTrackForm project={this.state.project} show={this.state.showTrackForm} onTrackAdded={this.onTrackAdded} onHide={this.closeNewTrackForm} />
          <NewCollabForm project={this.state.project} show={this.state.showCollabForm} onCollabAdded={this.onCollabAdded} onHide={this.closeCollabForm} />          
        </div>
        <div className='center-block' style={{ textAlign: 'center' }}>
        {button}
        </div>
      </div>
        
    );
  }
  onTrackAdded(track, audioFile) {
    this.trackToAudio[track.id] = audioFile.get('file').url();
    const sound = new howler.Howl({
      urls: [this.trackToAudio[track.id]],
      onload: () => {
        const sounds = this.state.sounds;
        sounds[track.id] = sound;
        if (sound._duration > this.maxLength) {
          this.maxLength = sound._duration;
        }
        this.setState({ sounds });
      }
    });
    this.setState({
      tracks: [...this.state.tracks, track],
      showTrackForm: false
    });

  }

  userGravatar() {
    return this.state.collabs.map((user) => { 
      return <Gravatar className="img-circle" style={{ float: 'left', marginTop: "5px", marginRight: "2px" }} email={user.getEmail()} size={25} rating="pg" />
    });
  }

  onCollabAdded(collab) {
    this.setState({
      collabs: [...this.state.collabs, collab],
      showCollabForm: false
    });
  }

  closeCollabForm() {
    this.setState({showCollabForm: false});
  }

  playAll() {
    this.state.tracks.forEach((track) => {
      this.state.sounds[track.id].play();
    });
    this.setState({ playingAll: true })
  }

  closeNewTrackForm(){
    this.setState({showTrackForm: false});
  }
}

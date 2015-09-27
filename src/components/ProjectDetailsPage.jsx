import React from 'react';
import Parse from 'parse';
import Gravatar from 'react-gravatar';
import NewTrackForm from './NewTrackForm.jsx';
import NewCollabForm from './NewCollabForm.jsx';
import Track from './Track.jsx';

export default class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      collabs: [],
      showTrackForm: false,
      showCollabForm: false
    };

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
      success: (project) => {
        const tracksQuery = new Parse.Query('Track');
        tracksQuery.equalTo('project', project[0]);
        tracksQuery.find({
          success: (tracks) => {
            this.setState({ tracks, project: project[0] });
          }
        });

        var rele = project[0].relation("collaborators");
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
    const button = this.state.project ? <button type='button' className='btn btn-success' value='Add Track' onClick={() => this.setState({ showTrackForm: true })}>Add Track</button> : '';
    const collabButton = this.state.project ? <button type='button' className='btn btn-success' value='Add Collaborator' onClick={() => this.setState({ showCollabForm: true })}>Add Collaborator</button> : '';
    return (
        <div>
        <div className="row">
            <div className="col-md-6">{(this.state.collabs) ? this.userGravatar() : '' }</div>
        </div>
        <button type='button' className='btn btn-success' onClick={this.playAll}>Play All</button>
          { collabButton }
          {this.state.tracks.map((track) => <Track track={track}  />)}
          { button }
          <NewTrackForm project={this.state.project} show={this.state.showTrackForm} onTrackAdded={this.onTrackAdded} onHide={this.closeNewTrackForm} />
          <NewCollabForm project={this.state.project} show={this.state.showCollabForm} onCollabAdded={this.onCollabAdded} onHide={this.closeCollabForm} />
        </div>
    );
  }

   userGravatar() {
    return this.state.collabs.map((user) => { 
      return <Gravatar className="img-circle" style={{ marginTop: "5px", marginRight: "2px" }} email={user.getEmail()} size={25} rating="pg" />
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

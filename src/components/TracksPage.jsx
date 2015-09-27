import React from 'react';
import Parse from 'parse';

export default class TracksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: []
    };
    this.renderTrack = this.renderTrack.bind(this);
  }
  render() {
    return (
        <div>
          {this.state.tracks.map(this.renderTrack)}
          <button type='button' className='btn btn-success' value='Add Track' onClick={this.renderTrack}></button>
        </div>
    );
  }
  renderTrack(track) {
    
  }
}



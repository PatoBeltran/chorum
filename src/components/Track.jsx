import React from 'react';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import howler from 'howler';

export default class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      sound: null
    };
    this.play = this.play.bind(this);
  }
  render() {
    const percentage = (this.props.sound._duration / this.props.max) * (7/12);
    console.log(percentage*100);
    const formatPercentage = percentage * 100 + '%';

    return (
      <div className='row'>
        <div className='col-xs-3 col-xs-offset-1' style={{ overflow: 'hidden' }}>
        <button type='button' className='btn btn-default' onClick={this.play}>Play</button>
        {this.props.track.get('type')}
        -- 
        {this.props.track.get('name')}
        --
        {this.props.sound._duration}
        </div>
        <div className='col-xs-8' style={{ backgroundColor: 'black', width: formatPercentage}}>
          <br />
        </div>
      </div>
    );
  }
  play() {
    this.props.sound.play();
  }
}
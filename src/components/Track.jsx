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
    const percentage = (this.props.sound._duration / this.props.max) * (9/12);
    const formatPercentage = percentage * 100 + '%';
    const types = ['Vocals', 'Guitar', 'Drums', 'Piano', 'Other'];

    const barColor = {
      'vocals': '#F7C579',
      'guitar': '#CDCDCD',
      'drums': '#979695',
      'piano': '#6B6363'
    }[this.props.track.get('type').toLowerCase()] || '#B3ACA6';

    const imgSrc = {
      'vocals': 'https://s3-us-west-2.amazonaws.com/chorum/microphone.png',
      'guitar': 'https://s3-us-west-2.amazonaws.com/chorum/guitar.png ',
      'drums': 'https://s3-us-west-2.amazonaws.com/chorum/drum.png',
      'piano': 'https://s3-us-west-2.amazonaws.com/chorum/piano.png'
    }[this.props.track.get('type').toLowerCase()] || 'https://s3-us-west-2.amazonaws.com/chorum/music.png';

    return (
      <div className='row' style={{padding: '10px 0'}}>
        <div className='col-xs-2 col-xs-offset-1' style={{ overflow: 'hidden' }}>
          <a onClick={this.play} style={{ cursor: 'pointer' }}>
          {/*{this.props.track.get('type')}*/}
          <image src={imgSrc} width='40px'/>
          </a>
          <span style={{ margin: '10px' }}>
            {this.props.track.get('name')}
          </span>
        </div>
        <div className='col-xs-9' style={{ backgroundColor: barColor, width: formatPercentage, padding: '0', borderRadius: '5px'}}>
          <br />
          <br />
        </div>
      </div>
    );
  }
  play() {
    this.props.sound.play();
    this.props.onPlay(this.props.sound._duration);
  }
}
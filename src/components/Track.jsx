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
    console.log(percentage*100);
    const formatPercentage = percentage * 100 + '%';
    const types = ['Vocals', 'Guitar', 'Drums', 'Piano', 'Other'];

    const barColor = {
      'vocals': '#F7C579',
      'guitar': '#CDCDCD',
      'drums': '#979695',
      'piano': '#6B6363'
    }[this.props.track.get('type').toLowerCase()] || '#B3ACA6';

    return (
      <div className='row' style={{padding: '10px 0'}}>
        <div className='col-xs-3' style={{ overflow: 'hidden' }}>
        <button type='button' className='btn btn-default' onClick={this.play}>{this.props.track.get('name')}</button>
        {this.props.track.get('type')}
        </div>
        <div className='col-xs-9' style={{ backgroundColor: barColor, width: formatPercentage, padding: '0'}}>
          <br />
          <br />
        </div>
      </div>
    );
  }
  play() {
    this.props.sound.play();
  }
}
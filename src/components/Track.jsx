import React from 'react';

export default class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playing: false };
    this.play = this.play.bind(this);
  }
  render() {
    return (
      <div>
        <button type='button' className='btn btn-default' onClick={this.play}>Play</button>
        {this.props.track.get('type')}
        {this.props.track.get('name')}
      </div>
    );
  }
  play() {
    // let blob = null;
    // const xhr = new XMLHttpRequest(); 
    // xhr.open('GET', this.props.url); 
    // xhr.responseType = "blob";
    // xhr.onload = () => {
    //   blob = xhr.response;
    //   console.log(URL.createObjectURL(blob));
    //   const audio = new Audio();
    //   audio.src = URL.createObjectURL(blob);
    //   audio.play();
    //   console.log(audio.type);
    // }

    // xhr.send();

    new Audio(this.props.url).play();
  }
}
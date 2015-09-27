import React from 'react';

export default class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {this.props.data.get('type')}
        {this.props.data.get('name')}
      </div>
    );
  }
}
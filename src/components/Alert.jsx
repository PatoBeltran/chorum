import React from 'react';

export default class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return (
        <div className="alert bg-danger">
          <a onClick={this.props.close} className="close">x</a>
          { this.props.alertMessage }
        </div>
        );
  }
}


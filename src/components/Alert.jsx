import React from 'react';

export default class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.close = this.close.bind(this);
  }
  
  render() {
    return (
        <div className="alert bg-danger">
          <a onClick={this.props.close()} className="close">x</a>
          { this.props.alertMessage }
        </div>
        );
  }
}


import React, {Component} from 'react';

class Screen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="screen">
        {this.props.value}
      </div>
    );
  }
}

export default Screen;

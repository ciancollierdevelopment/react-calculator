import React, {Component} from 'react';

class CalculatorKey extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="key" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

export default CalculatorKey;

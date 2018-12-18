import React, {Component} from 'react';

class CalculatorKey extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="key">
        {this.props.value}
      </button>
    );
  }
}

export default CalculatorKey;

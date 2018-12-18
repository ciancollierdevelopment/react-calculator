import React, { Component } from 'react';
import './App.css';
import Screen from './components/Screen.jsx';
import CalculatorKey from './components/CalculatorKey.jsx';

class App extends Component {
  state = {
    screen_content: "",
    buttons: [1, 2, 3, "+", 4, 5, 6, "-", 7, 8, 9, "X", 0, ".", "C", "/", "="]
  }

  onButtonClick = (button_value) => {
    let new_screen_content = "";

    if (button_value == "=") {
      let answer = 0;
      let input = this.state.screen_content.split('');
      

    }
    else {
      new_screen_content = this.state.screen_content + button_value.toString();
    }
    this.setState({screen_content: new_screen_content});
  }

  render() {
    return (
      <div className="App">
        <Screen value={this.state.screen_content} />
        {this.state.buttons.map(button => (
          <CalculatorKey key={button} value={button} onClick={() => {this.onButtonClick(button)}} />
        ))}
      </div>
    );
  }
}

export default App;

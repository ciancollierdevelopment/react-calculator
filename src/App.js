import React, { Component } from 'react';
import './App.css';
import Screen from './components/Screen.jsx';
import CalculatorKey from './components/CalculatorKey.jsx';

class App extends Component {
  state = {
    screen_content: "",
    buttons: [1, 2, 3, "+", 4, 5, 6, "-", 7, 8, 9, "X", 0, ".", "C", "/", "="]
  }

  performOperation = (operands) => {
    switch (operands[1]) {
      case '+':
        return operands[0] + operands[2];
        break;
      case '-':
        return operands[0] - operands[2];
        break;
      case 'X':
        return operands[0] * operands[2];
        break;
      case '/':
        return operands[0] / operands[2];
        break;
    }
  }

  onButtonClick = (button_value) => {
    let new_screen_content = "";

    if (button_value == "=") {
      let answer = 0;
      let input = this.state.screen_content.split('');
      let holder = "";
      let operationsCounter = 0;
      let operations = [];

      for (let i = 0; i < input.length; i++) {
        if (input[i] == '+' || input[i] == '-' || input[i] == 'X' || input[i] == '/' || i == (input.length - 1)) {
          if (i == (input.length - 1)) {
            holder += input[i];
          }

          if (operations.length !== 0) {
            operations[operationsCounter].push(parseFloat(holder));
            operationsCounter++;
          }

          if (i !== (input.length - 1)) {
            operations.push([parseFloat(holder), input[i]]);
          }

          holder = "";
        } else {
          holder += input[i];
        }
      }

      let bodmas = ['/', 'X', '+', '-'];

      for (let c = 0; c < bodmas.length; c++) {
        for (let d = 0; d < operations.length; d++) {
          if (operations[d][1] == bodmas[c]) {
            let result = this.performOperation(operations[d]);
            answer = result;
            if (d !== 0) {
              operations[d - 1][2] = result;
            }

            if (d !== (operations.length - 1)) {
              operations[d + 1][0] = result;
            }

            operations.splice(d, 1);
            d = -1;
          }
        }
      }

      new_screen_content = answer.toString();
    }
    else if (button_value != "C"){
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

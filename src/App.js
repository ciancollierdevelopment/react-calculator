import React, { Component } from 'react';
import './App.css';
import Screen from './components/Screen.jsx';
import CalculatorKey from './components/CalculatorKey.jsx';

class App extends Component {
  state = {
    screen_content: "",
    buttons: [1, 2, 3, "+", 4, 5, 6, "-", 7, 8, 9, "X", 0, ".", "C", "/", "=", '(', ')', '^']
  }

  // This function takes operations from the operations array and calculates
  // them.
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
      case '^':
        return Math.pow(operands[0], operands[2]);
    }
  }

  // This function calculates a priority for each operation based on its type.
  // This allows operations to be executed in the correct order according to
  // BODMAS.
  priorityLevel = (p) => {
    // Checks the bracketLevel, brackets should be executed first according to
    // BODMAS so if bracketLevel is not 0 they are assigned a higher priority.
    if (p[3] != 0) {
      return 4 + p[3];
    }
    else {
      // If the operation is not within a set of brackets the priorityLevel
      // depends on the type of operation.
      switch (p[1]) {
        case '^':
          return 4;
          break;
        case '/':
          return 3;
          break;
        case 'X':
          return 2;
          break;
        case '+':
          return 1;
          break;
        case '-':
          return 1;
          break;
      }
    }
  }

  // Event handler for button clicks. Takes value of button as an argument.
  onButtonClick = (button_value) => {
    let new_screen_content = "";

    if (button_value == "=") {
      let answer = 0;
      let input = this.state.screen_content.split('');
      let holder = "";
      let operationsCounter = 0;
      let operations = [];

      // BracketLevel is non-zero if inside brackets. Changes based on degree of nesting
      // for example ((1+2)) would have a bracket level of 2 while (1+2) would have
      // a bracket level of 1.
      let bracketLevel = 0;
      let bracketLevelHolder = 0;

      // Read through the input character by character
      for (let i = 0; i < input.length; i++) {
        if (input[i] == '(') {
          // Increase bracketLevel when an opening bracket found.
          bracketLevel++;
        }
        else if (input[i] == ')') {
          // If a bracket is the last character then make sure the preceeding
          // value is saved to operations.
          if (i == (input.length - 1)) {
            operations[operationsCounter].push(parseFloat(holder));
            operations[operationsCounter].push(bracketLevelHolder);
          }

          // Decrease bracketLevel when a closing bracket found.
          bracketLevel--;
        }
        else {
          // When an operator or end of input found
          if (input[i] == '+' || input[i] == '-' || input[i] == 'X' || input[i] == '/' || input[i] == '^' || i == (input.length - 1)) {
            if (i == (input.length - 1)) {
              holder += input[i];
            }

            // I.e if not the first cycle.
            if (operations.length !== 0) {
              // Finish off the last operator element.
              operations[operationsCounter].push(parseFloat(holder));
              operations[operationsCounter].push(bracketLevelHolder);

              // Move to next element in operations array. The current operation
              // element is complete.
              operationsCounter++;
            }

            if (i !== (input.length - 1)) {
              // Create the beginning of the next operator.
              operations.push([parseFloat(holder), input[i]]);
              bracketLevelHolder = bracketLevel;
            }

            // Reset holder
            holder = "";
          } else {
            holder += input[i];
          }
        }
      }

      // Cycle through levels of priority starting with the highest.
      for (let priority = 10; priority > 0; priority--) {
        // Cycle through operations. If current operation priority level
        // matches the current priority level from loop above then calculate
        // the operation.
        for (let d = 0; d < operations.length; d++) {
          if (this.priorityLevel(operations[d]) == priority) {
            let result = this.performOperation(operations[d]);
            answer = result;

            // If not the first operation then update last value of
            // preceeding operation to use the newly calculated value.
            if (d !== 0) {
              operations[d - 1][2] = result;
            }

            // If not the last operation update the first value of the
            // next operation to use the newly calculated value.
            if (d !== (operations.length - 1)) {
              operations[d + 1][0] = result;
            }

            // Delete the operation once it has been calculated. Restart the loop.
            operations.splice(d, 1);
            d = -1;
          }
        }
      }

      new_screen_content = answer.toString();
    }
    else if (button_value != "C"){
      // Clear the "Screen"
      new_screen_content = this.state.screen_content + button_value.toString();
    }

    // Set "Screen" to show the updated display.
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

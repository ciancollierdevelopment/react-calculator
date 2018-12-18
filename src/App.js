import React, { Component } from 'react';
import './App.css';
import Screen from './components/Screen.jsx';
import CalculatorKey from './components/CalculatorKey.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Screen value="3+3" />
        <CalculatorKey key={1} value={1} />
        <CalculatorKey key={2} value={2} />
        <CalculatorKey key={3} value={3} />
        <CalculatorKey key={4} value={4} />
      </div>
    );
  }
}

export default App;

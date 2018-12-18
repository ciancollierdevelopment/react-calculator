import React, { Component } from 'react';
import './App.css';
import Screen from './components/Screen.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Screen value="3+3" />
      </div>
    );
  }
}

export default App;

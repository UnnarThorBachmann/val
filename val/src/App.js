import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ValAppBar from './components/ValAppBar.js';
import Brautarkjarni from './components/Brautarkjarni.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ValAppBar/>
        <Brautarkjarni/>
      </div>
    );
  }
}

export default App;

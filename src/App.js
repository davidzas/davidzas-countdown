import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {Navbar} from 'react-bootstrap';
import Countdown from './countdown.component';
function App() {
  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#">DavidZas' Countdown</Navbar.Brand>
      </Navbar>
      <Countdown />
    </div>
  );
}

export default App;

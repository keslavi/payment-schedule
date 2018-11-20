import React, { Component } from 'react';
import Schedule from './Schedule';
import './App.css';
import {
  Container
} from 'reactstrap';
class App extends Component {
  render() {
    return (
      <Container>
        <div className="App">
          <Schedule></Schedule>
        </div>
      </Container>
    );
  }
}

export default App;

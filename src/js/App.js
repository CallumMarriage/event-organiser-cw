import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import '../style/App.css';
import EventHolder from './EventHolder';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar/>
        <EventHolder/>
      </div>
    );
  }
}

export default App;

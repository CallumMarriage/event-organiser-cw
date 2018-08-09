import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import '../style/App.css';
import EventHolder from './EventHolder';
import Registration from './Registration';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar/>
        <EventHolder/>
        <Registration/>
      </div>
    );
  }
}

export default App;

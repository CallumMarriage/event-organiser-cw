import React, { Component } from 'react';
import NavigationBar from './navigationView/NavigationBar';
import '../style/App.css';
import EventHolder from './eventHolderView/EventHolder';
import Registration from './registrationView/Registration';

class App extends Component {

  render() {
    return (
      <div className="App">
        <NavigationBar />
        <EventHolder/>
        <Registration/>
      </div>
    );
  }
}

export default App;

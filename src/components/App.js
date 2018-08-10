import React, { Component } from 'react';
import NavigationBar from './navigationView/NavigationBar';
import '../style/App.css';
import EventHolder from './eventHolderView/EventHolder';
import Registration from './registrationView/Registration';
import AddEventForm from './addEventView/AddEventForm';

class App extends Component {

  render() {
    return (
      <div className="App">
        <NavigationBar />
        <EventHolder/>
        <Registration/>
        <AddEventForm/>
      </div>
    );
  }
}

export default App;

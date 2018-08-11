import React, { Component } from 'react';
import NavigationBar from './navigationView/NavigationBar';
import '../style/App.css';
import EventHolder from './eventHolderView/EventHolder';
import Registration from './registrationView/Registration';

import { connect } from 'react-redux';


class App extends Component {

  render() {
    console.log(this.props);

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
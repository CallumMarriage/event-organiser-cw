import React, { Component } from 'react';
import Login from './Login';
import "../style/NavigationBar.css"

class NavigationBar extends Component {
  render() {
    return (
      <div className="NavigationBar">
        <Login/>
        <h1 id="title">Events Manager</h1>
      </div>
    );
  }
}

export default NavigationBar;

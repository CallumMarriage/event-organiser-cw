import React, { Component } from 'react';
import Login from './loginView/Login';
import "./NavigationBar.css"

class NavigationBar extends Component {
  render() {
    return (
      <div className="NavigationBar">
        <h1 id="title">Events Manager</h1>
        <Login />
      </div>
    );
  }
}

export default NavigationBar;

import React, { Component } from 'react';
import Moment from 'moment';

import "./Subscriber.css"


class Subscriber extends Component {
  render() {
    Moment.locale('en');

    return (
      <div className="Subscriber">  
          <h1 id="name">{this.props.title} </h1>
          <p id="email"> {this.props.email}</p>
      </div>
    );
  }
}

export default Subscriber;
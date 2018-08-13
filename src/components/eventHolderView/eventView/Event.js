import React, { Component } from 'react';
import Moment from 'moment';

import "./Event.css"

class Event extends Component {
  render() {
    let date = this.props.date;
    Moment.locale('en');

    return (
      <div className="Event">  
          <h1 id="eventTitle">{this.props.title}</h1>
          <p id="eventDescription"> {this.props.description} </p>
          <p id="date"> {Moment(date).format('DD-MM-YYYY')} </p>
          <p id="type"> {this.props.type} </p>

      </div>
    );
  }
}

export default Event;
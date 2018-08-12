import React, { Component } from 'react';
import Moment from 'moment';


class Subscriber extends Component {
  render() {
    Moment.locale('en');

    return (
      <div className="Subscriber">  
          <h1 id="name">{this.props.title}</h1>
      </div>
    );
  }
}

export default Subscriber;
import React, { Component } from 'react';
import Event from './Event';
import "../style/EventHolder.css"

var $ = require ('jquery')

class EventHolder extends React.Component {

  constructor(props){
    super(props);
    this.state = {items: []};
  }

  componentDidMount(){
    this.EventList();
  }

  EventList(){
    $.get('http://localhost:9000/events').then(({results : items}) => this.setState({items}));
  }

  render() {
    let items = this.state.items;
    return (
      <div className="EventHolder">
          {items.map(
            item => <h1 key="i">item.name</h1>
            )}
      </div>
    );
  }
}

export default EventHolder;

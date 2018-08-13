import React from 'react';
import Event from './eventView/Event';
import { Container, Row, Col } from 'react-grid-system';

import EventFilter from './filterView/FilterView';
import "./EventHolder.css"
import AddEventForm from './addEventView/AddEventForm';
import RemoveEventForm from './removeEventView/RemoveEventForm';
import UpdateEventForm from './updateEventView/UpdateEventForm';
import SubscribeToEventForm from './subscribeToEventView/SubscribeToEventForm';
import GetSubscriberForm from './getSubscribersView/GetSubscribersForm';

class EventHolder extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      name: '',
      type: ''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  handleTypeChange(event) {
    this.setState({type: event.target.value});
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  componentDidMount(){
      this.getEvents();
  }

  getEvents(){
    var url ="https://pure-shore-75332.herokuapp.com/events";
    fetch(url)
    .then(res => res.json())
    .then((result) => {
      this.setState({
        isLoaded: true,
        items: result
      });
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    });
  }

  getSubscribers(){
    var url ="https://pure-shore-75332.herokuapp.com/events/" + this.state.name + "/subscribers";
    fetch(url, {
      method: 'GET'
     })
    .then(res => res.json())
    .then((result) => {
      
      this.setState({
        subscribers: result
      });
    },
    (error) => {
      this.setState({
        error
      });
    });
  }
  
  render() {
    const { error, isLoaded, items} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="EventHolder">
        
          <h1 id="eventHolderTitle"> Events </h1>
          
          <div id="container">
            <div id="allContainer">
            <ul>
            <Container>
              <Row>
                {items.map(item => (
                <Col sm={4}>
                <Event key={item.event_id} title={item.name} description={item.description} date={item.date} type={item.type}/>
                </Col>
                ))}
              </Row>
            </Container>
            </ul>
            </div>
          </div>
          <EventFilter/>

          <div id ="functions">
            <AddEventForm/>
            <RemoveEventForm/>
            <UpdateEventForm/>
            <SubscribeToEventForm/>
            <GetSubscriberForm/>

          </div>
        </div>
      );
    }
  }
}

export default EventHolder;

import React from 'react';
import Event from './eventView/Event';
import { Container, Row, Col } from 'react-grid-system';

import "./EventHolder.css"
import AddEventForm from './addEventView/AddEventForm';

class EventHolder extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      username: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  componentDidMount(){
    this.getEvents;
  }

  getEvents(){
    var url ="https://intense-everglades-54619.herokuapp.com/events";
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

  handleSubmit(){
    this.setState({userMode: true, items: []})
    this.getEvents;
  }

  render() {

    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="EventHolder">
        
          <h1 id="eventHolderTitle"> Events </h1>
          
          <div id="container">
          
            <form onSubmit={this.handleSubmit}>          
              <label htmlFor="username">Enter username</label>
              <input id="eventFinderSubmit" name="username" type="text" onChange={this.handleUsernameChange}/>
              <button>Get my events</button>
            </form>
            <ul>
            <Container>
              <Row>
                {items.map(item => (
                <Col sm={4}>
                <Event key={item.event_id} title={item.name} description={item.description} date={item.date}/>
                </Col>
                ))}
              </Row>
            </Container>
            </ul>
            <AddEventForm/>
          </div>
        </div>
      );
    }
  }
}

export default EventHolder;

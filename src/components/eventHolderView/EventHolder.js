import React from 'react';
import Event from './eventView/Event';
import { Container, Row, Col } from 'react-grid-system';

import "./EventHolder.css"

class EventHolder extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount(){
   this.getEvents();
  }

  getEvents(){
    fetch("https://intense-everglades-54619.herokuapp.com/events")
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
          </div>
        </div>
      );
    }
  }
}

export default EventHolder;

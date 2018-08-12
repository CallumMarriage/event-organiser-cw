import React, { Component } from 'react';
import { getUsername, getCredentials } from '../../../utility';
import { Container, Row, Col } from 'react-grid-system';
import Subscriber from './SubscriberView/Subscriber'

class GetSubscriberForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      subscribers: []
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.getSubscribers = this.getSubscribers.bind(this);
  
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  getSubscribers(event) {
    
    event.preventDefault();

    if(getCredentials() === 'Public' || getCredentials() ==='Student'){
      alert('You dont have credientials to get the subscribers for this event');
      return;
    }

    var name = this.state.name;
    var url = "https://pure-shore-75332.herokuapp.com/events/"+name+"/subscriptions";
    fetch(url, {
        method: 'GET'
    })
    .then(res => res.json())
    .then((result) => {
      alert(result.message);
      if(result !== null || result !== undefined){
        this.setState({
          subscribers: result
        });
      } else {
        console.log("You have failed");
        alert(result.message);
      }
    },
    (error) => {
      this.setState({
        error
      });
    });
  }

  clear(event){
    this.setState({
      subscribers: [],
  });
  }


  render() {
    const { subscribers } = this.state;

        return (
          <div id ="getSubscribers">
              <form onSubmit={this.getSubscribers}>
            
            <label htmlFor="name">Enter the event name</label>
            
            <input id="name" name="name" type="text" onChange={this.handleNameChange}/>

            <button>Get subscribers</button>
          </form>
            <ul>
              <Container>
                <Row>
                  {subscribers.map(subscriber => (
                  <Col sm={4}>
                    <Subscriber key={subscriber.user_id} title={subscriber.name}/>
                  </Col>
                  ))}
                </Row>
              </Container>
              </ul>
              <button onClick={this.clear} > Clear </button>

          </div>
        );
  }
}

export default GetSubscriberForm;

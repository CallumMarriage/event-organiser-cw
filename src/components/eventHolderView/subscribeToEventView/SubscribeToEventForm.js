import React, { Component } from 'react';
import "./SubscribeToEventForm.css"
import { getUsername, getCredentials } from '../../../utility';

class SubscribeToEventForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    
    event.preventDefault();

    if(getCredentials() == 'Organiser' || getCredentials() =='Public'){
      filtered: [];
      alert('You dont have credientials to delete events');
      return;
    }

    fetch('https://pure-shore-75332.herokuapp.com/subscribeToEvent', {
        method: 'POST',  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: this.state.name,
            username: getUsername()      
        }),
    })
    .then(res => res.json())
    .then((result) => {
      alert(result.message);
      if(result.message === 'user created succesfully'){
        alert("You have added an event!")
      } else {
        alert(result.message);
      }
    },
    (error) => {
      this.setState({
        error
      });
    });
  }


  render() {
        
        return (
          <div className="SubscribeToEventForm">
            <h1 id="title-reg">Subscribe to Event</h1>
            <form onSubmit={this.handleSubmit}>
            
            <label htmlFor="name">Enter the name of the event you want to subscribe to</label>
            
            <input id="name" name="name" type="text" onChange={this.handleNameChange}/>
            <button>Update Event</button>
          </form>
          </div>
        );
      }
}

export default SubscribeToEventForm;

import React, { Component } from 'react';
import "./UpdateEventForm.css"

class SubscribeToEventForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: '',
      type: '',
      date: '',
      username: '',
      error: null,
      isLoaded: false,
      registered: false,
      items: []
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handleSubmit(event) {
    
    event.preventDefault();

    fetch('https://pure-shore-75332.herokuapp.com/subscribeToEvent', {
        method: 'PUT',  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: this.state.name,
            username: this.state.username,
            password: this.state.password
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
    
      if(this.state.registered === false){
        return (
          <div className="SubscribeToEventForm">
            <h1 id="title-reg">Subscribe to Event</h1>
            <form onSubmit={this.handleSubmit}>
            
            <label htmlFor="name">Enter the name of the event you want to subscribe to</label>
            
            <input id="name" name="name" type="text" onChange={this.handleNameChange}/>

            <label htmlFor="username">Enter your username</label>

            <input id="username" name="username" type="text" onChange={this.handleUsernameChange}/>

            <label htmlFor="password">Enter the new date of the Event</label>

            <input id="password" name="password" type="password" onChange={this.handleDateChange}/>

            <button>Update Event</button>
          </form>
          </div>
        );
      } else {
        return (
          <div className="Registration">
          <h1 id="title-reg">Registration</h1>
          <p>You have already Registered, plase Login</p>
        </div>
        );
    }
  }
}

export default SubscribeToEventForm;

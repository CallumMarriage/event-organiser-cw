import React, { Component } from 'react';
import "./UpdateEventForm.css"
import { getUsername, getCredentials } from '../../../utility';

class UpdateEventForm extends Component {

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

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }

  handleTypeChange(event) {
    this.setState({type: event.target.value});
  }

  handleDateChange(event) {
    this.setState({date: event.target.value});
  }

  handleSubmit(event) {
    
    event.preventDefault();

    if(getCredentials() === 'Public' || getCredentials() ==='Student'){
      alert('You dont have credientials to update events');
      return;
    }

    fetch('https://pure-shore-75332.herokuapp.com/event', {
        method: 'PUT',  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: this.state.name,
            description: this.state.description,
            type: this.state.type,
            date: this.state.date,
            owner: getUsername()
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
          <div className="UpdateEventForm">
            <h1 id="title-reg">Update Event</h1>
            <form onSubmit={this.handleSubmit}>
            
            <label htmlFor="name">Enter the name of the evnt to update</label>
            
            <input id="name" name="name" type="text" onChange={this.handleNameChange}/>

            <label htmlFor="description">Enter event description</label>

            <input id="description" name="description" type="text"  onChange={this.handleDescriptionChange}/>

            <label htmlFor="type">Enter the new event type</label>

            <input id="type" name="type" type="text" onChange={this.handleTypeChange}/>

            <label htmlFor="date">Enter the new date of the Event</label>

            <input id="date" name="date" type="date" onChange={this.handleDateChange}/>

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

export default UpdateEventForm;

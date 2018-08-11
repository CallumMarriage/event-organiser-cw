import React, { Component } from 'react';
import "./RemoveEventForm.css"

class RemoveEventForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      username: '',
      items: []
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handleSubmit(event) {
    
    event.preventDefault();

    var name = this.state.name;
    var url = "https://pure-shore-75332.herokuapp.com/event?name="+name;
    fetch(url, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: this.state.name,
            owner: this.state.username
        }),
    })
    .then(res => res.json())
    .then((result) => {
      alert(result.message);
      if(result.message === 'user deleted succesfully'){
        alert("You have deleted the event!")
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


  render() {
        return (
          <div className="RemoveEventForm">
            <h1 id="title-reg">Remove Event</h1>
            <form onSubmit={this.handleSubmit}>
            
            <label htmlFor="name">Enter the event name</label>
            
            <input id="name" name="name" type="text" onChange={this.handleNameChange}/>

            <label htmlFor="username">Enter your username</label>

            <input id="username" name="username" type="text" onChange={this.handleUsernameChange}/>

            <button>Delete Event</button>
          </form>
          </div>
        );
  }
}

export default RemoveEventForm;

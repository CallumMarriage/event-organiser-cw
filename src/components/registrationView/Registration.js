import React, { Component } from 'react';
import "./Registration.css"

class Registration extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      fullName: '',
      type: '',
      error: null,
      isLoaded: false,
      registered: false,
      items: []
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFullNameChange = this.handleFullNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleTypeChange(event) {
    this.setState({type: event.target.value});
  }

  handleFullNameChange(event) {
    this.setState({fullName: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }


  handleSubmit(event) {
  
    fetch('https://pure-shore-75332.herokuapp.com/user', {
        method: 'POST',  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          email: this.state.email,
          fullName: this.state.fullName,
          password: this.state.password,
          type: this.state.type
        }),
    })
    .then(res => res.json())
    .then((result) => {
      alert(result.message);
      if(result.message === 'user created succesfully'){
        this.setState({
          registered: true
        })
        alert("You have registered!")
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
          <div className="Registration">
            <h1 id="title-reg">Registration</h1>
            <form onSubmit={this.handleSubmit}>
            
            <label htmlFor="username">Enter username</label>
            
            <input id="username" name="username" type="text" onChange={this.handleUsernameChange}/>

            <label htmlFor="email">Enter your email</label>

            <input id="email" name="email" type="text"  onChange={this.handleEmailChange}/>

            <label htmlFor="fullName">Enter your Full Name</label>

            <input id="fullName" name="fullName" type="text" onChange={this.handleFullNameChange}/>

            <label htmlFor="password">Enter your Password</label>

            <input id="password" name="password" type="password" onChange={this.handlePasswordChange}/>

            <label htmlFor="type">Are you a Student or an Organiser?</label>

            <input id="type" name="type" type="text" onChange={this.handleTypeChange}/>

            <button>Register</button>
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

export default Registration;

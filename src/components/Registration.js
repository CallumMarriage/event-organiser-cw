import React, { Component } from 'react';
import "../style/Registration.css"

class Registration extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      fullName: '',
      error: null,
      isLoaded: false,
      registered: false,
      items: []
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFullNameChange = this.handleFullNameChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleFullNameChange(event) {
    this.setState({fullName: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    
    event.preventDefault();

    fetch('http:///intense-everglades-54619.herokuapp.com/user', {
        method: 'POST',  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          email: this.state.email,
          fullName: this.state.fullName,
          password: this.state.password
        }),
    })
    .then(res => res.json())
    .then((result) => {
      alert(result.message);
      this.setState({
        registered: true
      }) 
    },
    (error) => {
      this.setState({
        error
      });
    });
  }

  render() {
    console.log(this.state.registered);
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

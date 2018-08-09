import React, { Component } from 'react';
import "../style/Login.css";

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      error: null,
      isLoaded: false,
      loggedIn: false
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    
    event.preventDefault();

    fetch('http://intense-everglades-54619.herokuapp.com/validateLogin/'+this.state.username +"/" + this.state.password, {
        method: 'get'
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
      alert("SUCCESS!");
      this.setState({
        loggedIn: true
      }) 
    },
    (error) => {
      this.setState({
        error
      });
    });
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <label id="username">
              Username
          </label>
          <input id="login-username" type="text" onChange={this.handleUsernameChange}/>
          <label id="password">
              Password
          </label>
          <input id="login-password" type="password" onChange={this.handlePasswordChange}/>
          <input id="submit" type="submit" value="Login"/>
        </form>
      </div>
    );
  }
}

export default Login;
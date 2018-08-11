import React, { Component } from 'react';
import "./Login.css";
import { Redirect } from 'react-router-dom';


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

    this.handleLogout = this.handleLogout.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleLogout(event){
    this.setState({loggedIn: false})
  }

  handleSubmit(event) {
    
    event.preventDefault();

    fetch('https://intense-everglades-54619.herokuapp.com/validateLogin/'+this.state.username +"/" + this.state.password, {
        method: 'get'
    })
    .then(res => res.json())
    .then((result) => {
      if(result.message === true){
        alert("You have logged in!");
        this.setState({
          loggedIn: true
        })

      } else {
        alert("Username and password do not match");
      }
    },
    (error) => {
      this.setState({
        error
      });
    });
  }

  render() {
    const {isAuthenticated} = this.props.isLoggedIn;
    if (isAuthenticated) {
      return <Redirect to='/url' />;
    }
  }
}

export default Login;
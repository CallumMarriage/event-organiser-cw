import React, { Component } from 'react';
import "../style/Login.css";

class Login extends Component {

  handleSubmit(event){
    alert("User logged in!");
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <label id="username">
              Username
          </label>
          <input/>
          <label>
              Password
          </label>
          <input type="password"/>
          <input id="submit" type="submit" value="Login"/>
        </form>
      </div>
    );
  }
}

export default Login;
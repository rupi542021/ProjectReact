import React, { Component } from 'react';
import PropTypes from 'prop-types';


class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlUsername = (e) => {
    this.setState({ username: e.target.value });
  }

  handlPassword = (e) => {
    this.setState({ password: e.target.value });
  }
  logIn = () => {
    if (this.state.username == "Mesholash" && this.state.password == "123456") {
      this.setState({ message: "Loged in" });
    }
    else {
      this.setState({ message: "Invalid details" });
    }
  }

  render() {
    return (
      <div style={{ margin: '50px' }}>
        {this.state.username}
        <h3>Email</h3>
        <input type="text" onChange={this.handlUsername}></input><br />
        <h3>Password</h3>
        <input onChange={this.handlPassword}></input>
        <h2> {this.state.count}</h2>
        <button onClick={this.logIn}>Login</button>
        <p>{this.state.message}</p>
      </div>
    )
  }
}

export default LogIn;
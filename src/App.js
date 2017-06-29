import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from "./components/NavBar"
import ChatRoomContainer from "./containers/ChatRoomContainer"

class App extends Component {





  render() {
    return (
      <div className="App">
          <NavBar />
        <div className="welcomePage">
          <h1>WELCOME TO CUSTOM CHAT</h1>
          <h3>Sign Up or Login</h3>
          <h5>Create a new custom chat!</h5>
        </div>
          <ChatRoomContainer cableApp={this.props.cableApp} />
      </div>
    );
  }
}

export default App;

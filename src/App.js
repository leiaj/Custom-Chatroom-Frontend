import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from "./components/NavBar"
import ChatRoomContainer from "./containers/ChatRoomContainer"
import ChatroomForm from './components/ChatroomForm'

class App extends Component {

  render() {
    return (
      <div className="App">
          <NavBar />
        <div className="welcomePage">
        </div>
          <h1></h1>
          <ChatRoomContainer cableApp={this.props.cableApp} />
      </div>
    );
  }
}

export default App;

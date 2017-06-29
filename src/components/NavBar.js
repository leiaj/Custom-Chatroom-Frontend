import React, { Component } from 'react';

export default function NavBar(props){
  return(
    <nav className="navbar navbar-inverse">
      <div className='container-fluid'>
        <div className='navbar-header'>
        </div>
        <div className="navbar-li">
          <ul className="nav navbar-nav">
            <li>Home</li>
            <li>Chatrooms</li>
            <li>Sign Up/Login</li>
            <li>New Chatroom</li>
            <li>About</li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

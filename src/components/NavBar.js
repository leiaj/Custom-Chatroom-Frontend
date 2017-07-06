import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'

export default function NavBar(props){
  return(
    <nav className="navbar navbar-inverse">
      <div className='container-fluid'>
        <div className='navbar-header'>
        </div>
        <div className="navbar-li">
          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to='/chatrooms'>Chatrooms</Link></li>
            <li><Link to="/new">New Chatroom</Link></li>
            <li>About</li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

import React from 'react'
import ChatroomList from './ChatroomList'
import ChatroomForm from './ChatroomForm'

export default function Welcome(props){
  return(
    <div>
      <marquee behavior="alternate">WELCOME</marquee>
      <div className='welcome-chats'>
        <h1>Available Chatrooms</h1>
        <h3><ChatroomList chatrooms={props.chatrooms}/></h3>
      </div>
        <ChatroomForm />

    </div>
  )
}

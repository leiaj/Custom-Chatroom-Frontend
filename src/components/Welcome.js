import React from 'react'
import ChatroomList from './ChatroomList'
import ChatroomForm from './ChatroomForm'

export default function Welcome(props){
  return(
    <div>
      <marquee behavior="alternate">{<img src={'http://i.imgur.com/kID34vY.gif' }/>}</marquee>

      <div className='welcome-chats'>
        <div className='welcome-content'>
          <div className='welcome-columns'>
            <div className='welcome-chatform'>
            <ChatroomForm onSubmit={props.createChatroom} />
            </div>
            <div className='welcome-chatlist'>
              <h1>Available Rooms</h1>
              <h3><ChatroomList chatrooms={props.chatrooms}/></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

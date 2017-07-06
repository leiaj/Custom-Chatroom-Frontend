import React from 'react'
import { Link, Route } from 'react-router-dom'

export default function ChatroomList(props){
  let chatrooms = props.chatrooms
  console.log(chatrooms)


  const list = chatrooms.map(chatroom => <li><Link to={`/chatrooms/${chatroom.id}`}>{chatroom.name}</Link></li>)

  return(
    <div className="chatroom-list">
    <ul>
    {list}
    </ul>
    </div>
  )
}

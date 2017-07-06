import React from 'react'
import Tips from '../components/Tips'
import ChatroomForm from '../components/ChatroomForm'


export default function NewChatContainer(props){
  return(
    <div>
    <Tips />
    <ChatroomForm onSubmit={props.createChatroom}/>
    </div>
  )

}

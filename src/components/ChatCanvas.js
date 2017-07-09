import React from 'react'
import ChatItem from './ChatItem.js'

export default function ChatCanvas(props){
  console.log("chatCANVAS================")
// let currentChatroomID = props.chatroomId
// let chatrooms = props.chatrooms

//
//   function setCurrentChatroom(chatrooms){
//   let activeChatroom
//   chatrooms.map(chatroom => {
//     if (chatroom.id == currentChatroomID){
//       activeChatroom = chatroom
//     }
//   })
//
//   return activeChatroom
// }

let backgroundImage
let name

if (props.chatroom == undefined) {
  backgroundImage = ''
  name = ''
} else {
  backgroundImage = props.chatroom.background_img_url
  name = props.chatroom.name
}

    return(
      <div className='chat-canvas'>
        <h1>{name}</h1>
        <div className='chat-background'>
        {<img src={backgroundImage} />}
        </div>
        <ChatItem items={props.items} setCurrentItemCoords={props.setCurrentItemCoords} setCurrentItem={props.setCurrentItem} saveItemCoords={props.saveItemCoords} chatroomId={props.chatroomId} dummy={props.dummy} handleDrag={props.handleDrag}/>
      </div>
    )

}

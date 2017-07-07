import React from 'react'

export default function ChatCanvas(props){
  console.log("chatCANVAS================")

let currentChatroomID = props.chatroomId
let chatrooms = props.chatrooms


function setCurrentChatroom(chatrooms){
  let activeChatroom
  chatrooms.map(chatroom => {
    if (chatroom.id == currentChatroomID){
      activeChatroom = chatroom
    }
  })

  return activeChatroom
}

let backgroundImage
let name

if (setCurrentChatroom(chatrooms) == undefined) {
  backgroundImage = ''
  name = ''
} else {
  backgroundImage = setCurrentChatroom(chatrooms).background_img_url
  name = setCurrentChatroom(chatrooms).name
}

    return(
      <div className='chat-canvas'>
        <h1>{name}</h1>
        {<img src={backgroundImage} />}
      </div>
    )

}

import React from 'react'

export default function ChatCanvas(props){
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

if (setCurrentChatroom(chatrooms) == undefined) {
  backgroundImage = ''
} else {
  backgroundImage = setCurrentChatroom(chatrooms).background_img_url
}

    return(
      <div className='chat-canvas'>
        <div className='background-img'>
        {<img src={backgroundImage} />}
        </div>
      </div>
    )

}

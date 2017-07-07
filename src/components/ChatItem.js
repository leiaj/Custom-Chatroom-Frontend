import React, { Component } from 'react';
import MyDraggableItem from './MyDraggableItem';


export default function ChatItem(props){
  console.log("chatITEMS****************")
  console.log(props)

  let currentChatroomID = props.chatroomId
  let items = props.items
  // console.log(`Items are:${items}`)
  //console.log('Being called')
  function setItems(items){
    // console.log('About to go over items')
    let activeItems = []
    items.map(item => {
      if (item.chatroom_id == currentChatroomID){
        activeItems.push(item)
      }
    })
    // console.log(`These are the active items:${activeItems}`)
    return activeItems
  }

  let chatroomItems

  if (setItems(items) == undefined){
    chatroomItems = []
  }else {
    chatroomItems = setItems(items)
  }

  const draggableItem = chatroomItems.map(item =>{
    return(
      <MyDraggableItem key={item.id} defaultPosition={{x: item.x_coord, y: item.y_coord}} setCurrentItemCoords={props.setCurrentItemCoords} onStart={() => props.setCurrentItem(item)} onStop={props.saveItemCoords}>
        <p><img src={item.img_url} /></p>
      </MyDraggableItem>
    )
  })



  return(
      <div className='chatitem-list'>
        <ul className='item-images'>
          <li className='crop'>
            {draggableItem}
          </li>
        </ul>
      </div>
  )
}

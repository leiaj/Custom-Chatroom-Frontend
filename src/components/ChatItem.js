import React, { Component } from 'react';
import MyDraggableItem from './MyDraggableItem';


export default function ChatItem(props){
  
  const draggableItem = props.items.map(item =>{
    return(
      <MyDraggableItem key={item.id} defaultPosition={{x: item.x_coord, y: item.y_coord}} setCurrentItemCoords={props.setCurrentItemCoords} onStart={() => props.setCurrentItem(item)} onStop={props.saveItemCoords}>
        <p><img src={item.img_url} /></p>
      </MyDraggableItem>
    )
  })

  return(
    <div>
      <div className='chatitem-list'>
        <ul className='item-images'>
          <li className='crop'>
            {draggableItem}
          </li>
        </ul>
      </div>
    </div>
  )
}

import React, { Component } from 'react';
import Draggable from 'react-draggable';

export default function ChatItem(props){
  const draggableItem = props.items.map(item =>{
    return(
      <Draggable key={item.id}>
        <p><img src={item.img_url} /></p>
      </Draggable>
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

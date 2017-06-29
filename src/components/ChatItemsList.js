import React from 'react'
import ChatItem from './ChatItem'


export default function ChatItemsList(props){
  const items = props.items.map(item =>{
    return(
      <ChatItem
        item={item} />
    )
  })
  return(
    <div>
      <ChatItem items={props.items} />
    </div>
  )
}

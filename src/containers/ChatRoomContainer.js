import React, { Component } from 'react';
import ChatItemsList from '../components/ChatItemsList'
import ChatBox from '../components/ChatBox'
import ChatCanvas from '../components/ChatCanvas'
import MyDraggableItem from '../components/MyDraggableItem'
import { ItemsAdapter, ChatroomAdapter } from '../adapters'
import { Switch, Route } from 'react-router-dom'

import axios from 'axios'
//import activepublicchatlist, chatactiveuserlist, chatbox, chatcanvas, chatitemslist

export default class ChatRoomContainer extends Component{
  constructor(){
    super()
    this.state = {
      activeUsers: [],
      chatItems: [],
      chatrooms: [],
      currentItem: {},
      currentItemCoords:{x_coord:0, y_coord:0},
      messages: []
    }

    this.setCurrentItemCoords = this.setCurrentItemCoords.bind(this)
    this.setCurrentItem = this.setCurrentItem.bind(this)
    this.saveItemCoords = this.saveItemCoords.bind(this)
  }

  setCurrentItemCoords(coords){
    this.setState({
      currentItemCoords: coords
    })
  }

  setCurrentItem(item){
    this.setState({
      currentItem: item
    })
  }

  saveItemCoords(){
    let item = this.state.currentItem
    let newCoords = this.state.currentItemCoords
    ItemsAdapter.updateCoords(item, newCoords)
  }


  componentDidMount(){
    ItemsAdapter.fetchItems()
    .then(data => this.setState({
      chatItems: data
    }))
    ChatroomAdapter.fetchChatroom()
    .then(data => this.setState({
      chatrooms: data
    }))

    this.props.cableApp.messages = this.props.cableApp.cable.subscriptions.create('MessagesChannel',
  {
    received: (message) => this.setState({ messages: [message, ...this.state.messages,] })
  })
  }


  render(){
    return(
      <div>
        <div>
          <Route exact path='/:id' render={(routerProps) =>{
            const id = routerProps.match.params.id
            return (<div><ChatCanvas chatroomId={id} chatrooms={this.state.chatrooms} />
            <ChatItemsList items={this.state.chatItems} setCurrentItemCoords={this.setCurrentItemCoords} setCurrentItem={this.setCurrentItem} saveItemCoords={this.saveItemCoords} chatroomId={id}/></div>)
          }} />
        </div>
      </div>

    )
  }


}

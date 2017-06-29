import React, { Component } from 'react';
import ChatItemsList from '../components/ChatItemsList'
import ChatBox from '../components/ChatBox'
import MyDraggableItem from '../components/MyDraggableItem'
import { ItemsAdapter } from '../adapters'

import axios from 'axios'
//import activepublicchatlist, chatactiveuserlist, chatbox, chatcanvas, chatitemslist

export default class ChatRoomContainer extends Component{
  constructor(){
    super()
    this.state = {
      activeUsers: [],
      chatItems: [],
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
    this.props.cableApp.messages = this.props.cableApp.cable.subscriptions.create('MessagesChannel',
  {
    received: (message) => this.setState({ messages: [message, ...this.state.messages,] })
  })
  }


  render(){
    return(
      <div>
      <ChatItemsList items={this.state.chatItems} setCurrentItemCoords={this.setCurrentItemCoords} setCurrentItem={this.setCurrentItem} saveItemCoords={this.saveItemCoords} />
      </div>

    )
  }


}

import React, { Component } from 'react';
import ChatItemsList from '../components/ChatItemsList'
import ChatBox from '../components/ChatBox'

import axios from 'axios'
//import activepublicchatlist, chatactiveuserlist, chatbox, chatcanvas, chatitemslist

export default class ChatRoomContainer extends Component{
  constructor(){
    super()
    this.state = {
      activeUsers: [],
      chatItems: [],
      messages: []
    }
    this.fetchItems = this.fetchItems.bind(this)
  }

  fetchItems(){
    fetch('http://localhost:3000/api/v1/items')
    .then(res => res.json())
    .then(items => this.setState({chatItems: items}))
  }

  componentDidMount(){
    this.fetchItems()
    this.props.cableApp.messages = this.props.cableApp.cable.subscriptions.create('MessagesChannel',
  {
    received: (message) => this.setState({ messages: [message, ...this.state.messages,] })
  })
  }


  render(){
    return(
      <div>
      <ChatItemsList items={this.state.chatItems} />
      </div>

    )
  }


}

import React, { Component } from 'react';
import ChatItem from '../components/ChatItem'
import ChatCanvas from '../components/ChatCanvas'
import MyDraggableItem from '../components/MyDraggableItem'
import ChatroomForm from '../components/ChatroomForm'
import GiphySearch from '../components/GiphySearch'
import ItemForm from '../components/ItemForm'
import ChatroomList from '../components/ChatroomList'
import Welcome from '../components/Welcome'
import Tips from '../components/Tips'
import ChatBox from '../components/ChatBox'
import { ItemsAdapter, ChatroomAdapter, GiphyAdapter } from '../adapters'
import { Link, Route, withRouter } from 'react-router-dom'


export default class ChatsContainer extends Component{
  constructor(props){
    super(props)
    this.state = {
      activeUser: '',
      messages: [],
      chatroom: {}
    }
    this.displayMessages = this.displayMessages.bind(this)
  }

  componentDidMount(){
    ChatroomAdapter.fetchAChatroom(this.props.chatroom_id)
    .then(chatroom => this.setState({
      chatroom
    }))
    this.props.cableApp.messages = this.props.cableApp.cable.subscriptions.create({channel: "MessagesChannel", room: `${this.props.chatroom_id}` },
      {
        received: (message) => {
          console.log("from channel=>", message)
          this.setState({
            messages: [message, ...this.state.messages]
          })
        }
      })
    }

  handleMessage(message, username){
    if (message){
      this.props.cableApp.messages.send({
        content: message,
        username: localStorage.person
        })
      }
    }

  displayMessages(){
    // const user = this.props.activeUser
    const messages = this.state.messages.map(message => <li>{message.username}: {message.content}</li>)
      return(
        <ul>
        {messages}
        </ul>
      )
    }


  render(){
    console.log("chatsCONTAINER ------------")
    // console.log(this.props.chatrooms)
    return(
      <div className='chats-container'>
        <ItemForm chatroom_id={this.props.chatroom_id} onSubmit={this.props.createItem} />

        <ChatCanvas chatroomId={this.props.chatroom_id} chatrooms={this.props.chatrooms}
        chatroom={this.state.chatroom}
        items={this.props.items} setCurrentItemCoords={this.props.setCurrentItemCoords} setCurrentItem={this.props.setCurrentItem} saveItemCoords={this.props.saveItemCoords} chatroomId={this.props.chatroom_id} dummy={this.props.dummy} />

        <ChatBox handleMessage={this.handleMessage.bind(this)} displayMessages={this.displayMessages} />


      </div>
    )
  }
}

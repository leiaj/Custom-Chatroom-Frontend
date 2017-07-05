import React, { Component } from 'react';
import ChatItemsList from '../components/ChatItemsList'
import ChatBox from '../components/ChatBox'
import ChatCanvas from '../components/ChatCanvas'
import MyDraggableItem from '../components/MyDraggableItem'
import GiphySearch from '../components/GiphySearch'
import { ItemsAdapter, ChatroomAdapter, GiphyAdapter } from '../adapters'
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
      giphyItems: [],
      searchTerm: '',
      messages: []
    }

    this.setCurrentItemCoords = this.setCurrentItemCoords.bind(this)
    this.setCurrentItem = this.setCurrentItem.bind(this)
    this.saveItemCoords = this.saveItemCoords.bind(this)
    this.handleChange = this.handleChange.bind(this)
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

  handleChange(event){
    const term = this.state.searchTerm
    // const gifs = this.state.giphyItems
    this.setState({
      searchTerm: event.target.value
    })
    console.log("Here I go to fetch gifs")
    GiphyAdapter.fetchGifs(term)
    .then(results => this.setState({
      giphyItems: results.data
    }))
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
            return (
              <div>
                  <ChatCanvas chatroomId={id} chatrooms={this.state.chatrooms} />
                  <ChatItemsList items={this.state.chatItems} setCurrentItemCoords={this.setCurrentItemCoords} setCurrentItem={this.setCurrentItem} saveItemCoords={this.saveItemCoords} chatroomId={id}/>
                  <div className="giphy-search">
                  <GiphySearch searchTerm={this.state.searchTerm} handleChange={this.handleChange} giphyItems={this.state.giphyItems}/>
                  </div>
              </div>
            )
          }} />
        </div>
      </div>

    )
  }


}

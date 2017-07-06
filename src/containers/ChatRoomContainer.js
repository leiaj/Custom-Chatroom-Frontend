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

class ChatRoomContainer extends Component{
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
      messages: [],
      dummy: null
    }

    this.setCurrentItemCoords = this.setCurrentItemCoords.bind(this)
    this.setCurrentItem = this.setCurrentItem.bind(this)
    this.saveItemCoords = this.saveItemCoords.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.createChatroom = this.createChatroom.bind(this)
    this.createItem = this.createItem.bind(this)
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

  createChatroom(chatroom){
    console.log("I'm being called")
    fetch(`http://localhost:3000/api/v1/chatrooms`, {
     method: 'POST',
     headers: {
       'content-type': 'application/json',
       'accept': 'application/json'
     },
     body: JSON.stringify({
       chatroom: {
         name: chatroom.name,
         background_img_url: chatroom.background_img_url,
         user_id: 1
       }
     })
   })
   .then(response => response.json() )
   .then(chatroom => this.props.history.push(`/chatrooms/${chatroom.id}`))
   console.log("I've been called")
  }

  createItem(item){
    console.log("I'm being called")
    fetch(`http://localhost:3000/api/v1/items`, {
     method: 'POST',
     headers: {
       'content-type': 'application/json',
       'accept': 'application/json'
     },
     body: JSON.stringify({
       item: {
         name: item.name,
         img_url: item.img_url,
         chatroom_id: item.chatroom_id,
         x_coord: item.x_coord,
         y_coord: item.y_coord
       }
     })
   }).then(response => response.json())
   .then(item => this.setState((prevState)=>{
     return{
       chatItems: [...prevState.chatItems, item]
          }
   }))
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   if (nextState.chatItems !== this.state.chatItems){
  //     return true
  //   }
  //   if (nextState.chatrooms !== this.state.chatrooms){
  //     return true
  //   }
  // }
  //
  // componentDidUpdate(prevProps, prevState){
  //     ItemsAdapter.fetchItems()
  //     .then(data => this.setState({
  //       chatItems: data
  //     }))
  //     ChatroomAdapter.fetchChatroom()
  //     .then(data => this.setState({
  //       chatrooms: data
  //     }))
  // }


  componentDidMount(){
    ItemsAdapter.fetchItems()
    .then(data => this.setState({
      chatItems: data
    }))
    ChatroomAdapter.fetchChatroom()
    .then(data => this.setState({
      chatrooms: data
    }))
    this.props.cableApp.messages = this.props.cableApp.cable.subscriptions.create({channel: "MessagesChannel", room: "Test" },
      {
        received: (message) => {
          console.log("from channel=>", message)
          this.setState({messages: [message, ...this.state.messages]})
        }
      })
    }

    handleMessage(message){
      this.props.cableApp.messages.send({content: message})
    }

    displayMessages(){
      const messages = this.state.messages.map(message => <li>{message.content}</li>)
      return(
        <ul>
        {messages}
        </ul>
      )
    }


  render(){
    console.log("ChatRoomContainer" ,this.state.messages)
    return(
      <div>
        <div>
          <Route exact path ='/' render={() =><Welcome chatrooms={this.state.chatrooms}/>}/>

          <Route exact path = '/new' render= {() =><div><ChatroomForm onSubmit={this.createChatroom}/> <Tips /></div>}/>

          <Route exact path = '/chatrooms' render={()=><ChatroomList chatrooms={this.state.chatrooms}/>} />

          <Route exact path='/chatrooms/:id' render={(routerProps) =>{
            const id = routerProps.match.params.id
            return (
              <div>
                  <ItemForm chatroom_id={id} onSubmit={this.createItem} />

                  <ChatCanvas chatroomId={id} chatrooms={this.state.chatrooms} />

                  <ChatItem items={this.state.chatItems} setCurrentItemCoords={this.setCurrentItemCoords} setCurrentItem={this.setCurrentItem} saveItemCoords={this.saveItemCoords} chatroomId={id} dummy={this.state.dummy}/>

                  <ChatBox handleMessage={this.handleMessage.bind(this)} />
              </div>
            )
          }} />
        </div>
      </div>

    )
  }


}

export default withRouter(ChatRoomContainer)

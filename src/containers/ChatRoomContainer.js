import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ChatsContainer from './ChatsContainer'
import ChatItem from '../components/ChatItem'
import ChatCanvas from '../components/ChatCanvas'
import MyDraggableItem from '../components/MyDraggableItem'
import ChatroomForm from '../components/ChatroomForm'
import GiphySearch from '../components/GiphySearch'
import ItemForm from '../components/ItemForm'
import ChatroomList from '../components/ChatroomList'
import Welcome from '../components/Welcome'
import About from '../components/About'
import Tips from '../components/Tips'
import ChatBox from '../components/ChatBox'
import { ItemsAdapter, ChatroomAdapter, GiphyAdapter } from '../adapters'
import { Link, Route, withRouter } from 'react-router-dom'
import { Container, Grid} from 'semantic-ui-react'

class ChatRoomContainer extends Component{

  static contextTypes = {
    router: PropTypes.object
  }
  constructor(){
    super()
    this.state = {
      activeUser: [],
      chatItems: [],
      chatrooms: [],
      currentItem: {},
      currentItemCoords:{x_coord: 0, y_coord:0},
      giphyItems: [],
      searchTerm: '',
      messages: []
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
    console.log("am i htiting this")
    ItemsAdapter.updateCoords(item, newCoords)
    .then(() => {
      ItemsAdapter.fetchItems()
          .then(data => this.setState({
            chatItems: data
          }))
    })
  }

  handleChange(event){
    const term = this.state.searchTerm
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
    fetch(`https://chittychattyfun.herokuapp.com/api/v1/chatrooms`, {
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
   .then(chatroom => chatroom.json())
   .then(chatroom => {
     this.setState(prevState => {
       return {chatrooms: [...prevState.chatrooms, chatroom]}
     })
     return chatroom
    })
     .then((chatroom) =>{
     this.props.history.push(`/chatrooms/${chatroom.id}`)
   })
  }

  createItem(item){
    console.log("I'm being called")
    fetch(`https://chittychattyfun.herokuapp.com/api/v1/items`, {
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
         x_coord: -15,
         y_coord: -600
       }
     })
   })
   .then(response => response.json())
   .then(item => this.setState((prevState)=>{
     return{
       chatItems: [...prevState.chatItems, item]
          }
   }))
  }

  alertSN() {
    var txt;
    if (!localStorage.person){
      localStorage.person = prompt("Please enter a screen name:", "coolperson69");
    }
    this.setState({
      activeUser: localStorage.person
    })
  }


  componentDidMount(){
    this.setState({
    })
    ItemsAdapter.fetchItems()
    .then(data => this.setState({
      chatItems: data
    }))
    ChatroomAdapter.fetchChatrooms()
    .then(data => this.setState({
      chatrooms: data
    }))
    this.alertSN()
}


  render(){
    return(
      <div>
        <div>

          <Route exact path ='/' render={() =><div><Welcome chatrooms={this.state.chatrooms} createChatroom={this.createChatroom}/> </div>}/>

          <Route exact path='/about' render={()=><About />}/>

          <Route exact path = '/new' render= {() =>
            <div>
            <Container>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column width='2'></Grid.Column>
                  <Grid.Column width='12'>
                  <ChatroomForm onSubmit={this.createChatroom}/>
                  <Grid.Column width='1'><p></p><p><Tips /></p></Grid.Column>
                  <Grid.Column width='1'></Grid.Column>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>

            </div>
            }/>

          <Route exact path = '/chatrooms' render={()=><ChatroomList chatrooms={this.state.chatrooms}/>} />

          <Route exact path='/chatrooms/:id' render={(routerProps) =>{
            const id = routerProps.match.params.id
            return (
              <div className="chatroom-container">
                  <ChatsContainer chatroom_id={id} createItem={this.createItem} chatrooms={this.state.chatrooms} items={this.state.chatItems} setCurrentItemCoords={this.setCurrentItemCoords} saveItemCoords={this.saveItemCoords} dummy={this.state.dummy} cableApp={this.props.cableApp}
                  setCurrentItem={this.setCurrentItem} activeUser={this.state.activeUser} handleDrag={this.handleDrag} currentItemCoords={this.state.currentItemCoords}/>
              </div>
            )
          }} />
          </div>
      </div>
    )
  }


}

export default withRouter(ChatRoomContainer)

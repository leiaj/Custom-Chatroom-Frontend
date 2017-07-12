import React, {Component} from 'react';
import { Button, Form, Icon } from 'semantic-ui-react'

export default class ChatBox extends Component{
  state = {
    message: '',
    activeUser: localStorage.person
  }


  sendMessage(e){
    e.preventDefault()
    this.props.handleMessage(this.state.message)
    this.setState({
      message: '',
      activeUser: localStorage.person
    })
  }

  handleChange(e){
    e.preventDefault()
    this.setState({
      message: e.target.value
    })
  }


  render(){
    console.log("chatbox--------------")
    return (
      <div className='chatbox'>
      <h3>Make Some Friends</h3>
        {this.props.displayMessages()}
        <Form>
        <form onSubmit={this.sendMessage.bind(this)}>
        <input type='text' onChange={this.handleChange.bind(this)} value={this.state.message}/>
        <Button secondary>
        <Icon name='talk'/>
        Send
        </Button>
        </form>
        </Form>
      </div>
    )
  }
}

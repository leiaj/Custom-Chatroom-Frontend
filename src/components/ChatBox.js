import React, {Component} from 'react';

export default class ChatBox extends Component{
  state = {message: '' }


  sendMessage(e){
    e.preventDefault()
    this.props.handleMessage(this.state.message)
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
      <div>
        <form onSubmit={this.sendMessage.bind(this)}>
        <input type='text' onChange={this.handleChange.bind(this)}/>
        <input type='submit' />
        </form>
      </div>
    )
  }
}

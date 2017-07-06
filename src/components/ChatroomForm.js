import React, { Component } from 'react';

export default class ChatroomForm extends Component{
  constructor(props){
    super(props)
    this.state = {
        name: '',
        background_img_url: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    console.log("I'm clickin")
    console.log(this.state)
    this.props.onSubmit(this.state)
    this.setState({
      name: "",
      background_img_url: ""
    })
  }



  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <p><input type='text' placeholder="Chat Name" name="name" value={this.state.name} onChange={this.handleChange}/></p>
          <p><input type='text' placeholder="Background IMG URL" name="background_img_url" value={this.state.background_img_url} onChange={this.handleChange}/></p>
          <p><input type='submit'/></p>
        </form>
      </div>
    )
  }
}

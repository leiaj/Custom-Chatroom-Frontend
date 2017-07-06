import React, { Component } from 'react';

export default class ItemForm extends Component{
  constructor(props){
    super(props)
    this.state = {
        name: '',
        img_url: '',
        chatroom_id: this.props.chatroom_id,
        x_coord: -372,
        y_coord: 32
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
      img_url: ""
    })
  }



  render(){
    return(
      <div className="item-form">
      <h3>Add a new Item</h3>
        <form onSubmit={this.handleSubmit}>
          <p><input type='text' placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange}/></p>
          <p><input type='text' placeholder="Item URL" name="img_url" value={this.state.img_url} onChange={this.handleChange}/></p>
          <p><input type='submit'/></p>
        </form>
      </div>
    )
  }
}

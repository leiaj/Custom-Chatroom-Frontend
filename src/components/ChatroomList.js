import React from 'react'
import { Link, Route } from 'react-router-dom'
import { Card, Grid, Container } from 'semantic-ui-react'

export default function ChatroomList(props){
  let chatrooms = props.chatrooms

  const list = chatrooms.map(chatroom =>  <Card raised><Link to={`/chatrooms/${chatroom.id}`}><img src={`${chatroom.background_img_url}`} width='100px' /> <p>{chatroom.name}</p></Link></Card>)

  return(
    <div className="chatroom-list">
    <Container>
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column width='2'></Grid.Column>
          <Grid.Column width='13'>
          <Grid.Column width='1'></Grid.Column>
          <Card.Group itemsPerRow={4}>
            {list}
          </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    </div>
  )
}

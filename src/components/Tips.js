import React from 'react'
import { Accordion, Segment, Icon } from 'semantic-ui-react'


export default function Tips(props){
  return(
    <div className='tips'>
    <Accordion>
      <Accordion.Title>
        <Icon name='dropdown' />
        Tips for Creating a New Chatroom
      </Accordion.Title>
       <Accordion.Content>
       <h4>Find a photo for your background:</h4>
       <p><img src={'http://i.imgur.com/3STEgHa.png'} /></p>
       <h4>Right click and copy the image address of the photo you want:</h4>
       <p><img src={'http://i.imgur.com/WS31UD0.png'} /></p>
       <h4>Make sure the image address ends in an img file format (ex. gif, png, jpg, etc)</h4>
       <p><img src={'http://i.imgur.com/GtYGNQc.png'} /></p>
       </Accordion.Content>
    </Accordion>
    </div>
  )
}

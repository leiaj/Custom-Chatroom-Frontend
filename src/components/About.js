import React from 'react';
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


export default function About(props){
  return(
    <div>
      <p>
        <img src={`http://i.imgur.com/LG7LcIK.gif`} />
      </p>
      <p>
        <img src={'http://i.imgur.com/JhaUQgU.png'} />
      </p>
      <p>
        <img src={`https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/150616_4126225478765_2025962800_n.jpg?oh=2527b0206b358aee2da82cd940bcfe01&oe=5A011849`} />
      </p>
      <p>
        <Link to='https://github.com/leiaj' target='_blank'><Icon name='github alternate' size='large'/></Link>
        <Link to='https://twitter.com/leiaj' target='_blank'><Icon name='twitter' size='large' /></Link>
        <Link to='mailto:leiajospe@gmail.com' target='_blank'><Icon name='at' size='large'/></Link>
      </p>
      <p>
        <img src={`http://i.imgur.com/LG7LcIK.gif`} />
      </p>
    </div>

  )
}

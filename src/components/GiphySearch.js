import React from 'react'
import MyDraggableItem from './MyDraggableItem'

export default function GiphySearch(props){

    // console.log(gifs)
  return(
    <div>
      <h5>Search Giphy</h5>
      <input type='text' value={props.searchTerm} onChange={props.handleChange}/>
      {console.log(props.giphyItems)}
    </div>

  )

}

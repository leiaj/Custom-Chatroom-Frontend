import React from 'react'
import MyDraggableItem from './MyDraggableItem'

export default function GiphySearch(props){
  let gifs = props.giphyItems
  console.log(gifs)

  const draggableGif = gifs.map(gif => {
    return(
      <MyDraggableItem><img src={"https://media.giphy.com/media/" + gif.id + "/giphy.gif"} width="100" height="100" /></MyDraggableItem>
    )
  })

  // function setGifs(gifs){
  //   let giphyGifs = []
  //   gifs.map(gif => giphyGifs.push(gif))
  //   return giphyGifs
  // }
  //
  // let currentGifs
  //
  // if (setGifs(gifs) == undefined){
  //   currentGifs = []
  // }else{
  //   currentGifs = setGifs(gifs)
  // }


  // function setGifs(gifs){
  //   if (gifs.length < 0){
  //     gifs = []
  //   }else{
  //     return gifs.map(gif => <img src={gif.images.fixed_height.url} />)
  //   }
  // }
    // console.log(gifs)
  return(
    <div>
      <h5>Search Giphy</h5>
      <input type='text' value={props.searchTerm} onChange={props.handleChange}/>
      {draggableGif}
    </div>

  )

}

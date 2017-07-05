const baseUrl = 'http://localhost:3000/api/v1'


export class ItemsAdapter{

  static fetchItems(){
    return fetch(`${baseUrl}/items`)
    .then(res => res.json())
  }

  static updateCoords(updatedItem, newCoords){
    console.log(updatedItem)
    console.log(newCoords)
    return fetch(`${baseUrl}/items/${updatedItem.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'},
      body: JSON.stringify({
        item: {x_coord: newCoords.x_coord, y_coord: newCoords.y_coord}
      })
    })
  }

}

export class ChatroomAdapter{
  static fetchChatroom(){
    return fetch(`${baseUrl}/chatrooms`)
    .then(res => res.json())
  }
}

export class GiphyAdapter{
  static fetchGifs(searchTerm){
    return fetch(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC`)
    .then(data => data.json())
    .then(console.log("we have the data"))
  }


}

import Draggable from 'react-draggable'

export default class MyDraggableItem extends Draggable{

  shouldComponentUpdate(nextProp, nextState){
    if (nextState.x !== this.state.x || nextState.y !== this.state.y){
      return true
    }else{
      return false
    }
  }

  componentDidUpdate(){
    this.props.setCurrentItemCoords({x_coord: this.state.x, y_coord: this.state.y})
  }
}

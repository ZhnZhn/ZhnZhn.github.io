import React, { Component } from 'react';

const STYLE = {
  ARROW_CELL : {
    position: 'absolute',
    top: '10px',
    right: '0px',
    cursor: 'pointer',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '35px',
    paddingRight: '5px'
  },
  ARROW : {
    position: 'relative',
    top: '2px',
    borderColor: '#999 transparent transparent',
    borderStyle: 'solid',
    //borderWidth: '5px 5px 2.5px',
    borderWidth: '10px 8px 4px',
    display: 'inline-block',
    height: '0px',
    width: '0px'
  }
}

const C = {
  ANIMATION_CIRCLE : "circle infinite 1.25s linear",
  BORDER_COLOR : "rgb(27, 117, 187) transparent transparent"
}


class ArrowCell extends Component {
  render(){
    const { styleArrow, onClick } = this.props
    return (
      <span
         ref={ (c) => this.arrowCell = c }
         style={STYLE.ARROW_CELL}
         onClick={onClick}>
        <span
           ref={ (c) => this.arrow = c }
           style={Object.assign({}, STYLE.ARROW, styleArrow)}
        >
        </span>
      </span>
    );
  }

  startAnimation = () => {
    this.arrowCell.style.animation = C.ANIMATION_CIRCLE;
    this.arrow.style.borderColor = C.BORDER_COLOR;
  }
  stopAnimation = () => {
    this.arrowCell.style.animation = "";
  }
}

export default ArrowCell

import React, { Component } from 'react';

import CL from './CL';

const S = {
  ARROW_CELL : {
    position: 'absolute',
    top: 10,
    right: 0,
    width: 35,
    paddingRight: 5,
    textAlign: 'center',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  ARROW : {
    position: 'relative',
    top: '2px',
    display: 'inline-block',
    height: 0,
    width: 0,
    borderColor: '#999 transparent transparent',
    borderStyle: 'solid',
    borderWidth: '10px 8px 4px'
  }
};

const C = {
  ANIMATION_CIRCLE : "circle infinite 1.25s linear",
  BORDER_COLOR : "#1b75bb transparent transparent"
};


class ArrowCell extends Component {
  _refArrowCell = n => this.arrowCell = n
  _refArrow = n => this.arrow = n
  render(){
    const { arrowStyle, onClick } = this.props;
    return (
      <button
         ref={this._refArrowCell}
         className={CL.BT_ARROW}
         style={S.ARROW_CELL}
         tabIndex="-1"
         onClick={onClick}>
        <span
           ref={this._refArrow}
           style={{...S.ARROW, ...arrowStyle}}
        />
      </button>
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

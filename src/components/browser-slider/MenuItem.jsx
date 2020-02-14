import React, { Component } from 'react'

import isKeyEnter from '../zhn/isKeyEnter'
import Style from './Style'

const CL = {
  ITEM: 'menu-item'
};

class MenuItem extends Component {

  _hKeyDown = (evt) => {
    if (isKeyEnter(evt)) {
      evt.preventDefault()
      this.props.onClick()
    }
  }

  _ref = n => this._node = n

  render(){
    const { item, onClick } = this.props
    , { text, type } = item
    , _style = type === 'l'
        ? Style.ITEM_L
        : Style.ITEM_T;
    return (
      <div
        ref={this._ref}
        className={CL.ITEM}
        style={_style}
        tabIndex="0"
        role="menuitem"
        onClick={onClick}
        onKeyDown={this._hKeyDown}
     >
        {text}
      </div>
    );
  }

  focus = () => {
    if (this._node) {
      this._node.focus()
    }
  }
}

export default MenuItem

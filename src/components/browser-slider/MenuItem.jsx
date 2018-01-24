import React, { Component } from 'react'

import Style from './Style'

const CL = {
  ITEM: 'menu-item'
};

class MenuItem extends Component {

  _hKeyPress = (evt) => {
    evt.preventDefault()
    const { which } = evt;
    if (which === 13 || which === 32 ) {
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
        onKeyPress={this._hKeyPress}
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

import React, { Component } from 'react'

import S from './Style'

const CL = {
  ITEM: 'menu-item'
};

class MenuTitle extends Component {

  _refNode = (n) => this._node = n

  render(){
    const { title='', onClick } = this.props;
    return (
      <div
        ref={this._refNode}
        className={CL.ITEM}
        style={S.TITLE}
        role="menuitem"
        tabIndex="0"
        onClick={onClick}
        onKeyPress={(evt) => {
          evt.preventDefault()
          const { which } = evt;
          if (which === 13 || which === 32 ) {
            onClick()
          }
        }}
      >
        {title}
        <span style={S.TITLE_ARROW}>
          {'<'}
        </span>
      </div>
    );
  }

  focus = () => {
    if (this._node) {
      this._node.focus()
    }
  }
}


export default MenuTitle

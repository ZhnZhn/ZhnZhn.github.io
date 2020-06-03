import React, { Component } from 'react'

import isKeyEnter from '../zhn/isKeyEnter'

const _fKeyDown = (onClick) => (evt) => {
  if (isKeyEnter(evt)) {
    onClick()
  }
}

class MenuAriaItem extends Component {

  /*
  static propTypes = {
    onClick: PropTypes.func,
    onReg: PropTypes.func
  }
  */

  componentDidMount(){
    const { onReg } = this.props
    if (this._node && typeof onReg === 'function') {
      onReg(this._node)
    }
  }

  _ref = n => this._node = n

  render(){
    const { children, onClick, onReg, ...rest } = this.props
    return (
      <div
        {...rest}
        ref={onReg ? this._ref: void 0}
        role="menuitem"
        tabIndex="0"
        onClick={onClick}
        onKeyDown={_fKeyDown(onClick)}
      >
        {children}
      </div>
    );
  }
}

export default MenuAriaItem

import React, { Component } from 'react'

const _fKeyPressed = (onClick) => (evt) => {
  evt.preventDefault()
  const { which } = evt;
  if (which === 13 || which === 32) {    
    onClick()
  }
}

class MenuAriaItem extends Component {

  componentDidMount(){
    if (this._node) {
      this.props.onReg(this._node)
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
        onKeyPress={_fKeyPressed(onClick)}
      >
        {children}
      </div>
    );
  }
}

export default MenuAriaItem

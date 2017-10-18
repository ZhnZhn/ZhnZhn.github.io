import React, { Component } from 'react'

import CaptionInput from './CaptionInput'

const CL = {
  BT: 'bt-flat',
  BT_DIV: 'bt-flat__div',
  BT_SPAN: 'bt-flat__span'
};
const S = {
  PRIMARY: {
    color: '#607d8b'
  }
};
const POINTER_EVENTS = 'pointer-events';

class FlatButton extends Component {

  static defaultProps = {
    timeout: 3000
  }

  _setPointerEvents = (value='auto') => {
    if (this && this.rootNode && this.rootNode.style) {
       this.rootNode.style[POINTER_EVENTS] = value
    }
  }

  _hClick = (event) => {
    this._setPointerEvents('none')
    const { timeout, onClick } = this.props;
    setTimeout(this._setPointerEvents, timeout)
    onClick(event)
  }

  render() {
    const {
           className, rootStyle, clDiv=CL.BT_DIV, isPrimary,
           title='', caption, accessKey,
           children
          } = this.props
        , _style = isPrimary
             ? {...rootStyle, ...S.PRIMARY }
             : rootStyle
        , _className = className
             ? CL.BT + ' ' + className
             : CL.BT;
  return (
    <button
      ref = {node => this.rootNode = node }
      className={_className}
      style={_style}
      type="button"
      tabIndex={0}
      title={title}
      accessKey={accessKey}
      onClick={this._hClick}
    >
      <div className={clDiv}>
        <CaptionInput
          className={CL.BT_SPAN}
          caption={caption}
          accessKey={accessKey}
        />
        {children}
      </div>
    </button>
  );
 }

}

export default FlatButton

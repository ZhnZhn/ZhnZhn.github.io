import React, { Component } from 'react'

import CaptionInput from './CaptionInput'

const CL = {
  BT: 'bt-flat',
  BT_DIV: 'bt-flat__div',
  BT_SPAN: 'bt-flat__span'
};

class ModalButton extends Component {
  
  componentDidMount(){
    const { onReg } = this.props;
    if (typeof onReg === 'function'){
      onReg(this.rootNode)
    }
  }

  _refNode = n => this.rootNode = n

  render(){
    const {
            className='', rootStyle,
            clDiv=CL.BT_DIV,
            title='', caption,
            accessKey,
            children,
            onClick
          } = this.props
          , _className = (CL.BT + ' ' + className).trim()
          , _title = accessKey
              ? `${title} [${accessKey}]`
              : title;
    return (
      <button
        type="button"
        ref={this._refNode}
        className={_className}
        style={rootStyle}
        accessKey={accessKey}
        title={_title}
        tabIndex={0}
        onClick={onClick}
      >
        <div className={clDiv}>
          <CaptionInput
            className={CL.BT_SPAN}
            caption={caption}
            accessKey={accessKey}
          >
             {children}
          </CaptionInput>
        </div>
      </button>
    );
  }
}

export default ModalButton

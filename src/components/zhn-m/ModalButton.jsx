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

  render(){
    const {
            rootStyle, clDiv=CL.BT_DIV,
            title, caption, accessKey,
            children, onClick
          } = this.props;
    return (
      <button
        ref={n => this.rootNode = n}
        className={CL.BT}
        style={rootStyle}
        type="button"
        tabIndex={0}
        title={title}
        accessKey={accessKey}
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

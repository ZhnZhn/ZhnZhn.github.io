import React, { Component } from 'react'

import InputSecret from '../zhn/InputSecret'
import STYLE from '../styles/DialogStyles'

class RowSecret extends Component {

  static defaultProps = {
    title: ''
  }

  _refInput = (comp) => this.inputComp = comp

  render() {
    const { title, titleStyle, ...rest } = this.props;
    return (
      <label style={STYLE.rowDiv}>
         <span style={{...STYLE.labelSpan, ...titleStyle}}>
           {title}
         </span>
         <InputSecret
            ref={this._refInput}
            {...rest}
         />
      </label>
    );
  }

  getValue(){
    return this.inputComp.getValue();
  }
  clear(){
    this.inputComp.clear()
  }
}

export default RowSecret

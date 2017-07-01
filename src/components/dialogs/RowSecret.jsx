import React, { Component } from 'react'

import InputSecret from '../zhn/InputSecret'
import STYLE from '../styles/DialogStyles'

class RowSecret extends Component {

  _refInput = (comp) => {
    this.inputComp = comp
  }

  render() {
    const { title='', ...rest } = this.props;
    return (
      <label style={STYLE.rowDiv}>
         <span style={STYLE.labelSpan}>
           {title}
         </span>
         <InputSecret
            ref={this._refInput}
            {...rest}
            //placeholder="Quandl API Key"
         />
      </label>
    );
  }

  getValue(){
    return this.inputComp.getValue();
  }
}

export default RowSecret

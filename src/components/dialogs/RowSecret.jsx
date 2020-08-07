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
      <form>
        <label style={STYLE.ROW}>
           <span style={{...STYLE.CAPTION, ...titleStyle}}>
             {title}
           </span>
           <InputSecret
              ref={this._refInput}
              {...rest}
           />
        </label>
      </form>
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

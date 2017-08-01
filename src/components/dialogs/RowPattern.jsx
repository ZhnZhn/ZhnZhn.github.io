import React, { Component, PropTypes } from 'react';

import InputPattern from '../zhn/InputPattern'
import STYLE from '../styles/DialogStyles';

class RowPattern extends Component {
  static propTypes = {
     title : PropTypes.string
  }

  render(){
    const { title='', titleStyle, ...rest } = this.props;
    return (
      <div style={STYLE.rowDiv}>
        <span style={{ ...STYLE.labelSpan, ...titleStyle}}>
           {title}
        </span>
        <InputPattern
           ref={c => this.inputPattern = c}
           {...rest}
        />
     </div>
    );
  }

  getValue(){
    return this.inputPattern.getValue();
  }
  isValid(){
    return this.inputPattern.isValid();
  }
}

export default RowPattern

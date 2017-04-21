import React, { Component, PropTypes } from 'react';

import InputText from '../zhn/InputText';
import STYLE from '../styles/DialogStyles';

const S = {
  ROOT : {
    lineHeight: 2
  },
  CAPTION : {
    width: '120px'
  },
  INPUT_TEXT : {
    width : '250px',
    marginLeft : 0,
    marginRight: 0,
    paddingLeft: '10px',
    height: '30px'
  }
}

class RowInputText extends Component {
  static propTypes = {
    caption: PropTypes.string
  }

  render(){
    const { caption } = this.props;
    return (
      <div style={{...STYLE.rowDiv, ...S.ROOT}}>
         <span style={{...STYLE.labelSpan, ...S.CAPTION}}>
           {caption}
         </span>
         <InputText
            ref={c => this.inputText = c}
            style={S.INPUT_TEXT}
         />
      </div>
    )
  }

  getValue(){
    return this.inputText.getValue().trim();
  }
  setValue(value){
    this.inputText.setValue(value)
  }
}

export default RowInputText

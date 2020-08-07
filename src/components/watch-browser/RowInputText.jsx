import React, { Component } from 'react';
//import PropTypes from "prop-types";

import InputText from '../zhn/InputText';
import STYLE from '../styles/DialogStyles';

const S = {
  ROW : {
    ...STYLE.ROW,
    lineHeight: 2
  },
  CAPTION : {
    ...STYLE.CAPTION,
    width: 120
  },
  INPUT_TEXT : {
    width : 250,
    height: 30,
    paddingLeft: 10,
    marginLeft : 0,
    marginRight: 0
  }
}

class RowInputText extends Component {
  /*
  static propTypes = {
    caption: PropTypes.string
  }
  */
  _refInputText = c => this.inputText = c

  render(){
    const { caption } = this.props;
    return (
      <div style={S.ROW}>
         <span style={S.CAPTION}>
           {caption}
         </span>
         <InputText
            ref={this._refInputText}
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

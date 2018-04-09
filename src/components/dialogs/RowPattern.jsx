import React, { Component } from 'react';
//import PropTypes from "prop-types";

import InputPattern from '../zhn/InputPattern'
import STYLE from '../styles/DialogStyles';

class RowPattern extends Component {
  /*
  static propTypes = {
     isShowLabels: PropTypes.bool,
     title : PropTypes.string
     titleStyle: PropTypes.object
  }
  */
  
  static defaultProps = {
    title: ''
  }

  _refInput = c => this.inputPattern = c

  render(){
    const {
            isShowLabels,
            title, titleStyle,
            ...rest
          } = this.props
        , {
            rowStyle, labelStyle
          } = STYLE.crRowLabelStyle(isShowLabels);
    return (
      <div style={rowStyle}>
        <span style={{ ...labelStyle, ...titleStyle}}>
           {title}
        </span>
        <InputPattern
           ref={this._refInput}
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

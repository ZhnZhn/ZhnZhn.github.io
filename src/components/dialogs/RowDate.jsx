import React, { Component } from 'react';
//import PropTypes from "prop-types";

import DateField from '../zhn/DateField';
import STYLE from '../styles/DialogStyles';

class RowDate extends Component {
  /*
  static propTypes = {
     labelTitle : PropTypes.string,
     initValue : PropTypes.string,
     errorMsg : PropTypes.string,
     onTestDate : PropTypes.func
  }
  */

  render(){
    const {
            isShowLabels, labelTitle='',
            initValue, errorMsg, onTestDate
          } = this.props
        , {
            rowStyle, labelStyle
          } = STYLE.crRowLabelStyle(isShowLabels);
    return (
      <div style={rowStyle}>
        <span style={labelStyle}>
           {labelTitle}
        </span>
        <DateField
           ref={c => this.inputDate = c}
           initValue={initValue}
           errorMsg={errorMsg}
           onTest={onTestDate}
        />
     </div>
    );
  }

  getValue = () => {
    return this.inputDate.getValue();
  }
  isValid = () => {
    return this.inputDate.isValid();
  }
}


export default RowDate

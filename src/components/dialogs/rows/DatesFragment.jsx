import React, { Component } from 'react';
//import PropTypes from "prop-types";

import DateField from '../../zhn/DateField';
import crRowStyle from './crRowStyle'

const FORMAT_ERR_MSG = "YYYY-MM-DD format must be";
const NEAR_ERR_MSG = "From Date is near that To Date";

class DatesFragment extends Component {
  /*
  static propTypes = {
    isShowLabels: PropTypes.bool,
    placeholder: PropTypes.string,
    initFromDate: PropTypes.string,
    initToDate: PropTypes.string,
    fromCaption: PropTypes.string,
    toCaption: PropTypes.string,
    errMsg: PropTypes.string,
    nForecastDate: PropTypes.number,
    onTestDate: PropTypes.func,
    msgOnNotValidFormat: PropTypes.func,
    onEnter: PropTypes.func
  }
  */

  static defaultProps = {
    isShowLabels: true,
    fromCaption: 'From Date:',
    toCaption: 'To Date:',
    errMsg: FORMAT_ERR_MSG,
    msgOnNotValidFormat: (item='Date') => `${item} is not in valid format`,
    isPeriodValid: (from, to) => from<=to
  }

  _refFromDate = c => this.fromDate = c
  _refToDate = c => this.toDate = c

  render(){
    const {
        isShowLabels,
        placeholder,
        fromCaption, initFromDate,
        toCaption, initToDate,
        dateStyle,
        nForecastDate,
        errMsg,
        onTestDate,
        onEnter
      } = this.props
    , {
        rowStyle, labelStyle
      } = crRowStyle({ isShowLabels })

    return (
        <div>
          <div style={rowStyle}>
            <span style={labelStyle}>
               {fromCaption}
            </span>
            <DateField
               ref={this._refFromDate}
               rootStyle={dateStyle}
               placeholder={placeholder}
               initialValue={initFromDate}
               errorMsg={errMsg}
               onTest={onTestDate}
               onEnter={onEnter}
            />
         </div>
         <div style={rowStyle}>
            <span style={labelStyle}>
              {toCaption}
            </span>
            <DateField
               ref={this._refToDate}
               rootStyle={dateStyle}
               placeholder={placeholder}
               initialValue={initToDate}
               nForecastDate={nForecastDate}
               errorMsg={errMsg}
               onTest={onTestDate}
               onEnter={onEnter}
            />
         </div>
       </div>
    );
  }

  getValues() {
    return {
      fromDate: this.fromDate.getValue(),
      toDate: this.toDate.getValue()
    }
  }

  getValidation() {
    const {
      fromDate,
      toDate
    } = this
    , {
      msgOnNotValidFormat,
      isPeriodValid
    } = this.props
    , datesMsg = [];

    if (!fromDate.isValid()) { datesMsg.push(msgOnNotValidFormat('From Date')); }
    if (!toDate.isValid())   { datesMsg.push(msgOnNotValidFormat('To Date')); }

    if (datesMsg.length === 0 && !isPeriodValid(
          fromDate.getValue().trim(),
          toDate.getValue().trim()
        )) {
      datesMsg.push(NEAR_ERR_MSG);
    }

    if (datesMsg.length>0){
      return { isValid: false, datesMsg };
    }
    return { isValid: true };
  }

  focusInput() {
    this.fromDate.focus();
  }

  focusNotValidInput() {
    if (!this.fromDate.isValid()){
      this.fromDate.focus();
      return true;
    }
    if (!this.toDate.isValid()){
      this.toDate.focus();
      return true;
    }
    return false;
  }
  setFromTo(fromStr, toStr){
    this._setFromDate(fromStr)
    this._setToDate(toStr)
  }

  _setFromDate(dateStr) {
    if (this.fromDate){
      this.fromDate.setValue(dateStr)
    }
  }
  _setToDate(dateStr) {
    if (this.toDate){
      this.toDate.setValue(dateStr)
    }
  }
}

export default DatesFragment

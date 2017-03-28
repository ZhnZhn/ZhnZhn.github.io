import React, { Component, PropTypes } from 'react';

import DateField from '../zhn/DateField';
import DialogStyles from '../styles/DialogStyles';

const styles = DialogStyles;

const FORMAT_ERR_MSG = "YYYY-MM-DD format must be";
const NEAR_ERR_MSG = "From Date is near that To Date";

class DatesFragment extends Component {
  static propTypes = {
    initFromDate: PropTypes.string,
    initToDate: PropTypes.string,
    nForecastDate: PropTypes.number,
    onTestDate: PropTypes.func,
    msgOnNotValidFormat: PropTypes.func
  }

  static defaultProps = {
    msgOnNotValidFormat : (item='Date') => `${item} is not in valid format`
  }

  render(){
    const {
            initFromDate, initToDate,
            nForecastDate, onTestDate
        } = this.props;
    return (
        <div>
          <div style={styles.rowDiv}>
            <span style={styles.labelSpan}>
               From Date:
            </span>
            <DateField
               ref={c => this.fromDate = c}
               initValue={initFromDate}
               errorMsg={FORMAT_ERR_MSG}
               onTest={onTestDate}
            />
         </div>
         <div style={styles.rowDiv}>
            <span style={styles.labelSpan}>
              To Date:
            </span>
            <DateField
                 ref={c => this.toDate = c}
                 initValue={initToDate}
                 nForecastDate={nForecastDate}
                 errorMsg={FORMAT_ERR_MSG}
                 onTest={onTestDate}
            />
         </div>
       </div>
    );
  }

  getValues = () => {
    return {
      fromDate: this.fromDate.getValue(),
      toDate: this.toDate.getValue()
    }
  }

  getValidation = () => {
    const { msgOnNotValidFormat } = this.props
        , datesMsg = [];
    if (!this.fromDate.isValid()) { datesMsg.push(msgOnNotValidFormat('From Date')); }
    if (!this.toDate.isValid())   { datesMsg.push(msgOnNotValidFormat('To Date')); }

    if (this.fromDate.getValue().trim() > this.toDate.getValue().trim() ) {
      datesMsg.push(NEAR_ERR_MSG);
    }

    if (datesMsg.length>0){
      return { isValid: false, datesMsg }
    }
    return { isValid : true}
  }

  focusInput = () => {
    this.fromDate.focusInput();
  }

  focusNotValidInput = () => {
    if (!this.fromDate.isValid()){
       this.fromDate.focusInput();
       return true;
    }
    if (!this.toDate.isValid()){
      this.toDate.focusInput();
      return true;
    }
    return false;
  }
}

export default DatesFragment

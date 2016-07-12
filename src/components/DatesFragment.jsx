import React from 'react';

import ZhDateField from './ZhDateField';
import DialogStyles from './styles/DialogStyles';

const styles = DialogStyles;

const DatesFragment = React.createClass({
  displayName : 'DatesFragment',
  getDefaultProps(){
    return  {
      msgOnNotValidFormat : (item) => '${item} is not in valid format'
    }
  },

  render(){
    const {initFromDate, initToDate, onTestDate} = this.props;
    return (
        <div>
          <div style={styles.rowDiv}>
            <span style={styles.labelSpan}>
               From Date:
            </span>
            <ZhDateField
               ref={c => this.fromDate = c}
               initValue={initFromDate}
               errorMsg="YYYY-MM-DD format must be"
               onTest={onTestDate}
            />
         </div>
         <div style={styles.rowDiv}>
            <span style={styles.labelSpan}>
              To Date:
            </span>
            <ZhDateField
                 ref={c => this.toDate = c}
                 initValue={initToDate}
                 errorMsg="YYYY-MM-DD format must be"
                 onTest={onTestDate}
            />
         </div>
       </div>
    );
  },

  getValues(){
    return {
      fromDate: this.fromDate.getValue(),
      toDate: this.toDate.getValue()
    }
  },

  getValidation(){
    const {msgOnNotValidFormat} = this.props
        ,  datesMsg = [];
    if (!this.fromDate.isValid()) { datesMsg.push(msgOnNotValidFormat('From Date')); }
    if (!this.toDate.isValid())   { datesMsg.push(msgOnNotValidFormat('To Date')); }
    if (datesMsg.length>0){
      return { isValid: false, datesMsg }
    }
    return { isValid : true}
  },

  focusInput(){
    this.fromDate.focusInput();
  },

  focusNotValidInput(){
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

});

export default DatesFragment;

import React from 'react';

import ZhDateField from './ZhDateField.js';
import DialogStyles from './styles/DialogStyles.js';

const styles = DialogStyles;

const DatesFragment = React.createClass({

  render: function(){
    return (
        <div>

          <div style={styles.rowDiv}>
            <span style={styles.labelSpan}>
               From Date:
            </span>
            <ZhDateField
               ref="fromDate"
               initValue={this.props.initFromDate}
               errorMsg="YYYY-MM-DD format must be"
               onTest={this.props.onTestDate}
            />
         </div>

         <div style={styles.rowDiv}>
            <span style={styles.labelSpan}>
              To Date:
            </span>
            <ZhDateField
                 ref="toDate"
                 initValue={this.props.initToDate}
                 errorMsg="YYYY-MM-DD format must be"
                 onTest={this.props.onTestDate}
            />
         </div>

       </div>
    );
  },

  getValues: function(){
    return {
             fromDate: this.refs.fromDate.getValue(),
             toDate: this.refs.toDate.getValue()
           }
  },

  isValid: function(){
    if (!this.refs.fromDate.isValid()) {
      return false;
    }
    if (!this.refs.toDate.isValid()) {
      return false;
    }
    return true;
  },

  focusInput: function(){
    this.refs.fromDate.focusInput();
  },

  focusNotValidInput: function(){
    if (!this.refs.fromDate.isValid()){
       this.refs.fromDate.focusInput();
       return true;
    }
    if (!this.refs.toDate.isValid()){
      this.refs.toDate.focusInput();
      return true;
    }
    return false;
  },

});

export default DatesFragment;

import React from 'react';

import ZhDateField from '../ZhDateField';
import DialogStyles from '../styles/DialogStyles';

const Styles = DialogStyles;

const RowDate = React.createClass({
  render(){
    const { labelTitle, initValue, errorMsg, onTestDate } = this.props;
    return (
      <div style={Styles.rowDiv}>
        <span style={Styles.labelSpan}>
           {labelTitle}
        </span>
        <ZhDateField
           ref={c => this.inputDate = c}
           initValue={initValue}
           errorMsg={errorMsg}
           onTest={onTestDate}
        />
     </div>
    );
  },

  getValue(){
    return this.inputDate.getValue()
  },

  isValid(){
    return this.inputDate.isValid();
  }

});

export default RowDate

import React, { Component, PropTypes } from 'react';

import DialogStyles from '../styles/DialogStyles';

const styles = DialogStyles;
const STYLE = {
  MSG_SPAN : {
    whiteSpace : 'pre',
    fontWeight : 'bold'
  }
}

class ValidationMessages extends Component {
   static propTypes = {
     validationMessages : PropTypes.array
   }
   static defaultProps = {
     validationMessages : []
   }

  _renderValidationMessages = (validationMessages) =>{
    return validationMessages.map((msg, index)=>{
      return (
        <div key={index}>
          <div style={styles.validationMessageNumber}>{index+1}</div>
          <span style={STYLE.MSG_SPAN}>{msg}</span>
        </div>
      )
    });
  }

  render(){
    const { validationMessages } = this.props;
    return (
      <div style={styles.validationContainer}>
        {this._renderValidationMessages(validationMessages)}
      </div>
    )
  }
}

export default ValidationMessages

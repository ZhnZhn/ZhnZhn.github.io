import React, { Component } from 'react';
//import PropTypes from "prop-types";

import STYLE from '../styles/DialogStyles';

class ValidationMessages extends Component {
  /*
   static propTypes = {
     validationMessages : PropTypes.array
   }
  */
   static defaultProps = {
     validationMessages: []
   }

  _renderValidationMessages = (validationMessages) =>{
    return validationMessages.map((msg, index) => {
      return (
        <div key={msg}>
          <div style={STYLE.VM_MSG_NUMBER}>{index+1}</div>
          <span style={STYLE.VM_MSG}>{msg}</span>
        </div>
      );
    });
  }

  render(){
    const { validationMessages } = this.props;
    return (
      <div style={STYLE.VM_CONT}>
        {this._renderValidationMessages(validationMessages)}
      </div>
    )
  }
}

export default ValidationMessages

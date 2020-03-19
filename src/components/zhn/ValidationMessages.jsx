import React from 'react';
//import PropTypes from "prop-types";

import STYLE from '../styles/DialogStyles';

const _renderValidationMessages = (validationMessages) =>{
  return validationMessages.map((msg, index) => {
    return (
      <div key={msg}>
        <span style={STYLE.VM_MSG_NUMBER}>{index+1}</span>
        <span style={STYLE.VM_MSG}>{msg}</span>
      </div>
    );
  });
};

const ValidationMessages = ({ validationMessages=[] }) => (
 <div style={STYLE.VM_CONT}>
   {_renderValidationMessages(validationMessages)}
 </div>
);


/*
ValidationMessages.propTypes = {
  validationMessages : PropTypes.arrayOf(PropTypes.shape({
    msg: PropTypes.string
  }))
}
*/

export default ValidationMessages

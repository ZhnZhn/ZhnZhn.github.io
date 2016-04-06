import React from 'react';

import DialogStyles from './styles/DialogStyles.js';

const styles = DialogStyles;

const ValidationMessagesFragment = React.createClass({

  _renderValidationMessages: function(){
    let messages = this.props.validationMessages.map((msg, index)=>{
      return (
        <div key={index}>
          <div style={styles.validationMessageNumber}>{index+1}</div>
          <span>{msg}</span>
        </div>
      )
    });

    return messages;
  },

  render: function(){
    return (
      <div style={styles.validationContainer}>
        {this._renderValidationMessages()}
      </div>
    )
  }
});

export default ValidationMessagesFragment

import React from 'react';

import WithValidation from '../dialogs/WithValidation';

import ZhDialog from '../ZhDialog';
import ZhSelect from '../ZhSelect';
import ToolBarButton from '../ToolBarButton';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

import QuandlChinaDceFuture from '../../services/qe/QuandlChinaDceFuture';

import DialogStyles from '../styles/DialogStyles'

const styles = DialogStyles;

const QuandlFuturesChinaDceDialog = React.createClass({
  ...WithValidation,
  displayName : 'QuandlFuturesChinaDceDialog',
  getInitialState(){
    this.code = null;
    return {
      optionCodes: QuandlChinaDceFuture.getTickets(),
      validationMessages: [],
    }
  },

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  },

  _handlerSelectCode(code){
    this.code = code;
  },

  _handlerLoad(event){
     event.target.focus();
     const validationMessages = this._getValidationMessages();
     if (validationMessages.isValid){
       const option = {
          value : this.code.value,
          code : this.code
       };
       this.props.onLoad(option);
     }
     this._updateValidationMessages(validationMessages);
  },

  _getValidationMessages(){
    const {msgOnNotSelected} = this.props
        , msg = [];

    if (!this.code) { msg.push(msgOnNotSelected('Code')); }

    msg.isValid = (msg.length === 0) ? true : false;
    return msg;
  },


  render(){
    const {isShow, onShow, onClose} = this.props
        , {optionCodes, validationMessages} = this.state
        , _commandButtons =[
       <ToolBarButton
          key="a"
          type="TypeC"
          caption="Load"
          onClick={this._handlerLoad}
       />
    ];

    return (
       <ZhDialog
           caption="Futures China DCE"
           isShow={isShow}
           commandButtons={_commandButtons}
           onShowChart={onShow}
           onClose={this._handlerClose}
       >
         <div style={styles.rowDiv} key="1">
           <span style={styles.labelSpan}>
             Code:
           </span>
           <ZhSelect
             width="250"
             onSelect={this._handlerSelectCode}
             options={optionCodes}
           />
        </div>
        <ValidationMessagesFragment
            key="3"
            validationMessages={validationMessages}
        />
      </ZhDialog>
    );
  }
});

export default QuandlFuturesChinaDceDialog;

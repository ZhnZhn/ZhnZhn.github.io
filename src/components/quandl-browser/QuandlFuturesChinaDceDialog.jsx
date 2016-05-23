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
  getInitialState(){
    return {
      optionCodes: QuandlChinaDceFuture.getTickets(),
      code: null,
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
    this.state.code = code;
  },

  _handlerLoad(event){
     event.target.focus();
     const validationMessages = this._getValidationMessages();
     if (validationMessages.isValid){
       const option = {
          value : this.state.code.value,
          code : this.state.code
       };
       this.props.onLoad(option);

     }
     this._updateValidationMessages(validationMessages);
  },

  _getValidationMessages(){
    const validationMessages = [];
    if (!this.state.code){
      validationMessages.push("Code is Required to Select");
    }
    validationMessages.isValid = (validationMessages.length === 0) ? true : false;
    return validationMessages;
  },


  render(){
    let commandButtons =[
       <ToolBarButton
          key="a"
          type="TypeC"
          caption="Load"
          onClick={this._handlerLoad}
       />
    ];

    const {isShow, onShow, onClose} = this.props;

    return (
       <ZhDialog
           caption="Futures China DCE"
           isShow={isShow}
           commandButtons={commandButtons}
           onShowChart={onShow}
           onClose={this._handlerClose}
       >
         <div style={styles.rowDiv} key="1">
           <span style={styles.labelSpan}>
             Code:
           </span>
           <ZhSelect
             ref="selectStock"
             width="250"
             onSelect={this._handlerSelectCode}
             options={this.state.optionCodes}
           />
        </div>
        <ValidationMessagesFragment
            key="3"
            validationMessages={this.state.validationMessages}
        />
      </ZhDialog>
    );
  }
});

export default QuandlFuturesChinaDceDialog;

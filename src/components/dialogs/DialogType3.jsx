import React from 'react';

import WithValidation from './WithValidation';

import ZhDialog from '../ZhDialog';
import ZhSelect from '../ZhSelect';
import ToolBarButton from '../ToolBarButton';
import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

import DialogStyles from '../styles/DialogStyles'
const styles = DialogStyles;


const DialogType3 = React.createClass({
  ...WithValidation,

  displayName : 'DialogType3',

  getInitialState(){
    this.stock = null
    return {      
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

  _handlerSelectStock(stock){
    this.stock = stock
  },

  _handlerLoad(event){
     event.target.focus();
     const validationMessages = this._getValidationMessages();
     if (validationMessages.isValid){
       const {fromDate, toDate} = this.datesFragment.getValues();
       const option = {
         value : this.stock.value,
         stock: this.stock,
         fromDate: fromDate,
         toDate: toDate,
       }
       this.props.onLoad(option);
     }
     this._updateValidationMessages(validationMessages);
  },

  _getValidationMessages(){
    let msg = [];
    if (!this.stock) { msg.push(this.props.msgOnNotSelected('Stock'));}
    const {isValid, datesMsg} = this.datesFragment.getValidation();
    if (!isValid) { msg = msg.concat(datesMsg); }
    msg.isValid = (msg.length === 0) ? true : false;
    return msg;
  },

  render(){
    const {
            caption, isShow, onShow, onClose,
            optionStocks,
            initFromDate, initToDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , {validationMessages} = this.state
        , _commandButtons = [
       <ToolBarButton
          key="a"
          type="TypeC"
          caption="Load"
          onClick={this._handlerLoad}
       />
    ];

    return (
       <ZhDialog
           caption={caption}
           isShow={isShow}
           commandButtons={_commandButtons}
           onShowChart={onShow}
           onClose={this._handlerClose}
       >
         <div style={styles.rowDiv} key="1">
           <span style={styles.labelSpan}>
             Stock:
           </span>
           <ZhSelect
             width="250"
             onSelect={this._handlerSelectStock}
             options={optionStocks}
           />
        </div>
        <DatesFragment
            key="2"
            ref={c => this.datesFragment = c}
            initFromDate={initFromDate}
            initToDate={initToDate}
            msgOnNotValidFormat={msgOnNotValidFormat}
            onTestDate={onTestDate}
        />
        <ValidationMessagesFragment
            key="3"
            validationMessages={validationMessages}
        />
      </ZhDialog>
    );
  }
});

export default DialogType3;

import React from 'react';

import WithValidation from './WithValidation';

import ZhDialog from '../ZhDialog';
import ZhSelect from '../ZhSelect';
import ToolBarButton from '../ToolBarButton';
import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

import DialogStyles from '../styles/DialogStyles.js'
const styles = DialogStyles;


const DialogType3 = React.createClass({
  ...WithValidation,
  getInitialState(){        
    return {
      stock: null,
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
    this.state.stock = stock;
  },

  _handlerLoad(event){
     event.target.focus();
     const validationMessages = this._getValidationMessages();
     if (validationMessages.isValid){
       const {fromDate, toDate} = this.refs.datesFragment.getValues();
       const option = {
         value : this.state.stock.value,
         stock: this.state.stock,
         fromDate: fromDate,
         toDate: toDate,
       }
       this.props.onLoad(option);
     }
     this._updateValidationMessages(validationMessages);
  },

  _getValidationMessages(){
    const validationMessages = [];
    if (!this.state.stock){
      validationMessages.push("Stock is Required to Select");
    }
    if (!this.refs.datesFragment.isValid()){
      validationMessages.push("Some Date is not in Valid Format");
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

    const {
            caption, isShow, onShow, onClose,
            optionStocks,
            initFromDate, initToDate, onTestDate
          } = this.props;

    const {validationMessages} = this.state;

    return (

       <ZhDialog
           caption={caption}
           isShow={isShow}
           commandButtons={commandButtons}
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
            ref="datesFragment"
            initFromDate={initFromDate}
            initToDate={initToDate}
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

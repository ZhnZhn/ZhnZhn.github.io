import React from 'react';

import WithValidation from './WithValidation';

import ZhDialog from '../ZhDialog';
import ToolbarButtonCircle from './ToolbarButtonCircle';
import SelectWithLoad from './SelectWithLoad';
import ToolBarButton from '../ToolBarButton';
import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

const DialogType3 = React.createClass({
  ...WithValidation,

  displayName : 'DialogType3',

  getInitialState(){
    this.stock = null;
    this.toolbarButtons = (this.props.descrUrl)
         ?  [{ caption: 'I', onClick: this._handlerClickInfo }] : [];

    return {
      validationMessages: []
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

  _handlerClickInfo(){
    const {descrUrl, onClickInfo} = this.props;
    onClickInfo({ descrUrl });
  },

  _handlerSelectStock(stock){
    this.stock = stock
  },

  _handlerLoad(event){
    event.target.focus();
    this._handlerWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  },
  _createValidationMessages(){
    const { itemCaption='Stock' } = this.props;
    let msg = [];
    if (!this.stock) { msg.push(this.props.msgOnNotSelected(itemCaption));}
    const {isValid, datesMsg} = this.datesFragment.getValidation();
    if (!isValid) { msg = msg.concat(datesMsg); }
    msg.isValid = (msg.length === 0) ? true : false;
    return msg;
  },
  _createLoadOption(){
    const { fromDate, toDate } = this.datesFragment.getValues()
        , {
            columnName, dataColumn, seriaColumnNames, loadId,
            fnValue, fnItemCaption,
            linkFn
          } = this.props
        , _value = (typeof fnValue === 'function')
                  ? fnValue(this.stock.value) : this.stock.value
        , _itemCaption = (typeof fnItemCaption === 'function')
                  ? fnItemCaption(this.stock.value) : undefined;
    return {
      //value : this.stock.value,
      value : _value,
      title: this.stock.caption,
      stock: this.stock,
      fromDate: fromDate,
      toDate: toDate,
      columnName : columnName,
      dataColumn : dataColumn,
      itemCaption : _itemCaption,
      loadId : loadId,
      linkFn : linkFn,
      seriaColumnNames
    }
  },
  _handlerClose(){
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose()
  },

  render(){
    const {
            caption, isShow, onShow,
            optionURI, optionsJsonProp,
            itemCaption='Stock:', optionNames='Stocks',
            initFromDate, initToDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , { validationMessages } = this.state
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
         <ToolbarButtonCircle
           buttons={this.toolbarButtons}
         />
         <SelectWithLoad
           isShow={isShow}
           uri={optionURI}
           jsonProp={optionsJsonProp}
           caption={itemCaption}
           optionNames={optionNames}
           onSelect={this._handlerSelectStock}
         />

         <DatesFragment
            ref={c => this.datesFragment = c}
            initFromDate={initFromDate}
            initToDate={initToDate}
            msgOnNotValidFormat={msgOnNotValidFormat}
            onTestDate={onTestDate}
         />
         <ValidationMessagesFragment
            validationMessages={validationMessages}
         />
      </ZhDialog>
    );
  }
});

export default DialogType3;

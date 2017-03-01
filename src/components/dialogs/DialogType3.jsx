import React, { Component } from 'react';

import createLoadOptions from '../../flux/creaters/type3';

import DraggableDialog from '../zhn-moleculs/DraggableDialog';
import ToolbarButtonCircle from './ToolbarButtonCircle';
import SelectWithLoad from './SelectWithLoad';
import ActionButton from '../zhn/ActionButton';
import DatesFragment from '../zhn-moleculs/DatesFragment';
import ValidationMessages from '../zhn/ValidationMessages';

import withValidationLoad from './decorators/withValidationLoad';

@withValidationLoad
class DialogType3 extends Component {

  state = {
    validationMessages: []
  }

  constructor(props){
    super(props);

    this.stock = undefined;
    this.toolbarButtons = (props.descrUrl)
         ?  [{ caption: 'I', onClick: this._handleClickInfo }]
         : [];
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  }

  _handleClickInfo = () => {
    const {descrUrl, onClickInfo} = this.props;
    onClickInfo({ descrUrl });
  }

  _handleSelectStock = (stock) => {
    this.stock = stock;
  }

  _handleLoad = (event) => {
    event.target.focus();
    this._handleWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  }
  _createValidationMessages = () => {
    const { itemCaption='Stock' } = this.props;
    let msg = [];
    if (!this.stock) { msg.push(this.props.msgOnNotSelected(itemCaption));}
    const {isValid, datesMsg} = this.datesFragment.getValidation();
    if (!isValid) { msg = msg.concat(datesMsg); }
    msg.isValid = (msg.length === 0) ? true : false;
    return msg;
  }
  _createLoadOption = () => {
    const { fromDate, toDate } = this.datesFragment.getValues()
    return createLoadOptions(
        this.props,
        { stock : this.stock, fromDate, toDate }
    );
  }
  _handleClose = () => {
    this._handleWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  }

  render(){
    const {
            caption, isShow, onShow,
            optionURI, optionsJsonProp,
            itemCaption='Stock:', optionNames='Stocks',
            initFromDate, initToDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , { validationMessages } = this.state
        , _commandButtons = [
       <ActionButton
          key="a"
          type="TypeC"
          caption="Load"
          onClick={this._handleLoad}
       />
    ];

    return (
       <DraggableDialog
           caption={caption}
           isShow={isShow}
           commandButtons={_commandButtons}
           onShowChart={onShow}
           onClose={this._handleClose}
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
           onSelect={this._handleSelectStock}
         />

         <DatesFragment
            ref={c => this.datesFragment = c}
            initFromDate={initFromDate}
            initToDate={initToDate}
            msgOnNotValidFormat={msgOnNotValidFormat}
            onTestDate={onTestDate}
         />
         <ValidationMessages
            validationMessages={validationMessages}
         />
      </DraggableDialog>
    );
  }
}

DialogType3.displayName = 'DialogType3';

export default DialogType3;

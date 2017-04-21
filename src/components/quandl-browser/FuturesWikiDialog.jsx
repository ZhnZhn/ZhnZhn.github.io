import React, { Component } from 'react';

import DraggableDialog from '../zhn-moleculs/DraggableDialog';
import ToolbarButtonCircle from '../dialogs/ToolbarButtonCircle';
import SelectParentChild from '../dialogs/SelectParentChild';
import RowInputSelect from '../dialogs/RowInputSelect';
import RowDate from '../dialogs/RowDate';
import ActionButton from '../zhn/ActionButton';
import ValidationMessages from '../zhn/ValidationMessages';

import withValidationLoad from '../dialogs/decorators/withValidationLoad';

const typeOptions = [
  { caption: 'Continuous Contract #1', value: 1 },
  { caption: 'Continuous Contract #2', value: 2 },
  { caption: 'Continuous Contract #3', value: 3 },
  { caption: 'Continuous Contract #4', value: 4 },
  { caption: 'Continuous Contract #5', value: 5 }
]

@withValidationLoad
class FuturesWikiDialog extends Component {
  constructor(props){
    super()
    this.type = undefined
    this.toolbarButtons = [
      { caption: 'I', onClick: this._handleClickInfo }
    ]
    this.state = {
      validationMessages : []
    }
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
    const { descrUrl, onClickInfo } = this.props;
    onClickInfo({ descrUrl })
  }

  _handleSelectType = (type) => {
    this.type = type
  }

  _handleLoad = () => {
    this._handleWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    )
  }
  _createValidationMessages = () => {
    const { msgOnNotSelected, msgOnNotValidFormat, isContinious } = this.props
    let   msg = [];

    const { isValid:isValid1, msg:msg1 } = this.exchangeItem.getValidation();
    if (!isValid1) { msg = msg.concat(msg1); }

    if (!this.type) { msg.push(msgOnNotSelected('Type')); }

    if (isContinious && !this.fromDate.isValid()){
      msg.push(msgOnNotValidFormat('From Date'));
    }

    msg.isValid = (msg.length === 0) ? true : false;
    return msg;
  }
  _createLoadOption = () => {
    const { parent:exchange, child:item } = this.exchangeItem.getValues()
        , { isContinious } = this.props
        , fromDate = (isContinious)
              ? this.fromDate.getValue()
              : undefined ;
    return this.props.loadFn(
      this.props,
      { exchange, item , type : this.type, fromDate }
    );
  }

  _handleClose = () => {
    this._handleWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  }

  _renderFromDate = (initFromDate, onTestDate, msgTestDate) => {
    return (
       <RowDate
          ref={ c => this.fromDate = c}
          labelTitle="From Date:"
          initValue={initFromDate}
          errorMsg={msgTestDate}
          onTestDate={onTestDate}
       />
    );
  }

  render(){
    const {
            isShow, caption, onShow,
            futuresURI, msgOnNotSelected,
            isContinious, initFromDate, onTestDateOrEmpty, msgTestDateOrEmpty
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

           <SelectParentChild
               ref={c => this.exchangeItem = c}
               isShow={isShow}
               uri={futuresURI}
               parentCaption="Exchange"
               parentOptionNames="Exchanges"
               parentJsonProp="futures"
               childCaption="Asset"
               msgOnNotSelected={msgOnNotSelected}
           />
           <RowInputSelect
              caption="Type"
              options={typeOptions}
              onSelect={this._handleSelectType}
           />
           {isContinious && this._renderFromDate(initFromDate, onTestDateOrEmpty, msgTestDateOrEmpty)}
           <ValidationMessages
              validationMessages={validationMessages}
           />
      </DraggableDialog>
    );
  }
}

export default FuturesWikiDialog

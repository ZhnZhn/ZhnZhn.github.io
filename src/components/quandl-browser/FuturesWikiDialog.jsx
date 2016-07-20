import React from 'react';

import ZhDialog from '../ZhDialog';
import WithValidation from '../dialogs/WithValidation';
import ToolbarButtonCircle from '../dialogs/ToolbarButtonCircle';
import SelectParentChild from '../dialogs/SelectParentChild';
import RowInputSelect from '../dialogs/RowInputSelect';
import RowDate from '../dialogs/RowDate';
import ToolBarButton from '../ToolBarButton';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

const typeOptions = [
  { caption: 'Continuous Contract #1', value: 1 },
  { caption: 'Continuous Contract #2', value: 2 },
  { caption: 'Continuous Contract #3', value: 3 },
  { caption: 'Continuous Contract #4', value: 4 },
  { caption: 'Continuous Contract #5', value: 5 }  
]

const Futures3Dialog = React.createClass({
  ...WithValidation,

  getInitialState(){
    this.type = null;

    this.toolbarButtons = [
      { caption: 'I', onClick: this._handlerClickInfo }
    ];

    return {
      validationMessages : []
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
    const { descrUrl, onClickInfo } = this.props;
    onClickInfo({ descrUrl });
  },

  _handlerSelectType(type){
    this.type = type;
  },

  _handlerLoad(){
    this._handlerWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  },
  _createValidationMessages(){
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
  },
  _createLoadOption(){
    const { parent:exchange, child:item } = this.exchangeItem.getValues()
        , { fnValue, columnName, dataColumn, loadId, isContinious } = this.props
        , _subtitle = (columnName)
              ? `${this.type.caption}:${columnName}`
              : `${this.type.caption}`
        , _fromDate = (isContinious)
              ? this.fromDate.getValue()
              : undefined  ;
    return {
       value : fnValue(exchange.value, item.value, this.type.value ),
       title : `${exchange.caption}:${item.caption}`,
       subtitle : _subtitle,
       columnName : columnName,
       dataColumn : dataColumn,
       loadId : loadId,
       fromDate : _fromDate
    };
  },

  _handlerClose(){
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },

  _renderFromDate(initFromDate, onTestDate, msgTestDate){
    return (
       <RowDate
          ref={ c => this.fromDate = c}
          labelTitle="From Date:"
          initValue={initFromDate}
          errorMsg={msgTestDate}
          onTestDate={onTestDate}
       />
    );
  },

  render(){
    const {
            isShow, caption, onShow,
            futuresURI, msgOnNotSelected,
            isContinious, initFromDate, onTestDateOrEmpty, msgTestDateOrEmpty
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
              onSelect={this._handlerSelectType}
           />
           {isContinious && this._renderFromDate(initFromDate, onTestDateOrEmpty, msgTestDateOrEmpty)}
           <ValidationMessagesFragment
              validationMessages={validationMessages}
           />

      </ZhDialog>
    );
  }
});

export default Futures3Dialog;

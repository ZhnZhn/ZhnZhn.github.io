import React from 'react';

import createLoadOptions from '../../flux/creaters/futures3'

import DraggableDialog from '../zhn-moleculs/DraggableDialog';
import WithValidation from '../dialogs/WithValidation';
import ToolbarButtonCircle from '../dialogs/ToolbarButtonCircle';
import SelectParentChild from '../dialogs/SelectParentChild';
import RowInputSelect from '../dialogs/RowInputSelect';
import RowDate from '../dialogs/RowDate';
import ActionButton from '../zhn/ActionButton';
import ValidationMessages from '../zhn/ValidationMessages';

const yearOptions = [
  { caption: '2017', value: 2017 },
  { caption: '2016', value: 2016 },
  { caption: '2015', value: 2015 },
  { caption: '2014', value: 2014 },
  { caption: '2013', value: 2013 },
  { caption: '2012', value: 2012 }
]

const Futures3Dialog = React.createClass({
  ...WithValidation,

  getInitialState(){
    this.year = undefined;
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
    const {descrUrl, onClickInfo} = this.props;
    onClickInfo({ descrUrl });
  },

  _handlerSelectYear(year){
    this.year = year;
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

    const { isValid:isValid1, msg:msg1 } = this.itemMonth.getValidation();
    if (!isValid1) { msg = msg.concat(msg1); }

    if (!this.year) { msg.push(msgOnNotSelected('Year')); }

    if (isContinious && !this.fromDate.isValid()){
      msg.push(msgOnNotValidFormat('From Date'));
    }

    msg.isValid = (msg.length === 0) ? true : false;
    return msg;
  },
  _createLoadOption(){
    const { parent:item, child:month } = this.itemMonth.getValues()
        , { isContinious } = this.props
        , fromDate = (isContinious)
              ? this.fromDate.getValue()
              : undefined ;
        /*
        , { fnValue, columnName, dataColumn, seriaColumnNames, loadId, isContinious } = this.props
        , _subtitle = (columnName)
              ? `${month.caption}:${this.year.caption}:${columnName}`
              : `${month.caption}:${this.year.caption}`
        , _fromDate = (isContinious)
              ? this.fromDate.getValue()
              : undefined  ;
        */

    return createLoadOptions(
      this.props,
      { item, month, year : this.year, fromDate }
    )
    /*
    return {
       value : fnValue(item.value, month.value, this.year.value ),
       title : item.caption,
       subtitle : _subtitle,
       columnName : columnName,
       dataColumn : dataColumn,
       loadId : loadId,
       fromDate : _fromDate,
       seriaColumnNames : seriaColumnNames
    };*/
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
             <ActionButton
                key="a"
                type="TypeC"
                caption="Load"
                onClick={this._handlerLoad}
             />
         ];

    return (
      <DraggableDialog
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
               ref={c => this.itemMonth = c}
               isShow={isShow}
               uri={futuresURI}
               parentCaption="Futures"
               parentOptionNames="Futures"
               parentJsonProp="futures"
               childCaption="Month"
               msgOnNotSelected={msgOnNotSelected}
           />
           <RowInputSelect
              caption="Year"
              options={yearOptions}
              onSelect={this._handlerSelectYear}
           />
           {isContinious && this._renderFromDate(initFromDate, onTestDateOrEmpty, msgTestDateOrEmpty)}
           <ValidationMessages
              validationMessages={validationMessages}
           />

      </DraggableDialog>
    );
  }
});

export default Futures3Dialog;

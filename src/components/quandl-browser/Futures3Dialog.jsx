import React, { Component } from 'react';

import DraggableDialog from '../zhn-moleculs/DraggableDialog';
import ToolbarButtonCircle from '../dialogs/ToolbarButtonCircle';
import SelectParentChild from '../dialogs/SelectParentChild';
import RowInputSelect from '../dialogs/RowInputSelect';
import RowDate from '../dialogs/RowDate';
import Button from '../dialogs/Button';
import ValidationMessages from '../zhn/ValidationMessages';

import withValidationLoad from '../dialogs/decorators/withValidationLoad';

const yearOptions = [
  { caption: '2017', value: 2017 },
  { caption: '2016', value: 2016 },
  { caption: '2015', value: 2015 },
  { caption: '2014', value: 2014 },
  { caption: '2013', value: 2013 },
  { caption: '2012', value: 2012 }
]

@withValidationLoad
class Futures3Dialog extends Component {

  constructor(props){
    super()
    this.year = undefined
    this.toolbarButtons = [
      {
        caption: 'I', title: 'Information About Dataset',
        onClick: this._handleClickInfo
      }
    ]
    this._commandButtons = [
      <Button.Load onClick={this._handleLoad} />
    ];
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

  _handleSelectYear = (year) => {
    this.year = year
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

    const { isValid:isValid1, msg:msg1 } = this.itemMonth.getValidation();
    if (!isValid1) { msg = msg.concat(msg1); }

    if (!this.year) { msg.push(msgOnNotSelected('Year')); }

    if (isContinious && !this.fromDate.isValid()){
      msg.push(msgOnNotValidFormat('From Date'));
    }

    msg.isValid = (msg.length === 0) ? true : false;
    return msg;
  }

  _createLoadOption = () => {
    const { parent:item, child:month } = this.itemMonth.getValues()
        , { isContinious } = this.props
        , fromDate = (isContinious)
              ? this.fromDate.getValue()
              : undefined ;
    return this.props.loadFn(
      this.props,
      { item, month, year : this.year, fromDate }
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
        , { validationMessages } = this.state;

    return (
      <DraggableDialog
         caption={caption}
         isShow={isShow}
         commandButtons={this._commandButtons}
         onShowChart={onShow}
         onClose={this._handleClose}
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
              onSelect={this._handleSelectYear}
           />
           {isContinious && this._renderFromDate(initFromDate, onTestDateOrEmpty, msgTestDateOrEmpty)}
           <ValidationMessages
              validationMessages={validationMessages}
           />
      </DraggableDialog>
    );
  }
}

export default Futures3Dialog

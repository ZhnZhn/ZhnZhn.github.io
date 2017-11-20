import React, { Component } from 'react';

import D from '../dialogs/DialogCell'
import Decor from '../dialogs/decorators/Decorators'

const yearOptions = [
  { caption: '2017', value: 2017 },
  { caption: '2016', value: 2016 },
  { caption: '2015', value: 2015 },
  { caption: '2014', value: 2014 },
  { caption: '2013', value: 2013 },
  { caption: '2012', value: 2012 }
]

@Decor.withToolbar
@Decor.withValidationLoad
class Futures3Dialog extends Component {

  constructor(props){
    super()
    this.year = undefined
    this.toolbarButtons = this._createType2WithToolbar(
      props, { noDate: true}
    )
    this._commandButtons = [
      <D.Button.Load onClick={this._handleLoad} />
    ];
    this.state = {
      isShowLabels: true,
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
    this._handleWithValidationClose()
  }

  render(){
    const {
            isShow, caption, onShow, onFront,
            futuresURI, msgOnNotSelected,
            isContinious, initFromDate, onTestDateOrEmpty, msgTestDateOrEmpty
          } = this.props
        , {
            isShowLabels,
            validationMessages
          } = this.state;

    return (
      <D.DraggableDialog
         caption={caption}
         isShow={isShow}
         commandButtons={this._commandButtons}
         onShowChart={onShow}
         onFront={onFront}
         onClose={this._handleClose}
       >
           <D.ToolbarButtonCircle
              buttons={this.toolbarButtons}
           />
           <D.SelectParentChild
               ref={c => this.itemMonth = c}
               isShow={isShow}
               isShowLabels={isShowLabels}
               uri={futuresURI}
               parentCaption="Futures"
               parentOptionNames="Futures"
               parentJsonProp="futures"
               childCaption="Month"
               msgOnNotSelected={msgOnNotSelected}
           />
           <D.RowInputSelect
              isShowLabels={isShowLabels}
              caption="Year"
              options={yearOptions}
              onSelect={this._handleSelectYear}
           />
           {
              isContinious &&
              <D.RowDate
                 ref={ c => this.fromDate = c}
                 isShowLabels={isShowLabels}
                 labelTitle="From Date:"
                 initValue={initFromDate}
                 errorMsg={msgTestDateOrEmpty}
                 onTestDate={onTestDateOrEmpty}
              />
            }
           <D.ValidationMessages
              validationMessages={validationMessages}
           />
      </D.DraggableDialog>
    );
  }
}

export default Futures3Dialog

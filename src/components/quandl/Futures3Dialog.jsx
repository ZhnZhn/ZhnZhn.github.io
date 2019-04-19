import React, { Component } from 'react';

import D from '../dialogs/DialogCell'
import crMenuMore from '../dialogs/MenuMore'
import Decor from '../dialogs/decorators/Decorators'

const yearOptions = [
  { caption: '2019', value: 2019 },
  { caption: '2018', value: 2018 },
  { caption: '2017', value: 2017 },
  { caption: '2016', value: 2016 },
  { caption: '2015', value: 2015 },
  { caption: '2014', value: 2014 },
  { caption: '2013', value: 2013 },
  { caption: '2012', value: 2012 }
]

@Decor.withToolbar
@Decor.withValidationLoad
@Decor.withLoad
class Futures3Dialog extends Component {

  constructor(props){
    super()
    this.year = undefined

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })

    this.toolbarButtons = this._createType2WithToolbar(
      props, { noDate: true }
    )
    this._commandButtons = this._crCommandsWithLoad(this)

    this.state = {
      isToolbar: true,
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
    const { one:item, two:month } = this.itemMonth.getValues()
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

  _refItemMonth = c => this.itemMonth = c
  _refFromDate  = c => this.fromDate = c

  render(){
    const {
            isShow, caption, onShow, onFront,
            futuresURI, msgOnNotSelected,
            isContinious, initFromDate, onTestDateOrEmpty, msgTestDateOrEmpty
          } = this.props
        , {
            isToolbar,
            isShowLabels,
            validationMessages
          } = this.state;

    return (
      <D.DraggableDialog
         isShow={isShow}
         caption={caption}
         menuModel={this._menuMore}
         commandButtons={this._commandButtons}
         onShowChart={onShow}
         onFront={onFront}
         onClose={this._handleClose}
       >
           <D.Toolbar
              isShow={isToolbar}
              buttons={this.toolbarButtons}
           />
           <D.SelectOneTwo
               ref={this._refItemMonth}
               isShow={isShow}
               isShowLabels={isShowLabels}
               uri={futuresURI}
               oneCaption="Futures"
               oneOptionNames="Futures"
               oneJsonProp="futures"
               twoCaption="Month"
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
                 ref={this._refFromDate}
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

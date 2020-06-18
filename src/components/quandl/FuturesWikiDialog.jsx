import React, { Component } from 'react';

import D from '../dialogs/DialogCell'
const { Decor, crMenuMore } = D

const typeOptions = [
  { caption: 'Continuous Contract #1', value: 1 },
  { caption: 'Continuous Contract #2', value: 2 },
  { caption: 'Continuous Contract #3', value: 3 },
  { caption: 'Continuous Contract #4', value: 4 },
  { caption: 'Continuous Contract #5', value: 5 }
]

@Decor.dialog
class FuturesWikiDialog extends Component {
  constructor(props){
    super(props)
    //this.type = undefined

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })

    this.toolbarButtons = this._createType2WithToolbar(
      props, { noDate: true }
    )
    this._refExchangeItem = React.createRef()
    this._refFromDate = React.createRef()
    this._commandButtons = this._crCommandsWithLoad(this)

    this.state = {
      ...this._isWithInitialState()
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
    const { msgOnNotSelected, msgOnNotValidFormat, isFd } = this.props
    let   msg = [];

    const { isValid:isValid1, msg:msg1 } = this._refExchangeItem.current.getValidation();
    if (!isValid1) { msg = msg.concat(msg1); }

    if (!this.type) { msg.push(msgOnNotSelected('Type')); }

    if (isFd && !this._refFromDate.current.isValid()){
      msg.push(msgOnNotValidFormat('From Date'));
    }

    msg.isValid = msg.length === 0
      ? true : false;
    return msg;
  }
  _createLoadOption = () => {
    const { one:exchange, two:item } = this._refExchangeItem.current.getValues()
    , fromDate = this.props.isFd
        ? this._refFromDate.current.getValue()
        : void 0;
    return this.props.loadFn(
      this.props,
      { exchange, item , type: this.type, fromDate }
    );
  }

  _handleClose = () => {
    this._handleWithValidationClose()
  }

  render(){
    const {
            isShow, caption, onShow, onFront,
            futuresURI, msgOnNotSelected,
            isFd, initFromDate, isYmdOrEmpty, errNotYmdOrEmpty
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
               ref={this._refExchangeItem}
               isShow={isShow}
               isShowLabels={isShowLabels}
               uri={futuresURI}
               oneCaption="Exchange"
               oneOptionNames="Exchanges"
               oneJsonProp="futures"
               twoCaption="Asset"
               msgOnNotSelected={msgOnNotSelected}
           />
           <D.RowInputSelect
              isShowLabels={isShowLabels}
              caption="Type"
              options={typeOptions}
              onSelect={this._handleSelectType}
           />
           {
             isFd &&
             <D.RowDate
                innerRef={this._refFromDate}
                isShowLabels={isShowLabels}
                labelTitle="From Date:"
                initValue={initFromDate}
                errorMsg={errNotYmdOrEmpty}
                onTestDate={isYmdOrEmpty}
             />
           }
           <D.ValidationMessages
              validationMessages={validationMessages}
           />
      </D.DraggableDialog>
    );
  }
}

export default FuturesWikiDialog

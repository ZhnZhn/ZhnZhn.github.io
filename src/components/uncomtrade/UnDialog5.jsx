import React, { Component } from 'react';

import D from '../dialogs/DialogCell'
import Decor from '../dialogs/decorators/Decorators'
import crMenuMore from '../dialogs/MenuMore'

const TRADE_FLOW = [
  { caption: "Export Value", value: { rg: 2, measure: "TradeValue" } },
  { caption: "Export Weight or Quantity", value: { rg: 2, measure: "NetWeight" } },
  { caption: "Export Average Price", value: { rg: 2, measure: "avgPrice" } },
  { caption: "Import Value", value: { rg: 1, measure: "TradeValue" } },
  { caption: "Import Weight or Quantity", value: { rg: 1, measure: "NetWeight" } },
  { caption: "Import Average Price", value: { rg: 1, measure: "avgPrice" } }
];

@Decor.withToolbar
@Decor.withValidationLoad
class  UnDialog5 extends Component {

  constructor(props){
    super()

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })

    this.toolbarButtons = this._createType2WithToolbar(props)
    this.toolbarButtons.push({
      caption: 'O', title: 'Toggle Options Input',
      onClick: this._handleClickOptions
    })
    this._commandButtons = [
      <D.Button.Load onClick={this._handleLoad} />
    ]
    this.state = {
      isToolbar: true,
      isShowLabels: true,
      isShowDate: false,
      isShowOptions: false,
      validationMessages: []
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

  _handleClickOptions = () => {
    this.setState({
      isShowOptions: !this.state.isShowOptions
    })
  }

  _handleSelectOne = (one) => {
    this.one = one;
  }
  _handleSelectTradeFlow = (tradeFlow) => {
    this.tradeFlow = tradeFlow
  }

  _handleLoad = () => {
    this._handleWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  }
  _createValidationMessages = () => {
     let msg = [];

     const {
             isValid:isValid1, msg:msg1
           } = this.parentChild.getValidation();
     if (!isValid1) { msg = msg.concat(msg1); }

     const {isValid, datesMsg} = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  }

  _createLoadOption = () => {
    const { parent:two, child:three } = this.parentChild.getValues()

    return this.props.loadFn(
      this.props, {
      one : this.one, two, three,
      tradeFlow: this.tradeFlow
      //hasSecondYAxis: this[HAS_SECOND_Y_AXIS]
    });
  }

  _handleClose = () => {
    this._handleWithValidationClose()
  }

  _handleMode = (propName, value) => {
     this[propName] = value
  }

  _refItems = c => this.parentChild = c
  _refDates = c => this.datesFragment = c

  render(){
    const {
           caption, isShow, onShow, onFront,
           oneCaption, oneURI, oneJsonProp,
           twoCaption, twoURI, twoJsonProp, threeCaption, msgOnNotSelected,
           initFromDate, initToDate, nForecastDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , {
            isToolbar,
            isShowLabels,
            isShowDate, isShowOptions,
            validationMessages
          } = this.state;

    return(
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
             <D.SelectWithLoad
               isShow={isShow}
               isShowLabels={isShowLabels}
               uri={oneURI}
               jsonProp={oneJsonProp}
               caption={oneCaption}
               placeholder="Default: All"
               onSelect={this._handleSelectOne}
             />

             <D.SelectParentChild
                 ref={this._refItems}
                 isShow={isShow}
                 isShowLabels={isShowLabels}
                 uri={twoURI}
                 parentCaption={twoCaption}
                 parentOptionNames="Items"
                 parentJsonProp={twoJsonProp}
                 childCaption={threeCaption}
                 msgOnNotSelected={msgOnNotSelected}
             />

             <D.ShowHide isShow={isShowDate}>
               <D.DatesFragment
                 ref={this._refDates}
                 isShowLabels={isShowLabels}
                 initFromDate={initFromDate}
                 initToDate={initToDate}
                 nForecastDate={nForecastDate}
                 msgOnNotValidFormat={msgOnNotValidFormat}
                 onTestDate={onTestDate}
               />
             </D.ShowHide>
             <D.ShowHide isShow={isShowOptions}>
               <D.RowInputSelect
                 isShowLabels={isShowLabels}
                 caption="Trade Flow"
                 options={TRADE_FLOW}
                 placeholder="Default: Export Value"
                 onSelect={this._handleSelectTradeFlow}
               />
             </D.ShowHide>
             <D.ValidationMessages
                 validationMessages={validationMessages}
             />
        </D.DraggableDialog>
    );
  }
}

export default UnDialog5

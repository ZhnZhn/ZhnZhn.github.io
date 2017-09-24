import React, { Component } from 'react';

import DraggableDialog from '../zhn-moleculs/DraggableDialog';
import ToolbarButtonCircle from '../dialogs/ToolbarButtonCircle';
import SelectWithLoad from '../dialogs/SelectWithLoad';
import SelectParentChild from '../dialogs/SelectParentChild';
import RowInputSelect from '../dialogs/RowInputSelect';
import Button from '../dialogs/Button';

import DatesFragment from '../zhn-moleculs/DatesFragment';
import ValidationMessages from '../zhn/ValidationMessages';
import ShowHide from '../zhn/ShowHide';

import withToolbar from '../dialogs/decorators/withToolbar';
import withValidationLoad from '../dialogs/decorators/withValidationLoad'

const TRADE_FLOW = [
  { caption: "Export Value", value: { rg: 2, measure: "TradeValue" } },
  { caption: "Export Weight", value: { rg: 2, measure: "NetWeight" } },
  { caption: "Export Average Price", value: { rg: 2, measure: "avgPrice" } },
  { caption: "Import Value", value: { rg: 1, measure: "TradeValue" } },
  { caption: "Import Weight", value: { rg: 1, measure: "NetWeight" } },
  { caption: "Import Average Price", value: { rg: 1, measure: "avgPrice" } }
]

@withToolbar
@withValidationLoad
class  UnDialog5 extends Component {

  constructor(props){
    super()
    this.toolbarButtons = this._createType2WithToolbar(props)
    this.toolbarButtons.push({
      caption: 'O', title: 'Toggle Options Input',
      onClick: this._handleClickOptions
    })
    this._commandButtons = [
      <Button.Load onClick={this._handleLoad} />
    ]
    this.state = {
      isShowDate : false,
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
    this.setState({ isShowOptions: !this.state.isShowOptions })
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
     //const { oneCaption } = this.props;
     let msg = [];

     //if (!this.one)    { msg.push(this.props.msgOnNotSelected(oneCaption));}

     const { isValid:isValid1, msg:msg1 } = this.parentChild.getValidation();
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
    this._handleWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  }

  _handleMode = (propName, value) => {
     this[propName] = value
  }

  render(){
    const {
           caption, isShow, onShow, onFront,
           oneCaption, oneURI, oneJsonProp,
           twoCaption, twoURI, twoJsonProp, threeCaption, msgOnNotSelected,
           initFromDate, initToDate, nForecastDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , { isShowDate, isShowOptions, validationMessages } = this.state;

    return(
        <DraggableDialog
             caption={caption}
             isShow={isShow}
             commandButtons={this._commandButtons}
             onShowChart={onShow}
             onFront={onFront}
             onClose={this._handleClose}
         >
             <ToolbarButtonCircle
                buttons={this.toolbarButtons}
             />
             <SelectWithLoad
               isShow={isShow}
               uri={oneURI}
               jsonProp={oneJsonProp}
               caption={oneCaption}
               //optionNames="Items"
               placeholder="Default: All"
               onSelect={this._handleSelectOne}
             />

             <SelectParentChild
                 ref={c => this.parentChild = c}
                 isShow={isShow}
                 uri={twoURI}
                 parentCaption={twoCaption}
                 parentOptionNames="Items"
                 parentJsonProp={twoJsonProp}
                 childCaption={threeCaption}
                 msgOnNotSelected={msgOnNotSelected}
             />

             <ShowHide isShow={isShowDate}>
               <DatesFragment
                 ref={c => this.datesFragment = c}
                 initFromDate={initFromDate}
                 initToDate={initToDate}
                 nForecastDate={nForecastDate}
                 msgOnNotValidFormat={msgOnNotValidFormat}
                 onTestDate={onTestDate}
               />
             </ShowHide>
             <ShowHide isShow={isShowOptions}>
               <RowInputSelect
                 caption="Trade Flow"
                 options={TRADE_FLOW}
                 placeholder="Default: Export Value"
                 onSelect={this._handleSelectTradeFlow}
               />
             </ShowHide>
             <ValidationMessages
                 validationMessages={validationMessages}
             />
        </DraggableDialog>
    );
  }
}

export default UnDialog5

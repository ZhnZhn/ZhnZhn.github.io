import React, { Component } from 'react';
//import PropTypes from "prop-types";

import D from './DialogCell'
import Decor from './decorators/Decorators'

const transformOptions = [
  { caption: "NO EFFECT: z[t]=y[t]", value: "none" },
  { caption: "ROW-ON-ROW CHANGE: z[t]=y[t]–y[t-1]", value: "diff" },
  { caption: "ROW-ON-ROW % CHANGE: z[t]=(y[t]–y[t-1])/y[t-1]", value: "rdiff" },
  { caption: "LATEST VALUE AS % INCREMENT: z[t]=(y[latest]–y[t])/y[t]", value: "rdiff_from" },
  { caption: "SCALE SERIES TO START AT 100: z[t]=y[t]÷y[0]*100", value: "normalize" }
];

@Decor.withToolbar
@Decor.withValidationLoad
class DialogType3 extends Component {
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,
    itemCaption: PropTypes.string,
    optionURI: PropTypes.string,
    optionsJsonProp: PropTypes.string,
    optionNames: PropTypes.string,
    initFromDate: PropTypes.string,
    initToDate: PropTypes.string,
    msgOnNotValidFormat: PropTypes.func,
    onTestDate: PropTypes.func,
    onShow: PropTypes.func,

    descrUrl: PropTypes.string,
    isTransform: PropTypes.bool,
    onClickInfo: PropTypes.func,
    loadFn: PropTypes.func
  }
  */

  constructor(props){
    super(props);

    this.stock = undefined
    this.transform = undefined
    this.toolbarButtons = this._createType2WithToolbar(props)
    if (props.isTransform){
      this.toolbarButtons.push({
        caption: 'T', onClick: this._handleClickTransform
      })
    }
    this._commandButtons = [
      <D.Button.Load onClick={this._handleLoad} />
    ]
    this.state = {
       isShowLabels: true,
       isShowDate: true,
       isShowTransform: false,
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

  _handleClickTransform = () => {
    this.setState(prevState => {
      return { isShowTransform: !prevState.isShowTransform };
    })
  }
  _handleSelectTransform = (option) => {
    this.transform = option
  }

  _handleSelectStock = (stock) => {
    this.stock = stock
  }

  _handleLoad = () => {
    //event.target.focus();
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
    return this.props.loadFn(
      this.props,
      { stock : this.stock, fromDate, toDate, transform: this.transform }
    );
  }

  _handleClose = () => {
    this._handleWithValidationClose()    
  }

  render(){
    const {
            caption, isShow, onShow, onFront,
            optionURI, optionsJsonProp,
            itemCaption='Stock', optionNames='Stocks',
            isWithInputStock,
            initFromDate, initToDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , {
            isShowLabels, isShowTransform, isShowDate,
            validationMessages
          } = this.state;

    return (
       <D.DraggableDialog
           isShow={isShow}
           caption={caption}
           commandButtons={this._commandButtons}
           onShowChart={onShow}
           onFront={onFront}
           onClose={this._handleClose}
       >
         <D.ToolbarButtonCircle
           buttons={this.toolbarButtons}
         />
         <D.SelectWithLoad
           isShow={isShow}
           isShowLabels={isShowLabels}
           uri={optionURI}
           jsonProp={optionsJsonProp}
           caption={itemCaption}
           optionNames={optionNames}
           isWithInput={isWithInputStock}
           onSelect={this._handleSelectStock}
         />
         <D.ShowHide isShow={isShowTransform}>
           <D.RowInputSelect
             isShowLabels={isShowLabels}
             caption="Transform"
             options={transformOptions}
             onSelect={this._handleSelectTransform}
           />
         </D.ShowHide>
         <D.ShowHide isShow={isShowDate}>
           <D.DatesFragment
              ref={c => this.datesFragment = c}
              isShowLabels={isShowLabels}
              initFromDate={initFromDate}
              initToDate={initToDate}
              msgOnNotValidFormat={msgOnNotValidFormat}
              onTestDate={onTestDate}
           />
         </D.ShowHide>
         <D.ValidationMessages
            validationMessages={validationMessages}
         />
      </D.DraggableDialog>
    );
  }
}

export default DialogType3

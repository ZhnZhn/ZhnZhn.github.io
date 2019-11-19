import React, { Component } from 'react';
//import PropTypes from "prop-types";

import D from './DialogCell'
import crMenuMore from './MenuMore'
import Decor from './decorators/Decorators'

const DF_TIMEOUT = 4000;

const transformOptions = [
  { caption: "NO EFFECT: z[t]=y[t]", value: "none" },
  { caption: "ROW-ON-ROW CHANGE: z[t]=y[t]–y[t-1]", value: "diff" },
  { caption: "ROW-ON-ROW % CHANGE: z[t]=(y[t]–y[t-1])/y[t-1]", value: "rdiff" },
  { caption: "LATEST VALUE AS % INCREMENT: z[t]=(y[latest]–y[t])/y[t]", value: "rdiff_from" },
  { caption: "SCALE SERIES TO START AT 100: z[t]=y[t]÷y[0]*100", value: "normalize" }
];


@Decor.dialog
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

  static defaultProps = {
    itemCaption: 'Stock',
    optionNames: 'Stocks'
  }

  constructor(props){
    super(props);

    //this.one = undefined
    //this.transform = undefined
    this.isLoaded = false

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })

    const { noDate, isTransform } = props;
    this.toolbarButtons = this._createType2WithToolbar(
       props, { noDate }
    )
    if (isTransform){
      this.toolbarButtons.push({
        caption: 'T', onClick: this._handleClickTransform
      })
    }
    this._commandButtons = this._crCommandsWithLoad(this)


    this.state = {
       ...this._isWithInitialState(),
       isShowTransform: false
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
    this.setState(prevState => ({
      isShowTransform: !prevState.isShowTransform
    }))
  }
  _handleSelectTransform = (option) => {
    this.transform = option
  }

  _clearLoaded = (one) => {
    if (this.isLoaded && this.one === one) {
      this.isLoaded = false
    }
  }
  _handleSelectStock = (one) => {
    if (one && this.one === one && !this.isLoaded) {
      this._handleLoad()
      this.isLoaded = true
      setTimeout(this._clearLoaded, DF_TIMEOUT, one)
    } else {
      this.one = one
      this.isLoaded = false
    }
  }

  _handleLoad = () => {
    //event.target.focus();
    this._handleWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  }
  _createValidationMessages = () => {
    const {
            msgOnNotSelected, oneCaption, itemCaption,
          } = this.props;
    let msg = [];

    if (!this.one) {
      msg.push(msgOnNotSelected(oneCaption || itemCaption));
    }

    if (this.datesFragment) {
       const {
               isValid, datesMsg
             } = this.datesFragment.getValidation();
       if (!isValid) {
         msg = msg.concat(datesMsg);
       }
    }

    msg.isValid = (msg.length === 0)
         ? true
         : false;
    return msg;
  }

  _createLoadOption = () => {
    const { fromDate, toDate } = this.datesFragment
              ? this.datesFragment.getValues()
              : {};
    return this.props.loadFn(
      this.props, {
        one: this.one,
        fromDate, toDate,
        transform: this.transform
      }
    );
  }

  _handleClose = () => {
    this._handleWithValidationClose()
  }

  render(){
    const {
            caption, isShow, onShow, onFront,
            oneURI, optionURI, optionsJsonProp,
            oneCaption, itemCaption, optionNames,
            onePlaceholder,
            isWithInputStock,
            noDate,
            initFromDate, initToDate,
            msgOnNotValidFormat, onTestDate
          } = this.props
        , _oneCaption = oneCaption || itemCaption
        , _oneURI = oneURI || optionURI
        , {
            isToolbar,
            isShowLabels, isShowTransform, isShowDate,
            validationMessages
          } = this.state;

    return (
       <D.DraggableDialog
           isShow={isShow}
           menuModel={this._menuMore}
           caption={caption}
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
           placeholder={onePlaceholder}
           uri={_oneURI}
           jsonProp={optionsJsonProp}
           caption={_oneCaption}
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
         {
           !noDate &&
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
         }
         <D.ValidationMessages
            validationMessages={validationMessages}
         />
      </D.DraggableDialog>
    );
  }
}

export default DialogType3

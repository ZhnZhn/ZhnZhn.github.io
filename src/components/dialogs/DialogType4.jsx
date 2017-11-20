import React, { Component } from 'react';
//import PropTypes from "prop-types";

import D from './DialogCell'
import Decor from './decorators/Decorators'

const HAS_SECOND_Y_AXIS = 'hasSecondYAxis';

@Decor.withToolbar
@Decor.withValidationLoad
class DialogType4 extends Component {
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,

    oneCaption: PropTypes.string,
    oneURI: PropTypes.string,
    oneJsonProp: PropTypes.string,
    twoCaption: PropTypes.string,
    twoURI: PropTypes.string,
    twoJsonProp: PropTypes.string,

    initFromDate: PropTypes.string,
    initToDate: PropTypes.string,
    msgOnNotValidFormat: PropTypes.func,
    onTestDate: PropTypes.func,
    onShow: PropTypes.func,

    loadFn: PropTypes.func
  }
  */

  constructor(props){
    super();
    this.one = undefined;
    this.two = undefined;
    this.toolbarButtons = this._createType2WithToolbar(props);
    this.toolbarButtons.push({
      caption: 'O', title: 'Toggle Options Input',
      onClick: this._handleClickOptions
    })
    this._commandButtons = [
      <D.Button.Load onClick={this._handleLoad} />
    ];
    this.state = {
      isShowLabels: true,
      isShowDate : true,
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
  _handleSelectTwo = (two) => {
    this.two = two;
  }

  _handleLoad = () => {
    this._handleWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  }
  _createValidationMessages = () => {
     const { oneCaption, twoCaption, msgOnNotSelected } = this.props;
     let msg = [];

     if (!this.one) { msg.push(msgOnNotSelected(oneCaption)); }
     if (!this.two) { msg.push(msgOnNotSelected(twoCaption)); }

     const {isValid, datesMsg} = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  }
  _createLoadOption = () => {
    const { fromDate, toDate } = this.datesFragment.getValues();
    return this.props.loadFn(
      this.props, {
        one : this.one, two : this.two, fromDate, toDate,
        hasSecondYAxis: this[HAS_SECOND_Y_AXIS]
      }
    );
  }

  _handleClose = () => {
    this._handleWithValidationClose()    
  }

  _handleMode = (propName, value) => {
     this[propName] = value
  }

  render(){
    const {
           caption, isShow, onShow, onFront,
           oneCaption, oneURI, oneJsonProp,
           twoCaption, twoURI, twoJsonProp, isWithInputTwo,
           initFromDate, initToDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , {
            isShowLabels, isShowDate, isShowOptions,
            validationMessages
          } = this.state;

    return(
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

             <D.SelectWithLoad
               isShow={isShow}
               isShowLabels={isShowLabels}
               uri={oneURI}
               jsonProp={oneJsonProp}
               caption={oneCaption}
               optionNames="Stocks"
               onSelect={this._handleSelectOne}
             />

             <D.SelectWithLoad
               isShow={isShow}
               isShowLabels={isShowLabels}
               uri={twoURI}
               jsonProp={twoJsonProp}
               caption={twoCaption}
               optionNames="Indicators"
               isWithInput={isWithInputTwo}
               onSelect={this._handleSelectTwo}
             />

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
             <D.ShowHide isShow={isShowOptions}>
               <D.RowCheckBox
                 initValue={false}
                 caption="Add Seria with Second YAxis"
                 onCheck={this._handleMode.bind(null, HAS_SECOND_Y_AXIS, true)}
                 onUnCheck={this._handleMode.bind(null, HAS_SECOND_Y_AXIS, false)}
               />
             </D.ShowHide>
             <D.ValidationMessages
                 validationMessages={validationMessages}
             />
        </D.DraggableDialog>
    );
  }
}

export default DialogType4

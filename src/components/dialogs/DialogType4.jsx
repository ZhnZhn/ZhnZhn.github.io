import React, { Component } from 'react';
//import PropTypes from "prop-types";

import D from './DialogCell'
const { Decor, crMenuMore } = D

const HAS_SECOND_Y_AXIS = 'hasSecondYAxis';
const CAPTION_YAXIS = 'Add Seria with Second YAxis';

@Decor.dialog
class DialogType4 extends Component {
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,

    oneCaption: PropTypes.string,
    oneNames: PropTypes.string,
    oneURI: PropTypes.string,
    oneJsonProp: PropTypes.string,

    twoCaption: PropTypes.string,
    twoNames: PropTypes.string,
    twoURI: PropTypes.string,
    twoJsonProp: PropTypes.string,

    noDate: PropTypes.bool,
    noOptions: PropTypes.bool,

    initFromDate: PropTypes.string,
    initToDate: PropTypes.string,
    msgOnNotValidFormat: PropTypes.func,
    onTestDate: PropTypes.func,
    onShow: PropTypes.func,

    loadFn: PropTypes.func
  }
  */

  constructor(props){
    super(props);

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })

    const { noDate, noOptions } = props;
    this.toolbarButtons = this._createType2WithToolbar(
      props, { noDate, isShowOptions: !noOptions  }
    );
    this._commandButtons = this._crCommandsWithLoad(this)

    this.state = {
      ...this._isWithInitialState(),
      isShowOptions: false
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


  _handleSelectOne = (one) => {
    this.one = one;
  }
  _handleSelectTwo = (two) => {
    this.two = two;
  }
  _handleSelectThree = (three) => {
    this.three = three;
  }

  _handleLoad = () => {
    this._handleWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  }
  _createValidationMessages = () => {
     const {
             oneCaption,
             twoCaption,
             threeURI, threeCaption,
             msgOnNotSelected
           } = this.props;
     let msg = [];

     if (!this.one) {
       msg.push(msgOnNotSelected(oneCaption));
     }
     if (!this.two) {
       msg.push(msgOnNotSelected(twoCaption));
     }
     if (threeURI && !this.three){
       msg.push(msgOnNotSelected(threeCaption));
     }

     if (this.datesFragment) {
       const {isValid, datesMsg} = this.datesFragment.getValidation();
       if (!isValid) { msg = msg.concat(datesMsg); }
     }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  }
  _createLoadOption = () => {
    const { fromDate, toDate } = this.datesFragment
              ? this.datesFragment.getValues()
              : {};
    return this.props.loadFn(
      this.props, {
        one: this.one,
        two: this.two,
        three: this.three,
        fromDate, toDate,
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

 _refDates = c => this.datesFragment = c

  render(){
    const {
           caption, isShow, onShow, onFront,
           oneCaption, oneNames, oneURI, oneJsonProp, isWithOneInput,
           twoCaption, twoNames, twoURI, twoJsonProp, isWithInputTwo,
           threeCaption, threeNames, threeURI, threeJsonProp, isWithInputThree,
           initFromDate, initToDate, msgOnNotValidFormat, onTestDate,
           noDate, noOptions
          } = this.props
        , {
            isToolbar,
            isShowLabels, isShowDate, isShowOptions,
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
               optionNames={oneNames}
               isWithInput={isWithOneInput}
               onSelect={this._handleSelectOne}
             />
             <D.SelectWithLoad
               isShow={isShow}
               isShowLabels={isShowLabels}
               uri={twoURI}
               jsonProp={twoJsonProp}
               caption={twoCaption}
               optionNames={twoNames}
               isWithInput={isWithInputTwo}
               onSelect={this._handleSelectTwo}
             />
             { threeURI &&
               <D.SelectWithLoad
                 isShow={isShow}
                 isShowLabels={isShowLabels}
                 uri={threeURI}
                 jsonProp={threeJsonProp}
                 caption={threeCaption}
                 optionNames={threeNames}
                 isWithInput={isWithInputThree}
                 onSelect={this._handleSelectThree}
               />
             }
             {
               (noDate !== true) &&
               <D.ShowHide isShow={isShowDate}>
                 <D.DatesFragment
                   ref={this._refDates}
                   isShowLabels={isShowLabels}
                   initFromDate={initFromDate}
                   initToDate={initToDate}
                   msgOnNotValidFormat={msgOnNotValidFormat}
                   onTestDate={onTestDate}
                 />
               </D.ShowHide>
             }
             {
               (noOptions !== true) &&
               <D.ShowHide isShow={isShowOptions}>
                 <D.RowCheckBox
                   initValue={false}
                   caption={CAPTION_YAXIS}
                   onCheck={this._handleMode.bind(null, HAS_SECOND_Y_AXIS, true)}
                   onUnCheck={this._handleMode.bind(null, HAS_SECOND_Y_AXIS, false)}
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

export default DialogType4

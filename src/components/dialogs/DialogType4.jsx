import React from 'react';

import ZhDialog from '../ZhDialog';
import WithToolbar from './WithToolbar';
import WithValidation from './WithValidation';
import ToolbarButtonCircle from './ToolbarButtonCircle';
import ToolBarButton from '../ToolBarButton';

import SelectWithLoad from './SelectWithLoad';
import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';
import ShowHide from '../zhn/ShowHide';

const DialogType4 = React.createClass({
  ...WithToolbar,
  ...WithValidation,

  getInitialState(){
    this.one = null;
    this.two = null;
    this.toolbarButtons = this._createType2WithToolbar();
    return {
      isShowDate : true,
      validationMessages: []
    }
  },

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  },

  _handlerSelectOne(one){
    this.one = one;
  },
  _handlerSelectTwo(two){
    this.two = two;
  },

  _handlerLoad(){
    this._handlerWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  },
  _createValidationMessages(){
     const { oneCaption, twoCaption, msgOnNotSelected } = this.props;
     let msg = [];

     if (!this.one) { msg.push(msgOnNotSelected(oneCaption)); }
     if (!this.two) { msg.push(msgOnNotSelected(twoCaption)); }

     const {isValid, datesMsg} = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  },
  _createLoadOption(){
    const { fromDate, toDate } = this.datesFragment.getValues()
        , { fnValue, dataColumn, loadId, isPremium } = this.props;
    return {
         value : fnValue(this.one.value, this.two.value),
         fromDate: fromDate,
         toDate: toDate,
         dataColumn : dataColumn,
         loadId : loadId,
         title : this.one.caption,
         subtitle : this.two.caption,
         isPremium : isPremium
      }
  },

  _handlerClose(){
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },

  render(){
    const {
           caption, isShow, onShow,
           oneCaption, oneURI, oneJsonProp,
           twoCaption, twoURI, twoJsonProp,
           initFromDate, initToDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , { isShowDate, validationMessages } = this.state
        , _commandButtons = [
       <ToolBarButton
          key="a"
          type="TypeC"
          caption="Load"
          onClick={this._handlerLoad}
       />
    ];

    return(
        <ZhDialog
           caption={caption}
           isShow={isShow}
           commandButtons={_commandButtons}
           onShowChart={onShow}
           onClose={this._handlerClose}
         >
             <ToolbarButtonCircle
                buttons={this.toolbarButtons}
             />

             <SelectWithLoad
               isShow={isShow}
               uri={oneURI}
               jsonProp={oneJsonProp}
               caption={oneCaption}
               optionNames={'Stocks'}
               onSelect={this._handlerSelectOne}
             />

             <SelectWithLoad
               isShow={isShow}
               uri={twoURI}
               jsonProp={twoJsonProp}
               caption={twoCaption}
               optionNames={'Indicators'}
               onSelect={this._handlerSelectTwo}
             />

             <ShowHide isShow={isShowDate}>
               <DatesFragment
                 ref={c => this.datesFragment = c}
                 initFromDate={initFromDate}
                 initToDate={initToDate}
                 msgOnNotValidFormat={msgOnNotValidFormat}
                 onTestDate={onTestDate}
               />
             </ShowHide>
             <ValidationMessagesFragment
                 validationMessages={validationMessages}
             />
        </ZhDialog>
    );
  }
});

export default DialogType4

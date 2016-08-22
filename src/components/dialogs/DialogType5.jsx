import React from 'react';

import ZhDialog from '../ZhDialog';
import WithToolbar from './WithToolbar';
import WithValidation from './WithValidation';
import ToolbarButtonCircle from './ToolbarButtonCircle';
import SelectWithLoad from './SelectWithLoad';
import SelectParentChild from './SelectParentChild';
import ToolBarButton from '../ToolBarButton';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';
import ShowHide from '../zhn/ShowHide';

const DialogType5 = React.createClass({
  ...WithToolbar,
  ...WithValidation,

  getInitialState(){
    this.one = null;
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

  _handlerLoad(){
    this._handlerWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  },
  _createValidationMessages(){
     const { oneCaption } = this.props;
     let msg = [];

     if (!this.one)    { msg.push(this.props.msgOnNotSelected(oneCaption));}

     const { isValid:isValid1, msg:msg1 } = this.parentChild.getValidation();
     if (!isValid1) { msg = msg.concat(msg1); }

     const {isValid, datesMsg} = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  },
  _createLoadOption(){
    const { parent:two, child:three } = this.parentChild.getValues()
        , { fromDate, toDate } = this.datesFragment.getValues()
        , { fnValue, fnValueType, dataColumn, loadId } = this.props;

    switch (fnValueType) {
      case 'TreeItem':
          return {
            value : fnValue(this.one.value, three.value),
            fromDate: fromDate,
            toDate: toDate,
            dataColumn : dataColumn,
            loadId : loadId,
            title : `${this.one.caption}:${two.caption}`,
            subtitle : three.caption
          }
     case 'PlusTreeItem':
         return {
           value : fnValue(this.one.value, two.value, three.value),
           fromDate: fromDate,
           toDate: toDate,
           dataColumn : dataColumn,
           loadId : loadId,
           title : `${two.caption} : ${three.caption}`,
           subtitle : this.one.caption
         }
     default:
         const _dataColumn = (three) ? three.value : 1;
         return {
           value : fnValue(this.one.value, two.value),
           fromDate: fromDate,
           toDate: toDate,
           dataColumn : _dataColumn,
           loadId : loadId,
           title : `${this.one.caption}:${two.caption}`,
           subtitle : three.caption
         }
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
           twoCaption, twoURI, twoJsonProp, threeCaption, msgOnNotSelected,
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
               optionNames={'Items'}
               onSelect={this._handlerSelectOne}
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

export default DialogType5

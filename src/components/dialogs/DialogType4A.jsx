import React from 'react';

import ZhDialog from '../ZhDialog';
import WithToolbar from './WithToolbar';
import WithValidation from './WithValidation';
import ToolbarButtonCircle from './ToolbarButtonCircle';
import SelectParentChild from './SelectParentChild';
import ToolBarButton from '../ToolBarButton';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';
import ShowHide from '../zhn/ShowHide';

const DialogType4A = React.createClass({
  ...WithToolbar,
  ...WithValidation,

  getInitialState(){
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

  _handlerLoad(){
    this._handlerWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  },
  _createValidationMessages(){
     let msg = [];

     const { isValid:isValid1, msg:msg1 } = this.parentChild.getValidation();
     if (!isValid1) { msg = msg.concat(msg1); }

     const {isValid, datesMsg} = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  },
  _createLoadOption(){
    const { parent:one, child:two } = this.parentChild.getValues()
        , { fromDate, toDate } = this.datesFragment.getValues()
        , { fnValue, dataColumn, loadId } = this.props;
    return {
         value : fnValue(one.value, two.value),
         fromDate: fromDate,
         toDate: toDate,
         dataColumn : dataColumn,
         loadId : loadId,
         title : one.caption,
         subtitle : two.caption
      }
  },
  _handlerClose(){
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },

  render(){
    const {
           caption, oneCaption, oneURI, oneJsonProp, twoCaption, msgOnNotSelected,
           isShow, onShow,
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

             <SelectParentChild
                 ref={c => this.parentChild = c}
                 isShow={isShow}
                 uri={oneURI}
                 parentCaption={oneCaption}
                 parentOptionNames="Items"
                 parentJsonProp={oneJsonProp}
                 childCaption={twoCaption}
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

export default DialogType4A

import React, { Component } from 'react';

import DraggableDialog from '../zhn-moleculs/DraggableDialog';
import ToolbarButtonCircle from './ToolbarButtonCircle';
import SelectParentChild from './SelectParentChild';
import ActionButton from '../zhn/ActionButton';

import DatesFragment from '../zhn-moleculs/DatesFragment';
import ValidationMessages from '../zhn/ValidationMessages';
import ShowHide from '../zhn/ShowHide';

import withToolbar from './decorators/withToolbar';
import withValidationLoad from './decorators/withValidationLoad';

@withToolbar
@withValidationLoad
class DialogType4A extends Component {
  state = {
    isShowDate : true,
    validationMessages: []
  }

  constructor(props){
    super();
    this.toolbarButtons = this._createType2WithToolbar(props);
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  }

  _handleLoad = () => {
    this._handleWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  }
  _createValidationMessages = () => {
     let msg = [];

     const { isValid:isValid1, msg:msg1 } = this.parentChild.getValidation();
     if (!isValid1) { msg = msg.concat(msg1); }

     const {isValid, datesMsg} = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  }
  
  _createLoadOption = () => {
    const { parent:one, child:two } = this.parentChild.getValues()
        , { fromDate, toDate } = this.datesFragment.getValues();
    return this.props.loadFn(
       this.props,
       { one, two, fromDate, toDate }
     );
  }

  _handleClose = () => {
    this._handleWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  }

  render(){
    const {
           caption, oneCaption, oneURI, oneJsonProp, twoCaption, msgOnNotSelected,
           isShow, onShow,
           initFromDate, initToDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , { isShowDate, validationMessages } = this.state
        , _commandButtons = [
       <ActionButton
          key="a"
          type="TypeC"
          caption="Load"
          onClick={this._handleLoad}
       />
    ];

    return(
        <DraggableDialog
           caption={caption}
           isShow={isShow}
           commandButtons={_commandButtons}
           onShowChart={onShow}
           onClose={this._handleClose}
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
             <ValidationMessages
                 validationMessages={validationMessages}
             />
        </DraggableDialog>
    );
  }
}

export default DialogType4A

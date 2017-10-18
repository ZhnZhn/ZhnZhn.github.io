import React, { Component } from 'react';

import D from './DialogCell'
import Decor from './decorators/Decorators'

const HAS_SECOND_Y_AXIS = 'hasSecondYAxis';

@Decor.withToolbar
@Decor.withValidationLoad
class DialogType4A extends Component {

  constructor(props){
    super()
    this.toolbarButtons = this._createType2WithToolbar(props)
    this.toolbarButtons.push({
      caption: 'O', title: 'Toggle Options Input',
      onClick: this._handleClickOptions
    })
    this[HAS_SECOND_Y_AXIS] = false
    this._commandButtons = [
      <D.Button.Load onClick={this._handleLoad} />
    ];
    this.state = {
      isShowDate: true,
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
       this.props, {
         one, two, fromDate, toDate,
         hasSecondYAxis: this[HAS_SECOND_Y_AXIS]
       }
     );
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
           caption, oneCaption, oneURI, oneJsonProp, twoCaption, msgOnNotSelected,
           isShow, onShow, onFront,
           initFromDate, initToDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , {
            isShowDate, isShowOptions, validationMessages
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

             <D.SelectParentChild
                 ref={c => this.parentChild = c}
                 isShow={isShow}
                 uri={oneURI}
                 parentCaption={oneCaption}
                 parentOptionNames="Items"
                 parentJsonProp={oneJsonProp}
                 childCaption={twoCaption}
                 msgOnNotSelected={msgOnNotSelected}
             />

             <D.ShowHide isShow={isShowDate}>
               <D.DatesFragment
                 ref={c => this.datesFragment = c}
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

export default DialogType4A

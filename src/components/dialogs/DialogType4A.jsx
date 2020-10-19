import { Component } from 'react';

import D from './DialogCell'
const { Decor, crMenuMore } = D

const HAS_SECOND_Y_AXIS = 'hasSecondYAxis';

@Decor.dialog
class DialogType4A extends Component {

  constructor(props){
    super(props)

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })

    this.toolbarButtons = this._createType2WithToolbar(
      props, { isShowOptions: true }
    )

    this[HAS_SECOND_Y_AXIS] = false
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

  _handleLoad = () => {
    this._handleWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  }
  _createValidationMessages = () => {
     let msg = [];

     const { isValid:isValid1, msg:msg1 } = this.oneTwo.getValidation();
     if (!isValid1) { msg = msg.concat(msg1); }

     const {isValid, datesMsg} = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  }

  _createLoadOption = () => {
    const { one, two } = this.oneTwo.getValues()
        , { fromDate, toDate } = this.datesFragment.getValues();
    return this.props.loadFn(
       this.props, {
         one, two, fromDate, toDate,
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

  _refOneTwo = c => this.oneTwo = c
  _refDates = c => this.datesFragment = c

  render(){
    const {
           caption, oneCaption, oneURI, oneJsonProp, twoCaption, msgOnNotSelected,
           isShow, onShow, onFront,
           initFromDate, initToDate, msgOnNotValidFormat, onTestDate
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
             <D.SelectOneTwo
                 ref={this._refOneTwo}
                 isShow={isShow}
                 isShowLabels={isShowLabels}
                 uri={oneURI}
                 oneCaption={oneCaption}
                 oneJsonProp={oneJsonProp}
                 twoCaption={twoCaption}
                 msgOnNotSelected={msgOnNotSelected}
             />

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

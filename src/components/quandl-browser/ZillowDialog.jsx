import React, { Component } from 'react'

import DraggableDialog from '../zhn-moleculs/DraggableDialog'
import ToolbarButtonCircle from '../dialogs/ToolbarButtonCircle'
import SelectWithLoad from '../dialogs/SelectWithLoad'
import SelectParentChild from '../dialogs/SelectParentChild'
import RowPattern from '../dialogs/RowPattern'
import Button from '../dialogs/Button'
import DatesFragment from '../zhn-moleculs/DatesFragment'
import ValidationMessages from '../zhn/ValidationMessages'
import ShowHide from '../zhn/ShowHide'

import withToolbar from '../dialogs/decorators/withToolbar'
import withValidationLoad from '../dialogs/decorators/withValidationLoad'


const S = {
  TIP: {
    margin: '10px',
    marginTop: '16px',
    fontWeight: 'bold'
  }
};

const _loadFn = (props, options) => {
  const { fnValue, dataColumn, loadId, dataSource } = props
      , { one, two, three, fromDate, toDate, zipCode } = options
      , _isKeyFeature = (two.value === 'Z')
           ? true
           : false
      , _three = (two.value !== 'Z')
           ? three
           : { value:zipCode, caption: zipCode }
      , _value = (typeof fnValue === 'function')
           ? fnValue(one.value, two.value, _three.value)
           : undefined
  return {
    value : _value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn : dataColumn,
    loadId : loadId,
    title : `${two.caption} : ${_three.caption}`,
    subtitle : one.caption,
    dataSource : dataSource,
    isKeyFeature: _isKeyFeature
  }
};

const _reZipCode = /^\d{5}$/;
const _isZipCode = (value) => {
  return _reZipCode.test(value);
}

@withToolbar
@withValidationLoad
class  DialogType5 extends Component {

  constructor(props){
    super()
    this.toolbarButtons = this._createType2WithToolbar(props)
    this._commandButtons = [
      <Button.Load onClick={this._handleLoad} />
    ]
    this.state = {
      isShowDate : true,
      isShowPattern : false,
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

  _handleSelectOne = (one) => {
    this.one = one;
  }
  _handleSelectType = (type) => {
    if (type && type.value === 'Z'){
      this.setState({ isShowPattern: true })
    } else {
      this.setState({ isShowPattern: false })
    }
  }

  _handleLoad = () => {
    this._handleWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  }
  _createValidationMessages = () => {
     const { oneCaption } = this.props;
     let msg = [];

     if (!this.one)    { msg.push(this.props.msgOnNotSelected(oneCaption));}

     const { parent } = this.parentChild.getValues()
     if (parent && parent.value === 'Z'){
       if (!this.inputZipCode.isValid()){
         msg = msg.concat('Zip Code is not valid')
       }
     } else {
       const { isValid:isValid1, msg:msg1 } = this.parentChild.getValidation();
       if (!isValid1) { msg = msg.concat(msg1); }
     }

     const {isValid, datesMsg} = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  }

  _createLoadOption = () => {
    const { parent:two, child:three } = this.parentChild.getValues()
        , { fromDate, toDate } = this.datesFragment.getValues()
        , zipCode = this.inputZipCode.getValue();

    return _loadFn(
      this.props,
      { one : this.one, two, three, fromDate, toDate, zipCode }
    );
  }

  _handleClose = () => {
    this._handleWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  }

  render(){
    const {
           caption, isShow, onShow, onFront,
           oneCaption, oneURI, oneJsonProp,
           twoCaption, twoURI, twoJsonProp, threeCaption, msgOnNotSelected,
           initFromDate, initToDate, nForecastDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , { isShowDate, isShowPattern, validationMessages } = this.state;

    return(
        <DraggableDialog
             caption={caption}
             isShow={isShow}
             commandButtons={this._commandButtons}
             onShowChart={onShow}
             onFront={onFront}
             onClose={this._handleClose}
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
               onSelect={this._handleSelectOne}
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
                 onSelectParent={this._handleSelectType}
             />
             <ShowHide isShow={isShowPattern}>
                <RowPattern
                  ref={n => this.inputZipCode = n}
                  title="Zip Code*"
                  placeholder="Zip Code, 5 Digit"
                  onTest={_isZipCode}
                  errorMsg="5 digit format must be"
                />
             </ShowHide>
             <ShowHide isShow={isShowDate}>
               <DatesFragment
                 ref={c => this.datesFragment = c}
                 initFromDate={initFromDate}
                 initToDate={initToDate}
                 nForecastDate={nForecastDate}
                 msgOnNotValidFormat={msgOnNotValidFormat}
                 onTestDate={onTestDate}
               />
             </ShowHide>
             <ShowHide isShow={isShowPattern}>
               <div style={S.TIP}>
                 * Not for all Zip Code data are available.
               </div>
             </ShowHide>
             <ValidationMessages
                 validationMessages={validationMessages}
             />
        </DraggableDialog>
    );
  }
}

export default DialogType5

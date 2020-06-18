import React, { Component } from 'react'

import D from '../dialogs/DialogCell'
const { Decor, crMenuMore } = D

const DATA_NOTE = '*Data present not for all zip codes';

const S = {
  TIP: {
    margin: 10,
    marginTop: 16,
    fontWeight: 'bold'
  }
};

const _isFn = fn => typeof fn === 'function';
const _isByZipCode = item => item && item.value === 'Z';

const _loadFn = (props, options) => {
  const { fnValue, dataColumn, loadId, dataSource } = props
  , { one, two, three, fromDate, toDate, zipCode } = options
  , _hasZipCode = _isByZipCode(two)
  , _three = !_hasZipCode
       ? three
       : { value: zipCode, caption: zipCode }
  , _value = _isFn(fnValue)
       ? fnValue(one.value, two.value, _three.value)
       : void 0;
  return {
    value: _value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn: dataColumn,
    loadId: loadId,
    title: `${two.caption}: ${_three.caption}`,
    subtitle: one.caption,
    dataSource: dataSource,
    isKeyFeature: _hasZipCode
  };
};

const _reZipCode = /^\d{5}$/;
const _isZipCode = value => _reZipCode.test(value.trim());

@Decor.dialog
class  ZillowDialog extends Component {

  constructor(props){
    super(props)

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })

    this.toolbarButtons = this._createType2WithToolbar(props)
    this._commandButtons = this._crCommandsWithLoad(this)

    this.state = {
      ...this._isWithInitialState(),
      isShowPattern: false
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

  _hSelectMetric = (metric) => {
    this.metric = metric;
  }
  _handleSelectType = (type) => {
    if (_isByZipCode(type)){
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

     if (!this.metric) {
       msg.push(this.props.msgOnNotSelected(oneCaption));
     }

     const { one } = this.inputTypeCode.getValues()
     if (_isByZipCode(one)) {
       if (!this.inputZipCode.isValid()){
         msg = msg.concat('Zip Code is not valid')
       }
     } else {
       const { isValid:isValid1, msg:msg1 } = this.inputTypeCode.getValidation();
       if (!isValid1) { msg = msg.concat(msg1); }
     }

     const {isValid, datesMsg} = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }

     msg.isValid = msg.length === 0
        ? true
        : false;
     return msg;
  }

  _createLoadOption = () => {
    const { one:two, two:three } = this.inputTypeCode.getValues()
        , { fromDate, toDate } = this.datesFragment.getValues()
        , zipCode = this.inputZipCode.getValue();

    return _loadFn(
      this.props, {
        one: this.metric,
        two, three,
        fromDate, toDate,
        zipCode
      }
    );
  }

  _handleClose = () => {
    this._handleWithValidationClose()
  }

  _refTypeCode = c => this.inputTypeCode = c
  _refZip = n => this.inputZipCode = n
  _refDates = c => this.datesFragment = c

  render(){
    const {
      caption, isShow, onShow, onFront,
      oneCaption, oneURI, oneJsonProp,
      twoCaption, twoURI, twoJsonProp, threeCaption, msgOnNotSelected,
      initFromDate, initToDate, nForecastDate, msgOnNotValidFormat, onTestDate
    } = this.props
    , {
      isToolbar,
      isShowLabels, isShowDate, isShowPattern,
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
               optionNames="Items"
               onSelect={this._hSelectMetric}
             />
             <D.SelectOneTwo
                 ref={this._refTypeCode}
                 isShow={isShow}
                 isShowLabels={isShowLabels}
                 isHideTwo={isShowPattern}
                 uri={twoURI}
                 oneCaption={twoCaption}
                 oneJsonProp={twoJsonProp}
                 twoCaption={threeCaption}
                 msgOnNotSelected={msgOnNotSelected}
                 onSelectOne={this._handleSelectType}
             />
             <D.ShowHide isShow={isShowPattern}>
                <D.RowPattern
                  ref={this._refZip}
                  isShowLabels={isShowLabels}
                  caption="*Zip Code"
                  placeholder="Zip Code, 5 Digits"
                  onTest={_isZipCode}
                  errorMsg="5 digits format is required"
                />
             </D.ShowHide>
             <D.ShowHide isShow={isShowDate}>
               <D.DatesFragment
                 ref={this._refDates}
                 isShowLabels={isShowLabels}
                 initFromDate={initFromDate}
                 initToDate={initToDate}
                 nForecastDate={nForecastDate}
                 msgOnNotValidFormat={msgOnNotValidFormat}
                 onTestDate={onTestDate}
               />
             </D.ShowHide>
             <D.ShowHide isShow={isShowPattern}>
               <div style={S.TIP}>
                 {DATA_NOTE}
               </div>
             </D.ShowHide>
             <D.ValidationMessages
                 validationMessages={validationMessages}
             />
        </D.DraggableDialog>
    );
  }
}

export default ZillowDialog

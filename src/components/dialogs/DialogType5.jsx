import React, { Component } from 'react'

import { ChartType as CH } from '../../constants/Type';

import D from './DialogCell'
const { Decor, crMenuMore } = D

const HAS_SECOND_Y_AXIS = 'hasSecondYAxis';

const CHART_TYPE_OPTIONS = [
  { caption: 'Default: Area', value: CH.AREA },
  { caption: 'Scatter: Label Up', value: CH.SCATTER_UP },
  { caption: 'Scatter: Label Down', value: CH.SCATTER_DOWN }
];

@Decor.dialog
class  DialogType5 extends Component {

  constructor(props){
    super(props)

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })

    this.toolbarButtons = this._createType2WithToolbar(
      props, { isShowOptions: true })
    this._commandButtons = this._crCommandsWithLoad(this)

    this.state = {
      ...this._isWithInitialState(),
      isShowDate: false,
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

     const { isValid:isValid1, msg:msg1 } = this.twoThree.getValidation();
     if (!isValid1) { msg = msg.concat(msg1); }

     const {isValid, datesMsg} = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  }

  _createLoadOption = () => {
    const { one:two, two:three } = this.twoThree.getValues()
        , { fromDate, toDate } = this.datesFragment.getValues()
        , seriaType = this.chartType
             ? this.chartType.value
             : undefined;
    return this.props.loadFn(
      this.props, {
      one : this.one, two, three, fromDate, toDate,
      hasSecondYAxis: this[HAS_SECOND_Y_AXIS],
      seriaType
    });
  }

  _handleClose = () => {
    this._handleWithValidationClose()
  }

  _handleMode = (propName, value) => {
     this[propName] = value
  }

  _handlerSelectChartType = (item) => {
    this.chartType = item
  }

  _refTwoThree = c => this.twoThree = c
  _refDates = c => this.datesFragment = c

  render(){
    const {
           caption, isShow, onShow, onFront,
           oneCaption, oneURI, oneJsonProp,
           twoCaption, twoURI, twoJsonProp, threeCaption, msgOnNotSelected,
           initFromDate, initToDate, msgOnNotValidFormat, onTestDate,
           isChartType
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
               optionNames="Items"
               onSelect={this._handleSelectOne}
             />

             <D.SelectOneTwo
                 ref={this._refTwoThree}
                 isShow={isShow}
                 isShowLabels={isShowLabels}
                 uri={twoURI}
                 oneCaption={twoCaption}
                 oneJsonProp={twoJsonProp}
                 twoCaption={threeCaption}
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
               {
                 isChartType &&
                 <D.RowInputSelect
                    isShowLabels={isShowLabels}
                    caption="Chart Type:"
                    options={CHART_TYPE_OPTIONS}
                    onSelect={this._handlerSelectChartType}
                 />
               }
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

export default DialogType5

import React, { Component } from 'react'

import { ChartType } from '../../constants/Type';

import D from './DialogCell'
import crMenuMore from './MenuMore'
import Decor from './decorators/Decorators'

const HAS_SECOND_Y_AXIS = 'hasSecondYAxis';

const CHART_TYPE_OPTIONS = [
  { caption : 'Default: Area', value: ChartType.AREA },
  { caption : 'Scatter: Label Up', value: ChartType.SCATTER_UP },
  { caption : 'Scatter: Label Down', value: ChartType.SCATTER_DOWN }
];


@Decor.withToolbar
@Decor.withValidationLoad
class  DialogType5 extends Component {

  constructor(props){
    super()
    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })

    this.toolbarButtons = this._createType2WithToolbar(props)
    this.toolbarButtons.push({
      caption: 'O', title: 'Toggle Options Input',
      onClick: this._handleClickOptions
    })
    this._commandButtons = [
      <D.Button.Load onClick={this._handleLoad} />
    ]
    this.state = {
      isToolbar: true,
      isShowLabels: true,
      isShowDate : false,
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

     const { isValid:isValid1, msg:msg1 } = this.parentChild.getValidation();
     if (!isValid1) { msg = msg.concat(msg1); }

     const {isValid, datesMsg} = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  }

  _createLoadOption = () => {
    const { parent:two, child:three } = this.parentChild.getValues()
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

  render(){
    const {
           caption, isShow, onShow, onFront,
           oneCaption, oneURI, oneJsonProp,
           twoCaption, twoURI, twoJsonProp, threeCaption, msgOnNotSelected,
           initFromDate, initToDate, nForecastDate, msgOnNotValidFormat, onTestDate,
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

             <D.SelectParentChild
                 ref={c => this.parentChild = c}
                 isShow={isShow}
                 isShowLabels={isShowLabels}
                 uri={twoURI}
                 parentCaption={twoCaption}
                 parentOptionNames="Items"
                 parentJsonProp={twoJsonProp}
                 childCaption={threeCaption}
                 msgOnNotSelected={msgOnNotSelected}
             />

             <D.ShowHide isShow={isShowDate}>
               <D.DatesFragment
                 ref={c => this.datesFragment = c}
                 isShowLabels={isShowLabels}
                 initFromDate={initFromDate}
                 initToDate={initToDate}
                 nForecastDate={nForecastDate}
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

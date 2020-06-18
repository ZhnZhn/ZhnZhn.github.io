import React, { Component } from 'react'

import D from '../dialogs/DialogCell'
const { Decor, crMenuMore } = D

const DF = {
  INDICATOR: 'SMA',
  PERIOD: 30,
  FOR_DAYS: 501
};
const HAS_SECOND_Y_AXIS = 'hasSecondYAxis';

const _testTicket = value => String(value).trim() === ''
  ? false
  : true;

const _testInRangeOrEmpty = (min, max) => (value) => {
  if (String(value).trim() === ''){
    return true;
  }
  const n = parseInt(String(value).trim(), 10)  ;
  if (!Number.isNaN(n) && n>min && n<max) {
    return true;
  } else {
    return false;
  }
}

const _testPeriod = _testInRangeOrEmpty(0, 201)
const _testForDays = _testInRangeOrEmpty(250, 2500)

const _crValue = (indicator, period) => {
  switch(indicator) {
    case 'MACD': return 'MACD(12, 24, 9)';
    case 'STOCH': return 'STOCH(5, 3, 3, SMA)';
    default: return `${indicator} (${period})`;
  }
}

@Decor.withToolbar
@Decor.withLoad
@Decor.withInitialState
class AlphaIndicatorDialog extends Component {

  constructor(props){
    super(props)

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })

    this.toolbarButtons = this._createType2WithToolbar(
      props, { noDate: true, isShowOptions: true }
    )
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

  _handleSelectOne = (item) => {
     this.indicator = item;
  }

  _handleLoad = () => {
    const _period = (this.periodComp.isValid())
             ? (this.periodComp.getValue() !== '')
                 ? this.periodComp.getValue()
                 : DF.PERIOD
             : DF.PERIOD
        , _forDays = (this.forDaysComp.isValid())
             ? (this.forDaysComp.getValue() !== '')
                   ? this.forDaysComp.getValue()
                   : DF.FOR_DAYS
             : DF.FOR_DAYS
        , _ticket = (this.ticketComp.isValid())
             ? this.ticketComp.getValue()
             : undefined
        , _indicator = this.indicator
             ? this.indicator.value
             : DF.INDICATOR;
    const option = {
      loadId: 'AL',
      indicator: _indicator,
      ticket: _ticket,
      period: _period,
      forDays: _forDays,
      value: _crValue(_indicator, _period), //for label
      hasSecondYAxis: this[HAS_SECOND_Y_AXIS]
    }
    this.props.onLoad(option)
  }

  _handleClose = () => {
    //this._handleWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  }

  _refTicket = (comp) => {
    this.ticketComp = comp
  }
  _refPeriod = (comp) => {
    this.periodComp = comp
  }
  _refForDays = (comp) => {
    this.forDaysComp = comp
  }
  _handleMode = (propName, value) => {
     this[propName] = value
  }

  render() {
    const {
            isShow, caption,
            oneURI, oneJsonProp, oneCaption,
            onShow, onFront
          } = this.props
        , {
            isToolbar,
            isShowLabels, isShowOptions
          } = this.state;

    return (
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
          <D.RowPattern
            ref={this._refTicket}
            isShowLabels={isShowLabels}
            caption="Ticket"
            placeholder="Nyse or Nasdaq Ticket"
            onTest={_testTicket}
            errorMsg="Not Empty"
          />
          <D.ShowHide isShow={isShowOptions}>
            <D.RowPattern
              ref={this._refPeriod}
              isShowLabels={isShowLabels}
              caption="Period"
              placeholder={`Default: ${DF.PERIOD}`}
              onTest={_testPeriod}
              errorMsg="Number in range 1-200"
            />
            <D.RowPattern
              ref={this._refForDays}
              isShowLabels={isShowLabels}
              caption="For Days"
              placeholder={`Default: ${DF.FOR_DAYS} (2 Years)`}
              onTest={_testForDays}
              errorMsg="Number in range 250-2500"
            />

          </D.ShowHide>
          <D.RowCheckBox
            initValue={false}
            caption="Add Seria with Second YAxis"
            onCheck={this._handleMode.bind(null, HAS_SECOND_Y_AXIS, true)}
            onUnCheck={this._handleMode.bind(null, HAS_SECOND_Y_AXIS, false)}
          />
      </D.DraggableDialog>
    );
  }
}

export default AlphaIndicatorDialog

import React, { Component } from 'react'

import DraggableDialog from '../zhn-moleculs/DraggableDialog'
import ToolbarButtonCircle from '../dialogs/ToolbarButtonCircle'
import SelectWithLoad from '../dialogs/SelectWithLoad'
import RowPattern from '../dialogs/RowPattern'
import RowCheckBox from '../dialogs/RowCheckBox'
import ShowHide from '../zhn/ShowHide'
import Button from '../dialogs/Button'

import withToolbar from '../dialogs/decorators/withToolbar'

const DF = {
  INDICATOR: 'SMA',
  PERIOD: 30,
  FOR_DAYS: 501
};
const HAS_SECOND_Y_AXIS = 'hasSecondYAxis';

const _testTicket = (value) => {
  if (String(value).trim() === '') {
    return false;
  } else {
    return true;
  }
}

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

@withToolbar
class AlphaIndicatorDialog extends Component {

  constructor(props){
    super()
    this.toolbarButtons = this._createType2WithToolbar(props, true)
    this.toolbarButtons.push({
      caption: 'O', title: 'Toggle Options Input',
      onClick: this._handleClickOptions
    })
    this._commandButtons = [
      <Button.Load onClick={this._handleLoad} />
    ];
    this.state = {
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

  _handleClickOptions = () => {
    this.setState({ isShowOptions: !this.state.isShowOptions })
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
        , _indicator = (this.indicator)
             ? this.indicator.value
             : DF.INDICATOR
        , _value = `${_indicator} (${_period})`;
    const option = {
      loadId: 'AL',
      indicator: _indicator,
      ticket: _ticket,
      period: _period,
      forDays: _forDays,
      value: _value, //for label
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
        , { isShowOptions } = this.state;

    return (
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
          <RowPattern
            ref={this._refTicket}
            title="Ticket"
            placeholder="Nyse or Nasdaq Ticket"
            onTest={_testTicket}
            errorMsg="Not Empty"
          />
          <ShowHide isShow={isShowOptions}>
            <RowPattern
              ref={this._refPeriod}
              title="Period"
              placeholder={`Default: ${DF.PERIOD}`}
              onTest={_testPeriod}
              errorMsg="Number in range 1-200"
            />
            <RowPattern
              ref={this._refForDays}
              title="For Days"
              placeholder={`Default: ${DF.FOR_DAYS} (2 Years)`}
              onTest={_testForDays}
              errorMsg="Number in range 250-2500"
            />

          </ShowHide>
          <RowCheckBox
            initValue={false}
            caption="Add Seria with Second YAxis"
            onCheck={this._handleMode.bind(null, HAS_SECOND_Y_AXIS, true)}
            onUnCheck={this._handleMode.bind(null, HAS_SECOND_Y_AXIS, false)}
          />
      </DraggableDialog>
    );
  }
}

export default AlphaIndicatorDialog

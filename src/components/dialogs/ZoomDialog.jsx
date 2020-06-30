import React, { Component } from 'react'

import dt from '../../utils/DateUtils'

import ModalDialog from '../zhn-moleculs/ModalDialog';
import D from './DialogCell';
import ZoomDailyRow from './ZoomDailyRow'

const S = {
  DIALOG: {
    width: 244,
    marginLeft: -122
  },
  DATE: {
    width: 120
  }
};

const {
  isDmy,
  dmyToUTC,
  isDmyPeriod,
  mlsToDmy,
  addToDmy,
  getYTDfromDmy
} = dt;

const _isFn = fn => typeof fn === 'function';

const _getFromToDates = (chart) => chart
  .zhGetFromToDates?.({ format: mlsToDmy })
  ?? {};

const _getMinYear = (strDmy) => strDmy.split('-')[2];
const _crErrMsg = minYear => `DD-MM-YYYY format must be, min 01-01-${minYear}`;

class ZoomDialog extends Component {
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    data: PropTypes.object,
    onClose: PropTypes.func
  }
  */

  static defaultProps = {
    data: {}
  }

  constructor(props){
    super(props)

    this._hZoom1M = this._hZoomBy.bind(null, -1)
    this._hZoom3M = this._hZoomBy.bind(null, -3)
    this._hZoom6M = this._hZoomBy.bind(null, -6)
    this._hZoom1Y = this._hZoomBy.bind(null, -12)

    this._commandButtons = [
      <D.Button.Flat
         key="zoom"
         caption="Zoom"
         isPrimary={true}
         onClick={this._hZoom}
      />
    ]
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props
      && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  _getChart = () => {
    const { data, onClose } = this.props
    , { chart={} } = data;
    return { chart, onClose };
  }

  _hZoom = () => {
    const { chart, onClose } = this._getChart();
    if ( _isFn(chart.zhZoomX)
         && this._dates.getValidation().isValid ) {
      const { fromDate, toDate } = this._dates.getValues()
      , from = dmyToUTC(fromDate)
      , to = dmyToUTC(toDate);
      chart.zhZoomX({ from, to })
    }
    onClose()
  }

  _hZoomBy = (month) => {
    const { chart } = this._getChart();
    if (_isFn(chart.zhZoomX)) {
      const { to } = _getFromToDates(chart)
      , _fromMls = addToDmy(to, month).getTime()
      , _toMls = dmyToUTC(to);
      if (chart.zhZoomX({
        from: _fromMls,
        to: _toMls
      })) {
        this._dates.setFromTo(mlsToDmy(_fromMls), to)
      }
    }
  }

  _hZoomYTD = () => {
    const { chart } = this._getChart()
    if (_isFn(chart.zhZoomX)) {
      const { to } = _getFromToDates(chart)
      , _fromMls = getYTDfromDmy(to)
      , _toMls = dmyToUTC(to);
      if (chart.zhZoomX({
        from: _fromMls,
        to: _toMls
      })) {
        this._dates.setFromTo(mlsToDmy(_fromMls), to)
      }
    }
  }

  _refDates = c => this._dates = c

  render(){
    const {
      isShow,
      data,
      onClose
    } = this.props
    , { chart={} } = data
    , { from, to } = _getFromToDates(chart)
    , _minYear = _getMinYear(from)
    , _onTestDate = (str) => isDmy(str, _minYear)
    , _errMsgDateFrom = _crErrMsg(_minYear)
    , id = chart.zhGetId?.()
    , _isDaily = chart.zhIsDaily?.();
    return (
      <ModalDialog
        caption="Zoom Chart"
        style={S.DIALOG}
        isShow={isShow}
        commandButtons={this._commandButtons}
        onClose={onClose}
      >
        <D.DatesFragment
           key={id}
           ref={this._refDates}
           dateStyle={S.DATE}
           placeholder="DD-MM-YYYY"
           initFromDate={from}
           initToDate={to}
           errMsg={_errMsgDateFrom}
           isPeriodValid={isDmyPeriod}
           onTestDate={_onTestDate}
           onEnter={this._hZoom}
        />
        { _isDaily && <ZoomDailyRow
             onZoom1M={this._hZoom1M}
             onZoom3M={this._hZoom3M}
             onZoom6M={this._hZoom6M}
             onZoomYTD={this._hZoomYTD}
             onZoom1Y={this._hZoom1Y}
          />
        }
      </ModalDialog>
    );
  }
}

export default ZoomDialog

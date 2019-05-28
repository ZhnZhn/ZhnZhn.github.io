import React, { Component } from 'react'

import dt from '../../utils/DateUtils'

import ModalDialog from '../zhn-moleculs/ModalDialog';
import D from './DialogCell';

const S = {
  DIALOG: {
    width: 244,
    marginLeft: -122
  },
  DATE: {
    width: 120
  },
  PERIOD_BTS: {
    paddingTop: 8,
    paddingLeft: 8
  },
  BT: {
    color: '#1b2836'
  }
};

const {
  isDmy,
  dmyToUTC,
  mlsToDmy,
  addToDmy,
  getYTDfromDmy
} = dt;

const _isPeriodValid = (from, to) => dmyToUTC(from) <= dmyToUTC(to);
const _isFn = fn => typeof fn === 'function';

const _getFromToDates = (chart) => _isFn(chart.zhGetFromToDates)
  ? chart.zhGetFromToDates({ format: mlsToDmy })
  : {};

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

    this._hZoomBy1M = this._hZoomBy.bind(this, -1)
    this._hZoomBy3M = this._hZoomBy.bind(this, -3)
    this._hZoomBy6M = this._hZoomBy.bind(this, -6)
    this._hZoomBy1Y = this._hZoomBy.bind(this, -12)

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
      chart.zhZoomX({
        from: dmyToUTC(fromDate),
        to: dmyToUTC(toDate)
      })
    }
    onClose()
  }

  _hZoomBy = (month) => {
    const { chart } = this._getChart();
    if (_isFn(chart.zhZoomX)) {
      const { to } = _getFromToDates(chart)
      , _fromMls = addToDmy(to, month)
          .getTime();
      if ( chart.zhZoomX({
        from: _fromMls,
        to: dmyToUTC(to)
      })) {
        this._dates.setFromTo(mlsToDmy(_fromMls), to)
      }
    }
  }

  _hZoomYTD = () => {
    const { chart } = this._getChart()
    if (_isFn(chart.zhZoomX)) {
      const { to } = _getFromToDates(chart)
      , _fromMls = getYTDfromDmy(to);
      if ( chart.zhZoomX({
        from: _fromMls,
        to: dmyToUTC(to)
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
    , id = _isFn(chart.zhGetId)
       ? chart.zhGetId()
       : void 0;

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
           errMsg="DD-MM-YYYY format must be, min 01-01-1990"
           isPeriodValid={_isPeriodValid}
           onTestDate={isDmy}
           onEnter={this._hZoom}
        />
        <div style={S.PERIOD_BTS}>
          <D.Button.Flat
             rootStyle={S.BT}
             key="1M"
             caption="1M"
             onClick={this._hZoomBy1M}
          />
          <D.Button.Flat
             rootStyle={S.BT}
             key="3M"
             caption="3M"
             onClick={this._hZoomBy3M}
          />
          <D.Button.Flat
             rootStyle={S.BT}
             key="6M"
             caption="6M"
             onClick={this._hZoomBy6M}
          />
          <D.Button.Flat
             rootStyle={S.BT}
             key="YTD"
             caption="YTD"
             onClick={this._hZoomYTD}
          />
          <D.Button.Flat
             rootStyle={S.BT}
             key="1Y"
             caption="1Y"
             onClick={this._hZoomBy1Y}
          />
        </div>
      </ModalDialog>
    );
  }
}

export default ZoomDialog

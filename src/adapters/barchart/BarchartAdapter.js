
import AdapterFn from '../AdapterFn'
import QuandlFn2 from '../QuandlFn2'

import ChartConfig from '../../charts/ChartConfig'
import Chart from '../../charts/Chart'

import { fnAddSeriesSma, fnRemoveSeries, fnGetConfigMfi } from '../IndicatorSma';

const DESCR = "Copyright © 2017. All <a href='https://www.barchartmarketdata.com'>market data</a> provided by Barchart Market Data Solutions.<br><br>" +
              "BATS market data is at least 15-minutes delayed. Forex market data is at least 10-minutes delayed. AMEX, NASDAQ, NYSE and futures market data (CBOT, CME, COMEX and NYMEX) is end-of-day. Information is provided 'as is' and solely for informational purposes, not for trading purposes or advice, and is delayed. To see all exchange delays and terms of use, please see our <a href='https://www.barchart.com/agreement.php'>disclaimer.</a>"

const _createCloseSeries = (config, { results=[] }, chartId) => {
  const _data = []
      , _dataVolume = [], _dataVolumeColumn = []
      , _dataATH = [], _dataMfi = [];
  let _prevClose;
  let _minClose = Number.POSITIVE_INFINITY
  let _maxClose = Number.NEGATIVE_INFINITY
  results.forEach(item => {
    const { tradingDay='', close, volume, open, high, low } = item
        //, _arrDate = tradingDay.split('-')
        //, _date = Date.UTC(_arrDate[0], (parseInt(_arrDate[1], 10)-1), _arrDate[2])
        , _date = AdapterFn.ymdToUTC(tradingDay);

    if (_minClose > close) {
      _minClose = close
    }
    if (_maxClose < close ) {
      _maxClose = close
    }

    _data.push([_date, close])
    _dataVolume.push([_date, volume])
    _dataVolumeColumn.push(AdapterFn.volumeColumnPoint({
      open, close, volume, date: _date,
      option: { _high: high, _low: low }
    }))
    _dataMfi.push([tradingDay, close, high, low, close, volume])
    if (typeof _prevClose !== 'undefined'){
      _dataATH.push(AdapterFn.athPoint({
        date: _date, prevClose: _prevClose, open
      }))
    }
    _prevClose = close
  })

  config.series[0] = {
    data: _data,
    type: 'area',
    lineWidth: 1
  }

  Object.assign(config, {
    valueMoving: QuandlFn2.createValueMovingFromSeria(_data),
    zhVolumeConfig: ChartConfig.fIndicatorVolumeConfig(
      chartId, _dataVolumeColumn, _dataVolume
    ),
    zhATHConfig: ChartConfig.fIndicatorATHConfig(chartId, _dataATH),
    zhFnAddSeriesSma: fnAddSeriesSma,
    zhFnRemoveSeries: fnRemoveSeries,
    zhPoints: _dataMfi,
    zhIsMfi: true,
    zhFnGetMfiConfig: fnGetConfigMfi
  })

  config.chart.spacingTop = 25

  const plotLines = config.yAxis.plotLines;
  plotLines[0].value = _maxClose;
  plotLines[0].label.text = `${ChartConfig.fnNumberFormat(_maxClose)}`;
  plotLines[1].value = _minClose;
  plotLines[1].label.text = `${ChartConfig.fnNumberFormat(_minClose)}`;

  const _min = Chart.calcMinY({
    minPoint: _minClose, maxPoint: _maxClose
  })
  Object.assign(config.yAxis, {
    min: _min,
    maxPadding: 0.15,
    minPadding: 0.15,
    endOnTick: false,
    startOnTick: false
  })
}

const _createAreaConfig = (json, option) => {
  const config = ChartConfig.fBaseAreaConfig()
      , { stock={} } = option
      , { caption='', value='' } = stock
      , _chartId = `B/${value}`;

  config.title = Chart.fTitle({ text: caption, y: -10 })
  _createCloseSeries(config, json, _chartId)

  config.info = {
    description: DESCR,
    frequency:"daily",
    name: caption,
    newest_available_date: "",
    oldest_available_date: ""
  }
  config.zhConfig = {
    columnName: "Close",
    dataColumn: 4,
    dataSource: "Barchart Market Data Solutions",
    id: _chartId,
    isWithLegend:false,
    key: `${value}`,
    linkFn:"NASDAQ"
  }

  return {
    config,
    isDrawDeltaExtrems:false,
    isNotZoomToMinMax:false
  };
}

const BarchartAdapter = {
  toConfig(json, option) {
    const _config = _createAreaConfig(json, option)
    return _config;
  },
  toSeries(json, option) {
    const seria = ChartConfig.fSeries()
    seria.zhSeriaId = 'Empty_Seria'
    seria.zhValueText = 'Empty Seria'
    return seria;
  }
}

export default BarchartAdapter


import DateUtils from '../../utils/DateUtils'

import AdapterFn from '../AdapterFn'
import QuandlFn2 from '../QuandlFn2'

import ChartConfig from '../../charts/ChartConfig'
import Chart from '../../charts/Chart'
//import ChartFn from '../../charts/ChartFn'
import Tooltip from '../../charts/Tooltip'

import { fnAddSeriesSma, fnRemoveSeries, fnGetConfigMfi } from '../IndicatorSma';

const DESCR = "Copyright © 2017. All <a href='https://www.barchartmarketdata.com'>market data</a> provided by Barchart Market Data Solutions.<br><br>" +
              "BATS market data is at least 15-minutes delayed. Forex market data is at least 10-minutes delayed. AMEX, NASDAQ, NYSE and futures market data (CBOT, CME, COMEX and NYMEX) is end-of-day. Information is provided 'as is' and solely for informational purposes, not for trading purposes or advice, and is delayed. To see all exchange delays and terms of use, please see our <a href='https://www.barchart.com/agreement.php'>disclaimer.</a>"

const _createCloseSeries = (config, { results=[] }, chartId) => {
  const _data = []
      , _dataOpen = [], _dataHigh = [], _dataLow = []
      , _dataVolume = [], _dataVolumeColumn = []
      , _dataATH = [], _dataMfi = [];
  let _prevClose
    , _minClose = Number.POSITIVE_INFINITY
    , _maxClose = Number.NEGATIVE_INFINITY;
  results.forEach(item => {
    const {
           tradingDay='',
           open, high, low, close, volume
          } = item
        , _date = AdapterFn.ymdToUTC(tradingDay);

    if (_minClose > close) {
      _minClose = close
    }
    if (_maxClose < close ) {
      _maxClose = close
    }

    _data.push([_date, close])
    _dataOpen.push([_date, open])
    _dataHigh.push([_date, high])
    _dataLow.push([_date, low])
    _dataVolume.push([_date, volume])
    _dataVolumeColumn.push(
        AdapterFn.volumeColumnPoint({
           open, close, volume, date: _date,
           option: { _high: high, _low: low }
        })
    )
    _dataMfi.push([tradingDay, close, high, low, close, volume])
    if (typeof _prevClose !== 'undefined'){
      _dataATH.push(
         AdapterFn.athPoint({
           date: _date, prevClose: _prevClose, open
         })
      )
    }
    _prevClose = close
  })

  ChartConfig.setStockSerias(
    config, _data, _dataHigh, _dataLow, _dataOpen
  )

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

  ChartConfig.setMinMax(config, _minClose, _maxClose)

  Object.assign(config.xAxis, {
    crosshair : Chart.fCrosshair()
  })
}

const _createAreaConfig = (json, option) => {
  const config = ChartConfig.fBaseAreaConfig()
      , { stock={} } = option
      , { caption='', value='' } = stock
      , _chartId = `B/${value}`;

  Object.assign(config, {
    title: Chart.fTitle({ text: caption, y: Chart.STACKED_TITLE_Y }),
    subtitle: Chart.fSubtitle({ y:Chart.STACKED_SUBTITLE_Y }),
    tooltip: Chart.fTooltip(Tooltip.fnBasePointFormatter),
    info: {
      description: DESCR,
      frequency:"daily",
      name: caption,
      newest_available_date: DateUtils.getFromDate(0),
      oldest_available_date: DateUtils.getFromDate(2)
    },
    zhConfig: {
      columnName: "Close",
      dataColumn: 4,
      dataSource: "Barchart Market Data Solutions",
      id: _chartId,
      key: `${value}`,
      linkFn:"NASDAQ",
      isWithLegend: true,
      legend: AdapterFn.stockSeriesLegend()
    }
  })

  _createCloseSeries(config, json, _chartId)

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
    Object.assign(seria, {
      zhSeriaId: 'Empty_Seria',
      zhValueText: 'Empty Seria'
    })
    return seria;
  }
}

export default BarchartAdapter

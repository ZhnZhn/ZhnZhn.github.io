
import ChartConfig from '../../charts/ChartConfig'
import ConfigBuilder from '../../charts/ConfigBuilder'
import AdapterFn from '../AdapterFn'

import {
  fnAddSeriesSma, fnRemoveSeries
} from '../IndicatorSma';

import Chart from '../../charts/Chart'
import Tooltip from '../../charts/Tooltip'

const C = {
  TIME_START_DAY: '09:30:00',
  TIME_END_DAY: '16:00:00',

  START_DAY: "#90ed7d",
  END_DAY: "#f7a35c",
  CLOSE: "#2f7ed8",
  HIGH: "#4caf50",
  LOW: "#f44336",
  OPEN: "#90ed7d"
}

const _crZhConfig = id => ({
  id: id,
  key: id,
  isWithLegend: true,
  legend: AdapterFn.stockSeriesLegend(),
  dataSource: "Alpha Vantage"
});

const _fMarker = color => ({
  radius: 3,
  enabled: true,
  fillColor: color
});

const _fMarkerColor = (date) => {
  let marker, color;
  if (date.indexOf(C.TIME_START_DAY) !== -1) {
    marker = _fMarker(C.START_DAY)
    color = C.START_DAY
  } else if (date.indexOf(C.TIME_END_DAY) !== -1) {
    marker = _fMarker(C.END_DAY)
    color = C.END_DAY
  }
  return { marker, color };
}

const _createSeriaData = (json, option, config, chartId) => {
  const { interval } = option
  , _propName = `Time Series (${interval})`
  , _value = json[_propName]
  , _dateKeys = ( _value)
       ? Object.keys(_value).sort()
       : []
  , _data = []
  , _dataVolume = [], _dataVolumeColumn = []
  , _dataHigh = [], _dataLow = [], _dataOpen = [];
  let i = 0, _max = _dateKeys.length
  , _minClose = Number.POSITIVE_INFINITY
  , _maxClose = Number.NEGATIVE_INFINITY
  , _dateMs
  , _date, _point, _open, _high, _low, _close, _volume ;
  for (i; i<_max; i++) {
    _date = _dateKeys[i]
    _point = _value[_date]
    _open = parseFloat(_point['1. open'])
    _high = parseFloat(_point['2. high'])
    _low = parseFloat(_point['3. low'])
    _close = parseFloat(_point['4. close'])
    _volume = parseFloat(_point['5. volume'])

    _dateMs =  AdapterFn.ymdhmsToUTC(_date)
    _data.push({
      x: _dateMs, y: _close, ..._fMarkerColor(_date)
    })

    _dataHigh.push([_dateMs, _high])
    _dataLow.push([_dateMs, _low])
    _dataOpen.push([_dateMs, _open])

    _dataVolume.push([_dateMs, _volume])
    _dataVolumeColumn.push(
        AdapterFn.volumeColumnPoint({
           open: _open, close: _close, volume: _volume,
           date: _dateMs,
           option: { _high: _high, _low: _low }
        })
    )

    if (_minClose > _close) {
      _minClose = _close
    }
    if (_maxClose < _close ) {
      _maxClose = _close
    }
  }

  ChartConfig.setStockSerias(
    config, _data, _dataHigh, _dataLow, _dataOpen, chartId
  )
  ChartConfig.setMinMax(config, _minClose, _maxClose)

  Object.assign(config, {
    zhVolumeConfig: ChartConfig.fIndicatorVolumeConfig(
      option.value, _dataVolumeColumn, _dataVolume
    )
  })
  config.zhVolumeConfig.series[1].tooltip = Chart.fTooltip(Tooltip.fnVolumePointFormatterT)

}

const AlphaIntradayAdapter = {
  toConfig(json, option){
    const baseConfig = ChartConfig.fBaseAreaConfig()
        , { value, interval } = option
        , _chartId = value;

    _createSeriaData(json, option, baseConfig, _chartId );

    const config = ConfigBuilder()
      .init(baseConfig)
      .add('chart', { spacingTop: 25 })
      .addCaption(value, `Time Series (${interval})`)
      .addTooltip(Tooltip.fnBasePointFormatterT)
      .add('zhConfig', _crZhConfig(_chartId))
      .add('zhFnAddSeriesSma', fnAddSeriesSma)
      .add('zhFnRemoveSeries', fnRemoveSeries)
      .toConfig();

    return {
      config,
      isDrawDeltaExtrems: false,
      isNotZoomToMinMax: false
    };
  },

  toSeries(json, option){
    throw new Error('ZH_1000');
  }
}

export default AlphaIntradayAdapter

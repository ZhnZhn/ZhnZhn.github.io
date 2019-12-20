
import ChartConfig from '../../charts/ChartConfig'
import ConfigBuilder from '../../charts/ConfigBuilder'
import AdapterFn from '../AdapterFn'

import Chart from '../../charts/Chart'
import Tooltip from '../../charts/Tooltip'

import fnAdapter from './fnAdapter'

const {
   ymdToUTC,
   ymdhmsToUTC,
   volumeColumnPoint
} = AdapterFn;

const { crIntradayConfigOption } = fnAdapter;

//const DAILY = 'Daily';
const INTRADAY = 'INTRADAY'
const DAILY_ADJUSTED = 'DAILY_ADJUSTED'

const C = {
  TIME_START_DAY: '09:30:00',
  TIME_CLOSE_DAY: '16:00:00',

  START_DAY: "#90ed7d",
  CLOSE_DAY: "#f7a35c",
  CLOSE: "#2f7ed8",
  HIGH: "#4caf50",
  LOW: "#f44336",
  OPEN: "#90ed7d"
}

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
  } else if (date.indexOf(C.TIME_CLOSE_DAY) !== -1) {
    marker = _fMarker(C.CLOSE_DAY)
    color = C.CLOSE_DAY
  }
  return { marker, color };
}

const _crSeriaOptions = ({ dfT, hasFilterZero, hasDividend }) => {
  const _isIntraday = dfT === INTRADAY;
  const _isAdjusted = dfT === DAILY_ADJUSTED;
  return {
    notFilterZero: !hasFilterZero,
    isDividend: _isAdjusted && hasDividend,
    toUTC: _isIntraday
      ? ymdhmsToUTC
      : ymdToUTC,
    pnClose: _isAdjusted
      ? '5. adjusted close'
      : '4. close',
    pnVolume: _isAdjusted
      ? '6. volume'
      : '5. volume'
  };
};

const PN_DIVIDENT = '7. dividend amount';
const PN_ADJ_CLOSE = '5. adjusted close';
const _addDividendPointTo = (arr, dateMs, p) => {
  const _exValue = p[PN_DIVIDENT]
    && parseFloat(p[PN_DIVIDENT]);
  if (_exValue) {
    arr.push({
      ...ChartConfig.crMarkerExDividend(), ...{
         x: dateMs,
         exValue: _exValue,
         price: parseFloat(p[PN_ADJ_CLOSE])
      }
    })
  }
};

const _notZeros = (v1, v2) => v1 !== 0 && v2 !== 0;

const _crSeriaData = (json, option, config, chartId) => {
  const { interval } = option
  , _propName = `Time Series (${interval})`
  , _value = json[_propName]
  , _dateKeys = ( _value)
       ? Object.keys(_value).sort()
       : []
  , _data = [], _dataDividend = []
  , _dataVolume = [], _dataVolumeColumn = []
  , _dataHigh = [], _dataLow = [], _dataOpen = []
  , {
    notFilterZero, isDividend,
    toUTC, pnClose, pnVolume
  } = _crSeriaOptions(option);

  let i = 0, _max = _dateKeys.length
  , _minClose = Number.POSITIVE_INFINITY
  , _maxClose = Number.NEGATIVE_INFINITY
  , _dateMs
  , _date, _point
  , _open, _high, _low, _closeV, _close, _volume ;
  for (i; i<_max; i++) {
    _date = _dateKeys[i]
    _point = _value[_date]
    _closeV = parseFloat(_point['4. close'])
    _close = parseFloat(_point[pnClose])

    if (notFilterZero || _notZeros(_closeV, _close) ) {
      _open = parseFloat(_point['1. open'])
      _high = parseFloat(_point['2. high'])
      _low = parseFloat(_point['3. low'])
      _volume = parseFloat(_point[pnVolume])

      _dateMs = toUTC(_date)
      _data.push({
        x: _dateMs, y: _close, ..._fMarkerColor(_date)
      })

      _dataHigh.push([_dateMs, _high])
      _dataLow.push([_dateMs, _low])
      _dataOpen.push([_dateMs, _open])

      _dataVolume.push([_dateMs, _volume])
      _dataVolumeColumn.push(
          volumeColumnPoint({
             open: _open,
             close: _closeV,
             volume: _volume,
             date: _dateMs,
             option: { _high: _high, _low: _low }
          })
      )
      if (isDividend) {
        _addDividendPointTo(_dataDividend, _dateMs, _point)
      }

      if (_minClose > _close) {
        _minClose = _close
      }
      if (_maxClose < _close ) {
        _maxClose = _close
      }
    }
  }


  ChartConfig.setStockSerias(
    config, _data, _dataHigh, _dataLow, _dataOpen, chartId
  )


  return {
    data: _data,
    dataDividend: _dataDividend,
    minClose: _minClose,
    maxClose: _maxClose,
    dVolume: _dataVolume,
    dColumn: _dataVolumeColumn
  };
}

const _toDataDaily = (data) => {
  return data.filter(p => p.color === C.CLOSE_DAY);
}

const _crChartOptions = (dfT, data) => {
  const _isIntraday = dfT === INTRADAY;
  return {
    dataDaily: _isIntraday
       ? _toDataDaily(data)
       : data,
    seriaTooltip: _isIntraday
      ? Tooltip.fnBasePointFormatterT
      : Tooltip.fnBasePointFormatter,
    volumeTooltip: _isIntraday
      ? Tooltip.volumeDmyt
      : Tooltip.volume
  };
};

const AlphaIntradayAdapter = {
  toConfig(json, option){
    const baseConfig = ChartConfig.fBaseAreaConfig()
    , {
      value, interval, dfT,
      dataSource
    } = option
    , _chartId = value
    , {
        data, minClose, maxClose,
        dataDividend,
        dColumn, dVolume
      } = _crSeriaData(json, option, baseConfig, _chartId )
    , {
        dataDaily,
        seriaTooltip, volumeTooltip
      } = _crChartOptions(dfT, data);

    option.minY = minClose
    option.maxY = maxClose

    const config = ConfigBuilder()
      .init(baseConfig)
      .add('chart', { spacingTop: 25 })
      .addCaption(value, `Time Series (${interval})`)
      .addTooltip(seriaTooltip)
      .add({
        ...crIntradayConfigOption({
          id: _chartId,
          data: dataDaily,
          dataSource
        })
      })
      .addMinMax(dataDaily, option)
      .addDividend({ dataDividend, minClose, maxClose })
      .addMiniVolume({
        id: _chartId,
        dVolume, dColumn,
        tooltipColumn: Chart.fTooltip(volumeTooltip)
      })
      .toConfig();

    return { config };
  },

  toSeries(json, option){
    throw new Error('ZH_1000');
  }
}

export default AlphaIntradayAdapter

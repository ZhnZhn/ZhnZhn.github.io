
import ChartConfig from '../../charts/ChartConfig'
import Builder from '../../charts/ConfigBuilder'
import AdapterFn from '../AdapterFn'
import IntradayFns from '../IntradayFns'

import Chart from '../../charts/Chart'
import Tooltip from '../../charts/Tooltip'

import fnAdapter from './fnAdapter'

const {
   ymdToUTC,
   ymdhmsToUTC,
   crVolumePoint
} = AdapterFn;
const { crMarkerColor, crDataDaily } = IntradayFns

const { crIntradayConfigOption } = fnAdapter;

const _isStr = str => typeof str === 'string';
const _isBool = bool => typeof bool === 'boolean';


//const DAILY = 'Daily';
const INTRADAY = 'INTRADAY'
const DAILY_ADJUSTED = 'DAILY_ADJUSTED'


const _crSeriaOptions = ({
  dfT,
  isFilterZero, hasFilterZero,
  hasDividend
}) => {
  const _isIntraday = dfT === INTRADAY;
  const _isAdjusted = dfT === DAILY_ADJUSTED;
  return {
    notFilterZero: _isBool(isFilterZero)
       ? !isFilterZero
       : !hasFilterZero,
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

const _getObjValues = (json, option) => {
  const { interval } = option
  , _suffix = interval
  , _propName = `Time Series (${_suffix})`;
  return json[_propName];
};

const _crSeriaData = (objValues, option) => {
  const _dateKeys = objValues
     ? Object.keys(objValues).sort()
     : []
  , data = [], dH = [], dL = [], dO = []
  , dataDividend = []
  , dVolume = [], dColumn = []
  , {
    notFilterZero, isDividend,
    toUTC, pnClose, pnVolume
  } = _crSeriaOptions(option);

  let i = 0, _max = _dateKeys.length
  , minClose = Number.POSITIVE_INFINITY
  , maxClose = Number.NEGATIVE_INFINITY
  , _dateMs
  , _date, _point
  , _open, _high, _low, _closeV, _close, _volume ;
  for (i; i<_max; i++) {
    _date = _dateKeys[i]
    _point = objValues[_date]
    _closeV = parseFloat(_point['4. close'])
    _close = parseFloat(_point[pnClose])

    if (notFilterZero || _notZeros(_closeV, _close) ) {
      _open = parseFloat(_point['1. open'])
      _high = parseFloat(_point['2. high'])
      _low = parseFloat(_point['3. low'])
      _volume = parseFloat(_point[pnVolume])

      _dateMs = toUTC(_date)
      data.push({
        x: _dateMs,
        y: _close,
        ...crMarkerColor(_date)
      })

      dH.push([_dateMs, _high])
      dL.push([_dateMs, _low])
      dO.push([_dateMs, _open])

      dVolume.push([_dateMs, _volume])
      dColumn.push(
          crVolumePoint({
             open: _open,
             close: _closeV,
             volume: _volume,
             date: _dateMs,
             option: { _high: _high, _low: _low }
          })
      )
      if (isDividend) {
        _addDividendPointTo(dataDividend, _dateMs, _point)
      }

      if (minClose > _close ) { minClose = _close }
      if (maxClose < _close ) { maxClose = _close }
    }
  }

  return {
    data, dH, dL, dO,
    dataDividend,
    minClose, maxClose,
    dVolume, dColumn
  };
}

const _crChartOptions = (dfT, data) => {
  const _isIntraday = dfT === INTRADAY;
  return {
    dataDaily: _isIntraday
       ? crDataDaily(data)
       : data,
    seriaTooltip: _isIntraday
      ? Tooltip.vTdmy
      : Tooltip.vDmy,
    volumeTooltip: _isIntraday
      ? Tooltip.volumeTdmy
      : Tooltip.volume
  };
};

const IntradayAdapter = {
  crKey({ _itemKey, value }){
    return _itemKey || value;
  },
  toConfig(json, option){
    const {
      _itemKey, title,
      value,
      interval, dfT,
      dataSource,
      seriaType
    } = option
    , _chartId = _itemKey || value
    , _title = title || value
    , _seriaType = _isStr(seriaType)
        ?  seriaType.toLowerCase()
        : 'area'
    , _objValues = _getObjValues(json, option)
    , {
        data, dH, dL, dO,
        minClose, maxClose,
        dataDividend,
        dColumn, dVolume
      } = _crSeriaData(_objValues, option)
    , {
        dataDaily,
        seriaTooltip, volumeTooltip
      } = _crChartOptions(dfT, data);

    option.minY = minClose
    option.maxY = maxClose

    const config = Builder()
      .areaConfig()
      .add('chart', { spacingTop: 25 })
      .addCaption(_title, `Time Series (${interval})`)
      .addTooltip(seriaTooltip)
      .addMinMax(dataDaily, option)
      .setStockSerias(_seriaType, data, dH, dL, dO)
      .addDividend({ dataDividend, minClose, maxClose })
      .addMiniVolume({
        id: _chartId,
        dVolume, dColumn,
        tooltipColumn: Chart.fTooltip(volumeTooltip)
      })
      .add({
        ...crIntradayConfigOption({
          id: _chartId,
          data: dataDaily,
          dataSource
        }, option)
      })
      .toConfig();
    return { config };
  },

  toSeries(json, option){
    return Builder.crSeria({
      adapter: IntradayAdapter,
      json, option,
      type: 'line'
    });
  }
}

export default IntradayAdapter

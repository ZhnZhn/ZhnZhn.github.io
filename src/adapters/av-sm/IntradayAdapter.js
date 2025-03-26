import { getObjectKeys } from '../../utils/isTypeFn';
import pipe from '../../utils/pipe';

import {
  crStockConfig,
  fAddDividend
} from '../../charts/stockBuilderFn';
import {
  fAddCaption,
  fAdd,
  toConfig,
  crSeriaConfigFromAdapter
} from '../../charts/configBuilderFn';
import { crMarkerExDividend } from '../../charts/MarkerFn';

import { crVolumePoint } from '../pointFn';
import { crMarkerColor } from '../IntradayFns';
import {
  isTokenInStr,
  ymdhmsToUTC,
  crIntradayConfigOption
} from './fnAdapter';

const _crSeriaOptions = ({
  isFilterZero,
  dfT
}) => {
  const _isAdjusted = isTokenInStr(dfT, 'ADJUSTED');
  return {
    notFilterZero: !isFilterZero,
    isDividend: _isAdjusted,
    toUTC: ymdhmsToUTC,
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
const _addDividendPointTo = (
  arr,
  dateMs,
  p
) => {
  const _strDivident = p[PN_DIVIDENT]
  , _exValue = _strDivident && parseFloat(_strDivident);
  if (_exValue) {
    arr.push({
      ...crMarkerExDividend(), ...{
         x: dateMs,
         exValue: _exValue,
         price: parseFloat(p[PN_ADJ_CLOSE])
      }
    })
  }
};

const _notZeros = (
  v1,
  v2
) => v1 !== 0 && v2 !== 0;

const _isWeeklyOrMonthly = str =>
 isTokenInStr(str, 'Weekly')
 || isTokenInStr(str, 'Monthly');

const TIME_SERIES = 'Time Series';
const _getJsonDataPropName = ({
  interval
}) => interval === 'Daily Adjusted'
  ? `${TIME_SERIES} (Daily)`
  : _isWeeklyOrMonthly(interval)
     ? `${interval} ${TIME_SERIES}`
     : `${TIME_SERIES} (${interval})`;

const _getObjValues = (
  json,
  option
) => json[_getJsonDataPropName(option)]

const _crSeriaData = (
  json,
  option
) => {
  const _objValues = _getObjValues(json, option)
  , _dateKeys = getObjectKeys(_objValues).sort()
  , dC = []
  , dH = []
  , dL = []
  , dO = []
  , dDividend = []
  , dVc = []
  , dV = []
  , {
    notFilterZero,
    isDividend,
    toUTC,
    pnClose,
    pnVolume
  } = _crSeriaOptions(option);

  let i = 0
  , _max = _dateKeys.length
  , minClose = Number.POSITIVE_INFINITY
  , maxClose = Number.NEGATIVE_INFINITY
  , _dateMs
  , _date
  , _point
  , _open, _high, _low, _closeV, _close, _volume ;
  for (i; i<_max; i++) {
    _date = _dateKeys[i]
    _point = _objValues[_date]
    _closeV = parseFloat(_point['4. close'])
    _close = parseFloat(_point[pnClose])

    if (notFilterZero || _notZeros(_closeV, _close) ) {
      _open = parseFloat(_point['1. open'])
      _high = parseFloat(_point['2. high'])
      _low = parseFloat(_point['3. low'])
      _volume = parseFloat(_point[pnVolume])

      _dateMs = toUTC(_date)
      dC.push({
        x: _dateMs,
        y: _close,
        ...crMarkerColor(_date)
      })

      dH.push([_dateMs, _high])
      dL.push([_dateMs, _low])
      dO.push([_dateMs, _open])

      dV.push([_dateMs, _volume])
      dVc.push(
          crVolumePoint({
             open: _open,
             close: _closeV,
             volume: _volume,
             date: _dateMs,
             option: { _high: _high, _low: _low }
          })
      )
      if (isDividend) {
        _addDividendPointTo(dDividend, _dateMs, _point)
      }

      if (minClose > _close ) { minClose = _close }
      if (maxClose < _close ) { maxClose = _close }
    }
  }
  return {
    dC, dH, dL, dO,
    dDividend,
    minClose,
    maxClose,
    dVc, dV
  };
}

const IntradayAdapter = {
  //crKey: crDfItemKey,

  toConfig(json, option){
    const {
      _itemKey,
      title,
      subtitle,
      dataSource
    } = option
    , _seriesData = _crSeriaData(json, option)
    , {
      dC,
      minClose,
      maxClose,
      dDividend,
    } = _seriesData;

    return {
      config: pipe(
        crStockConfig(_itemKey, {
          ...option,
          ..._seriesData
        }),
        fAddCaption(title, subtitle),
        fAdd(crIntradayConfigOption({
            id: _itemKey,
            data: dC,
            dataSource
        }, option)),
        fAddDividend(dDividend, minClose, maxClose),
        toConfig
      )
    };
  },

  toSeries(json, option){
    return crSeriaConfigFromAdapter({
      adapter: IntradayAdapter,
      type: 'line',
      json,
      option
    });
  }
}

export default IntradayAdapter

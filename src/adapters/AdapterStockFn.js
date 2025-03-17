import {
  isNumber,
  isUndef,
  isNotEmptyArr
} from '../utils/isTypeFn';

import {
  FN_NOOP,
} from './AdapterFn';
import {
  crVolumeColorPoint,
  crAthPoint
} from './pointFn';

const _getNotEmptyArr = arr => isNotEmptyArr(arr)
  ? arr
  : void 0;

const _fAddAthPointTo = () => {
  let _prevClose;
  return (dATH, _date, open, close) => {
    dATH.push(isUndef(_prevClose)
      ? crAthPoint({
          date: _date,
          close: close,
          open: close
        })
      : crAthPoint({
          date: _date,
          close: _prevClose,
          open
        })
    )
    _prevClose = close
  }
};

export const toStockSeriesData = ({
  isAth,
  isAllSeries=true,
  arr
}) => {
  const dC = [], dO = [], dH = [], dL = []
  , dV = [], dVc = []
  , dATH = [], dMfi = []
  , dN = [], dNc = []
  , _arr = _getNotEmptyArr(arr) || []
  , _isVolume = isNumber(arr[0][5])
  , _isNumberOfTrades = isNumber(arr[0][6])
  , _addATHPointTo = isAth
     ? _fAddAthPointTo()
     : FN_NOOP;


  let minClose = Number.POSITIVE_INFINITY
  , maxClose = Number.NEGATIVE_INFINITY;

  _arr.forEach(item => {
    const [
      date,
      open,
      high,
      low,
      close,
      volume,
      numberOfTrades
    ] = item;

    dC.push([date, close])
    if (minClose > close) { minClose = close }
    if (maxClose < close) { maxClose = close }

    if (isAllSeries) {
      dO.push([date, open])
      dH.push([date, high])
      dL.push([date, low])

      if (_isVolume) {
        dV.push([date, volume])
        dVc.push(crVolumeColorPoint(
          date,
          open,
          close,
          volume
        ))
        dMfi.push([date, close, high, low, close, volume])
      }
      if (_isNumberOfTrades) {
        dN.push([date, numberOfTrades])
        dNc.push(crVolumeColorPoint(
          date,
          open,
          close,
          numberOfTrades
        ))
      }

      _addATHPointTo(dATH, date, open, close)
   }
  })

  return {
    dC, dO, dH, dL,
    minClose,
    maxClose,
    dVc: _getNotEmptyArr(dVc),
    dV: _getNotEmptyArr(dV),
    dATH: _getNotEmptyArr(dATH),
    dMfi: _getNotEmptyArr(dMfi),
    dN: _getNotEmptyArr(dN),
    dNc: _getNotEmptyArr(dNc)
  };
}

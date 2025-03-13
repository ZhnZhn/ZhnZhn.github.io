import {
  isNumber,
  isUndef,
  isNotEmptyArr
} from '../utils/isTypeFn';

import {
  FN_NOOP,
} from './AdapterFn';
import {
  crVolumePoint,
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
  , _arr = _getNotEmptyArr(arr) || []
  , _isVolume = isNumber(arr[0][5])
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
      volume
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
        dVc.push(
          crVolumePoint({
             open, close, volume, date,
             option: { _high: high, _low: low }
          })
        )
        dMfi.push([date, close, high, low, close, volume])
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
    dMfi: _getNotEmptyArr(dMfi)
  };
}

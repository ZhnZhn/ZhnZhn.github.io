import {
  FN_NOOP,
  isUndef,
  isNotEmptyArr,
  ymdhmsToUTC
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
  isAth=true,
  isVolume=true,
  toDate=ymdhmsToUTC,
  arr,
  seriaOption,
  option
}) => {
  const {
    isAllSeries=true,
    pnDate='date',
  } = seriaOption || {}
  , {
    isNotZoomToMinMax,
    isDrawDeltaExtrems,
    seriaType,
    seriaColor,
    seriaWidth
  } = option || {}
  , dC = [], dO = [], dH = [], dL = []
  , dV = [], dVc = []
  , dATH = [], dMfi = []
  , _addATHPointTo = isAth
     ? _fAddAthPointTo()
     : FN_NOOP;

  let minClose = Number.POSITIVE_INFINITY
  , maxClose = Number.NEGATIVE_INFINITY;

  (arr || []).forEach(item => {
    const {
      open,
      high,
      low,
      close,
      volume
    } = item
    , _date = toDate(item[pnDate] || '');

    dC.push([_date, close])
    if (minClose > close) { minClose = close }
    if (maxClose < close) { maxClose = close }

    if (isAllSeries) {
      dO.push([_date, open])
      dH.push([_date, high])
      dL.push([_date, low])

      if (isVolume) {
        dV.push([_date, volume])
        dVc.push(
          crVolumePoint({
             open, close, volume, date: _date,
             option: { _high: high, _low: low }
          })
        )
        dMfi.push([_date, close, high, low, close, volume])
      }

      _addATHPointTo(dATH, _date, open, close)
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
    isNotZoomToMinMax,
    isDrawDeltaExtrems,
    seriaType,
    seriaColor,
    seriaWidth
  };
}

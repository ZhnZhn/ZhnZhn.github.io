import { ymdhmsToUTC } from './AdapterFn';
import {
  crVolumePoint,
  crAthPoint
} from './pointFn';

const _isUndef = v => typeof v === 'undefined';
const _getNotEmptyErr = arr => arr.length === 0
  ? void 0
  : arr


export const toStockSeriesData = ({
  isAth=true,
  isVolume=true,
  arr=[],
  toDate=ymdhmsToUTC,
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
  } = option || {};
  const dC = [], dO = [], dH = [], dL = []
  , dV = [], dVc = []
  , dATH = [], dMfi = [];
  let _prevClose
  , minClose = Number.POSITIVE_INFINITY
  , maxClose = Number.NEGATIVE_INFINITY;
  arr.forEach(item => {
    const {
       open,
       high,
       low,
       close,
       volume
      } = item
    , date = item[pnDate] || ''
    , _date = toDate(date);

    dC.push([_date, close])

    if (isAllSeries) {
      if (minClose > close) { minClose = close }
      if (maxClose < close ) { maxClose = close }

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
        dMfi.push([date, close, high, low, close, volume])
      }

      if (isAth) {
        dATH.push(!_isUndef(_prevClose)
          ? crAthPoint({
             date: _date,
             close: _prevClose,
             open
            })
          : crAthPoint({
             date: _date,
             close: close,
             open: close
            })
        )
        _prevClose = close
     }
   }
  })
  return {
    dC, dO, dH, dL,
    minClose,
    maxClose,
    dVc: _getNotEmptyErr(dVc),
    dV: _getNotEmptyErr(dV),
    dATH: _getNotEmptyErr(dATH),
    dMfi: _getNotEmptyErr(dMfi),
    isNotZoomToMinMax,
    isDrawDeltaExtrems,
    seriaType,
    seriaColor,
    seriaWidth
  };
}

"use strict";

exports.__esModule = true;
exports.toStockSeriesData = void 0;
var _isTypeFn = require("../utils/isTypeFn");
var _mathFn = require("../math/mathFn");
var _AdapterFn = require("./AdapterFn");
var _pointFn = require("./pointFn");
const _getNotEmptyArr = arr => (0, _isTypeFn.isNotEmptyArr)(arr) ? arr : void 0;
const _fAddAthPointTo = () => {
  let _prevClose;
  return (dATH, _date, open, close) => {
    dATH.push((0, _isTypeFn.isUndef)(_prevClose) ? (0, _pointFn.crAthPoint)({
      date: _date,
      close: close,
      open: close
    }) : (0, _pointFn.crAthPoint)({
      date: _date,
      close: _prevClose,
      open
    }));
    _prevClose = close;
  };
};
const toStockSeriesData = _ref => {
  let {
    isAth,
    isAllSeries = true,
    arr
  } = _ref;
  const dC = [],
    dO = [],
    dH = [],
    dL = [],
    dV = [],
    dVc = [],
    dATH = [],
    dMfi = [],
    dN = [],
    dNc = [],
    _arr = _getNotEmptyArr(arr) || [],
    _itemFirst = _arr[0] || [],
    _isVolume = (0, _isTypeFn.isNumber)(_itemFirst[5]),
    _isNumberOfTrades = (0, _isTypeFn.isNumber)(_itemFirst[6]),
    _addATHPointTo = isAth ? _fAddAthPointTo() : _AdapterFn.FN_NOOP;
  let minClose = _mathFn.POSITIVE_INFINITY,
    maxClose = _mathFn.NEGATIVE_INFINITY;
  _arr.forEach(item => {
    const [date, open, high, low, close, volume, numberOfTrades] = item;
    dC.push([date, close]);
    if (minClose > close) {
      minClose = close;
    }
    if (maxClose < close) {
      maxClose = close;
    }
    if (isAllSeries) {
      dO.push([date, open]);
      dH.push([date, high]);
      dL.push([date, low]);
      if (_isVolume) {
        dV.push([date, volume]);
        dVc.push((0, _pointFn.crVolumeColorPoint)(date, open, close, volume));
        dMfi.push([date, close, high, low, close, volume]);
      }
      if (_isNumberOfTrades) {
        dN.push([date, numberOfTrades]);
        dNc.push((0, _pointFn.crVolumeColorPoint)(date, open, close, numberOfTrades));
      }
      _addATHPointTo(dATH, date, open, close);
    }
  });
  return {
    dC,
    dO,
    dH,
    dL,
    minClose,
    maxClose,
    dVc: _getNotEmptyArr(dVc),
    dV: _getNotEmptyArr(dV),
    dATH: _getNotEmptyArr(dATH),
    dMfi: _getNotEmptyArr(dMfi),
    dN: _getNotEmptyArr(dN),
    dNc: _getNotEmptyArr(dNc)
  };
};
exports.toStockSeriesData = toStockSeriesData;
//# sourceMappingURL=AdapterStockFn.js.map
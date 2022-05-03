"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.toStockSeriesData = void 0;

var _AdapterFn = _interopRequireDefault(require("./AdapterFn"));

const {
  ymdhmsToUTC,
  crVolumePoint,
  crAthPoint
} = _AdapterFn.default;

const _isUndef = v => typeof v === 'undefined';

const toStockSeriesData = _ref => {
  let {
    arr = [],
    toDate = ymdhmsToUTC,
    seriaOption,
    option
  } = _ref;
  const {
    isAllSeries = true,
    pnDate = 'date'
  } = seriaOption || {},
        {
    isNotZoomToMinMax,
    isDrawDeltaExtrems,
    seriaType,
    seriaColor,
    seriaWidth
  } = option || {};
  const dC = [],
        dO = [],
        dH = [],
        dL = [],
        dV = [],
        dVc = [],
        dATH = [],
        dMfi = [];

  let _prevClose,
      minClose = Number.POSITIVE_INFINITY,
      maxClose = Number.NEGATIVE_INFINITY;

  arr.forEach(item => {
    const {
      open,
      high,
      low,
      close,
      volume
    } = item,
          date = item[pnDate] || '',
          _date = toDate(date);

    dC.push([_date, close]);

    if (isAllSeries) {
      if (minClose > close) {
        minClose = close;
      }

      if (maxClose < close) {
        maxClose = close;
      }

      dO.push([_date, open]);
      dH.push([_date, high]);
      dL.push([_date, low]);
      dV.push([_date, volume]);
      dVc.push(crVolumePoint({
        open,
        close,
        volume,
        date: _date,
        option: {
          _high: high,
          _low: low
        }
      }));
      dMfi.push([date, close, high, low, close, volume]);
      dATH.push(!_isUndef(_prevClose) ? crAthPoint({
        date: _date,
        close: _prevClose,
        open
      }) : crAthPoint({
        date: _date,
        close: close,
        open: close
      }));
      _prevClose = close;
    }
  });
  return {
    dC,
    dO,
    dH,
    dL,
    minClose,
    maxClose,
    dVc,
    dV,
    dATH,
    dMfi,
    isNotZoomToMinMax,
    isDrawDeltaExtrems,
    seriaType,
    seriaColor,
    seriaWidth
  };
};

exports.toStockSeriesData = toStockSeriesData;
//# sourceMappingURL=AdapterStockFn.js.map
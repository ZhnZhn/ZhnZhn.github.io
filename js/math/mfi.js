"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _DateUtils = _interopRequireDefault(require("../utils/DateUtils"));

var ymdToUTC = _DateUtils["default"].ymdToUTC;

var _getPriceAndFlow = function _getPriceAndFlow(point) {
  var close = point[4],
      high = point[2] || close,
      low = point[3] || close,
      bTp = (0, _big["default"])(high).plus(low).plus(close).div(3),
      bRmf = bTp.times(point[5]),
      isFullData = point[2] && point[3] ? true : false;
  return [bTp, bRmf, isFullData];
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number' && n - n === 0;
};

var _crMfiPoint = function _crMfiPoint(p, y, isNegative, bTp, bRmf) {
  return {
    x: _isNumber(p) ? p : ymdToUTC(p),
    y: y,
    isNegative: isNegative,
    tp: parseFloat(bTp.toFixed(4)),
    rmf: parseFloat(bRmf.toFixed(4))
  };
};

var mfi = function mfi(data, period) {
  var dataMfi = [],
      nPeriod = parseFloat(period) + 1;
  var bPositiveFlow = (0, _big["default"])(0),
      bNegativeFlow = (0, _big["default"])('0.0001'),
      isNegative = false,
      nNotFullPoint = 0,
      max = data.length,
      i = 0;

  for (; i < max; i++) {
    var point = data[i],
        _getPriceAndFlow2 = _getPriceAndFlow(point),
        bTp = _getPriceAndFlow2[0],
        bRmf = _getPriceAndFlow2[1],
        isFullData = _getPriceAndFlow2[2];

    if (!isFullData) {
      nNotFullPoint += 1;
    }

    if (i < nPeriod) {
      if (i != 0) {
        if (bTp.gt(dataMfi[i - 1].tp)) {
          bPositiveFlow = bPositiveFlow.plus(bRmf);
          isNegative = false;
        } else {
          bNegativeFlow = bNegativeFlow.plus(bRmf);
          isNegative = true;
        }
      }

      dataMfi.push(_crMfiPoint(point[0], null, isNegative, bTp, bRmf));
    } else {
      if (bTp.gt(dataMfi[i - 1].tp)) {
        bPositiveFlow = bPositiveFlow.plus(bRmf);
        isNegative = false;
      } else {
        bNegativeFlow = bNegativeFlow.plus(bRmf);
        isNegative = true;
      }

      var _rmf = dataMfi[i - period].rmf;

      if (dataMfi[i - period].isNegative) {
        bNegativeFlow = bNegativeFlow.minus(_rmf);
      } else {
        bPositiveFlow = bPositiveFlow.minus(_rmf);
      }

      var bMFR_PlusOne = bPositiveFlow.div(bNegativeFlow).plus(1),
          bRatio = (0, _big["default"])(100).div(bMFR_PlusOne),
          bY = (0, _big["default"])(100).minus(bRatio);
      dataMfi.push(_crMfiPoint(point[0], parseFloat(bY.toFixed(2)), isNegative, bTp, bRmf));
    }
  }

  return [dataMfi, nNotFullPoint];
};

var _default = mfi;
exports["default"] = _default;
//# sourceMappingURL=mfi.js.map
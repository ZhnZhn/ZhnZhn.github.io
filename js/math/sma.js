"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _seriaHelperFn = _interopRequireDefault(require("./seriaHelperFn"));

var isNumber = _seriaHelperFn["default"].isNumber,
    crPointGetter = _seriaHelperFn["default"].crPointGetter;
var _isArr = Array.isArray;
/*
const _crPeriod = (period, plus) => {
  const _delta = isNumber(plus) ? 1 - plus : 1;
  return parseFloat(
    Big(period)
     .minus(_delta)
     .toFixed(0)
  );
};
*/

var sma = function sma(data, period) {
  if (period === void 0) {
    period = 1;
  }

  var dataSma = [],
      _period = parseInt(period, 10) - 1;

  if (!(_isArr(data) && isNumber(_period) && data.length && _period < data.length)) {
    return dataSma;
  }

  if (_period <= 0) {
    return data;
  }

  var _crPointGetter = crPointGetter(data),
      getX = _crPointGetter.getX,
      getY = _crPointGetter.getY,
      _data = data.filter(function (p) {
    return isNumber(getY(p));
  });

  var bSum = (0, _big["default"])('0.0'),
      point,
      i = 0;

  for (; i < _data.length; i++) {
    point = _data[i];

    if (i >= _period) {
      bSum = i === _period ? bSum.plus(getY(point)) : bSum.plus(getY(point)).minus(getY(_data[i - period]));
      dataSma.push([getX(point), parseFloat(bSum.div(period).toFixed(2))]);
    } else {
      bSum = bSum.plus(getY(point));
    }
  }

  return dataSma;
};

var _default = sma;
exports["default"] = _default;
//# sourceMappingURL=sma.js.map
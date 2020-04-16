"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _seriaHelperFn = _interopRequireDefault(require("./seriaHelperFn"));

var isNumber = _seriaHelperFn["default"].isNumber,
    crPointGetter = _seriaHelperFn["default"].crPointGetter;

var _crPeriod = function _crPeriod(period, plus) {
  var _delta = isNumber(plus) ? 1 - plus : 1;

  return parseFloat((0, _big["default"])(period).minus(_delta).toFixed(0));
};

var sma = function sma(data, period, plus) {
  if (period === void 0) {
    period = 1;
  }

  var dataSma = [];

  if (!Array.isArray(data) || data.length === 0) {
    return dataSma;
  }

  var _period = _crPeriod(period, plus),
      _crPointGetter = crPointGetter(data),
      getX = _crPointGetter.getX,
      getY = _crPointGetter.getY,
      _data = data.filter(function (p) {
    return isNumber(getY(p));
  }),
      max = _data.length;

  var bSum = (0, _big["default"])('0.0'),
      point;

  for (var i = 0; i < max; i++) {
    point = _data[i];

    if (i > _period) {
      bSum = bSum.plus(getY(point)).minus(getY(_data[i - period]));
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
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _seriaHelperFn = require("./seriaHelperFn");

const sma = function (data, period) {
  if (period === void 0) {
    period = 1;
  }

  const dataSma = [],
        _period = parseInt(period, 10) - 1;

  if (!((0, _seriaHelperFn.isNotEmptyArr)(data) && (0, _seriaHelperFn.isNumber)(_period) && _period < data.length)) {
    return dataSma;
  }

  if (_period <= 0) {
    return data;
  }

  const {
    getX,
    getY
  } = (0, _seriaHelperFn.crPointGetter)(data),
        _data = data.filter(p => (0, _seriaHelperFn.isNumber)(getY(p)));

  let bSum = (0, _big.default)('0.0'),
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
exports.default = _default;
//# sourceMappingURL=sma.js.map
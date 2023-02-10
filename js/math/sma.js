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
  const [_data, _dataX] = (0, _seriaHelperFn.crDataArrays)(data),
    _dataLength = _data.length,
    _period = parseInt(period, 10) - 1,
    dataSma = [];
  if (_dataLength === 0 || !(0, _seriaHelperFn.isNumber)(_period) || _period > _dataLength) {
    return dataSma;
  }
  if (_period <= 0) {
    return data;
  }
  let bSum = (0, _big.default)(0),
    i = 0;
  for (; i < _dataLength; i++) {
    bSum = bSum.plus(_data[i]);
    if (i >= _period) {
      if (i !== _period) {
        bSum = bSum.minus(_data[i - period]);
      }
      dataSma.push([_dataX[i], parseFloat(bSum.div(period).toFixed(2))]);
    }
  }
  return dataSma;
};
var _default = sma;
exports.default = _default;
//# sourceMappingURL=sma.js.map
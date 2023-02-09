"use strict";

exports.__esModule = true;
exports.rsi = void 0;
var _seriaHelperFn = require("./seriaHelperFn");
var _pointwise = require("./pointwise");
var _ema = require("./ema");
const _rsi = (closePrices, window) => {
  let gains = [0],
    loss = [1e-14],
    _len = closePrices.length,
    i;
  for (i = 1; i < _len; i++) {
    let diff = closePrices[i] - closePrices[i - 1];
    gains.push(diff >= 0 ? diff : 0);
    loss.push(diff < 0 ? -diff : 0);
  }
  return (0, _pointwise.pointwise)((a, b) => 100 - 100 / (1 + a / b), (0, _ema.ema)(gains, 2 * window - 1), (0, _ema.ema)(loss, 2 * window - 1));
};
const rsi = (data, period) => {
  const [_dataToRsi, _dataToX] = (0, _seriaHelperFn.crDataArrays)(data);
  return (0, _seriaHelperFn.mergeToChartPoints)(_dataToX.slice(period), _rsi(_dataToRsi, period).slice(period));
};
exports.rsi = rsi;
//# sourceMappingURL=rsi.js.map
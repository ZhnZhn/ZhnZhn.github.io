"use strict";

exports.__esModule = true;
exports.ema = void 0;
var _avg = require("./avg");
const ema = (series, window, start) => {
  let weight = 2 / (window + 1),
    ema = [start || (0, _avg.avg)(series.slice(0, window))],
    _len = series.length,
    i;
  for (i = 1; i < _len; i++) {
    ema.push(series[i] * weight + (1 - weight) * ema[i - 1]);
  }
  return ema;
};
exports.ema = ema;
//# sourceMappingURL=ema.js.map
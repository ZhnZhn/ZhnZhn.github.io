"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.avg = void 0;
var _big = _interopRequireDefault(require("big.js"));
const avg = series => {
  const _len = series.length;
  return _len ? parseFloat(series.reduce((bResult, value) => bResult.add(value), (0, _big.default)(0)).div(_len).toFixed()) : NaN;
};
exports.avg = avg;
//# sourceMappingURL=avg.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _big = _interopRequireDefault(require("big.js"));
var _dateFn = require("../utils/dateFn");
const _getPriceAndFlow = point => {
  const close = point[4],
    high = point[2] || close,
    low = point[3] || close,
    bTp = (0, _big.default)(high).plus(low).plus(close).div(3),
    bRmf = bTp.times(point[5]),
    isFullData = !!(point[2] && point[3]);
  return [bTp, bRmf, isFullData];
};
const _isNumber = n => typeof n === 'number' && n - n === 0;
const _crMfiPoint = (p, y, isNegative, bTp, bRmf) => ({
  x: _isNumber(p) ? p : (0, _dateFn.ymdToUTC)(p),
  y,
  isNegative,
  tp: parseFloat(bTp.toFixed(4)),
  rmf: parseFloat(bRmf.toFixed(4))
});
const mfi = (data, period) => {
  const dataMfi = [],
    nPeriod = parseFloat(period) + 1;
  let bPositiveFlow = (0, _big.default)(0),
    bNegativeFlow = (0, _big.default)('0.0001'),
    isNegative = false,
    nNotFullPoint = 0,
    max = data.length,
    i = 0;
  for (; i < max; i++) {
    const point = data[i],
      [bTp, bRmf, isFullData] = _getPriceAndFlow(point);
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
      const _rmf = dataMfi[i - period].rmf;
      if (dataMfi[i - period].isNegative) {
        bNegativeFlow = bNegativeFlow.minus(_rmf);
      } else {
        bPositiveFlow = bPositiveFlow.minus(_rmf);
      }
      const bMFR_PlusOne = bPositiveFlow.div(bNegativeFlow).plus(1),
        bRatio = (0, _big.default)(100).div(bMFR_PlusOne),
        bY = (0, _big.default)(100).minus(bRatio);
      dataMfi.push(_crMfiPoint(point[0], parseFloat(bY.toFixed(2)), isNegative, bTp, bRmf));
    }
  }
  return [dataMfi, nNotFullPoint];
};
var _default = mfi;
exports.default = _default;
//# sourceMappingURL=mfi.js.map
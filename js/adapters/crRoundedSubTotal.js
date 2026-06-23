"use strict";

exports.__esModule = true;
exports.crRoundedSubTotal = exports.crItemRt = void 0;
var _isTypeFn = require("../utils/isTypeFn");
var _mathFn = require("../math/mathFn");
const _crSubValue = value => (0, _isTypeFn.isNumber)(value) ? value : 0;
const crItemRt = (value, rt) => value >= 10 ? rt : value >= 0.01 ? 2 : value >= 0.0001 ? 4 : 6;
exports.crItemRt = crItemRt;
const _crSubTotalRt = (value, rt) => (0, _isTypeFn.isNumber)(rt) ? crItemRt(value, rt) : 0;
const _isZeroValueCase = (v, sum) => sum === 0 && v !== 0;
const crRoundedSubTotal = (v1, v2, total, totalRt) => {
  const _v1 = _crSubValue(v1),
    _v2 = _crSubValue(v2),
    _rt1 = _crSubTotalRt(_v1, totalRt),
    _rt2 = _crSubTotalRt(_v2, totalRt),
    _sum1 = (0, _mathFn.roundBy)(_v1, _rt1),
    _sum2 = (0, _mathFn.roundBy)(_v2, _rt2);
  return _sum1 + _sum2 > total || _isZeroValueCase(_v1, _sum1) || _isZeroValueCase(_v2, _sum2) ? [(0, _mathFn.roundBy)(_v1, _rt1 + 1), (0, _mathFn.roundBy)(_v2, _rt2 + 1)] : [_sum1, _sum2];
};
exports.crRoundedSubTotal = crRoundedSubTotal;
//# sourceMappingURL=crRoundedSubTotal.js.map
"use strict";

exports.__esModule = true;
exports.default = void 0;
var _seriaHelperFn = require("./seriaHelperFn");
const _crIndicatorData = (d, rt, calc, getX, getY) => {
  const _d = [],
    max = d.length,
    prevStep = rt - 1;
  let pPrev = d[0],
    pNext,
    i = rt;
  for (; i < max; i++) {
    pNext = d[i];
    _d.push([getX(pNext), calc(getY(pPrev), getY(pNext))]);
    pPrev = d[i - prevStep];
  }
  return _d;
};
const fIndicatorCalc = calc => function (d, rt) {
  if (rt === void 0) {
    rt = 1;
  }
  const [getX, getY] = (0, _seriaHelperFn.crPointGetter)(d),
    _rt = parseInt(rt, 10);
  if (!(getX && (0, _seriaHelperFn.isNumber)(_rt) && _rt > 0 && d.length > _rt)) {
    return [];
  }
  return _crIndicatorData(d, _rt, calc, getX, getY);
};
var _default = fIndicatorCalc;
exports.default = _default;
//# sourceMappingURL=fIndicatorCalc.js.map
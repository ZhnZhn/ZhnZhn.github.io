"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _seriaHelperFn = _interopRequireDefault(require("./seriaHelperFn"));

var isNotEmptyArr = _seriaHelperFn["default"].isNotEmptyArr,
    isNumber = _seriaHelperFn["default"].isNumber,
    crPointGetter = _seriaHelperFn["default"].crPointGetter;

var _crIndicatorData = function _crIndicatorData(d, rt, calc) {
  var _d = [],
      max = d.length,
      prevStep = rt - 1,
      _crPointGetter = crPointGetter(d),
      getX = _crPointGetter.getX,
      getY = _crPointGetter.getY;

  var pPrev = d[0],
      pNext,
      i = rt;

  for (; i < max; i++) {
    pNext = d[i];

    _d.push([getX(pNext), calc(getY(pPrev), getY(pNext))]);

    pPrev = d[i - prevStep];
  }

  return _d;
};

var fIndicatorCalc = function fIndicatorCalc(calc) {
  return function (d, rt) {
    if (rt === void 0) {
      rt = 1;
    }

    var _rt = parseInt(rt, 10);

    if (!(isNotEmptyArr(d) && isNumber(_rt) && _rt > 0 && d.length > _rt)) {
      return [];
    }

    return _crIndicatorData(d, _rt, calc);
  };
};

var _default = fIndicatorCalc;
exports["default"] = _default;
//# sourceMappingURL=fIndicatorCalc.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _isNumber = function _isNumber(n) {
  return typeof n === "number" && n - n === 0;
};

var roc = function roc(yPrev, yNext) {
  if (!_isNumber(yPrev) || !_isNumber(yNext)) {
    return null;
  }

  if (yNext === 0) {
    return yPrev === 0 ? 0 : yPrev > 0 ? -100 : 100;
  }

  if (yPrev === 0) {
    return null;
  }

  return parseFloat((0, _big["default"])(yNext).minus(yPrev).div(Math.abs(yPrev)).times(100).toFixed(2));
};

var _default = roc;
exports["default"] = _default;
//# sourceMappingURL=roc.js.map
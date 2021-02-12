"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _fCategoryCalc = _interopRequireDefault(require("./fCategoryCalc"));

var _calc = function _calc(p1, p2) {
  return p2 && p2.y !== 0 ? parseFloat((0, _big["default"])(p1.y).div(p2.y).toFixed(2)) : 0;
};

var categoryRate = (0, _fCategoryCalc["default"])(_calc);
var _default = categoryRate;
exports["default"] = _default;
//# sourceMappingURL=categoryRate.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _fCategoryCalc = _interopRequireDefault(require("./fCategoryCalc"));

var _calc = function _calc(p1, p2) {
  return p2 && p2.y !== null ? parseFloat((0, _big["default"])(p1.y).minus(p2.y).toString()) : 0;
};

var categoryDiff = (0, _fCategoryCalc["default"])(_calc);
var _default = categoryDiff;
exports["default"] = _default;
//# sourceMappingURL=categoryDiff.js.map
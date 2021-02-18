"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fCategoryCalc = _interopRequireDefault(require("./fCategoryCalc"));

var _roc = _interopRequireDefault(require("./roc"));

var _calc = function _calc(p1, p2) {
  return (0, _roc["default"])((p2 || {}).y, p1.y);
},
    categoryRoc = (0, _fCategoryCalc["default"])(_calc);

var _default = categoryRoc;
exports["default"] = _default;
//# sourceMappingURL=categoryRoc.js.map
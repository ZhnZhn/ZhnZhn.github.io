"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _sma = _interopRequireDefault(require("./sma"));

var _mfi = _interopRequireDefault(require("./mfi"));

var _momAth = _interopRequireDefault(require("./momAth"));

var _categoryRate = _interopRequireDefault(require("./categoryRate"));

var _categoryDiff = _interopRequireDefault(require("./categoryDiff"));

var _pby = _interopRequireDefault(require("./pby10"));

var tsIndicators = {
  sma: _sma["default"],
  mfi: _mfi["default"],
  momAth: _momAth["default"],
  categoryRate: _categoryRate["default"],
  categoryDiff: _categoryDiff["default"],
  pby10: _pby["default"]
};
var _default = tsIndicators;
exports["default"] = _default;
//# sourceMappingURL=tsIndicators.js.map
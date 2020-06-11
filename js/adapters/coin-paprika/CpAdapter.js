"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _toChartConfig = _interopRequireDefault(require("./toChartConfig"));

var _toTwConfig = _interopRequireDefault(require("./toTwConfig"));

var _crAdapter = _interopRequireDefault(require("../crAdapter"));

var _rAdapter = {
  DF: _toChartConfig["default"],
  TW: _toTwConfig["default"]
};

var _getAdapter = function _getAdapter(option) {
  var dfRoute = option.dfRoute;
  return _rAdapter[dfRoute] || _rAdapter.DF;
};

var CpAdapter = (0, _crAdapter["default"])(_getAdapter, {
  isKey: true
});
var _default = CpAdapter;
exports["default"] = _default;
//# sourceMappingURL=CpAdapter.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Scatter = _interopRequireDefault(require("./Scatter"));

var _toEarningsImpl = _interopRequireDefault(require("./toEarningsImpl"));

var _toDividendsImpl = _interopRequireDefault(require("./toDividendsImpl"));

var _toChart = _interopRequireDefault(require("./toChart"));

var _ChartType = _interopRequireDefault(require("./ChartType"));

var _r2;

var _r = (_r2 = {
  DF: _toChart["default"]
}, _r2[_ChartType["default"].ERN] = (0, _Scatter["default"])(_toEarningsImpl["default"]), _r2[_ChartType["default"].DIV] = (0, _Scatter["default"])(_toDividendsImpl["default"]), _r2[_ChartType["default"].CHART] = _toChart["default"], _r2);

var RouterAdapter = {
  getAdapter: function getAdapter(option) {
    var dfType = option.dfType;
    return _r[dfType] || _r.DF;
  }
};
var _default = RouterAdapter;
exports["default"] = _default;
//# sourceMappingURL=RouterAdapter.js.map
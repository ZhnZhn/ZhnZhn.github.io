"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _TemplateScatter = _interopRequireDefault(require("./TemplateScatter"));

var _TemplateTokens = _interopRequireDefault(require("./TemplateTokens"));

var _toCompanyImpl = _interopRequireDefault(require("./toCompanyImpl"));

var _toStatsImpl = _interopRequireDefault(require("./toStatsImpl"));

var _toEarningsImpl = _interopRequireDefault(require("./toEarningsImpl"));

var _toDividendsImpl = _interopRequireDefault(require("./toDividendsImpl"));

var _toChart = _interopRequireDefault(require("./toChart"));

var _ChartType = _interopRequireDefault(require("./ChartType"));

var _r2;

var _r = (_r2 = {
  DF: _toChart["default"]
}, _r2[_ChartType["default"].ERN] = (0, _TemplateScatter["default"])(_toEarningsImpl["default"]), _r2[_ChartType["default"].DIV] = (0, _TemplateScatter["default"])(_toDividendsImpl["default"]), _r2[_ChartType["default"].CHART] = _toChart["default"], _r2[_ChartType["default"].COM] = (0, _TemplateTokens["default"])(_toCompanyImpl["default"]), _r2[_ChartType["default"].STA] = (0, _TemplateTokens["default"])(_toStatsImpl["default"]), _r2);

var RouterAdapter = {
  getAdapter: function getAdapter(option) {
    var dfType = option.dfType;
    return _r[dfType] || _r.DF;
  }
};
var _default = RouterAdapter;
exports["default"] = _default;
//# sourceMappingURL=RouterAdapter.js.map
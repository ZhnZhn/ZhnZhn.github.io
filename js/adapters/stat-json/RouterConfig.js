"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ChartType = require("../../constants/ChartType");
var _toSpline = _interopRequireDefault(require("./toSpline"));
var _toYearly = _interopRequireDefault(require("./toYearly"));
var _toColumn = _interopRequireDefault(require("./toColumn"));
var _toTreeMap = _interopRequireDefault(require("./toTreeMap"));
const _r = {
  ..._toColumn.default,
  ..._toTreeMap.default,
  DF: _toSpline.default,
  [_ChartType.CHT_AREA]: _toSpline.default,
  [_ChartType.CHT_SPLINE]: _toSpline.default,
  [_ChartType.CHT_COLUMN]: _toSpline.default,
  [_ChartType.CHT_AREA_YEARLY]: _toYearly.default
};
const RouterConfig = {
  getCrConfig: seriaType => _r[seriaType] || _r.DF
};
var _default = exports.default = RouterConfig;
//# sourceMappingURL=RouterConfig.js.map
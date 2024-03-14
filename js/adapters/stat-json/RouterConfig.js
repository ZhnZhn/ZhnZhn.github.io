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
  DF: _toSpline.default,
  [_ChartType.CHT_AREA]: _toSpline.default,
  [_ChartType.CHT_SPLINE]: _toSpline.default,
  [_ChartType.CHT_COLUMN]: _toSpline.default,
  [_ChartType.CHT_AREA_YEARLY]: _toYearly.default,
  [_ChartType.CHT_TREE_MAP]: _toTreeMap.default.fCrConfig(),
  [_ChartType.CHT_TREE_MAP_CLUSTER]: _toTreeMap.default.fCrConfig({
    isCluster: true
  }),
  [_ChartType.CHT_TREE_MAP_2]: _toTreeMap.default.fCrConfig({}, {
    depth: "d2"
  }),
  [_ChartType.CHT_TREE_MAP_2_CLUSTER]: _toTreeMap.default.fCrConfig({
    isCluster: true
  }, {
    depth: "d2"
  })
};
const RouterConfig = {
  getCrConfig: seriaType => _r[seriaType] || _r.DF
};
var _default = exports.default = RouterConfig;
//# sourceMappingURL=RouterConfig.js.map
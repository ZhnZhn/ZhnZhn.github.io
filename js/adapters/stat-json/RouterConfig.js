"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _toSpline = _interopRequireDefault(require("./toSpline"));

var _toYearly = _interopRequireDefault(require("./toYearly"));

var _toColumn = _interopRequireDefault(require("./toColumn"));

var _toTreeMap = _interopRequireDefault(require("./toTreeMap"));

const _r = {
  DF: _toSpline.default.crConfig,
  AREA: _toSpline.default.crConfig,
  SPLINE: _toSpline.default.crConfig,
  COLUMN: _toSpline.default.crConfig,
  AREA_YEARLY: _toYearly.default.crConfig,
  COLUMN_SET: _toColumn.default.fCrConfig({
    seriaType: 'COLUMN'
  }),
  BAR_SET: _toColumn.default.fCrConfig({
    seriaType: 'BAR'
  }),
  COLUMN_CLUSTER: _toColumn.default.fCrConfig({
    isCluster: true,
    seriaType: 'COLUMN'
  }),
  BAR_CLUSTER: _toColumn.default.fCrConfig({
    isCluster: true,
    seriaType: 'BAR'
  }),
  TREE_MAP: _toTreeMap.default.fCrConfig(),
  TREE_MAP_CLUSTER: _toTreeMap.default.fCrConfig({
    isCluster: true
  }),
  TREE_MAP_2: _toTreeMap.default.fCrConfig({}, {
    depth: "d2"
  }),
  TREE_MAP_2_CLUSTER: _toTreeMap.default.fCrConfig({
    isCluster: true
  }, {
    depth: "d2"
  })
};
const RouterConfig = {
  getCrConfig: seriaType => _r[seriaType] || _r.DF
};
var _default = RouterConfig;
exports.default = _default;
//# sourceMappingURL=RouterConfig.js.map
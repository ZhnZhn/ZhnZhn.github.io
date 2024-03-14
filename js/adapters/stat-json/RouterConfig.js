"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _toColumn = _interopRequireDefault(require("./toColumn"));
var _toTreeMap = _interopRequireDefault(require("./toTreeMap"));
var _toSpline = _interopRequireDefault(require("./toSpline"));
const _r = {
  ..._toColumn.default,
  ..._toTreeMap.default,
  ..._toSpline.default
};
const RouterConfig = {
  getCrConfig: seriaType => _r[seriaType] || _r.DF
};
var _default = exports.default = RouterConfig;
//# sourceMappingURL=RouterConfig.js.map
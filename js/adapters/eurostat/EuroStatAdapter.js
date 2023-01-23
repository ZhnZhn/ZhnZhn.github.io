"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _toSpline = _interopRequireDefault(require("./toSpline"));
var _toAreaYearly = _interopRequireDefault(require("./toAreaYearly"));
var _toCategory = require("./toCategory");
var _toMap = _interopRequireDefault(require("./toMap"));
const DF_TYPE = 'SPLINE';
const _rToConfig = {
  AREA: _toSpline.default.createConfig,
  SPLINE: _toSpline.default.createConfig,
  COLUMN: _toSpline.default.createConfig,
  AREA_YEARLY: _toAreaYearly.default.createConfig,
  MAP: _toMap.default.createConfig,
  COLUMN_SET: _toCategory.crCategoryConfig,
  BAR_SET: _toCategory.crCategoryConfig,
  BAR_WITH_LABELS: _toCategory.crCategoryConfig,
  DOT_SET: _toCategory.crCategoryConfig
};
const _rToSeria = {
  AREA: _toSpline.default.createSeria,
  SPLINE: _toSpline.default.createSeria,
  COLUMN: _toSpline.default.createSeria,
  COLUMN_SET: _toCategory.crCategorySeria,
  BAR_SET: _toCategory.crCategorySeria,
  BAR_WITH_LABELS: _toCategory.crCategorySeria,
  DOT_SET: _toCategory.crCategorySeria
};
const _checkSeriaType = function (router, option, dfType) {
  if (dfType === void 0) {
    dfType = DF_TYPE;
  }
  if (!option.seriaType || !router[option.seriaType]) {
    option.seriaType = dfType;
  }
};
const EuroStatAdapter = {
  toConfig(json, option) {
    _checkSeriaType(_rToConfig, option);
    const {
        seriaType,
        zhCompType
      } = option,
      fnToConfig = _rToConfig[seriaType],
      config = fnToConfig ? fnToConfig(json, option) : {};
    config.zhCompType = zhCompType;
    return {
      config
    };
  },
  toSeries(json, option, chart) {
    _checkSeriaType(_rToConfig, option);
    const {
        seriaType
      } = option,
      fnToSeria = _rToSeria[seriaType],
      seria = fnToSeria ? fnToSeria(json, option, chart) : void 0;
    return seria;
  }
};
var _default = EuroStatAdapter;
exports.default = _default;
//# sourceMappingURL=EuroStatAdapter.js.map
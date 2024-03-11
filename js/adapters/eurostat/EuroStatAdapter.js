"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ChartType = require("../../constants/ChartType");
var _toSpline = require("./toSpline");
var _toAreaYearly = require("./toAreaYearly");
var _toCategory = require("./toCategory");
var _toMap = require("./toMap");
const DF_TYPE = _ChartType.CHT_SPLINE;
const _rToConfig = {
  [_ChartType.CHT_AREA]: _toSpline.crSplineConfig,
  [_ChartType.CHT_SPLINE]: _toSpline.crSplineConfig,
  [_ChartType.CHT_COLUMN]: _toSpline.crSplineConfig,
  [_ChartType.CHT_AREA_YEARLY]: _toAreaYearly.crAreaYearlyConfig,
  [_ChartType.CHT_MAP]: _toMap.crMapConfig,
  [_ChartType.CHT_COLUMN_SET]: _toCategory.crCategoryConfig,
  [_ChartType.CHT_BAR_SET]: _toCategory.crCategoryConfig,
  [_ChartType.CHT_BAR_WITH_LABELS]: _toCategory.crCategoryConfig,
  [_ChartType.CHT_DOT_SET]: _toCategory.crCategoryConfig
};
const _rToSeria = {
  [_ChartType.CHT_AREA]: _toSpline.crSplineSeria,
  [_ChartType.CHT_SPLINE]: _toSpline.crSplineSeria,
  [_ChartType.CHT_COLUMN]: _toSpline.crSplineSeria,
  [_ChartType.CHT_COLUMN_SET]: _toCategory.crCategorySeria,
  [_ChartType.CHT_BAR_SET]: _toCategory.crCategorySeria,
  [_ChartType.CHT_BAR_WITH_LABELS]: _toCategory.crCategorySeria,
  [_ChartType.CHT_DOT_SET]: _toCategory.crCategorySeria
};
const _checkSeriaType = function (router, option, dfType) {
  if (dfType === void 0) {
    dfType = DF_TYPE;
  }
  const {
    seriaType
  } = option;
  if (!seriaType || !router[seriaType]) {
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
      _crConfig = _rToConfig[seriaType],
      config = _crConfig ? _crConfig(json, option) : {};
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
      _crSeria = _rToSeria[seriaType],
      seria = _crSeria ? _crSeria(json, option, chart) : void 0;
    return seria;
  }
};
var _default = exports.default = EuroStatAdapter;
//# sourceMappingURL=EuroStatAdapter.js.map
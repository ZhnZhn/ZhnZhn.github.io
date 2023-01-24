"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crSplineSeria = exports.crSplineConfig = void 0;
var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));
var _ChartConfigFn = require("../../charts/ChartConfigFn");
var _EuroStatFn = require("./EuroStatFn");
const DF_SERIA_TYPE = 'spline';
const _crSeriaType = function (option, dfSeriaType) {
  if (dfSeriaType === void 0) {
    dfSeriaType = DF_SERIA_TYPE;
  }
  return (option.seriaType || dfSeriaType).toLowerCase();
};
const crSplineConfig = (json, option) => {
  const [data, minY, maxY] = (0, _EuroStatFn.crData)(json, option);
  option.seriaType = _crSeriaType(option);
  option.minY = minY;
  option.maxY = maxY;
  return (0, _crConfigType.default)({
    option,
    data,
    confOption: {
      info: (0, _EuroStatFn.crDatasetInfo)(json),
      zhConfig: (0, _EuroStatFn.crZhConfig)(option)
    }
  });
};
exports.crSplineConfig = crSplineConfig;
const crSplineSeria = (json, option) => {
  const [data, minY] = (0, _EuroStatFn.crData)(json),
    {
      itemCaption,
      seriaColor,
      seriaWidth
    } = option;
  return (0, _ChartConfigFn.crSeriaConfig)({
    name: itemCaption,
    seriaType: _crSeriaType(option),
    seriaColor,
    seriaWidth,
    data,
    minY
  });
};
exports.crSplineSeria = crSplineSeria;
//# sourceMappingURL=toSpline.js.map
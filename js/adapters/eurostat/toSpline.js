"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));

var _ChartConfigFn = require("../../charts/ChartConfigFn");

var _EuroStatFn = require("./EuroStatFn");

const toSpline = {
  createConfig: (json, option) => {
    const {
      seriaType
    } = option,
          [data, minY, maxY] = (0, _EuroStatFn.crData)(json, option),
          _type = (seriaType || '').toLowerCase() || 'spline';

    option.seriaType = _type;
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
  },
  createSeria: (json, option) => {
    const {
      data
    } = (0, _EuroStatFn.crData)(json),
          {
      itemCaption,
      seriaType,
      seriaColor,
      seriaWidth
    } = option;
    return (0, _ChartConfigFn.crSeriaConfig)({
      seriaType,
      seriaColor,
      seriaWidth,
      data,
      minY: (0, _EuroStatFn.findMinY)(data),
      name: itemCaption
    });
  }
};
var _default = toSpline;
exports.default = _default;
//# sourceMappingURL=toSpline.js.map
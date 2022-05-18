"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _EuroStatFn = require("./EuroStatFn");

const toArea = {
  createConfig: (json, option) => {
    const {
      isNotZoomToMinMax,
      seriaType,
      seriaColor,
      seriaWidth
    } = option,
          {
      data,
      max,
      min
    } = (0, _EuroStatFn.crData)(json, option),
          _type = (seriaType || '').toLowerCase() || 'spline',
          config = _ChartConfig.default.crAreaConfig({
      seriaType: _type,
      seriaColor,
      seriaWidth
    });

    (0, _EuroStatFn.setDataAndInfo)({
      config,
      data,
      json,
      option
    });
    (0, _EuroStatFn.setLineExtrems)({
      config,
      max,
      min,
      isNotZoomToMinMax
    });
    return config;
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
    return _ChartConfig.default.crSeria({
      seriaType,
      seriaColor,
      seriaWidth,
      data,
      minY: (0, _EuroStatFn.findMinY)(data),
      name: itemCaption
    });
  }
};
var _default = toArea;
exports.default = _default;
//# sourceMappingURL=toArea.js.map
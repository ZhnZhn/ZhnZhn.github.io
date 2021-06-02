"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _EuroStatFn = _interopRequireDefault(require("./EuroStatFn"));

var crData = _EuroStatFn["default"].crData,
    setDataAndInfo = _EuroStatFn["default"].setDataAndInfo,
    setLineExtrems = _EuroStatFn["default"].setLineExtrems,
    findMinY = _EuroStatFn["default"].findMinY;
var toArea = {
  createConfig: function createConfig(json, option) {
    var isNotZoomToMinMax = option.isNotZoomToMinMax,
        seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        seriaWidth = option.seriaWidth,
        _crData = crData(json, option),
        data = _crData.data,
        max = _crData.max,
        min = _crData.min,
        _type = (seriaType || '').toLowerCase() || 'spline',
        config = _ChartConfig["default"].crAreaConfig({
      seriaType: _type,
      seriaColor: seriaColor,
      seriaWidth: seriaWidth
    });

    setDataAndInfo({
      config: config,
      data: data,
      json: json,
      option: option
    });
    setLineExtrems({
      config: config,
      max: max,
      min: min,
      isNotZoomToMinMax: isNotZoomToMinMax
    });
    return config;
  },
  createSeria: function createSeria(json, option) {
    var _crData2 = crData(json),
        data = _crData2.data,
        itemCaption = option.itemCaption,
        seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        seriaWidth = option.seriaWidth;

    return _ChartConfig["default"].crSeria({
      seriaType: seriaType,
      seriaColor: seriaColor,
      seriaWidth: seriaWidth,
      data: data,
      minY: findMinY(data),
      name: itemCaption
    });
  }
};
var _default = toArea;
exports["default"] = _default;
//# sourceMappingURL=toArea.js.map
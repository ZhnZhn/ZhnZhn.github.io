"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _EuroStatFn = _interopRequireDefault(require("./EuroStatFn"));

var createData = _EuroStatFn["default"].createData,
    setDataAndInfo = _EuroStatFn["default"].setDataAndInfo,
    setLineExtrems = _EuroStatFn["default"].setLineExtrems,
    findMinY = _EuroStatFn["default"].findMinY;
var toArea = {
  createConfig: function createConfig(json, option) {
    var isNotZoomToMinMax = option.isNotZoomToMinMax,
        seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        seriaWidth = option.seriaWidth,
        mapFrequency = option.mapFrequency,
        _createData = createData(json, mapFrequency),
        data = _createData.data,
        max = _createData.max,
        min = _createData.min,
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
    var _createData2 = createData(json),
        data = _createData2.data,
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
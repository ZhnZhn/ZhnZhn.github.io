"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _EuroStatFn = _interopRequireDefault(require("./EuroStatFn"));

var crTimeIndexAndValue = _EuroStatFn["default"].crTimeIndexAndValue,
    createData = _EuroStatFn["default"].createData,
    setDataAndInfo = _EuroStatFn["default"].setDataAndInfo,
    setLineExtrems = _EuroStatFn["default"].setLineExtrems,
    findMinY = _EuroStatFn["default"].findMinY;
var toArea = {
  createConfig: function createConfig(json, option) {
    var _crTimeIndexAndValue = crTimeIndexAndValue(json),
        timeIndex = _crTimeIndexAndValue.timeIndex,
        value = _crTimeIndexAndValue.value,
        isNotZoomToMinMax = option.isNotZoomToMinMax,
        seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        seriaWidth = option.seriaWidth,
        mapFrequency = option.mapFrequency,
        _createData = createData(timeIndex, value, mapFrequency),
        data = _createData.data,
        max = _createData.max,
        min = _createData.min,
        _type = typeof seriaType === 'string' ? seriaType.toLowerCase() : 'spline',
        config = _ChartConfig["default"].fBaseAreaConfig({
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
    var _crTimeIndexAndValue2 = crTimeIndexAndValue(json),
        timeIndex = _crTimeIndexAndValue2.timeIndex,
        value = _crTimeIndexAndValue2.value,
        itemCaption = option.itemCaption,
        seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        seria = _ChartConfig["default"].fSeries({
      seriaType: seriaType
    }),
        _createData2 = createData(timeIndex, value),
        data = _createData2.data;

    return Object.assign(seria, {
      zhSeriaId: option.key,
      zhValueText: itemCaption,
      color: seriaColor,
      data: data,
      minY: findMinY(data)
    });
  }
};
var _default = toArea;
exports["default"] = _default;
//# sourceMappingURL=toArea.js.map
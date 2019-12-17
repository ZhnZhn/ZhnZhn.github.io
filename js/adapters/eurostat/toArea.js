"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _EuroStatFn = _interopRequireDefault(require("./EuroStatFn"));

var toArea = {
  createConfig: function createConfig(json, option) {
    var _fn$crTimeIndexAndVal = _EuroStatFn["default"].crTimeIndexAndValue(json),
        timeIndex = _fn$crTimeIndexAndVal.timeIndex,
        value = _fn$crTimeIndexAndVal.value,
        isNotZoomToMinMax = option.isNotZoomToMinMax,
        seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        _fn$createData = _EuroStatFn["default"].createData(timeIndex, value),
        data = _fn$createData.data,
        max = _fn$createData.max,
        min = _fn$createData.min,
        _type = typeof seriaType === 'string' ? seriaType.toLowerCase() : 'spline',
        config = _ChartConfig["default"].fBaseAreaConfig({
      seriaType: _type,
      seriaColor: seriaColor
    });

    _EuroStatFn["default"].setDataAndInfo({
      config: config,
      data: data,
      json: json,
      option: option
    });

    _EuroStatFn["default"].setLineExtrems({
      config: config,
      max: max,
      min: min,
      isNotZoomToMinMax: isNotZoomToMinMax
    }); //config.zhConfig.isWithoutIndicator = false      


    return config;
  },
  createSeria: function createSeria(json, option) {
    var _fn$crTimeIndexAndVal2 = _EuroStatFn["default"].crTimeIndexAndValue(json),
        timeIndex = _fn$crTimeIndexAndVal2.timeIndex,
        value = _fn$crTimeIndexAndVal2.value,
        itemCaption = option.itemCaption,
        seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        seria = _ChartConfig["default"].fSeries({
      seriaType: seriaType
    }),
        _fn$createData2 = _EuroStatFn["default"].createData(timeIndex, value),
        data = _fn$createData2.data;

    return Object.assign(seria, {
      zhSeriaId: option.key,
      zhValueText: itemCaption,
      color: seriaColor,
      data: data,
      minY: _EuroStatFn["default"].findMinY(data)
    });
  }
};
var _default = toArea;
exports["default"] = _default;
//# sourceMappingURL=toArea.js.map
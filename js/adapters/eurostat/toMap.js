"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _EuroStatFn = _interopRequireDefault(require("./EuroStatFn"));

var toMap = {
  createConfig: function createConfig(json, option) {
    var timeIndex = json.dimension.time.category.index,
        value = json.value,
        _EuroStatFn$createDat = _EuroStatFn["default"].createData(timeIndex, value),
        data = _EuroStatFn$createDat.data,
        config = _ChartConfig["default"].fBaseAreaConfig();

    _EuroStatFn["default"].setDataAndInfo({
      config: config,
      data: data,
      json: json,
      option: option
    });

    Object.assign(config, {
      zhDialog: option,
      json: json,
      zhMapSlice: option.zhMapSlice
    });
    return config;
  }
};
var _default = toMap;
exports["default"] = _default;
//# sourceMappingURL=toMap.js.map
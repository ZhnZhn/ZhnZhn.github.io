"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _EuroStatFn = _interopRequireDefault(require("./EuroStatFn"));

var crData = _EuroStatFn["default"].crData,
    setDataAndInfo = _EuroStatFn["default"].setDataAndInfo;

var _addItemCaptionTo = function _addItemCaptionTo(option) {
  var itemCaption = option.itemCaption,
      subtitle = option.subtitle;
  option.itemCaption = itemCaption || subtitle;
};

var toMap = {
  createConfig: function createConfig(json, option) {
    var _crData = crData(json),
        data = _crData.data,
        config = _ChartConfig["default"].crAreaConfig();

    _addItemCaptionTo(option);

    setDataAndInfo({
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
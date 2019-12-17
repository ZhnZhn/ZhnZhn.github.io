"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crData = _fnAdapter["default"].crData,
    crConfigOption = _fnAdapter["default"].crConfigOption;
var WtdAdapter = {
  toConfig: function toConfig(json, option) {
    var title = option.title,
        subtitle = option.subtitle,
        value = option.value,
        dataOption = crData(json, option),
        config = (0, _ConfigBuilder["default"])().stockConfig(value, dataOption).addCaption(title, subtitle).add((0, _extends2["default"])({}, crConfigOption({
      data: dataOption.data,
      option: option
    }))) //.addZhPoints(dataMfi)
    .toConfig();
    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    var _WtdAdapter$toConfig = WtdAdapter.toConfig(json, option),
        config = _WtdAdapter$toConfig.config;

    return config.series[0];
  }
};
var _default = WtdAdapter;
exports["default"] = _default;
//# sourceMappingURL=WtdAdapter.js.map
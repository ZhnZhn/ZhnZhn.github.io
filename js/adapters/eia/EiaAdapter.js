"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crTitle = _fnAdapter["default"].crTitle,
    crData = _fnAdapter["default"].crData,
    crConfigOption = _fnAdapter["default"].crConfigOption;
var EiaAdapter = {
  toConfig: function toConfig(json, option) {
    var seriaColor = option.seriaColor,
        _crTitle = crTitle(option),
        title = _crTitle.title,
        subtitle = _crTitle.subtitle,
        data = crData(json),
        seria = (0, _ConfigBuilder["default"])().splineSeria({
      color: seriaColor,
      data: data
    }).toSeria(),
        config = (0, _ConfigBuilder["default"])().area2Config(title, subtitle).addSeries(seria).addMinMax(data, option).add((0, _extends2["default"])({}, crConfigOption({
      json: json,
      option: option,
      data: data
    }))).toConfig();

    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    var _EiaAdapter$toConfig = EiaAdapter.toConfig(json, option),
        config = _EiaAdapter$toConfig.config;

    return config.series[0];
  }
};
var _default = EiaAdapter;
exports["default"] = _default;
//# sourceMappingURL=EiaAdapter.js.map
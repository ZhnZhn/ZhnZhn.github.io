"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crCaption = _fnAdapter["default"].crCaption,
    crSeriaType = _fnAdapter["default"].crSeriaType,
    crData = _fnAdapter["default"].crData,
    crConfigOption = _fnAdapter["default"].crConfigOption;
var FmpAdapter = {
  toConfig: function toConfig(json, option) {
    var _propName = option._propName,
        seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        _crCaption = crCaption(option),
        title = _crCaption.title,
        subtitle = _crCaption.subtitle,
        data = crData(json._values, _propName),
        seria = (0, _ConfigBuilder["default"])().splineSeria({
      type: crSeriaType(seriaType),
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
    var _FmpAdapter$toConfig = FmpAdapter.toConfig(json, option),
        config = _FmpAdapter$toConfig.config;

    return config.series[0];
  }
};
var _default = FmpAdapter;
exports["default"] = _default;
//# sourceMappingURL=FmpAdapter.js.map
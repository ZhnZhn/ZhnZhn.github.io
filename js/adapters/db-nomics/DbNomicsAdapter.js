"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crData = _fnAdapter["default"].crData,
    crTitle = _fnAdapter["default"].crTitle,
    crConfigOption = _fnAdapter["default"].crConfigOption;
var DbNomicsAdapter = {
  toConfig: function toConfig(json, option) {
    var seriaColor = option.seriaColor,
        _option$seriaType = option.seriaType,
        seriaType = _option$seriaType === void 0 ? 'spline' : _option$seriaType,
        _crTitle = crTitle(option, json),
        title = _crTitle.title,
        subtitle = _crTitle.subtitle,
        data = crData(json),
        seria = (0, _ConfigBuilder["default"])().splineSeria({
      color: seriaColor,
      type: seriaType.toLowerCase(),
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
    var _DbNomicsAdapter$toCo = DbNomicsAdapter.toConfig(json, option),
        config = _DbNomicsAdapter$toCo.config;

    return config.series[0];
  }
};
var _default = DbNomicsAdapter;
exports["default"] = _default;
//# sourceMappingURL=DbNomicsAdapter.js.map
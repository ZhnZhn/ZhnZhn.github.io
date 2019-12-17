"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crSubtitle = _fnAdapter["default"].crSubtitle,
    crData = _fnAdapter["default"].crData,
    crConfigOption = _fnAdapter["default"].crConfigOption;
var IntrinioAdapter = {
  toConfig: function toConfig(json, option) {
    var data = crData(json, option),
        seria = (0, _ConfigBuilder["default"])().splineSeria({
      data: data
    }).toSeria(),
        _subtitle = crSubtitle(option),
        title = option.title,
        config = (0, _ConfigBuilder["default"])().area2Config(title, _subtitle).addSeries(seria).add((0, _extends2["default"])({}, crConfigOption({
      option: option,
      data: data
    }))).toConfig();

    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    var _IntrinioAdapter$toCo = IntrinioAdapter.toConfig(json, option),
        config = _IntrinioAdapter$toCo.config;

    return config.series[0];
  }
};
var _default = IntrinioAdapter;
exports["default"] = _default;
//# sourceMappingURL=IntrinioAdapter.js.map
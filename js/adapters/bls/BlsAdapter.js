"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crData = _fnAdapter["default"].crData,
    crConfigOption = _fnAdapter["default"].crConfigOption;
var BlsAdapter = {
  toConfig: function toConfig(json, option) {
    var dfTitle = option.dfTitle,
        subtitle = option.subtitle,
        title = option.title,
        _dfTitle = dfTitle || subtitle,
        data = crData(json),
        seria = (0, _ConfigBuilder["default"])().splineSeria({
      data: data
    }).toSeria(),
        config = (0, _ConfigBuilder["default"])().area2Config(_dfTitle, title).addSeries(seria).add((0, _extends2["default"])({}, crConfigOption({
      json: json,
      option: option,
      data: data
    }))).toConfig();

    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    var _BlsAdapter$toConfig = BlsAdapter.toConfig(json, option),
        config = _BlsAdapter$toConfig.config;

    return config.series[0];
  }
};
var _default = BlsAdapter;
exports["default"] = _default;
//# sourceMappingURL=BlsAdapter.js.map
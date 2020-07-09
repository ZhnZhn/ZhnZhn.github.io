"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crData = _fnAdapter["default"].crData,
    crConfigOption = _fnAdapter["default"].crConfigOption;
var OnsAdapter = {
  toConfig: function toConfig(json, option) {
    var title = option.title,
        subtitle = option.subtitle,
        seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        seriaWidth = option.seriaWidth,
        data = crData(json),
        seria = (0, _ConfigBuilder["default"])().splineSeria({
      seriaType: seriaType,
      seriaColor: seriaColor,
      seriaWidth: seriaWidth,
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
    return _ConfigBuilder["default"].crSeria({
      adapter: OnsAdapter,
      json: json,
      option: option
    });
  }
};
var _default = OnsAdapter;
exports["default"] = _default;
//# sourceMappingURL=OnsAdapter.js.map
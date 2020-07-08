"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crCaption = _fnAdapter["default"].crCaption,
    crData = _fnAdapter["default"].crData,
    crConfigOption = _fnAdapter["default"].crConfigOption;
var FmpAdapter = {
  toConfig: function toConfig(json, option) {
    var dfPn = option.dfPn,
        _propName = option._propName,
        seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        seriaWidth = option.seriaWidth,
        _crCaption = crCaption(option),
        title = _crCaption.title,
        subtitle = _crCaption.subtitle,
        data = crData(json[dfPn], _propName),
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
      adapter: FmpAdapter,
      json: json,
      option: option
    });
  }
};
var _default = FmpAdapter;
exports["default"] = _default;
//# sourceMappingURL=FmpAdapter.js.map
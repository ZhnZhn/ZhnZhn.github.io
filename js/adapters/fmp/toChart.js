"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var Builder = _crConfigType["default"].Builder,
    crCaption = _fnAdapter["default"].crCaption,
    crData = _fnAdapter["default"].crData,
    crConfigOption = _fnAdapter["default"].crConfigOption,
    _assign = Object.assign;
var toChart = {
  toConfig: function toConfig(json, option) {
    var dfPn = option.dfPn,
        _propName = option._propName,
        data = crData(json[dfPn], _propName),
        confOption = crConfigOption(option);

    _assign(option, crCaption(option));

    return {
      config: (0, _crConfigType["default"])({
        option: option,
        data: data,
        confOption: confOption
      })
    };
  },
  toSeries: function toSeries(json, option) {
    return Builder.crSeria({
      adapter: toChart,
      json: json,
      option: option
    });
  }
};
var _default = toChart;
exports["default"] = _default;
//# sourceMappingURL=toChart.js.map
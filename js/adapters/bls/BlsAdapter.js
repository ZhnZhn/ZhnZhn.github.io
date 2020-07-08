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
var BlsAdapter = {
  toConfig: function toConfig(json, option) {
    var title = option.title,
        _dfTitle = crTitle(option),
        data = crData(json),
        seria = (0, _ConfigBuilder["default"])().splineSeria({
      data: data
    }).toSeria(),
        config = (0, _ConfigBuilder["default"])().area2Config(_dfTitle, title).addMinMax(data, option).addSeries(seria).add((0, _extends2["default"])({}, crConfigOption({
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
      adapter: BlsAdapter,
      json: json,
      option: option
    });
  }
};
var _default = BlsAdapter;
exports["default"] = _default;
//# sourceMappingURL=BlsAdapter.js.map
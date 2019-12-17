"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _RouterAdapter = _interopRequireDefault(require("./RouterAdapter"));

var IexAdapter = {
  crKey: function crKey(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$one = _ref.one,
        one = _ref$one === void 0 ? '' : _ref$one,
        _ref$two = _ref.two,
        two = _ref$two === void 0 ? '' : _ref$two;

    return one + '_' + two;
  },
  toConfig: function toConfig(json, option) {
    var config = _RouterAdapter["default"].getAdapter(option).toConfig(json, option);

    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option, chart) {
    var seria = _RouterAdapter["default"].getAdapter(option).toSeries(json, option, chart);

    return seria;
  }
};
var _default = IexAdapter;
exports["default"] = _default;
//# sourceMappingURL=IexAdapter.js.map
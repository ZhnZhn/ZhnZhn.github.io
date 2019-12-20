"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _RouterAdapter = _interopRequireDefault(require("./RouterAdapter"));

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _crDfKey = function _crDfKey(_ref) {
  var _ref$one = _ref.one,
      one = _ref$one === void 0 ? '' : _ref$one,
      _ref$two = _ref.two,
      two = _ref$two === void 0 ? '' : _ref$two;
  return one + '_' + two;
};

var IexAdapter = {
  crKey: function crKey(option) {
    var _adapter = _RouterAdapter["default"].getAdapter(option);

    return _isFn(_adapter.crKey) ? _adapter.crKey(option) : _crDfKey(option);
  },
  toConfig: function toConfig(json, option) {
    var config = _RouterAdapter["default"].getAdapter(option).toConfig(json, option);

    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option, chart) {
    var _adapter = _RouterAdapter["default"].getAdapter(option);

    _AdapterFn["default"].throwIfSeriesNotSupported(_adapter);

    return _adapter.toSeries(json, option, chart);
  }
};
var _default = IexAdapter;
exports["default"] = _default;
//# sourceMappingURL=IexAdapter.js.map
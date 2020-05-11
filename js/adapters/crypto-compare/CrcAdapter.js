"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _toHdConfig = _interopRequireDefault(require("./toHdConfig"));

var _toInfoConfig = _interopRequireDefault(require("./toInfoConfig"));

var _rAdapter = {
  DF: _toHdConfig["default"],
  HD: _toHdConfig["default"],
  CI: _toInfoConfig["default"]
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _getAdapter = function _getAdapter(option) {
  var dfSubLoadId = option.dfSubLoadId;
  return _rAdapter[dfSubLoadId] || _rAdapter.DF;
};

var CrcAdapter = {
  toConfig: function toConfig(json, option) {
    return _getAdapter(option).toConfig(json, option);
  },
  isAdd: function isAdd(option) {
    return _isFn(_getAdapter(option).toSeries);
  },
  toSeries: function toSeries(json, option) {
    return _getAdapter(option).toSeries(json, option);
  }
};
var _default = CrcAdapter;
exports["default"] = _default;
//# sourceMappingURL=CrcAdapter.js.map
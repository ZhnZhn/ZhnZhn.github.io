"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _toChart = _interopRequireDefault(require("./toChart"));

var _toList = _interopRequireDefault(require("./toList"));

var _rAdapter = {
  DF: _toChart["default"],
  MCL: _toList["default"]
};

var _getAdapter = function _getAdapter(option) {
  var dfSubId = option.dfSubId;
  return _rAdapter[dfSubId] || _rAdapter.DF;
};

var CgAdapter = {
  crKey: function crKey(option) {
    return _getAdapter(option).crKey(option);
  },
  toConfig: function toConfig(json, option) {
    return _getAdapter(option).toConfig(json, option);
  },
  toSeries: function toSeries(json, option) {
    return _getAdapter(option).toSeries(json, option);
  }
};
var _default = CgAdapter;
exports["default"] = _default;
//# sourceMappingURL=CgAdapter.js.map
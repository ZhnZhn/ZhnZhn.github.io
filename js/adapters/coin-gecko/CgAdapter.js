"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapter = _interopRequireDefault(require("../crAdapter"));

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

var CgAdapter = (0, _crAdapter["default"])(_getAdapter, {
  isKey: true
});
var _default = CgAdapter;
exports["default"] = _default;
//# sourceMappingURL=CgAdapter.js.map
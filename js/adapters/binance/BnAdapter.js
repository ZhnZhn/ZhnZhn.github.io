"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapter = _interopRequireDefault(require("../crAdapter"));

var _toKline = _interopRequireDefault(require("./toKline"));

var _toOrderBook = _interopRequireDefault(require("./toOrderBook"));

var _rAdapter = {
  DF: _toKline["default"],
  OB: _toOrderBook["default"]
};

var _getAdapter = function _getAdapter(option) {
  var dfId = option.dfId;
  return dfId && _rAdapter[dfId] || _rAdapter.DF;
};

var BnAdapter = (0, _crAdapter["default"])(_getAdapter);
var _default = BnAdapter;
exports["default"] = _default;
//# sourceMappingURL=BnAdapter.js.map
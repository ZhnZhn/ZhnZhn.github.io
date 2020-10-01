"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapter = _interopRequireDefault(require("../crAdapter"));

var _toChart = _interopRequireDefault(require("./toChart"));

var _toExchangeList = _interopRequireDefault(require("./toExchangeList"));

var _toMarketCapList = _interopRequireDefault(require("./toMarketCapList"));

var _rAdapter = {
  DF: _toChart["default"],
  EL: _toExchangeList["default"],
  MCL: _toMarketCapList["default"]
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
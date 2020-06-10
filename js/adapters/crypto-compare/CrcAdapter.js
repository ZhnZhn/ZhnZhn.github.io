"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapter = _interopRequireDefault(require("../crAdapter"));

var _toHdConfig = _interopRequireDefault(require("./toHdConfig"));

var _toInfoConfig = _interopRequireDefault(require("./toInfoConfig"));

var _rAdapter = {
  DF: _toHdConfig["default"],
  HD: _toHdConfig["default"],
  CI: _toInfoConfig["default"]
};

var _getAdapter = function _getAdapter(option) {
  var dfSubLoadId = option.dfSubLoadId;
  return _rAdapter[dfSubLoadId] || _rAdapter.DF;
};

var CrcAdapter = (0, _crAdapter["default"])(_getAdapter);
var _default = CrcAdapter;
exports["default"] = _default;
//# sourceMappingURL=CrcAdapter.js.map
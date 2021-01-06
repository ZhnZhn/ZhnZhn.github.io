"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterRouter = _interopRequireDefault(require("../crAdapterRouter"));

var _toHdConfig = _interopRequireDefault(require("./toHdConfig"));

var _rAdapter = {
  DF: _toHdConfig["default"]
},
    CrcAdapter = (0, _crAdapterRouter["default"])(_rAdapter);
var _default = CrcAdapter;
exports["default"] = _default;
//# sourceMappingURL=CrcAdapter.js.map
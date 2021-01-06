"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterRouter = _interopRequireDefault(require("../crAdapterRouter"));

var _toKline = _interopRequireDefault(require("./toKline"));

var _toOrderBook = _interopRequireDefault(require("./toOrderBook"));

var _rAdapter = {
  DF: _toKline["default"],
  OB: _toOrderBook["default"]
},
    BnAdapter = (0, _crAdapterRouter["default"])(_rAdapter);
var _default = BnAdapter;
exports["default"] = _default;
//# sourceMappingURL=BnAdapter.js.map
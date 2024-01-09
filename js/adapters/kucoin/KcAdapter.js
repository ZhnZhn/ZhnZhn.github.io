"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = _interopRequireDefault(require("../crAdapterRouter"));
var _toKline = _interopRequireDefault(require("./toKline"));
var _toOrderBook = _interopRequireDefault(require("./toOrderBook"));
const _rAdapter = {
    DF: _toKline.default,
    OB: _toOrderBook.default
  },
  KcAdapter = (0, _crAdapterRouter.default)(_rAdapter);
var _default = exports.default = KcAdapter;
//# sourceMappingURL=KcAdapter.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _toKline = _interopRequireDefault(require("./toKline"));
var _toOrderBook = _interopRequireDefault(require("./toOrderBook"));
var _BtApi = _interopRequireDefault(require("./BtApi"));
const Bt = {
  api: _BtApi.default,
  adapter: (0, _crAdapterRouter.crAdapterRouterDfOb)(_toKline.default, _toOrderBook.default)
};
var _default = exports.default = Bt;
//# sourceMappingURL=Bt.js.map
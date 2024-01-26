"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _toKline = _interopRequireDefault(require("./toKline"));
var _toOrderBook = _interopRequireDefault(require("./toOrderBook"));
var _BnApi = _interopRequireDefault(require("./BnApi"));
const Bn = {
  api: _BnApi.default,
  adapter: (0, _crAdapterRouter.crAdapterRouterDfOb)(_toKline.default, _toOrderBook.default)
};
var _default = exports.default = Bn;
//# sourceMappingURL=Bn.js.map
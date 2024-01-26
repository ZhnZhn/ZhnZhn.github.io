"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _toKline = _interopRequireDefault(require("./toKline"));
var _toOrderBook = _interopRequireDefault(require("./toOrderBook"));
var _BfApi = _interopRequireDefault(require("./BfApi"));
const Bf = {
  api: _BfApi.default,
  adapter: (0, _crAdapterRouter.crAdapterRouterDfOb)(_toKline.default, _toOrderBook.default)
};
var _default = exports.default = Bf;
//# sourceMappingURL=Bf.js.map
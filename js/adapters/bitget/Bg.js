"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _toKline = _interopRequireDefault(require("./toKline"));
var _toOrderBook = _interopRequireDefault(require("./toOrderBook"));
var _BgApi = _interopRequireDefault(require("./BgApi"));
const Bg = {
  api: _BgApi.default,
  adapter: (0, _crAdapterRouter.crAdapterRouterDfOb)(_toKline.default, _toOrderBook.default)
};
var _default = exports.default = Bg;
//# sourceMappingURL=Bg.js.map
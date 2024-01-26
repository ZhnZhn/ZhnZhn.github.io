"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _toKline = _interopRequireDefault(require("./toKline"));
var _BbApi = _interopRequireDefault(require("./BbApi"));
const Bb = {
  api: _BbApi.default,
  adapter: (0, _crAdapterRouter.crAdapterRouterDfOb)(_toKline.default)
};
var _default = exports.default = Bb;
//# sourceMappingURL=Bb.js.map
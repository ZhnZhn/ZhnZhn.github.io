"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _toKline = _interopRequireDefault(require("./toKline"));
var _GtApi = _interopRequireDefault(require("./GtApi"));
const Gt = {
  api: _GtApi.default,
  adapter: (0, _crAdapterRouter.crAdapterRouterDfOb)(_toKline.default)
};
var _default = exports.default = Gt;
//# sourceMappingURL=Gt.js.map
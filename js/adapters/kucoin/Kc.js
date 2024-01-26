"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _toKline = _interopRequireDefault(require("./toKline"));
var _KcApi = _interopRequireDefault(require("./KcApi"));
const Kc = {
  api: _KcApi.default,
  adapter: (0, _crAdapterRouter.crAdapterRouterDfOb)(_toKline.default)
};
var _default = exports.default = Kc;
//# sourceMappingURL=Kc.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _DfLink = _interopRequireDefault(require("./DfLink"));
var _NdlLink = _interopRequireDefault(require("./NdlLink"));
var _NasdaqLink = _interopRequireDefault(require("./NasdaqLink"));
var _FredLink = _interopRequireDefault(require("./FredLink"));
var _EsLink = _interopRequireDefault(require("./EsLink"));
const RouterNativeLink = {
  DF: _DfLink.default,
  NDL: _NdlLink.default,
  NASDAQ: _NasdaqLink.default,
  FRED: _FredLink.default,
  ES: _EsLink.default
};
var _default = exports.default = RouterNativeLink;
//# sourceMappingURL=RouterNativeLink.js.map
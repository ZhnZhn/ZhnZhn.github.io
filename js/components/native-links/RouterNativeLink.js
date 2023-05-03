"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _DfLink = _interopRequireDefault(require("./DfLink"));
var _NdlLink = _interopRequireDefault(require("./NdlLink"));
var _EuronextLink = _interopRequireDefault(require("./EuronextLink"));
var _NasdaqLink = _interopRequireDefault(require("./NasdaqLink"));
var _LmeLink = _interopRequireDefault(require("./LmeLink"));
var _FaoStatLink = _interopRequireDefault(require("./FaoStatLink"));
var _FredLink = _interopRequireDefault(require("./FredLink"));
var _CrcLink = _interopRequireDefault(require("./CrcLink"));
var _EsLink = _interopRequireDefault(require("./EsLink"));
const RouterNativeLink = {
  DF: _DfLink.default,
  NDL: _NdlLink.default,
  NASDAQ: _NasdaqLink.default,
  EURONEXT: _EuronextLink.default,
  LME: _LmeLink.default,
  FAO_STAT: _FaoStatLink.default,
  FRED: _FredLink.default,
  CRC: _CrcLink.default,
  ES: _EsLink.default
};
var _default = RouterNativeLink;
exports.default = _default;
//# sourceMappingURL=RouterNativeLink.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _DfLink = _interopRequireDefault(require("./DfLink"));

var _QuandlLink = _interopRequireDefault(require("./QuandlLink"));

var _EuronextLink = _interopRequireDefault(require("./EuronextLink"));

var _NasdaqLink = _interopRequireDefault(require("./NasdaqLink"));

var _LmeLink = _interopRequireDefault(require("./LmeLink"));

var _UnComtradeLink = _interopRequireDefault(require("./UnComtradeLink"));

var _FaoStatLink = _interopRequireDefault(require("./FaoStatLink"));

var _FredLink = _interopRequireDefault(require("./FredLink"));

var _CrcLink = _interopRequireDefault(require("./CrcLink"));

var _EsLink = _interopRequireDefault(require("./EsLink"));

var RouterNativeLink = {
  DF: _DfLink["default"],
  QUANDL: _QuandlLink["default"],
  EURONEXT: _EuronextLink["default"],
  NASDAQ: _NasdaqLink["default"],
  LME: _LmeLink["default"],
  UN_COMTRADE: _UnComtradeLink["default"],
  FAO_STAT: _FaoStatLink["default"],
  FRED: _FredLink["default"],
  CRC: _CrcLink["default"],
  ES: _EsLink["default"]
};
var _default = RouterNativeLink;
exports["default"] = _default;
//# sourceMappingURL=RouterNativeLink.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _QuandlApi = _interopRequireDefault(require("./QuandlApi"));

var _QuandlAdapter = _interopRequireDefault(require("./QuandlAdapter"));

var Quandl = {
  id: 'Q',
  api: _QuandlApi["default"],
  adapter: _QuandlAdapter["default"]
};
var _default = Quandl;
exports["default"] = _default;
//# sourceMappingURL=Quandl.js.map
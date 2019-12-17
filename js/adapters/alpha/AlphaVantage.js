"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Api = _interopRequireDefault(require("./Api"));

var _AlphaAdapter = _interopRequireDefault(require("./AlphaAdapter"));

var _AlphaIntradayAdapter = _interopRequireDefault(require("./AlphaIntradayAdapter"));

var _AlphaSectorAdapter = _interopRequireDefault(require("./AlphaSectorAdapter"));

var AlphaVantage = {
  Indicator: {
    api: _Api["default"],
    adapter: _AlphaAdapter["default"]
  },
  Intraday: {
    api: _Api["default"],
    adapter: _AlphaIntradayAdapter["default"]
  },
  Sector: {
    api: _Api["default"],
    adapter: _AlphaSectorAdapter["default"]
  }
};
var _default = AlphaVantage;
exports["default"] = _default;
//# sourceMappingURL=AlphaVantage.js.map
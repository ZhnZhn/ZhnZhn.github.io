"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AlphaAdapter = _interopRequireDefault(require("./AlphaAdapter"));

var _AlphaIntradayAdapter = _interopRequireDefault(require("./AlphaIntradayAdapter"));

var _AlphaSectorAdapter = _interopRequireDefault(require("./AlphaSectorAdapter"));

var _SearchAdapter = _interopRequireDefault(require("./SearchAdapter"));

var _default = {
  Indicator: _AlphaAdapter["default"],
  Intraday: _AlphaIntradayAdapter["default"],
  Sector: _AlphaSectorAdapter["default"],
  Search: _SearchAdapter["default"]
};
exports["default"] = _default;
//# sourceMappingURL=Adapter.js.map